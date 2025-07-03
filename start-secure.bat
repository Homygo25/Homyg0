@echo off
echo =================================
echo   X-Dash Security Setup Check
echo =================================
echo.

REM Check if .env file exists
if not exist ".env" (
    echo ERROR: .env file not found!
    echo.
    echo Please follow these steps:
    echo 1. Copy .env.example to .env
    echo 2. Update the values in .env with your credentials
    echo 3. Run this script again
    echo.
    echo Commands to run:
    echo   copy .env.example .env
    echo   notepad .env
    echo.
    pause
    exit /b 1
)

echo ✅ .env file found
echo.

REM Check for Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js not found!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js is installed
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
)

echo ✅ Dependencies are installed
echo.

echo =================================
echo   Starting Development Server
echo =================================
echo.
echo Server will start at: http://localhost:5173
echo Admin Panel: http://localhost:5173/admin/login
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the development server
npm run dev
