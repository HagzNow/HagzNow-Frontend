import { useContext, useEffect, useRef, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Sun,
  Moon,
  MapPin,
  Calendar,
  User as UserIcon,
  UserCircle,
  Wallet,
  ChevronDown,
  LogOut,
  Bell,
  Menu,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { authContext } from '../Contexts/AuthContext';
import { useTheme } from '../Contexts/ThemeContext';

const MENU_PRESETS = (t) => ({
  public: [
    { to: '/user-arena', label: t('navbar_arenas') || 'الملاعب الرئيسية' },
    { to: '/home', label: t('navbar_about') || 'عن المنصة' },
    { href: '#contact', label: t('navbar_contact') || 'تواصل معنا' },
    { href: '#help', label: t('navbar_help') || 'المساعدة' },
  ],
  user: [
    { to: '/user-arena', label: t('navbar_arenas') || 'الملاعب', icon: <MapPin className="w-4 h-4" /> },
    { to: '/my-bookings', label: t('my_reservations') || 'حجوزاتي', icon: <Calendar className="w-4 h-4" /> },
  ],
  admin: [
    { to: '/dashboard', label: t('dashboard') || 'لوحة التحكم' },
    { to: '/admin/wallet', label: t('wallet_label') || t('wallet') || 'المحفظة' },
    { to: '/admin/usermanagment', label: t('users') || 'المستخدمين' },
    { to: '/admin/admin-arena-requests', label: t('requests') || 'الطلبات' },
  ],
  owner: [
    { to: '/owner/arenas', label: t('owner_arenas') || 'ساحاتي' },
    { to: '/owner/add-arena', label: t('owner_add_arena') || 'إضافة ساحة' },
  ],
});

const Navbar = ({ variant = 'public', menuItems, onMenuClick, showSearch }) => {
  const { t } = useTranslation();
  const { user, logout, setUser, setToken } = useContext(authContext);
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isLoggedIn = Boolean(localStorage.getItem('token'));
  const menus = menuItems || MENU_PRESETS(t)[variant] || MENU_PRESETS(t).public;
  const enableSearch = showSearch ?? ['public', 'user'].includes(variant);
  const showAuthButtons = !isLoggedIn && variant === 'public';

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

  // Guard user routes if not logged in
  useEffect(() => {
    const publicPaths = ['/home', '/user-arena', '/login', '/register'];
    if (variant === 'user' && !isLoggedIn && !publicPaths.includes(location.pathname)) {
      navigate('/login', { replace: true });
    }
  }, [isLoggedIn, location.pathname, navigate, variant]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser?.(null);
    setToken?.(null);
    logout?.();
    setIsDropdownOpen(false);
    toast.success(t('logout_success') || 'تم تسجيل الخروج بنجاح');
    navigate('/login', { replace: true });
  };

  const renderMenuItem = (item, onClick) => {
    const className =
      'flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium text-sm transition-colors duration-200 relative group';

    if (item.to) {
      return (
        <Link key={item.to} to={item.to} className={className} onClick={onClick}>
          {item.icon}
          <span>{item.label}</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 dark:bg-green-400 group-hover:w-full transition-all duration-300"></span>
        </Link>
      );
    }

    return (
      <a key={item.href} href={item.href} className={className} onClick={onClick}>
        {item.icon}
        <span>{item.label}</span>
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 dark:bg-green-400 group-hover:w-full transition-all duration-300"></span>
      </a>
    );
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-green-100 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Left Section */}
          <div className="flex items-center gap-3">
            {onMenuClick && (
              <button
                onClick={onMenuClick}
                className="lg:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            {/* Logo */}
            <Link to="/home" className="flex items-center gap-2 group">
              <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent group-hover:from-green-700 group-hover:to-emerald-700 dark:group-hover:from-green-300 dark:group-hover:to-emerald-300 transition-all">
                ArenaBook
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">{menus.map((item) => renderMenuItem(item))}</div>

          {/* Search Bar - Desktop */}
          {enableSearch && (
            <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <CiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                <input
                  type="text"
                  placeholder={t('navbar_search_placeholder') || 'ابحث عن ملعب...'}
                  className="w-full py-2.5 pr-10 pl-4 rounded-xl border border-green-200 dark:border-gray-700 bg-green-50/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                />
              </div>
            </div>
          )}

          {/* Theme Toggle & Auth/User Buttons */}
          <div className="flex items-center gap-3">
            {/* Notifications (admin/owner) */}
            {['admin', 'owner'].includes(variant) && (
              <button
                type="button"
                className="relative p-2.5 rounded-xl hover:bg-green-50 dark:hover:bg-gray-800 transition-all duration-200 active:scale-95 group"
                aria-label="الإشعارات"
                title="الإشعارات"
              >
                <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
              </button>
            )}

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

            {showAuthButtons ? (
              <>
                <Link
                  to="/login"
                  className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                >
                  {t('login_button') || 'تسجيل الدخول'}
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  {t('create_account') || 'إنشاء حساب'}
                </Link>
              </>
            ) : (
              isLoggedIn && (
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
                        <UserIcon className="w-5 h-5 text-white" />
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
                              <UserIcon className="w-6 h-6 text-white" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm truncate">{`${user?.fName || 'User'} ${
                              user?.lName || ''
                            }`}</p>
                            <p className="text-white/90 text-xs mt-0.5 truncate">{user?.email || 'user@example.com'}</p>
                          </div>
                        </div>
                      </div>

                      {/* Dropdown Items */}
                      <div className="p-2">
                        {variant !== 'admin' && variant !== 'owner' && (
                          <>
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

                            <div className="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>
                          </>
                        )}

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
              )
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-green-100 dark:border-gray-800 py-4 space-y-3 animate-in slide-in-from-top duration-200">
            {/* Mobile Search */}
            {enableSearch && (
              <div className="relative mb-4">
                <CiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 pointer-events-none" />
                <input
                  type="text"
                  placeholder={t('navbar_search_placeholder') || 'ابحث عن ملعب...'}
                  className="w-full py-2.5 pr-10 pl-4 rounded-xl border border-green-200 dark:border-gray-700 bg-green-50/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
            )}

            {/* Mobile Links */}
            {menus.map((item) => (
              <div key={item.to || item.href} onClick={() => setIsMenuOpen(false)}>
                {renderMenuItem(item)}
              </div>
            ))}

            {/* Mobile Auth Buttons */}
            {showAuthButtons && (
              <div className="pt-4 border-t border-green-100 dark:border-gray-800 space-y-2">
                <Link
                  to="/login"
                  className="block w-full text-center px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('login_button') || 'تسجيل الدخول'}
                </Link>
                <Link
                  to="/register"
                  className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('create_account') || 'إنشاء حساب'}
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
