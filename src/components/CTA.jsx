import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function CTA() {
  const { t } = useTranslation();

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 dark:from-green-700 dark:via-emerald-700 dark:to-teal-700 relative overflow-hidden transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white dark:bg-gray-900 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white dark:bg-gray-900 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            {t("cta_title") || "جاهز لبدء حجز ملعبك المفضل؟"}
          </h2>
          <p className="text-lg sm:text-xl text-green-50 dark:text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t("cta_description") || "انضم إلى آلاف المستخدمين الذين يثقون بنا لحجز ملاعبهم المفضلة. ابدأ الآن واستمتع بأفضل تجربة حجز."}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/user-arena"
              className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-gray-700 px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              {t("cta_button_primary") || "استكشف الملاعب"}
              <FaArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-green-700 dark:bg-green-600 hover:bg-green-800 dark:hover:bg-green-700 text-white border-2 border-white/30 dark:border-white/20 px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {t("cta_button_secondary") || "إنشاء حساب"}
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-white/20 dark:border-white/10">
            <div className="flex flex-wrap items-center justify-center gap-8 text-green-50 dark:text-green-100">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">{t("cta_trust_1") || "دفع آمن"}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">{t("cta_trust_2") || "دعم 24/7"}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">{t("cta_trust_3") || "ضمان الجودة"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

