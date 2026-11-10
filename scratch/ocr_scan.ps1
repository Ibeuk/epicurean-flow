Add-Type -AssemblyName System.Runtime.WindowsRuntime
[Windows.Globalization.Language, Windows.Globalization, ContentType=WindowsRuntime] | Out-Null
[Windows.Media.Ocr.OcrEngine, Windows.Foundation.UniversalApiContract, ContentType=WindowsRuntime] | Out-Null
[Windows.Storage.StorageFile, Windows.Storage, ContentType=WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Foundation.UniversalApiContract, ContentType=WindowsRuntime] | Out-Null

$asTaskGeneric = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.IsGenericMethod }

function Await($asyncOp, $type) {
    $m = $asTaskGeneric[0].MakeGenericMethod($type)
    $task = $m.Invoke($null, @($asyncOp))
    $task.Wait()
    return $task.Result
}

$outFile = "scratch/ocr_results.txt"
if (Test-Path $outFile) { Remove-Item $outFile }

$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage([Windows.Globalization.Language]::new('en-US'))
Get-ChildItem -Filter 'WhatsApp Image*.jpeg' | ForEach-Object {
    try {
        $asyncOp = [Windows.Storage.StorageFile]::GetFileFromPathAsync($_.FullName)
        $file = Await $asyncOp ([Windows.Storage.StorageFile])

        $asyncOp2 = $file.OpenAsync([Windows.Storage.FileAccessMode]::Read)
        $stream = Await $asyncOp2 ([Windows.Storage.Streams.IRandomAccessStream])

        $asyncOp3 = [Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)
        $decoder = Await $asyncOp3 ([Windows.Graphics.Imaging.BitmapDecoder])

        $asyncOp4 = $decoder.GetSoftwareBitmapAsync()
        $bitmap = Await $asyncOp4 ([Windows.Graphics.Imaging.SoftwareBitmap])

        $asyncOp5 = $engine.RecognizeAsync($bitmap)
        $result = Await $asyncOp5 ([Windows.Media.Ocr.OcrResult])

        $text = ($result.Lines | ForEach-Object { $_.Text }) -join ' '
        if ($text.Length -gt 0) {
            $line = $_.Name + " -> " + $text
        } else {
            $line = $_.Name + " -> [NO TEXT]"
        }
    } catch {
        $line = $_.Name + " -> ERROR: " + $_.Exception.Message
    }
    [System.IO.File]::AppendAllLines((Convert-Path .).TrimEnd('\') + "\" + $outFile, [string[]]@($line), [System.Text.Encoding]::UTF8)
}
Write-Output "DONE_OCR"
