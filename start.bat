@echo off
title GATE CSE 2027 Training Platform - Launcher
color 0B

cd /d "%~dp0"

echo.
echo ============================================================
echo   GATE CSE 2027 - INTERACTIVE TRAINING PLATFORM
echo   Target: GATE 2027 (CSE) ^| Start: October 1, 2026
echo   Dedicated Port: 2027
echo ============================================================
echo.

REM Check if Python is available
python --version >nul 2>&1
IF %ERRORLEVEL% EQU 0 (
    echo [OK] Python found.
    echo [OK] Launching http://localhost:2027/index.html in your browser...
    start "" "http://localhost:2027/index.html"
    python server.py
    goto end
)

python3 --version >nul 2>&1
IF %ERRORLEVEL% EQU 0 (
    echo [OK] Python3 found.
    echo [OK] Launching http://localhost:2027/index.html in your browser...
    start "" "http://localhost:2027/index.html"
    python3 server.py
    goto end
)

py --version >nul 2>&1
IF %ERRORLEVEL% EQU 0 (
    echo [OK] Python (py launcher) found.
    echo [OK] Launching http://localhost:2027/index.html in your browser...
    start "" "http://localhost:2027/index.html"
    py server.py
    goto end
)

REM Fallback if Python is not found at all
echo [WARN] Python not found in system PATH.
echo [WARN] Opening index.html directly in your default browser...
start "" "%~dp0index.html"

:end
pause
