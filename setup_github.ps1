Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "       GITHUB LOGIN & PUSH SCRIPT        " -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Step 1: Please log into GitHub." -ForegroundColor Green
Write-Host "        (Select GitHub.com -> HTTPS -> Yes -> Login with web browser)" -ForegroundColor Yellow
gh auth login

Write-Host ""
Write-Host "Step 2: Creating your 'travel-planning-app' repository on GitHub..." -ForegroundColor Green
gh repo create travel-planning-app --public --source=. --remote=origin --push

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "SUCCESS! Your code has been pushed!" -ForegroundColor Green
Write-Host "You can now close this blue window." -ForegroundColor Yellow
Write-Host "=========================================" -ForegroundColor Cyan
