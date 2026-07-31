$ErrorActionPreference = "Stop"

$FourZeroRoot = Split-Path -Parent $PSScriptRoot
$SoulSource = Join-Path $FourZeroRoot "soul.md"
$HermesHome = Join-Path $HOME ".hermes"
$SoulTarget = Join-Path $HermesHome "SOUL.md"

if (-not (Test-Path $SoulSource)) {
    throw "Missing source file: $SoulSource"
}

New-Item -ItemType Directory -Force -Path $HermesHome | Out-Null
Copy-Item -Path $SoulSource -Destination $SoulTarget -Force

Write-Host "Hermes identity synchronized:"
Write-Host "  $SoulSource"
Write-Host "  -> $SoulTarget"
Write-Host ""
Write-Host "Launch Hermes from the repository root so it also loads AGENTS.md."
