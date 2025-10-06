<#
Script para generar docs/der.png a partir de docs/der.puml usando el servidor público de PlantUML.
Uso: En PowerShell desde la carpeta del proyecto ejecutar:
  .\scripts\generate_der_png.ps1

Nota: El servidor público de PlantUML puede limitar el uso. Para uso offline descarga plantuml.jar y usa java -jar plantuml.jar docs/der.puml
#>

$puml = Join-Path -Path (Get-Location) -ChildPath "docs/der.puml"
$out = Join-Path -Path (Get-Location) -ChildPath "docs/der.png"

if (-not (Test-Path $puml)) {
  Write-Error "No se encontró $puml"
  exit 1
}

$text = Get-Content $puml -Raw

# Encode to PlantUML server format (deflate + base64)
[Reflection.Assembly]::LoadWithPartialName("System.IO.Compression.FileSystem") | Out-Null
function Encode-PlantUML([string]$s) {
  $bytes = [System.Text.Encoding]::UTF8.GetBytes($s)
  $ms = New-Object System.IO.MemoryStream
  $ds = New-Object System.IO.Compression.DeflateStream($ms, [System.IO.Compression.CompressionMode]::Compress)
  $ds.Write($bytes, 0, $bytes.Length)
  $ds.Close()
  $compressed = $ms.ToArray()
  $encoded = [System.Convert]::ToBase64String($compressed)
  return $encoded
}

$encoded = Encode-PlantUML $text
$url = "http://www.plantuml.com/plantuml/png/$encoded"

Write-Host "Descargando imagen desde: $url"
Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing
Write-Host "Imagen guardada en: $out"
