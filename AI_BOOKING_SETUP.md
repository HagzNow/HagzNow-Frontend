# 🤖 AI Booking Assistant Setup Guide

This guide will help you set up the AI-powered booking assistant for HagzNow.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Backend Setup](#backend-setup)
3. [Frontend Configuration](#frontend-configuration)
4. [Testing](#testing)
5. [Features](#features)
6. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

### Required:

- **Node.js** v18 or higher
- **OpenAI API Key** - Get one from [OpenAI Platform](https://platform.openai.com/api-keys)
- **Running Backend API** - Your HagzNow backend should be running on `localhost:3000`

### Recommended:

- **GPT-4o-mini model access** (default, cost-effective)
- Stable internet connection for OpenAI API calls

---

## 🚀 Backend Setup

### Step 1: Navigate to AI Backend Directory

```bash
cd ai-booking-backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:

- `express` - Web server framework
- `cors` - Enable cross-origin requests
- `dotenv` - Environment variable management
- `openai` - OpenAI SDK
- `axios` - HTTP client for API requests

### Step 3: Create Environment File

Create a `.env` file in the `ai-booking-backend` directory:

```bash
# Copy the example file
cp env.example .env

# Or create manually
nano .env
```

Add the following configuration:

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
OPENAI_MODEL=gpt-4o-mini

# Server Configuration
PORT=3001

# Backend API URL (Your HagzNow API)
BACKEND_API_URL=https://api.hagznow.com

# Frontend CORS Origin
CORS_ORIGIN=http://localhost:5173
```

### Step 4: Start the AI Backend

```bash
# Development mode (with auto-reload)
npm run dev

# Or production mode
npm start
```

You should see:

```
🤖 AI Booking Assistant running on port 3001
📡 Backend API: https://api.hagznow.com
```

### Step 5: Verify Backend is Running

Open another terminal and test:

```bash
curl http://localhost:3001/health
```

Expected response:

```json
{
  "status": "ok",
  "timestamp": "2025-12-13T..."
}
```

---

## 🎨 Frontend Configuration

### Step 1: Navigate to Frontend Root

```bash
cd ..  # Back to HagzNow-Frontend
```

### Step 2: Update Environment Variables

Create or update `.env` file:

```env
# Backend API URL
VITE_API_URL=https://api.hagznow.com

# AI Booking Assistant API URL
VITE_AI_API_URL=http://localhost:3001
```

### Step 3: No Additional Installation Required!

The chat widget is already integrated. Dependencies are already in your `package.json`:

- `axios` ✅
- `lucide-react` ✅
- React Router ✅

### Step 4: Start Frontend (if not running)

```bash
npm run dev
```

---

## 🧪 Testing

### 1. Backend Health Check

```bash
# Test AI backend
curl http://localhost:3001/health

# Test main backend
curl https://api.hagznow.com/categories
```

### 2. Frontend Testing

1. **Navigate to the app**: `http://localhost:5173`
2. **Login as a user** (not owner or admin)
3. **Look for the chat button** in the bottom-right corner (purple gradient button with "AI" badge)
4. **Click to open** the chat widget

### 3. Test Conversation Flow

Try these messages:

```
1. "مرحباً" or "Hello"
   → Should greet you and ask what sport you want

2. "أريد حجز ملعب كرة قدم" or "I want to book a football field"
   → Should fetch and show football arenas

3. "أريد ملعب في الزمالك" or "Show me arenas in Zamalek"
   → Should filter by location

4. "كم سعر Camp nou؟" or "What's the price of Camp nou?"
   → Should tell you the price per hour

5. "أريد الحجز يوم 2025-12-14" or "I want to book on 2025-12-14"
   → Should ask which arena

6. "Camp nou"
   → Should check available slots

7. "من الساعة 9 إلى 12" or "From 9 AM to 12 PM"
   → Should calculate price

8. "نعم احجز" or "Yes, book it"
   → Should complete the booking
```

---

## ✨ Features

### What the AI Assistant Can Do:

1. **🔍 Smart Arena Discovery**

   - Ask about any sport
   - Filter by location, price, rating
   - Show arena details (extras, hours, description)

2. **📅 Availability Checking**

   - Check available slots for any date
   - Show opening/closing hours
   - Suggest alternative times

3. **💰 Price Calculation**

   - Calculate total cost (hours + extras)
   - Check wallet balance
   - Warn if insufficient funds

4. **🎯 Intelligent Booking**

   - Guide through booking steps
   - Add extras (water, equipment, etc.)
   - Confirm reservation automatically

5. **💬 Natural Conversation**
   - Understands Arabic and English
   - Remembers conversation context
   - Asks clarifying questions

### Chat Widget Features:

- **🎨 Beautiful UI** - Modern gradient design
- **📱 Responsive** - Works on mobile and desktop
- **🌙 Dark Mode Support** - Adapts to system preferences
- **⚡ Real-time** - Instant responses
- **🔄 Reset Conversation** - Start fresh anytime
- **💾 Conversation Memory** - Remembers your preferences

---

## 🔒 Security Notes

### ⚠️ Important:

1. **NEVER commit `.env` files** - They contain API keys
2. **Keep your OpenAI API key secret**
3. **Use environment variables** for all sensitive data
4. **JWT tokens are sent securely** - Always via headers

### Best Practices:

```bash
# Add to .gitignore (already done)
.env
.env.local
.env.production

# Rotate API keys regularly
# Monitor OpenAI usage dashboard
# Set spending limits on OpenAI account
```

---

## 🐛 Troubleshooting

### Problem: Chat button doesn't appear

**Solutions:**

- ✅ Make sure you're logged in as a **user** (not owner/admin)
- ✅ Check browser console for errors
- ✅ Verify you're on a page with the `Layout` component

### Problem: "فشل الاتصال بمساعد الحجز الذكي"

**Solutions:**

- ✅ Check if AI backend is running: `curl http://localhost:3001/health`
- ✅ Verify `VITE_AI_API_URL` in frontend `.env`
- ✅ Check CORS settings in backend

### Problem: AI responds with "Unknown tool" error

**Solutions:**

- ✅ Verify main backend is running on `localhost:3000`
- ✅ Check `BACKEND_API_URL` in AI backend `.env`
- ✅ Test backend endpoints manually with curl

### Problem: "Invalid authentication token"

**Solutions:**

- ✅ Make sure you're logged in
- ✅ Check if JWT token exists: `localStorage.getItem('token')`
- ✅ Try logging out and logging back in

### Problem: OpenAI API errors

**Solutions:**

- ✅ Verify API key is correct
- ✅ Check OpenAI account has credits
- ✅ Ensure you have access to `gpt-4o-mini` model
- ✅ Check OpenAI status page

### Problem: Slow responses

**Solutions:**

- ✅ Normal - AI processing takes 2-5 seconds
- ✅ Check internet connection
- ✅ Try switching to `gpt-3.5-turbo` (faster, less accurate)

---

## 💡 Customization

### Change AI Personality

Edit `ai-booking-backend/server.js`:

```javascript
const SYSTEM_INSTRUCTIONS = `You are a friendly and helpful booking assistant...
// Modify this to change behavior
`;
```

### Adjust Response Speed

Change model in `.env`:

```env
# Faster but less capable
OPENAI_MODEL=gpt-3.5-turbo

# Default (recommended)
OPENAI_MODEL=gpt-4o-mini

# More capable but slower/expensive
OPENAI_MODEL=gpt-4
```

### Customize Widget Appearance

Edit `src/components/ChatWidget/ChatWidget.css`:

```css
/* Change colors */
.chat-widget-toggle {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* Change to your brand colors */
}
```

### Add More Tools/Functions

Add to `tools` array in `server.js`:

```javascript
{
  type: 'function',
  function: {
    name: 'your_custom_function',
    description: 'What it does',
    parameters: { /* define parameters */ }
  }
}
```

---

## 📊 Monitoring

### Check Logs

```bash
# AI Backend logs
cd ai-booking-backend
npm run dev

# Watch for:
# - Tool executions
# - API calls
# - Errors
```

### OpenAI Usage

Monitor at: https://platform.openai.com/usage

**Average costs (gpt-4o-mini):**

- Input: ~$0.00015 per conversation turn
- Output: ~$0.0006 per conversation turn
- **Total: ~$0.001-0.002 per booking**

---

## 🚀 Production Deployment

### Backend Deployment

1. **Environment Variables:**

```env
NODE_ENV=production
OPENAI_API_KEY=your-key
BACKEND_API_URL=https://api.hagznow.com
CORS_ORIGIN=https://hagznow.com
PORT=3001
```

2. **Process Manager:**

```bash
# Using PM2
npm install -g pm2
pm2 start server.js --name ai-booking
pm2 save
```

3. **Reverse Proxy (Nginx):**

```nginx
location /ai/ {
    proxy_pass http://localhost:3001/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
}
```

### Frontend Deployment

Update `.env.production`:

```env
VITE_AI_API_URL=https://api.hagznow.com/ai
```

---

## 📚 API Reference

### POST /api/chat

Send message to AI assistant.

**Request:**

```json
{
  "message": "I want to book a football field",
  "conversationId": "user-123",
  "token": "eyJhbGc..."
}
```

**Response:**

```json
{
  "message": "Great! I found 5 football arenas...",
  "conversationId": "user-123"
}
```

### POST /api/chat/reset

Reset conversation history.

**Request:**

```json
{
  "conversationId": "user-123"
}
```

---

## 🎓 How It Works

### Architecture:

```
User Message
    ↓
Frontend ChatWidget
    ↓
AI Backend (Express)
    ↓
OpenAI GPT-4o-mini
    ↓
Function Calls (fetch categories, arenas, slots)
    ↓
HagzNow Backend API
    ↓
Response → AI → Frontend → User
```

### Function Calling:

The AI automatically decides when to:

1. Fetch categories
2. Get arenas for a sport
3. Check available slots
4. Verify wallet balance
5. Make booking

No hardcoded logic - fully dynamic! 🎉

---

## 🤝 Support

### Need Help?

1. Check logs for errors
2. Test each component separately
3. Verify all environment variables
4. Check OpenAI API status

### Common Issues:

| Issue            | Solution                           |
| ---------------- | ---------------------------------- |
| CORS errors      | Update `CORS_ORIGIN` in AI backend |
| 401 Unauthorized | Check JWT token                    |
| 500 Server Error | Check backend logs                 |
| Slow responses   | Normal for AI, 2-5 seconds         |

---

## ✅ Checklist

Before going live:

- [ ] OpenAI API key is valid
- [ ] Backend health check passes
- [ ] Frontend can connect to AI backend
- [ ] Test full booking flow
- [ ] Set OpenAI spending limits
- [ ] Monitor logs for errors
- [ ] Test on mobile devices
- [ ] Review AI responses quality

---

## 🎉 Success!

If everything works:

1. Users can chat naturally to book arenas
2. AI handles complex queries
3. Booking process is automated
4. No manual intervention needed!

Enjoy your AI-powered booking assistant! 🚀

---

## 📝 License & Credits

Built with:

- OpenAI GPT-4o-mini
- React
- Express.js
- Love and ☕
