@echo off
REM AI Booking Assistant - Installation Script
REM For Windows

echo.
echo 🤖 Installing AI Booking Assistant...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    exit /b 1
)

echo ✅ Node.js found
node --version
echo.

REM Step 1: Backend Setup
echo 📦 Step 1: Setting up AI Backend...
cd ai-booking-backend

if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
    echo ✅ Backend dependencies installed
) else (
    echo ℹ️  Backend dependencies already installed
)

REM Create .env if it doesn't exist
if not exist ".env" (
    echo.
    echo ⚠️  Creating .env file...
    set /p OPENAI_KEY="Please enter your OpenAI API Key: "
    
    (
        echo OPENAI_API_KEY=%OPENAI_KEY%
        echo OPENAI_MODEL=gpt-4o-mini
        echo PORT=3001
        echo BACKEND_API_URL=https://api.hagznow.com
        echo CORS_ORIGIN=http://localhost:5173
    ) > .env
    
    echo ✅ Backend .env created
) else (
    echo ℹ️  Backend .env already exists
)

cd ..

REM Step 2: Frontend Setup
echo.
echo 🎨 Step 2: Configuring Frontend...

if not exist ".env" (
    (
        echo VITE_API_URL=https://api.hagznow.com
        echo VITE_AI_API_URL=http://localhost:3001
    ) > .env
    echo ✅ Frontend .env created
) else (
    findstr /C:"VITE_AI_API_URL" .env >nul
    if %ERRORLEVEL% NEQ 0 (
        echo VITE_AI_API_URL=http://localhost:3001 >> .env
        echo ✅ Added VITE_AI_API_URL to frontend .env
    ) else (
        echo ℹ️  Frontend .env already configured
    )
)

REM Summary
echo.
echo ═══════════════════════════════════════════════════════════
echo ✨ Installation Complete!
echo ═══════════════════════════════════════════════════════════
echo.
echo 📝 Next Steps:
echo.
echo 1. Start the AI Backend:
echo    cd ai-booking-backend ^&^& npm run dev
echo.
echo 2. In another terminal, start the Frontend:
echo    npm run dev
echo.
echo 3. Open http://localhost:5173 and login as a user
echo.
echo 4. Look for the purple chat button in the bottom-right! 💬
echo.
echo ═══════════════════════════════════════════════════════════
echo.
echo 📚 Documentation:
echo    - Quick Start: QUICK_START.md
echo    - Full Guide:  AI_BOOKING_SETUP.md
echo.
echo 🎉 Happy booking!
echo.

pause

