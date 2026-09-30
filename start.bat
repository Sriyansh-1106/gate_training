@echo off
title GATE CSE 2027 Training Platform
cls
echo ======================================================================
echo           GATE CSE 2027 - INTERACTIVE TRAINING PLATFORM
echo                     Level 0 to Rank 1 Journey
echo                Preparation Start: October 1, 2026
echo             Dedicated Port: http://localhost:2027
echo ======================================================================
echo.

cd /d "%~dp0"

:: Check if port 2027 has an old instance and free it
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":2027" ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
)

:: Check if Python is installed
where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [*] Starting GATE CSE 2027 Local Web Server (Port 2027)...
    python server.py
    goto end
)

where py >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [*] Starting GATE CSE 2027 (py launcher) Local Server (Port 2027)...
    py server.py
    goto end
)

echo [!] Python not found in PATH.
echo [*] Opening GATE CSE 2027 directly in your default browser...
start "" "%~dp0index.html"

:end
pause
