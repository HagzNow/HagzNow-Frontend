import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaPlayCircle } from 'react-icons/fa';
import arena from '/public/arena.jpg';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative px-4 sm:px-6 py-8 sm:py-12 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="relative container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-right space-y-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              {t('hero_badge') || 'منصة الحجز الأولى للملاعب الرياضية'}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              <span className="text-gray-900">{t('hero_title_1') || 'احجز ملعبك'}</span>
              <br />
              <span className="text-green-600">{t('hero_title_2') || 'المفضل بسهولة'}</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {t('hero_description') ||
                'منصة ArenaBook توفر لك أفضل تجربة حجز للملاعب الرياضية. ابحث، قارن، واحجز خلال دقائق بخطوات بسيطة وآمنة.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/user-arena"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {t('hero_cta_primary') || 'ابدأ الحجز الآن'}
                <FaPlayCircle className="w-5 h-5" />
              </Link>
              <Link
                to="/user-arena"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-green-50 text-green-600 border-2 border-green-600 px-8 py-4 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              >
                {t('hero_cta_secondary') || 'استكشف الملاعب'}
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={arena}
                alt={t('hero_image_alt') || 'ملعب رياضي'}
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent"></div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-green-200 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -top-6 -right-6 w-40 h-40 bg-emerald-200 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
