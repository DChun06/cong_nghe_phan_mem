@echo off
cd /d "%~dp0"
if "%PORT%"=="" set "PORT=4173"
echo Starting SE Career Compass...
echo.
echo Web URL: http://127.0.0.1:%PORT%/login.html
echo API health: http://127.0.0.1:%PORT%/api/health
echo.
start "" "http://127.0.0.1:%PORT%/login.html"
node server.js
echo.
echo The server stopped, or port %PORT% is already being used.
pause
