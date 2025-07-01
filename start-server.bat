@echo off
echo Starting Xdash Development Server...
echo.

REM Try to find Node.js in common locations
if exist "C:\Program Files\nodejs\node.exe" (
    set NODE_PATH=C:\Program Files\nodejs\node.exe
    set NPM_PATH=C:\Program Files\nodejs\npm.cmd
    goto :found
)

if exist "C:\Program Files (x86)\nodejs\node.exe" (
    set NODE_PATH=C:\Program Files (x86)\nodejs\node.exe
    set NPM_PATH=C:\Program Files (x86)\nodejs\npm.cmd
    goto :found
)

if exist "%USERPROFILE%\AppData\Roaming\npm\node.exe" (
    set NODE_PATH=%USERPROFILE%\AppData\Roaming\npm\node.exe
    set NPM_PATH=%USERPROFILE%\AppData\Roaming\npm\npm.cmd
    goto :found
)

REM Try using npx if available
where npx >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Using npx to start Vite...
    npx vite
    goto :end
)

echo Node.js not found in common locations.
echo.
echo Please install Node.js from: https://nodejs.org/
echo Or if Node.js is installed, add it to your PATH environment variable.
echo.
echo Alternative: You can also try running:
echo   npx vite
echo.
pause
goto :end

:found
echo Found Node.js at: %NODE_PATH%
echo Found NPM at: %NPM_PATH%
echo.
echo Installing dependencies...
"%NPM_PATH%" install

echo.
echo Starting development server...
"%NPM_PATH%" run dev

:end
echo.
echo Server setup complete.
pause
