@echo off
title GATE CSE 2027 Training Platform
cls
echo ======================================================================
echo           GATE CSE 2027 - INTERACTIVE TRAINING PLATFORM
echo                     Level 0 to Rank 1 Journey
echo                Preparation Start: October 1, 2026
echo ======================================================================
echo.

cd /d "%~dp0"

:: Check if Python is installed
where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [*] Starting Python Local Web Server...
    python server.py
    goto end
)

where py >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [*] Starting Python (py launcher) Local Web Server...
    py server.py
    goto end
)

echo [!] Python not found in PATH.
echo [*] Launching GATE CSE 2027 directly in your default web browser...
start "" "index.html"

:end
pause
