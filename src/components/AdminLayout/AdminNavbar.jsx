import { useState, useContext, useEffect, useRef } from 'react';
import { Menu, Bell, User, LogOut, Sun, Moon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../Contexts/AuthContext';
import { useTheme } from '../../Contexts/ThemeContext';
import lightLogo from '../../assets/images/lightLogo.png';
import darkLogo from '../../assets/images/darKLogo.png';

export default function AdminNavbar({ onMenuClick, notifCount = 3 }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const menuRef = useRef(null);

  const navigate = useNavigate();
  const { token, setToken, user, setUser } = useContext(authContext);
  console.log(user);
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser?.(null);
    setToken?.(null);
    setDropdownOpen(false);
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    if (!token) navigate('/login', { replace: true });
  }, [token, navigate]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-[60] bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-gray-900/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between gap-3">
          {/* Left Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Burger Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Burger clicked');
                onMenuClick && onMenuClick();
              }}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200 active:scale-95 touch-manipulation"
              aria-label="فتح القائمة"
              type="button"
            >
              <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300 pointer-events-none" />
            </button>

            {/* Logo/Brand */}
            <Link
              to="/"
              className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
            >
              <img
                src={isDarkMode ? darkLogo : lightLogo}
                alt="HagzNow Logo"
                className="h-8 w-auto object-contain transition-all duration-300"
              />
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3 relative" ref={menuRef}>
            {/* Notifications Button */}
            <button
              type="button"
              className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200 active:scale-95 group"
              aria-label="الإشعارات"
              title="الإشعارات"
            >
              <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
              {notifCount > 0 && (
                <span className="absolute top-1.5 end-1.5 w-2 h-2 bg-red-500 dark:bg-red-400 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></span>
              )}
            </button>

            {/* Theme Toggle Switch */}
            <button
              onClick={toggleTheme}
              className="relative inline-flex items-center justify-center p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 active:scale-95"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDarkMode ? 'التبديل إلى الوضع النهاري' : 'التبديل إلى الوضع الليلي'}
            >
              <div className="relative w-12 h-6 flex items-center">
                {/* Toggle Track */}
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-300 ease-in-out ${isDarkMode
                    ? 'bg-gradient-to-r from-gray-600 to-gray-700'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500'
                    }`}
                />
                {/* Toggle Thumb */}
                <div
                  className={`absolute w-5 h-5 bg-white dark:bg-gray-200 rounded-full shadow-lg transform transition-all duration-300 ease-in-out flex items-center justify-center ${isDarkMode ? 'left-[26px]' : 'left-0.5'
                    }`}
                >
                  {isDarkMode ? (
                    <Moon className="w-3 h-3 text-gray-700 dark:text-gray-800" />
                  ) : (
                    <Sun className="w-3 h-3 text-yellow-500" />
                  )}
                </div>
              </div>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-xl ps-2 pe-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200 active:scale-95 group"
                aria-label="الملف الشخصي"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 dark:from-green-600 dark:to-emerald-700 flex items-center justify-center text-white text-sm font-semibold shadow-md group-hover:shadow-lg transition-shadow">
                  {user?.fName ? user.fName[0].toUpperCase() : 'U'}
                </div>
                <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                  {`${user?.fName || 'User'} ${user?.lName || ''}`}
                </span>
                <User className="h-4 w-4 text-gray-600 dark:text-gray-400 sm:hidden" />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-lg dark:shadow-gray-900/50 z-50 transition-colors overflow-hidden">
                  {/* User Info */}
                  <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {`${user?.fName || 'User'} ${user?.lName || ''}`}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                  {/* Logout Button */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                  >
                    <LogOut className="size-4" />
                    تسجيل خروج
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
