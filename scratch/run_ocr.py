import subprocess

ps_script = """
Add-Type -AssemblyName System.Runtime.WindowsRuntime
[Windows.Globalization.Language, Windows.Globalization, ContentType=WindowsRuntime] | Out-Null
[Windows.Media.Ocr.OcrEngine, Windows.Foundation.UniversalApiContract, ContentType=WindowsRuntime] | Out-Null
[Windows.Storage.StorageFile, Windows.Storage, ContentType=WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Foundation.UniversalApiContract, ContentType=WindowsRuntime] | Out-Null

$asTaskGeneric = [System.WindowsRuntimeSystemExtensions].GetMethods() | ? { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.IsGenericMethod }

function Await($asyncOp, $type) {
    $m = $asTaskGeneric[0].MakeGenericMethod($type)
    $task = $m.Invoke($null, @($asyncOp))
    $task.Wait()
    return $task.Result
}

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
            Write-Output ($_.Name + ' -> ' + $text)
        } else {
            Write-Output ($_.Name + ' -> [NO TEXT]')
        }
    } catch {
        Write-Output ($_.Name + ' -> ERROR: ' + $_.Exception.ToString())
    }
}
"""

with open('scratch/ocr_scan.ps1', 'w', encoding='utf-8') as f:
    f.write(ps_script)

res = subprocess.run(['powershell', '-ExecutionPolicy', 'Bypass', '-File', 'scratch/ocr_scan.ps1'], capture_output=True, text=True)
with open('scratch/ocr_results.txt', 'w', encoding='utf-8') as f:
    f.write(res.stdout)
print("Saved OCR results. Lines count:", len(res.stdout.splitlines()))
if res.stderr:
    print('STDERR:', res.stderr)
