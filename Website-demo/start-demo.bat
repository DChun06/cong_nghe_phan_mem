@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found. Install Node.js 18 or newer, then run this file again.
  pause
  exit /b 1
)
if "%PORT%"=="" set "PORT=4173"
echo Starting SE Career Compass...
echo.
echo Web URL: http://127.0.0.1:%PORT%/login.html
echo API health: http://127.0.0.1:%PORT%/api/health
echo.
start "" /b powershell -NoProfile -WindowStyle Hidden -Command "$url='http://127.0.0.1:%PORT%/api/health'; for($i=0; $i -lt 30; $i++){ try { $null=Invoke-WebRequest -UseBasicParsing -Uri $url -TimeoutSec 1; Start-Process 'http://127.0.0.1:%PORT%/login.html'; break } catch { Start-Sleep -Milliseconds 250 } }" >nul 2>nul
node server.js
echo.
echo The server stopped, or port %PORT% is already being used.
pause
