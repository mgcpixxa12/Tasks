@echo off
cd /d "%~dp0"
py -3 launch.py
if errorlevel 1 python launch.py
pause
