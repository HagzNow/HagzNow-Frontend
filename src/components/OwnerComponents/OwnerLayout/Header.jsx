import { useState, useContext, useRef, useEffect } from 'react';
import { Menu, Search, Bell, Plus, User as UserIcon, LogOut, Sun, Moon } from 'lucide-react';
import { authContext } from '../../../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../Contexts/ThemeContext';

export default function Header({ onMenuClick, isRTL }) {
  const { user, setToken, setUser } = useContext(authContext); // نضيف setToken و setUser
  const { isDarkMode, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // ✅ handleLogout
  const handleLogout = () => {
    localStorage.removeItem('token'); // فقط احذف التوكن بدل clear الكلي
    setUser(null);
    setToken(null);
    console.log('✅ Logged out successfully!');
  };

  // ✅ useEffect لمراقبة تغيّر حالة المستخدم/التوكن
  useEffect(() => {
    // لو المستخدم اتصفر أو التوكن اتحذف
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  // ✅ إغلاق القائمة عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-gray-900/50 transition-all duration-300 
        ${isRTL ? 'md:mr-8' : 'md:ml-8'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between gap-3">
          {/* Left Section */}
          <div className="flex items-center gap-3 flex-1">
            <button
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200 active:scale-95"
              onClick={onMenuClick}
              aria-label="فتح القائمة"
            >
              <Menu className="size-5 text-gray-700 dark:text-gray-300" />
            </button>

            <div className="relative flex-1 max-w-md">
              <Search className="size-4 absolute top-1/2 -translate-y-1/2 end-3 text-gray-400 dark:text-gray-500 pointer-events-none" />
              <input
                type="text"
                placeholder="ابحث عن ساحات أو حجوزات..."
                className="w-full ps-3 pe-10 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 focus:bg-white dark:focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 transition-all duration-200 text-sm"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3 relative" ref={menuRef}>
            {/* Add Arena Button */}
            <button
              onClick={() => navigate('/owner/add-arena')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 text-white hover:from-green-600 hover:to-emerald-600 dark:hover:from-green-700 dark:hover:to-emerald-700 shadow-md hover:shadow-lg dark:shadow-gray-900/50 transition-all duration-200 transform hover:scale-105 active:scale-95 font-medium text-sm"
            >
              <Plus className="size-4" />
              <span className="hidden sm:inline">إضافة ساحة جديدة</span>
            </button>

            {/* Notification Button */}
            <button
              className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200 active:scale-95 group"
              aria-label="الإشعارات"
              title="الإشعارات"
            >
              <Bell className="size-5 text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
              {/* Notification Badge */}
              <span className="absolute top-1.5 end-1.5 w-2 h-2 bg-red-500 dark:bg-red-400 rounded-full border-2 border-white dark:border-gray-800"></span>
            </button>

            {/* ✅ Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative inline-flex items-center justify-center p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 active:scale-95"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDarkMode ? 'التبديل إلى الوضع النهاري' : 'التبديل إلى الوضع الليلي'}
            >
              <div className="relative w-12 h-6 flex items-center">
                {/* Toggle Track */}
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-300 ease-in-out ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-gray-600 to-gray-700'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500'
                  }`}
                />
                {/* Toggle Thumb */}
                <div
                  className={`absolute w-5 h-5 bg-white rounded-full shadow-lg transform transition-all duration-300 ease-in-out flex items-center justify-center ${
                    isDarkMode ? 'left-[26px]' : 'left-0.5'
                  }`}
                >
                  {isDarkMode ? (
                    <Moon className="w-3 h-3 text-gray-700" />
                  ) : (
                    <Sun className="w-3 h-3 text-yellow-500" />
                  )}
                </div>
              </div>
            </button>

            {/* ✅ User Menu */}
            <div className="relative">
              <button
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-green-300 dark:hover:border-green-600 transition-all duration-200 active:scale-95 group"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="قائمة المستخدم"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 dark:from-green-500 dark:to-emerald-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                  <UserIcon className="size-4 text-white" />
                </div>
                <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                  {`${user?.fName || 'User'} ${user?.lName || ''}`}
                </span>
              </button>

              {menuOpen && (
                <div
                  className={`absolute ${
                    isRTL ? 'right-0' : 'left-0'
                  } mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl dark:shadow-gray-900/50 z-50 transition-all duration-200 overflow-hidden`}
                >
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {`${user?.fName || 'User'} ${user?.lName || ''}`}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                    >
                      <LogOut className="size-4" />
                      <span>تسجيل خروج</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
