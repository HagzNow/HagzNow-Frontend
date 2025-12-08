import { useContext, useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User, LogOut, Wallet, Calendar, MapPin, ChevronDown, UserCircle, Sun, Moon } from 'lucide-react';
import { authContext } from '../Contexts/AuthContext';
import { useTheme } from '../Contexts/ThemeContext';
import toast from 'react-hot-toast';

const UserNavbar = () => {
  const { t } = useTranslation();
  const { user, setToken, setUser } = useContext(authContext);
  const { isDarkMode, toggleTheme } = useTheme();
  const isLoggedIn = localStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    setIsDropdownOpen(false);
    toast.success(t('logout_success') || 'تم تسجيل الخروج بنجاح');
    navigate('/home');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const publicPaths = ['/home', '/user-arena', '/login', '/register'];
    if (!isLoggedIn && !publicPaths.includes(location.pathname)) {
      navigate('/login', { replace: true });
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-green-100 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2 group">
            <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent group-hover:from-green-700 group-hover:to-emerald-700 dark:group-hover:from-green-300 dark:group-hover:to-emerald-300 transition-all">
              ArenaBook
            </span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              to="/user-arena"
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium text-sm transition-colors duration-200 relative group"
            >
              <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>{t('navbar_arenas') || 'الملاعب'}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 dark:bg-green-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/my-bookings"
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium text-sm transition-colors duration-200 relative group"
            >
              <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>{t('my_reservations') || 'حجوزاتي'}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 dark:bg-green-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Theme Toggle & User Dropdown */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-green-50 dark:bg-gray-800 border border-green-200 dark:border-gray-700 hover:bg-green-100 dark:hover:bg-gray-700 hover:border-green-300 dark:hover:border-gray-600 transition-all duration-300 group"
              aria-label={
                isDarkMode ? t('theme_light') || 'Switch to light mode' : t('theme_dark') || 'Switch to dark mode'
              }
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500 group-hover:scale-110 transition-transform" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 group-hover:scale-110 transition-transform" />
              )}
            </button>

            {/* User Dropdown */}
            {isLoggedIn && (
              <div className="relative" ref={dropdownRef}>
                {/* User Dropdown Trigger */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl bg-green-50 dark:bg-gray-800 border border-green-200 dark:border-gray-700 hover:bg-green-100 dark:hover:bg-gray-700 hover:border-green-300 dark:hover:border-gray-600 transition-all duration-300 group"
                >
                  {user?.avatar ? (
                    <img
                      src={`${user.avatar}?v=${user.avatarVersion || Date.now()}`}
                      alt="User Avatar"
                      className="w-9 h-9 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 flex items-center justify-center shadow-sm">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div className="hidden sm:flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                      {`${user?.fName || 'User'} ${user?.lName || ''}`}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full mt-2 right-0 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-green-100 dark:border-gray-700 overflow-hidden z-50 animate-in fade-in-0 zoom-in-95">
                    {/* User Info Header */}
                    <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 text-white">
                      <div className="flex items-center gap-3">
                        {user?.avatar ? (
                          <img
                            src={`${user.avatar}?v=${user.avatarVersion || Date.now()}`}
                            alt="User Avatar"
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                            <User className="w-6 h-6 text-white" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">
                            {`${user?.fName || 'User'} ${user?.lName || ''}`}
                          </p>
                          <p className="text-white/90 text-xs mt-0.5 truncate">{user?.email || 'user@example.com'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Dropdown Items */}
                    <div className="p-2">
                      <Link
                        to="/userProfile"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-400 rounded-xl transition-all duration-200 group"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <UserCircle className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors" />
                        <span className="font-medium">{t('navbar_profile') || 'تعديل الملف الشخصي'}</span>
                      </Link>

                      <Link
                        to="/wallet"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-400 rounded-xl transition-all duration-200 group"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Wallet className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors" />
                        <span className="font-medium">{t('navbar_wallet') || 'محفظتي'}</span>
                      </Link>

                      {/* Divider */}
                      <div className="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 rounded-xl transition-all duration-200 group w-full text-right"
                      >
                        <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">{t('navbar_logout') || 'تسجيل خروج'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Links */}
        <div className="lg:hidden border-t border-green-100 dark:border-gray-800 py-3 flex items-center justify-center gap-4">
          <Link
            to="/user-arena"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 font-medium text-sm"
          >
            <MapPin className="w-4 h-4" />
            <span>{t('navbar_arenas') || 'الملاعب'}</span>
          </Link>
          <Link
            to="/my-bookings"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 font-medium text-sm"
          >
            <Calendar className="w-4 h-4" />
            <span>{t('my_reservations') || 'حجوزاتي'}</span>
          </Link>
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-green-50 dark:bg-gray-800 border border-green-200 dark:border-gray-700 hover:bg-green-100 dark:hover:bg-gray-700 transition-all duration-300"
            aria-label={
              isDarkMode ? t('theme_light') || 'Switch to light mode' : t('theme_dark') || 'Switch to dark mode'
            }
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
