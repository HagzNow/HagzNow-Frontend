# 🏟️ HagzNow - Sports Arena Booking Platform

> **A comprehensive sports arena booking platform with AI-powered booking assistant, multi-role support, and modern UI/UX**

[![React](https://img.shields.io/badge/React-19.1.1-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.14-38B2AC)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991)](https://openai.com/)
[![Material-UI](https://img.shields.io/badge/MUI-7.3.4-007FFF)](https://mui.com/)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Architecture](#-architecture)
- [User Roles](#-user-roles)
- [API Integration](#-api-integration)
- [AI Booking Assistant](#-ai-booking-assistant)
- [Internationalization](#-internationalization)
- [Theming](#-theming)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**HagzNow** is a full-featured sports arena booking platform that enables users to discover, book, and manage sports facility reservations. The platform supports multiple user roles (Users, Owners, Admins) and includes an innovative AI-powered booking assistant that allows natural language booking conversations.

### Key Highlights

- 🎨 **Modern UI/UX** - Beautiful, responsive design with dark mode support
- 🤖 **AI Booking Assistant** - Natural language booking with GPT-4o-mini
- 🌍 **Bilingual Support** - Arabic and English interface
- 👥 **Multi-Role System** - Separate dashboards for Users, Owners, and Admins
- 💰 **Wallet System** - Integrated payment and wallet management
- 📱 **Mobile Responsive** - Optimized for all device sizes
- 🗺️ **Interactive Maps** - Location-based arena discovery
- 📊 **Analytics Dashboard** - Comprehensive statistics for owners and admins

---

## ✨ Features

### For Users 👤

- Browse and search arenas by category, location, and price
- View detailed arena information with images, reviews, and maps
- Book time slots with date and time selection
- Add extras (equipment, services) to bookings
- Manage reservations (view, cancel, filter)
- Wallet management (add funds, view transactions)
- User profile management
- AI-powered conversational booking

### For Owners 🏢

- Arena management (add, edit, view arenas)
- Reservation management and approval
- Manual booking creation
- Revenue and statistics dashboard
- Wallet management (withdrawals, transactions)
- Arena analytics and insights

### For Admins 👨‍💼

- User management
- Arena approval/rejection system
- Category management
- Withdrawal request management
- System-wide analytics
- Settings and configuration

### AI Features 🤖

- Natural language booking conversations
- Smart arena search and recommendations
- Real-time availability checking
- Automatic price calculation
- Wallet balance verification
- Bilingual conversation support (Arabic/English)

---

## 🛠️ Technology Stack

### Frontend Core

- **React 19.1.1** - Modern UI library
- **Vite 7.1.7** - Fast build tool and dev server
- **React Router DOM 7.9.4** - Client-side routing
- **React Context API** - State management

### UI & Styling

- **Tailwind CSS 4.1.14** - Utility-first CSS framework
- **Material-UI (MUI) 7.3.4** - React component library
- **Radix UI** - Accessible component primitives
  - `@radix-ui/react-dialog`
  - `@radix-ui/react-select`
  - `@radix-ui/react-switch`
- **Lucide React 0.548.0** - Icon library
- **React Icons 5.5.0** - Additional icons
- **Heroicons 2.2.0** - SVG icons
- **Swiper 12.0.3** - Touch slider
- **React Loading Skeleton 3.5.0** - Loading placeholders

### Forms & Validation

- **Formik 2.4.6** - Form management
- **Yup 1.7.1** - Schema validation
- **React Phone Input 2** - Phone number input

### Date & Time

- **Day.js 1.11.18** - Date manipulation
- **date-fns 4.1.0** - Date utilities
- **MUI X Date Pickers 8.15.0** - Date selection components

### Maps & Location

- **Leaflet 1.9.4** - Interactive maps
- **React Leaflet 5.0.0** - React bindings for Leaflet

### Internationalization

- **i18next 25.6.0** - Internationalization framework
- **react-i18next 16.1.4** - React bindings for i18next
- **i18next-browser-languagedetector 8.2.0** - Language detection
- **i18next-http-backend 3.0.2** - Translation loading

### HTTP & API

- **Axios 1.12.2** - HTTP client
- **JWT Decode 4.0.0** - JWT token parsing

### Notifications & UI Feedback

- **React Hot Toast 2.6.0** - Toast notifications
- **SweetAlert2 11.26.4** - Beautiful alerts

### AI Integration

- **OpenAI GPT-4o-mini** - AI language model (via backend)
- Custom AI booking service

### Utilities

- **clsx 2.1.1** - Conditional classnames
- **tailwind-merge 3.3.1** - Tailwind class merging
- **class-variance-authority 0.7.1** - Component variants
- **Emotion** - CSS-in-JS library (used by MUI)

### Development Tools

- **ESLint 9.36.0** - Code linting
- **Vite React Plugin 5.0.4** - React support for Vite
- **TypeScript Types** - Type definitions for React

---

## 📁 Project Structure

```
HagzNow-Frontend/
│
├── public/                          # Static assets
│   ├── locales/                    # Translation files
│   │   ├── ar/translation.json     # Arabic translations
│   │   └── en/translation.json     # English translations
│   └── [images, logos, etc.]
│
├── src/
│   ├── apis/                       # API configuration
│   │   └── config.js               # Axios base configuration
│   │
│   ├── assets/                     # Static assets (images, etc.)
│   │   └── [images, icons, etc.]
│   │
│   ├── components/                 # Reusable React components
│   │   ├── AdminComponents/        # Admin-specific components
│   │   │   ├── AdminArenaCard/
│   │   │   ├── AdminArenaFilter/
│   │   │   └── AdminArenasReqsList/
│   │   │
│   │   ├── AdminLayout/            # Admin layout components
│   │   │
│   │   ├── ArenaCard/              # Arena display card
│   │   │
│   │   ├── BookingStepper/         # Booking step indicator
│   │   │
│   │   ├── ChatWidget/             # AI chat widget
│   │   │   ├── ChatWidget.jsx
│   │   │   └── ChatWidget.css
│   │   │
│   │   ├── ConfirmDialog/          # Confirmation dialogs
│   │   │
│   │   ├── ImageUpload/            # Image upload component
│   │   │
│   │   ├── LanguageSelector/       # Language switcher
│   │   │
│   │   ├── Layout/                 # Main layout component
│   │   │   └── Layout.jsx
│   │   │
│   │   ├── Loader/                 # Loading spinner
│   │   │
│   │   ├── OwnerComponents/        # Owner-specific components
│   │   │   └── [18 owner components]
│   │   │
│   │   ├── Pagination/             # Pagination component
│   │   │
│   │   ├── Reservation/            # Reservation components
│   │   │
│   │   ├── Sidebar.jsx             # Sidebar navigation
│   │   │
│   │   ├── Stats.jsx               # Statistics display
│   │   │
│   │   ├── Steps/                  # Multi-step form components
│   │   │   ├── DateSelector.jsx
│   │   │   ├── ReservationStep.jsx
│   │   │   └── TimeSlots.jsx
│   │   │
│   │   ├── Toast/                  # Toast notification component
│   │   │
│   │   ├── ui/                     # Reusable UI components
│   │   │   └── [5 UI components]
│   │   │
│   │   ├── UserAllReservationsList/ # User reservations list
│   │   │
│   │   ├── UserArenaFilter/        # Arena filtering component
│   │   │
│   │   ├── UserArenasList/         # Arena listing component
│   │   │
│   │   ├── UserProfile/            # User profile components
│   │   │   ├── LanguageSwitcher.jsx
│   │   │   ├── ProfileForm.jsx
│   │   │   ├── ProfileHeader.jsx
│   │   │   ├── ProfilePasswordForm.jsx
│   │   │   └── ProfilePicture.jsx
│   │   │
│   │   ├── UserReservationFilter/  # Reservation filtering
│   │   │
│   │   ├── UserReservationsCard/   # Reservation card component
│   │   │
│   │   └── Wallet/                 # Wallet components
│   │       ├── AddFundsModal.jsx
│   │       ├── PaymentResultModal.jsx
│   │       ├── TransactionItem.jsx
│   │       └── WithdrawRequestModal.jsx
│   │
│   ├── config/                     # Configuration files
│   │   ├── api.js                  # API endpoints configuration
│   │   └── constants/              # Application constants
│   │       └── reservationStatus.js
│   │
│   ├── Contexts/                   # React Context providers
│   │   ├── AuthContext.jsx         # Authentication context
│   │   ├── ReservationContext.jsx  # Reservation state management
│   │   └── ThemeContext.jsx        # Theme (dark/light mode)
│   │
│   ├── i18n.jsx                    # Internationalization setup
│   │
│   ├── lib/                        # Utility libraries
│   │   └── utils.js                # Helper functions
│   │
│   ├── pages/                      # Page components (routes)
│   │   ├── AdminArenaRequests/     # Admin arena approval page
│   │   ├── AdminDashboard/         # Admin dashboard
│   │   ├── AdminPages/             # Additional admin pages
│   │   │   ├── ArenaMangmentCategories.jsx
│   │   │   ├── UserManagement.jsx
│   │   │   └── WithdrawalRequests.jsx
│   │   │
│   │   ├── BookingArena/           # Arena booking page
│   │   │   ├── BookingArena.jsx
│   │   │   └── components/         # Booking page components
│   │   │       ├── StaduimHeader.jsx
│   │   │       ├── StaduimImages.jsx
│   │   │       ├── StaduimInfo.jsx
│   │   │       ├── StaduimMap.jsx
│   │   │       └── StaduimReviews.jsx
│   │   │
│   │   ├── ConfirmReservation/     # Reservation confirmation
│   │   │
│   │   ├── Extras/                 # Extras selection page
│   │   │
│   │   ├── Home/                   # Homepage
│   │   │
│   │   ├── Login/                  # Login page
│   │   │
│   │   ├── NotFound/               # 404 page
│   │   │
│   │   ├── Owner/                  # Owner pages
│   │   │   ├── AddArenas.jsx       # Add new arena
│   │   │   ├── ManualBooking.jsx   # Manual booking creation
│   │   │   ├── OwnerArenaDetails.jsx
│   │   │   ├── OwnerArenas.jsx     # Owner's arenas list
│   │   │   ├── OwnerDashboard.jsx  # Owner dashboard
│   │   │   └── OwnerReservations.jsx
│   │   │
│   │   ├── Register/               # Registration page
│   │   │   ├── Register.jsx
│   │   │   ├── formConfigs.js      # Form configurations
│   │   │   ├── OwnerFormFields.jsx
│   │   │   ├── UserFormFields.jsx
│   │   │   ├── submitHandlers.js   # Form submission handlers
│   │   │   └── validationSchemas.js # Form validation schemas
│   │   │
│   │   ├── Reservation/            # Reservation page
│   │   │
│   │   ├── ReservationDetails/     # Reservation details view
│   │   │
│   │   ├── ReservationPreview/     # Reservation preview
│   │   │
│   │   ├── ReservationView/        # Reservation view page
│   │   │
│   │   ├── SettingPage/            # Settings page
│   │   │   ├── PendingRequests.jsx
│   │   │   └── SettingsPage.jsx
│   │   │
│   │   ├── UserAllReservation/     # All user reservations
│   │   │
│   │   ├── UserArenas/             # User arena browsing
│   │   │
│   │   ├── UserProfile/            # User profile page
│   │   │
│   │   └── Wallet/                 # Wallet page
│   │       └── Wallet.jsx
│   │
│   ├── Routes/                     # Route configuration
│   │   ├── ProtectedRoute.jsx      # Protected route wrapper
│   │   └── protectedLoginAndRegister.jsx
│   │
│   ├── services/                   # API service layer
│   │   ├── aiBookingService.js     # AI booking API service
│   │   ├── arenaService.js         # Arena API service
│   │   ├── categoryService.js      # Category API service
│   │   └── reservationService.js   # Reservation API service
│   │
│   ├── utils/                      # Utility functions
│   │   ├── handleError.js          # Error handling utilities
│   │   └── timeRange.js            # Time range utilities
│   │
│   ├── App.jsx                     # Main App component
│   └── App.css                     # Global styles
│
├── .env                            # Environment variables (not committed)
├── .env.development                # Development environment
├── .env.production                 # Production environment
├── .gitignore                      # Git ignore rules
├── components.json                 # shadcn/ui components config
├── eslint.config.js                # ESLint configuration
├── index.html                      # HTML entry point
├── jsconfig.json                   # JavaScript/Path configuration
├── package.json                    # Dependencies and scripts
├── tailwind.config.js              # Tailwind CSS configuration
├── vite.config.js                  # Vite configuration
│
└── Documentation/                  # Project documentation
    ├── AI_BOOKING_DEMO.md          # AI booking demo guide
    ├── AI_BOOKING_SETUP.md         # AI booking setup guide
    ├── AI_BOOKING_SUMMARY.md       # AI booking summary
    ├── IMPLEMENTATION_CHECKLIST.md  # Implementation checklist
    ├── PROJECT_STRUCTURE.md         # Detailed structure docs
    ├── QUICK_START.md              # Quick start guide
    ├── README_AI_BOOKING.md        # AI booking README
    └── RAG_SYSTEM_DOCUMENTATION.md  # RAG system docs
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Backend API** running (default: `http://localhost:3000`)
- **AI Backend** (optional, for AI booking feature)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd HagzNow-Frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```env
   VITE_API_URL=http://localhost:3000
   VITE_AI_API_URL=http://localhost:3001
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## 🔧 Environment Variables

### Frontend Environment Variables

Create `.env` file in the root directory:

```env
# Main Backend API URL
VITE_API_URL=http://localhost:3000

# AI Backend API URL (optional, for AI booking feature)
VITE_AI_API_URL=http://localhost:3001
```

### Environment Files

- **`.env`** - Default environment variables
- **`.env.development`** - Development-specific variables
- **`.env.production`** - Production-specific variables

---

## 🏗️ Architecture

### Application Flow

```
User Request
    ↓
React Router (Route Matching)
    ↓
Protected Route (Auth Check)
    ↓
Page Component
    ↓
Service Layer (API Calls)
    ↓
Backend API
    ↓
Response → Context/State Update
    ↓
UI Re-render
```

### State Management

- **React Context API** for global state:

  - `AuthContext` - User authentication and profile
  - `ReservationContext` - Reservation state
  - `ThemeContext` - Dark/light mode

- **Local State** with React hooks for component-specific state

### Routing Structure

```
/                           → Home page
/login                      → Login page
/register                   → Registration page
/user-arena                 → Browse arenas
/booking/:id                → Book arena
/reservation/:id            → Reservation details
/my-bookings                → User reservations
/wallet                     → Wallet management
/userProfile                → User profile

/owner/*                    → Owner routes
  /owner/dashboard          → Owner dashboard
  /owner/add-arena          → Add new arena
  /owner/arenas             → Owner's arenas
  /owner/reservations       → Owner reservations
  /owner/manual-booking     → Manual booking

/admin/*                    → Admin routes
  /admin/dashboard          → Admin dashboard
  /admin/settings           → System settings
  /admin/pending-requests   → Pending requests
  /admin/admin-arena-requests → Arena approvals
  /admin/categoriesmanagment → Category management
  /admin/usermanagment      → User management
  /admin/withdrawal-requests → Withdrawal requests
```

---

## 👥 User Roles

### User Role

- Browse and search arenas
- Make reservations
- Manage own reservations
- Wallet management
- Profile management
- Access to AI booking assistant

### Owner Role

- All user capabilities
- Add and manage arenas
- View and manage arena reservations
- Manual booking creation
- Owner dashboard with analytics
- Wallet management (withdrawals)

### Admin Role

- All owner capabilities
- User management
- Arena approval/rejection
- Category management
- System-wide analytics
- Withdrawal request management
- System settings

---

## 🔌 API Integration

### API Configuration

The application uses a centralized API configuration:

**`src/config/api.js`**

```javascript
export const API_BASE_URL = 'http://localhost:3000';

export const API_ENDPOINTS = {
  ARENAS: '/arenas',
  CATEGORIES: '/categories',
  RESERVATIONS: '/reservations',
  USERS: '/users',
  STATUS: '/status',
};
```

### Service Layer

All API calls are abstracted through service modules:

- **`arenaService.js`** - Arena operations
- **`reservationService.js`** - Reservation operations
- **`categoryService.js`** - Category operations
- **`aiBookingService.js`** - AI booking operations

### Authentication

- JWT tokens stored in `localStorage`
- Tokens automatically included in API requests via Axios interceptors
- Token refresh handled by `AuthContext`

---

## 🤖 AI Booking Assistant

The platform includes an AI-powered booking assistant powered by OpenAI GPT-4o-mini.

### Features

- Natural language booking conversations
- Bilingual support (Arabic/English)
- Real-time arena search and availability
- Automatic price calculation
- Wallet balance checking
- Smart recommendations

### Setup

1. **Install AI Backend** (if not already installed)

   ```bash
   cd ai-booking-backend
   npm install
   ```

2. **Configure AI Backend**

   Create `ai-booking-backend/.env`:

   ```env
   OPENAI_API_KEY=your-openai-api-key
   OPENAI_MODEL=gpt-4o-mini
   PORT=3001
   BACKEND_API_URL=http://localhost:3000
   CORS_ORIGIN=http://localhost:5173
   ```

3. **Start AI Backend**

   ```bash
   cd ai-booking-backend
   npm run dev
   ```

4. **Configure Frontend**

   Ensure `.env` includes:

   ```env
   VITE_AI_API_URL=http://localhost:3001
   ```

### Usage

The AI chat widget appears automatically for users (not owners/admins) in the bottom-right corner of the screen. Users can:

- Click the chat button to open
- Type natural language requests
- Get AI-powered assistance for booking

For detailed documentation, see:

- [AI_BOOKING_SETUP.md](./AI_BOOKING_SETUP.md)
- [QUICK_START.md](./QUICK_START.md)
- [README_AI_BOOKING.md](./README_AI_BOOKING.md)

---

## 🌍 Internationalization

The application supports multiple languages using i18next.

### Supported Languages

- **Arabic (ar)** - Default language
- **English (en)**

### Translation Files

Translations are stored in:

- `public/locales/ar/translation.json`
- `public/locales/en/translation.json`

### Usage in Components

```javascript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button onClick={() => i18n.changeLanguage('ar')}>العربية</button>
    </div>
  );
}
```

### Language Detection

The app automatically detects user's browser language preference and sets the initial language accordingly.

---

## 🎨 Theming

### Dark Mode Support

The application includes full dark mode support with automatic system preference detection.

### Theme Context

```javascript
import { useTheme } from '@/Contexts/ThemeContext';

function MyComponent() {
  const { isDarkMode, toggleTheme } = useTheme();

  return <button onClick={toggleTheme}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</button>;
}
```

### Theme Persistence

- Theme preference saved in `localStorage`
- Automatically syncs with system preference if no user preference is set
- Updates in real-time across all components

---

## 📦 Build & Deployment

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Deployment Options

#### Vercel

```bash
npm install -g vercel
vercel
```

#### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### Traditional Server

1. Build the application:

   ```bash
   npm run build
   ```

2. Serve the `dist/` directory with a web server (Nginx, Apache, etc.)

3. Configure environment variables on the server

### Environment Variables for Production

Update `.env.production`:

```env
VITE_API_URL=https://api.yourdomain.com
VITE_AI_API_URL=https://ai-api.yourdomain.com
```

### Nginx Configuration Example

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy (if needed)
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🧪 Development Guidelines

### Code Style

- Follow ESLint rules (configured in `eslint.config.js`)
- Use functional components with hooks
- Prefer named exports
- Use path aliases (`@/` for `src/`)

### Component Structure

```javascript
// Import statements
import React from 'react';
import { useTranslation } from 'react-i18next';

// Component definition
function MyComponent({ prop1, prop2 }) {
  // Hooks
  const { t } = useTranslation();
  const [state, setState] = React.useState();

  // Event handlers
  const handleClick = () => {
    // Handler logic
  };

  // Render
  return <div>{/* JSX */}</div>;
}

// Export
export default MyComponent;
```

### File Naming

- Components: `PascalCase.jsx`
- Utilities: `camelCase.js`
- Constants: `UPPER_SNAKE_CASE.js`

---

## 🐛 Troubleshooting

### Common Issues

**Port already in use**

```bash
# Kill process on port 5173
npx kill-port 5173
```

**Module not found errors**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**API connection errors**

- Verify backend is running
- Check `VITE_API_URL` in `.env`
- Check CORS configuration on backend

**AI chat not appearing**

- Verify user is logged in as 'user' role
- Check AI backend is running
- Verify `VITE_AI_API_URL` in `.env`

**Translation not working**

- Check translation files exist in `public/locales/`
- Verify i18n configuration in `src/i18n.jsx`

---

## 📚 Additional Documentation

- [AI Booking Setup Guide](./AI_BOOKING_SETUP.md)
- [Quick Start Guide](./QUICK_START.md)
- [Project Structure Details](./PROJECT_STRUCTURE.md)
- [AI Booking Demo](./AI_BOOKING_DEMO.md)
- [Implementation Checklist](./IMPLEMENTATION_CHECKLIST.md)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 📄 License

This project is part of the HagzNow platform. All rights reserved.

---

## 👨‍💻 Authors

HagzNow Development Team

---

## 🙏 Acknowledgments

- OpenAI for GPT-4o-mini
- React team for the amazing framework
- All open-source contributors whose libraries made this project possible

---

## 📞 Support

For support, please:

1. Check the documentation files
2. Review existing issues
3. Create a new issue with detailed information

---

<div align="center">

**Built with ❤️ for the sports community**

[Get Started](#-getting-started) • [Documentation](#-additional-documentation) • [Features](#-features)

</div>
