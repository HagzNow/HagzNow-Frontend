# PWA Setup Documentation

This project is configured as a Progressive Web App (PWA) with full offline support.

## Features

✅ **Offline Support** - App works offline with cached resources
✅ **Install Prompt** - Users can install the app on their devices
✅ **Service Worker** - Handles caching and offline functionality
✅ **App Manifest** - Defines app metadata and icons
✅ **Responsive Design** - Works on all device sizes

## Files Structure

```
public/
  ├── manifest.json          # PWA manifest file
  ├── sw.js                  # Service worker
  ├── browserconfig.xml      # Windows tile configuration
  └── logoTitle.png          # App icon

src/
  ├── utils/
  │   └── serviceWorkerRegistration.js  # SW registration utility
  └── components/
      └── PWAInstallPrompt/
          └── PWAInstallPrompt.jsx      # Install prompt component
```

## Service Worker Strategy

- **Static Assets**: Cache-first strategy
- **API Requests**: Network-first strategy
- **Navigation**: Network-first with cache fallback
- **Images/Fonts**: Cache-first strategy

## Updating the Cache

When you need to update the cached content:

1. Update the `CACHE_NAME` version in `public/sw.js`
2. The service worker will automatically update on next visit
3. Users will see a notification to refresh

Example:

```javascript
const CACHE_NAME = 'hagznow-v2'; // Increment version
```

## Testing PWA

### Development

```bash
npm run dev
```

- Service worker works in development
- Test install prompt in Chrome DevTools

### Production

```bash
npm run build
npm run preview
```

- Full PWA features available
- Test install on mobile devices

## Browser Support

- ✅ Chrome/Edge (Full support)
- ✅ Firefox (Full support)
- ✅ Safari iOS 11.3+ (Limited - no install prompt)
- ✅ Samsung Internet (Full support)

## Install Prompt

The install prompt appears automatically when:

- User visits the site on a supported browser
- App is not already installed
- User hasn't dismissed the prompt in the last 24 hours

## Offline Functionality

The app caches:

- Static assets (HTML, CSS, JS)
- Images and fonts
- API responses (with network-first strategy)
- Main pages for offline navigation

## Manifest Configuration

The `manifest.json` includes:

- App name and description
- Icons for different sizes
- Theme colors
- Display mode (standalone)
- Shortcuts for quick access

## Notes

- Service worker only works over HTTPS (or localhost)
- Update cache version when deploying new versions
- Test offline functionality after each deployment
