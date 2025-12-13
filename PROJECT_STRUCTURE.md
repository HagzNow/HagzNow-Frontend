# 📁 AI Booking Assistant - Project Structure

## Overview

This document explains the complete project structure for the AI-powered booking assistant.

## Directory Structure

```
HagzNow-Frontend/
│
├── ai-booking-backend/              # AI Backend Service
│   ├── server.js                    # Main Express server with OpenAI integration
│   ├── package.json                 # Backend dependencies
│   ├── env.example                  # Environment variables template
│   ├── .gitignore                   # Git ignore rules
│   └── README.md                    # Backend documentation
│
├── src/
│   ├── components/
│   │   ├── ChatWidget/              # AI Chat Widget Component
│   │   │   ├── ChatWidget.jsx       # Main chat component
│   │   │   └── ChatWidget.css       # Chat widget styles
│   │   │
│   │   └── Layout/
│   │       └── Layout.jsx           # Updated with ChatWidget integration
│   │
│   ├── services/
│   │   ├── aiBookingService.js      # AI API communication service
│   │   ├── arenaService.js          # Existing arena service
│   │   ├── categoryService.js       # Existing category service
│   │   └── reservationService.js    # Existing reservation service
│   │
│   └── Contexts/
│       └── AuthContext.jsx          # Authentication context (used by ChatWidget)
│
├── env-example.txt                  # Frontend environment template
├── QUICK_START.md                   # Quick setup guide
├── AI_BOOKING_SETUP.md              # Comprehensive setup documentation
├── PROJECT_STRUCTURE.md             # This file
├── RAG_SYSTEM_DOCUMENTATION.md      # RAG system reference
├── install-ai-booking.sh            # Unix/Linux/Mac installer
└── install-ai-booking.bat           # Windows installer
```

## Component Breakdown

### 🤖 AI Backend (`ai-booking-backend/`)

**Purpose:** Standalone Express server that handles AI conversations and proxies requests to the main HagzNow API.

**Key Files:**

#### `server.js`
- **Main server file** with OpenAI integration
- **Function calling** implementation for dynamic API access
- **Tool definitions** for categories, arenas, slots, wallet, booking
- **Conversation management** with in-memory storage
- **CORS configuration** for frontend access

**Key Features:**
- OpenAI GPT-4o-mini integration
- Function calling for real-time data
- JWT token forwarding
- Error handling
- Conversation history (last 30 messages)

#### `package.json`
Dependencies:
- `express` - Web server
- `cors` - Cross-origin requests
- `dotenv` - Environment variables
- `openai` - OpenAI SDK
- `axios` - HTTP client

### 🎨 Frontend Components

#### `ChatWidget.jsx`
**Location:** `src/components/ChatWidget/ChatWidget.jsx`

**Purpose:** Beautiful, responsive chat interface for users.

**Features:**
- Auto-greeting on open
- Message history display
- Loading states
- Error handling
- Conversation reset
- Mobile responsive
- Dark mode support

**Key Functions:**
```javascript
handleSendMessage()    // Send user message to AI
handleReset()          // Reset conversation
scrollToBottom()       // Auto-scroll to latest message
```

**State Management:**
- `messages` - Chat history
- `inputMessage` - Current input
- `isLoading` - Loading state
- `isOpen` - Widget visibility
- `conversationId` - Unique conversation ID

#### `ChatWidget.css`
**Location:** `src/components/ChatWidget/ChatWidget.css`

**Styling Features:**
- Gradient purple theme
- Smooth animations
- Responsive design
- Dark mode support
- Custom scrollbar
- Hover effects

### 🔧 Services

#### `aiBookingService.js`
**Location:** `src/services/aiBookingService.js`

**Purpose:** API communication layer for AI backend.

**Functions:**

```javascript
chatWithAI(message, conversationId, token)
// Send message to AI, returns AI response

resetConversation(conversationId)
// Clear conversation history

checkAIServiceHealth()
// Verify AI backend is running
```

### 🔄 Integration Points

#### `Layout.jsx` (Updated)
**Location:** `src/components/Layout/Layout.jsx`

**Changes:**
- Import `ChatWidget` component
- Conditionally render for users only (not owners/admins)
- Positioned at bottom-right of screen

```jsx
{user?.role === 'user' && <ChatWidget />}
```

#### `AuthContext.jsx` (Existing)
**Location:** `src/Contexts/AuthContext.jsx`

**Used by ChatWidget for:**
- JWT token access
- User information
- Authentication state

## Data Flow

### Booking Conversation Flow

```
1. User opens chat widget
   └─> ChatWidget.jsx

2. User sends message
   └─> aiBookingService.chatWithAI()

3. Request sent to AI backend
   └─> POST http://localhost:3001/api/chat
       Body: { message, conversationId, token }

4. AI Backend processes
   └─> OpenAI analyzes message
   └─> Decides which tools to call
   └─> Executes tool functions:
       ├─> fetch_categories()
       ├─> fetch_arenas(categoryId)
       ├─> fetch_available_slots(arenaId, date)
       ├─> check_wallet_balance()
       └─> make_booking(arenaId, date, slots, extras)

5. Tool functions call HagzNow API
   └─> axios request with JWT token
   └─> GET/POST http://localhost:3000/...

6. HagzNow API responds
   └─> Returns data (categories, arenas, slots, etc.)

7. AI processes data
   └─> Formats response for user
   └─> Returns natural language answer

8. Response flows back
   └─> AI Backend → Frontend → ChatWidget
   └─> Displayed in chat interface
```

### Authentication Flow

```
User Login
   └─> JWT token stored in localStorage
   └─> AuthContext provides token
   └─> ChatWidget accesses token via useContext
   └─> Token sent with every AI request
   └─> AI Backend forwards token to HagzNow API
   └─> HagzNow API validates token
```

## API Endpoints

### AI Backend Endpoints

#### POST `/api/chat`
**Purpose:** Send message to AI assistant

**Request:**
```json
{
  "message": "I want to book a football field",
  "conversationId": "conv-user123",
  "token": "eyJhbGc..."
}
```

**Response:**
```json
{
  "message": "Great! I found 5 football arenas...",
  "conversationId": "conv-user123"
}
```

#### POST `/api/chat/reset`
**Purpose:** Reset conversation history

**Request:**
```json
{
  "conversationId": "conv-user123"
}
```

**Response:**
```json
{
  "message": "Conversation reset"
}
```

#### GET `/health`
**Purpose:** Health check

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-12-13T..."
}
```

### HagzNow API Endpoints (Used by AI)

#### GET `/categories`
Fetch all sports categories

#### GET `/arenas/detailed`
Fetch arenas by category (with body: `{categoryId}`)

#### GET `/arenas/:arenaId/slots/available?date=YYYY-MM-DD`
Get available time slots

#### GET `/wallet/balance`
Check user wallet balance

#### POST `/reservations/`
Create a booking

## Environment Variables

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:3000        # Main backend
VITE_AI_API_URL=http://localhost:3001     # AI backend
```

### AI Backend (`ai-booking-backend/.env`)
```env
OPENAI_API_KEY=sk-...                     # OpenAI API key
OPENAI_MODEL=gpt-4o-mini                  # AI model
PORT=3001                                 # Server port
BACKEND_API_URL=http://localhost:3000     # HagzNow API
CORS_ORIGIN=http://localhost:5173         # Frontend URL
```

## Key Technologies

### Backend
- **Express.js** - Web framework
- **OpenAI SDK** - AI integration
- **Axios** - HTTP client
- **CORS** - Cross-origin support
- **dotenv** - Environment config

### Frontend
- **React 19** - UI framework
- **Lucide React** - Icons
- **Axios** - HTTP client
- **CSS3** - Styling with animations

### AI
- **GPT-4o-mini** - Language model
- **Function Calling** - Dynamic API access
- **Conversation Memory** - Context retention

## Security Considerations

### Token Handling
- JWT tokens never exposed in frontend code
- Tokens sent via Authorization headers
- AI backend forwards tokens securely
- No token storage in AI backend

### API Keys
- OpenAI key stored in `.env` (never committed)
- Environment variables for all secrets
- `.gitignore` configured properly

### CORS
- Restricted to specific origins
- Configurable via environment variables

## Performance

### Response Times
- **Average:** 2-5 seconds per message
- **Factors:**
  - OpenAI API latency
  - Number of tool calls
  - Backend API response time

### Optimization
- Conversation history limited to 30 messages
- Recent context limited to 20 messages
- Simplified arena data for AI processing

### Costs
- **GPT-4o-mini:** ~$0.001-0.002 per booking
- Very cost-effective for production use

## Deployment Considerations

### Production Checklist
- [ ] Set production environment variables
- [ ] Use HTTPS for all endpoints
- [ ] Set up reverse proxy (Nginx)
- [ ] Configure rate limiting
- [ ] Set OpenAI spending limits
- [ ] Enable error logging
- [ ] Set up monitoring
- [ ] Test on mobile devices

### Scaling
- AI backend is stateless (except in-memory conversations)
- Can use Redis for conversation storage
- Can deploy multiple AI backend instances
- Load balancer for high traffic

## Testing

### Manual Testing
1. Start both backends
2. Login as user
3. Open chat widget
4. Test conversation flow
5. Verify booking completion

### Test Scenarios
- Category selection
- Arena filtering
- Date/time selection
- Wallet balance check
- Booking creation
- Error handling
- Conversation reset

## Troubleshooting

### Common Issues

**Chat button not visible:**
- Check user role (must be 'user')
- Verify Layout.jsx integration
- Check browser console

**Connection errors:**
- Verify AI backend is running
- Check environment variables
- Test health endpoint

**OpenAI errors:**
- Verify API key
- Check account credits
- Review model access

**Booking fails:**
- Check JWT token validity
- Verify backend API is running
- Review API endpoint responses

## Future Enhancements

### Potential Features
- [ ] Voice input support
- [ ] Multi-language UI
- [ ] Booking history in chat
- [ ] Arena recommendations
- [ ] Price comparison
- [ ] Calendar integration
- [ ] Push notifications
- [ ] Conversation export
- [ ] Analytics dashboard
- [ ] Custom AI personality per user

### Technical Improvements
- [ ] Redis for conversation storage
- [ ] WebSocket for real-time updates
- [ ] Streaming responses
- [ ] Caching frequently asked questions
- [ ] A/B testing different prompts
- [ ] User feedback collection
- [ ] Response quality metrics

## Documentation Files

1. **QUICK_START.md** - 5-minute setup guide
2. **AI_BOOKING_SETUP.md** - Comprehensive documentation
3. **PROJECT_STRUCTURE.md** - This file
4. **RAG_SYSTEM_DOCUMENTATION.md** - RAG system reference

## Support

For issues or questions:
1. Check documentation files
2. Review code comments
3. Test each component separately
4. Check logs for errors

## License

Part of HagzNow project.

---

**Last Updated:** December 13, 2025
**Version:** 1.0.0

