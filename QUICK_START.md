# 🚀 Quick Start - AI Booking Assistant

Get your AI booking assistant running in 5 minutes!

## ⚡ Quick Setup

### 1. Backend Setup (2 minutes)

```bash
# Navigate to AI backend
cd ai-booking-backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOL
OPENAI_API_KEY=your-openai-api-key-here
OPENAI_MODEL=gpt-4o-mini
PORT=3001
BACKEND_API_URL=https://api.hagznow.com
CORS_ORIGIN=http://localhost:5173
EOL

# Start the server
npm run dev
```

**✅ You should see:** `🤖 AI Booking Assistant running on port 3001`

### 2. Frontend Setup (1 minute)

```bash
# Go back to frontend root
cd ..

# Create .env file (if not exists)
cat > .env << EOL
VITE_API_URL=https://api.hagznow.com
VITE_AI_API_URL=http://localhost:3001
EOL

# Start frontend (if not running)
npm run dev
```

### 3. Test It! (1 minute)

1. Open `http://localhost:5173`
2. **Login as a user** (not owner/admin)
3. Look for the **purple chat button** in bottom-right corner
4. Click and say: **"أريد حجز ملعب كرة قدم"**
5. Follow the AI's guidance! 🎉

## 🔑 Get OpenAI API Key

1. Go to: https://platform.openai.com/api-keys
2. Sign up/Login
3. Click "Create new secret key"
4. Copy and paste into `.env` file

**Cost:** ~$0.001-0.002 per booking conversation (very cheap!)

## 🎯 What Can Users Do?

Just chat naturally:

- "أريد ملعب كرة قدم في الزمالك" (I want a football field in Zamalek)
- "Show me arenas under 200 EGP per hour"
- "I want to book Camp nou on December 14"
- "من 9 صباحاً إلى 12 ظهراً" (From 9 AM to 12 PM)
- "Add water and equipment"
- "Check my balance"
- "Complete the booking"

## ⚙️ Architecture

```
User → ChatWidget → AI Backend → OpenAI (GPT-4o-mini)
                        ↓
                   HagzNow API
                   (Categories, Arenas, Slots, Wallet, Booking)
```

## 🐛 Troubleshooting

**Chat button not showing?**

- Make sure you're logged in as a **user** (not owner/admin)

**Connection error?**

- Check AI backend is running: `curl http://localhost:3001/health`
- Check main backend is running: `curl https://api.hagznow.com/categories`

**OpenAI error?**

- Verify API key is correct
- Check you have credits in OpenAI account

## 📚 Full Documentation

For detailed setup, customization, and deployment:

- See [AI_BOOKING_SETUP.md](./AI_BOOKING_SETUP.md)

## 🎉 That's It!

Your AI booking assistant is ready! Users can now book arenas by chatting naturally in Arabic or English.

**Questions?** Check the full setup guide or the code comments.

---

Built with ❤️ using OpenAI GPT-4o-mini
