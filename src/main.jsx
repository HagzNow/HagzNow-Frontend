import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './i18n.jsx';
import App from './App.jsx';
import './index.css';
import * as serviceWorkerRegistration from './utils/serviceWorkerRegistration';

// Initialize theme before React renders to prevent flash
(function initializeTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (saved === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    // Use system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }
})();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  serviceWorkerRegistration.register({
    onSuccess: () => {
      console.log('[PWA] App is ready for offline use');
    },
    onUpdate: () => {
      console.log('[PWA] New content available, please refresh');
    },
  });
}
