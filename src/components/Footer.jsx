import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaLinkedinIn, FaInstagram, FaTwitter, FaFacebookF, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden border-t border-green-100 dark:border-gray-800 transition-colors duration-300 mt-5">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-30 dark:opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-200 dark:bg-green-900/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200 dark:bg-emerald-900/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-5">
            <div>
              <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                HagzNow
              </h3>
              <div className="w-12 h-1 bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400 rounded-full"></div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed max-w-xs">
              {t('footer_description') || 'منصة الحجز الأولى للملاعب الرياضية. احجز ملعبك المفضل بسهولة وسرعة.'}
            </p>

            {/* Social Media */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="group w-11 h-11 rounded-xl bg-white dark:bg-gray-800 hover:bg-green-100 dark:hover:bg-gray-700 border border-green-200 dark:border-gray-700 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-5 h-5 text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors" />
              </a>
              <a
                href="#"
                className="group w-11 h-11 rounded-xl bg-white dark:bg-gray-800 hover:bg-green-100 dark:hover:bg-gray-700 border border-green-200 dark:border-gray-700 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5 text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors" />
              </a>
              <a
                href="#"
                className="group w-11 h-11 rounded-xl bg-white dark:bg-gray-800 hover:bg-green-100 dark:hover:bg-gray-700 border border-green-200 dark:border-gray-700 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5 text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors" />
              </a>
              <a
                href="#"
                className="group w-11 h-11 rounded-xl bg-white dark:bg-gray-800 hover:bg-green-100 dark:hover:bg-gray-700 border border-green-200 dark:border-gray-700 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-5 h-5 text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-gray-900 dark:text-white relative">
              {t('footer_quick_links') || 'روابط سريعة'}
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-green-500 dark:bg-green-400 rounded-full"></div>
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link
                  to="/user-arena"
                  className="group flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 text-sm"
                >
                  <span className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="group-hover:translate-x-1 transition-transform inline-block">
                    {t('footer_link_arenas') || 'الملاعب'}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="group flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 text-sm"
                >
                  <span className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="group-hover:translate-x-1 transition-transform inline-block">
                    {t('footer_link_about') || 'عن المنصة'}
                  </span>
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="group flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 text-sm"
                >
                  <span className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="group-hover:translate-x-1 transition-transform inline-block">
                    {t('footer_link_contact') || 'تواصل معنا'}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="group flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 text-sm"
                >
                  <span className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="group-hover:translate-x-1 transition-transform inline-block">
                    {t('footer_link_help') || 'المساعدة'}
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-gray-900 dark:text-white relative">
              {t('footer_legal') || 'قانوني'}
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-green-500 dark:bg-green-400 rounded-full"></div>
            </h4>
            <ul className="space-y-3.5">
              <li>
                <a
                  href="#"
                  className="group flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 text-sm"
                >
                  <span className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="group-hover:translate-x-1 transition-transform inline-block">
                    {t('footer_link_terms') || 'الشروط والأحكام'}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="group flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 text-sm"
                >
                  <span className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="group-hover:translate-x-1 transition-transform inline-block">
                    {t('footer_link_privacy') || 'سياسة الخصوصية'}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="group flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 text-sm"
                >
                  <span className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="group-hover:translate-x-1 transition-transform inline-block">
                    {t('footer_link_cookies') || 'سياسة الكوكيز'}
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-gray-900 dark:text-white relative">
              {t('footer_contact') || 'اتصل بنا'}
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-green-500 dark:bg-green-400 rounded-full"></div>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 border border-green-200 dark:border-gray-700 flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 dark:group-hover:bg-gray-700 group-hover:border-green-300 dark:group-hover:border-green-500 transition-colors">
                  <FaEnvelope className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-300 text-sm block group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    info@HagzNow.com
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 border border-green-200 dark:border-gray-700 flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 dark:group-hover:bg-gray-700 group-hover:border-green-300 dark:group-hover:border-green-500 transition-colors">
                  <FaPhone className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <span
                    dir="ltr"
                    className="text-gray-600 dark:text-gray-300 text-sm block group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors"
                  >
                    +20 123 456 7890
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 border border-green-200 dark:border-gray-700 flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 dark:group-hover:bg-gray-700 group-hover:border-green-300 dark:group-hover:border-green-500 transition-colors">
                  <FaMapMarkerAlt className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-300 text-sm block group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    Cairo, Egypt
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-green-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm text-center sm:text-left">
              © {new Date().getFullYear()} <span className="font-semibold text-gray-900 dark:text-white">HagzNow</span>.{' '}
              {t('footer_rights') || 'جميع الحقوق محفوظة'}.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span>{t('footer_made_with') || 'صُنع بـ'}</span>
              <span className="text-red-400 dark:text-red-500 animate-pulse">❤</span>
              <span>{t('footer_in_egypt') || 'في مصر'}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
