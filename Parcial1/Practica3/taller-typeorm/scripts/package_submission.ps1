<#
Script para crear un ZIP listo para entrega con los archivos relevantes del taller.
Uso: ejecutar desde la raíz del proyecto:
  .\scripts\package_submission.ps1
#>

$project = Get-Location
$outName = "taller-typeorm-submission.zip"
$outPath = Join-Path $project.Path $outName

if (Test-Path $outPath) { Remove-Item $outPath }

$include = @(
  "package.json",
  "tsconfig.json",
  "README.md",
  "src",
  "docs"
)

Write-Host "Creando ZIP de entrega: $outPath"

$temp = Join-Path $project.Path "__temp_submission"
if (Test-Path $temp) { Remove-Item $temp -Recurse -Force }
New-Item -ItemType Directory -Path $temp | Out-Null

foreach ($item in $include) {
  $src = Join-Path $project.Path $item
  if (Test-Path $src) {
    Write-Host "Incluyendo: $item"
    Copy-Item $src -Destination $temp -Recurse -Force
  }
}

Add-Type -AssemblyName System.IO.Compression.FileSystem
[IO.Compression.ZipFile]::CreateFromDirectory($temp, $outPath)

Remove-Item $temp -Recurse -Force

Write-Host "ZIP creado en: $outPath"
