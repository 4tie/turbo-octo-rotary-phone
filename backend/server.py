"""
HTTP server for 4TIE OS.
Serves the frontend/ static files and exposes a /api/news proxy endpoint.
"""

import http.server
import socketserver
import json
import os

from backend.config import PORT, FRONTEND_DIR
from backend.services.news import build_news


class DashboardHandler(http.server.SimpleHTTPRequestHandler):
    """
    Extends SimpleHTTPRequestHandler with API route handling.
    All routes are handled in do_GET; unmatched paths fall through
    to standard static-file serving.
    """

    # ── API routes ────────────────────────────────────────────────────────────

    def do_GET(self) -> None:
        if self.path == "/api/news":
            self._handle_news()
        else:
            super().do_GET()

    # ── Route handlers ────────────────────────────────────────────────────────

    def _handle_news(self) -> None:
        """Fetch news server-side (avoiding browser CORS) and return JSON."""
        try:
            articles = build_news()
            payload  = {"articles": articles}
        except Exception as exc:
            print(f"[server] news error: {exc}", flush=True)
            payload = {"articles": [], "error": str(exc)}

        body = json.dumps(payload).encode()
        self._json_response(200, body)

    # ── Helpers ───────────────────────────────────────────────────────────────

    def _json_response(self, status: int, body: bytes) -> None:
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, fmt: str, *args) -> None:
        pass  # suppress per-request access logs


# ── Server startup ─────────────────────────────────────────────────────────────

def run_server() -> None:
    """
    Change into the frontend directory so SimpleHTTPRequestHandler
    serves the correct static files, then start the TCP server.
    """
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    frontend_dir = os.path.join(project_root, FRONTEND_DIR)

    if not os.path.isdir(frontend_dir):
        raise FileNotFoundError(f"Frontend directory not found: {frontend_dir}")

    os.chdir(frontend_dir)

    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("0.0.0.0", PORT), DashboardHandler) as httpd:
        print(f"4TIE OS · serving frontend on http://0.0.0.0:{PORT}", flush=True)
        httpd.serve_forever()
