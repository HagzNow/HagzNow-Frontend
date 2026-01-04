#!/bin/bash

# AI Booking Assistant - Installation Script
# For Unix/Linux/Mac

set -e

echo "🤖 Installing AI Booking Assistant..."
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js found: $(node --version)${NC}"
echo ""

# Step 1: Backend Setup
echo "📦 Step 1: Setting up AI Backend..."
cd ai-booking-backend

if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
    echo -e "${GREEN}✅ Backend dependencies installed${NC}"
else
    echo -e "${YELLOW}ℹ️  Backend dependencies already installed${NC}"
fi

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo ""
    echo -e "${YELLOW}⚠️  Creating .env file...${NC}"
    echo "Please enter your OpenAI API key:"
    read -p "OpenAI API Key: " OPENAI_KEY
    
    cat > .env << EOL
OPENAI_API_KEY=${OPENAI_KEY}
OPENAI_MODEL=gpt-4o-mini
PORT=3001
BACKEND_API_URL=https://api.hagznow.com
CORS_ORIGIN=http://localhost:5173
EOL
    
    echo -e "${GREEN}✅ Backend .env created${NC}"
else
    echo -e "${YELLOW}ℹ️  Backend .env already exists${NC}"
fi

cd ..

# Step 2: Frontend Setup
echo ""
echo "🎨 Step 2: Configuring Frontend..."

if [ ! -f ".env" ]; then
    cat > .env << EOL
VITE_API_URL=https://api.hagznow.com
VITE_AI_API_URL=http://localhost:3001
EOL
    echo -e "${GREEN}✅ Frontend .env created${NC}"
else
    # Check if VITE_AI_API_URL exists
    if ! grep -q "VITE_AI_API_URL" .env; then
        echo "VITE_AI_API_URL=http://localhost:3001" >> .env
        echo -e "${GREEN}✅ Added VITE_AI_API_URL to frontend .env${NC}"
    else
        echo -e "${YELLOW}ℹ️  Frontend .env already configured${NC}"
    fi
fi

# Summary
echo ""
echo "═══════════════════════════════════════════════════════════"
echo -e "${GREEN}✨ Installation Complete!${NC}"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "📝 Next Steps:"
echo ""
echo "1. Start the AI Backend:"
echo "   cd ai-booking-backend && npm run dev"
echo ""
echo "2. In another terminal, start the Frontend:"
echo "   npm run dev"
echo ""
echo "3. Open http://localhost:5173 and login as a user"
echo ""
echo "4. Look for the purple chat button in the bottom-right! 💬"
echo ""
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "📚 Documentation:"
echo "   - Quick Start: QUICK_START.md"
echo "   - Full Guide:  AI_BOOKING_SETUP.md"
echo ""
echo "🎉 Happy booking!"
echo ""

