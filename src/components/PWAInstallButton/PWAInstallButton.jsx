import { useState, useEffect } from 'react';
import { Smartphone, Download } from 'lucide-react';

export default function PWAInstallButton({ className = '', variant = 'button', showAlways = false }) {
  const [pwaInstallPrompt, setPwaInstallPrompt] = useState(null);
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    // Check if already installed
    const checkInstalled = () => {
      const isInstalled =
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone ||
        document.referrer.includes('android-app://');
      setIsPWAInstalled(isInstalled);
      return isInstalled;
    };

    if (checkInstalled()) {
      return;
    }

    const handler = (e) => {
      e.preventDefault();
      setPwaInstallPrompt(e);
      setCanInstall(true);
      console.log('[PWA] Install prompt available');
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check on load
    checkInstalled();

    // For development/testing: check if we're on HTTPS or localhost
    const isSecure = window.location.protocol === 'https:' || window.location.hostname === 'localhost';
    if (isSecure && showAlways) {
      // In development, show button even if prompt hasn't fired yet
      setCanInstall(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, [showAlways]);

  // Handle PWA Install
  const handlePWAInstall = async () => {
    if (pwaInstallPrompt) {
      try {
        pwaInstallPrompt.prompt();
        const { outcome } = await pwaInstallPrompt.userChoice;

        if (outcome === 'accepted') {
          console.log('[PWA] User accepted the install prompt');
          setIsPWAInstalled(true);
        } else {
          console.log('[PWA] User dismissed the install prompt');
        }

        setPwaInstallPrompt(null);
        setCanInstall(false);
      } catch (error) {
        console.error('[PWA] Error showing install prompt:', error);
        // Fallback: show browser's native install instructions
        alert(
          'لتثبيت التطبيق:\n\nChrome/Edge: اضغط على أيقونة التثبيت في شريط العنوان\nSafari iOS: اضغط على Share ثم "Add to Home Screen"',
        );
      }
    } else {
      // Fallback instructions if prompt not available
      const userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.includes('chrome') || userAgent.includes('edge')) {
        alert(
          'لتثبيت التطبيق:\n\n1. ابحث عن أيقونة التثبيت في شريط العنوان (بجانب عنوان الموقع)\n2. اضغط عليها واختر "تثبيت"',
        );
      } else if (userAgent.includes('safari') && userAgent.includes('iphone')) {
        alert('لتثبيت التطبيق:\n\n1. اضغط على زر Share في أسفل الشاشة\n2. اختر "Add to Home Screen"\n3. اضغط "Add"');
      } else if (userAgent.includes('safari') && userAgent.includes('ipad')) {
        alert('لتثبيت التطبيق:\n\n1. اضغط على زر Share في أعلى الشاشة\n2. اختر "Add to Home Screen"\n3. اضغط "Add"');
      } else {
        alert('لتثبيت التطبيق، ابحث عن خيار "تثبيت" أو "Install" في قائمة المتصفح');
      }
    }
  };

  // Don't show if already installed
  if (isPWAInstalled) {
    return null;
  }

  // Show button if prompt available OR if showAlways is true (for testing)
  if (!canInstall && !showAlways) {
    return null;
  }

  if (variant === 'icon') {
    return (
      <button
        onClick={handlePWAInstall}
        className={`inline-flex items-center justify-center p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 text-white hover:from-green-600 hover:to-emerald-600 dark:hover:from-green-700 dark:hover:to-emerald-700 transition-all hover:scale-105 active:scale-95 shadow-sm ${className}`}
        title="تثبيت التطبيق على جهازك"
      >
        <Smartphone className="w-5 h-5" />
      </button>
    );
  }

  // Default styles
  const defaultStyles =
    'inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 text-white hover:from-green-600 hover:to-emerald-600 dark:hover:from-green-700 dark:hover:to-emerald-700 transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm shadow-sm font-medium';

  // If className includes text color or background, use it fully (for CTA customization)
  const hasCustomColors =
    className.includes('text-') &&
    (className.includes('bg-white') || className.includes('bg-gray') || className.includes('bg-green'));

  return (
    <button
      onClick={handlePWAInstall}
      className={
        hasCustomColors
          ? `inline-flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm font-medium ${className}`
          : `${defaultStyles} ${className}`
      }
      title="تثبيت التطبيق على جهازك"
    >
      <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
      <span className="hidden sm:inline whitespace-nowrap">تثبيت التطبيق</span>
    </button>
  );
}
