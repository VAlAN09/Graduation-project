@echo off
echo Attempting to enable MySQL drivers in PHP 8.4...
set "PHPINI=C:\Program Files\php-8.4.4-nts-Win32-vs17-x64\php.ini"
powershell -Command "(Get-Content '%PHPINI%') -replace ';extension=pdo_mysql', 'extension=pdo_mysql' -replace ';extension=mysqli', 'extension=mysqli' | Set-Content '%PHPINI%'"
if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] Drivers enabled in %PHPINI%
) else (
    echo [FAILED] Make sure you right-click this file and "Run as Administrator"
)
pause
