
[Windows.Globalization.Language, Windows.Globalization, ContentType=WindowsRuntime] | Out-Null
[Windows.Media.Ocr.OcrEngine, Windows.Foundation.UniversalApiContract, ContentType=WindowsRuntime] | Out-Null
[Windows.Storage.StorageFile, Windows.Storage, ContentType=WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Foundation.UniversalApiContract, ContentType=WindowsRuntime] | Out-Null
 = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage([Windows.Globalization.Language]::new('en-US'))
Get-ChildItem -Filter 'WhatsApp Image*.jpeg' | ForEach-Object {
    try {
         = [Windows.Storage.StorageFile]::GetFileFromPathAsync(.FullName).GetAwaiter().GetResult()
         = .OpenAsync([Windows.Storage.FileAccessMode]::Read).GetAwaiter().GetResult()
         = [Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync().GetAwaiter().GetResult()
         = .GetSoftwareBitmapAsync().GetAwaiter().GetResult()
         = .RecognizeAsync().GetAwaiter().GetResult()
         = (.Lines | ForEach-Object { .Text }) -join ' '
        if (.Length -gt 0) {
            Write-Output (.Name + ' -> ' + .Substring(0, [Math]::Min(120, .Length)))
        } else {
            Write-Output (.Name + ' -> [NO TEXT]')
        }
    } catch {
        Write-Output (.Name + ' -> ERROR: ' + .Exception.Message)
    }
}
