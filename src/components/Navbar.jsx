import { useContext, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sun, Moon } from 'lucide-react';
import { authContext } from '../Contexts/AuthContext';
import { useTheme } from '../Contexts/ThemeContext';

const Navbar = () => {
  const { logout } = useContext(authContext);
  const { t } = useTranslation();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              to="/user-arena"
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium text-sm transition-colors duration-200 relative group"
            >
              {t('navbar_arenas') || 'الملاعب الرئيسية'}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 dark:bg-green-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/home"
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium text-sm transition-colors duration-200 relative group"
            >
              {t('navbar_about') || 'عن المنصة'}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 dark:bg-green-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <a
              href="#"
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium text-sm transition-colors duration-200 relative group"
            >
              {t('navbar_contact') || 'تواصل معنا'}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 dark:bg-green-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#"
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium text-sm transition-colors duration-200 relative group"
            >
              {t('navbar_help') || 'المساعدة'}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 dark:bg-green-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>

          {/* Search Bar - Desktop */}
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

          {/* Theme Toggle & Auth Buttons */}
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

            {!localStorage.getItem('token') ? (
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
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                onClick={logout}
              >
                {t('navbar_logout') || 'تسجيل خروج'}
              </Link>
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
            <div className="relative mb-4">
              <CiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 pointer-events-none" />
              <input
                type="text"
                placeholder={t('navbar_search_placeholder') || 'ابحث عن ملعب...'}
                className="w-full py-2.5 pr-10 pl-4 rounded-xl border border-green-200 dark:border-gray-700 bg-green-50/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            {/* Mobile Links */}
            <Link
              to="/user-arena"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navbar_arenas') || 'الملاعب الرئيسية'}
            </Link>
            <Link
              to="/home"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navbar_about') || 'عن المنصة'}
            </Link>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navbar_contact') || 'تواصل معنا'}
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navbar_help') || 'المساعدة'}
            </a>

            {/* Mobile Auth Buttons */}
            {!localStorage.getItem('token') && (
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
