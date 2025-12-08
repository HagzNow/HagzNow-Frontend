import { FiAward, FiLock, FiZap, FiClock, FiUsers, FiShield } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

export default function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <FiAward className="w-6 h-6" />,
      title: t('feature_diverse_arenas') || 'ملاعب متنوعة',
      desc:
        t('feature_diverse_arenas_desc') || 'اكتشف مجموعة واسعة من الملاعب لمختلف الرياضات. اختر ما يناسب احتياجاتك.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: <FiLock className="w-6 h-6" />,
      title: t('feature_secure_payment') || 'دفع آمن',
      desc: t('feature_secure_payment_desc') || 'استمتع بعملية دفع آمنة وموثوقة عبر بوابات الدفع الإلكترونية المتعددة.',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: <FiZap className="w-6 h-6" />,
      title: t('feature_fast_booking') || 'حجز سريع',
      desc: t('feature_fast_booking_desc') || 'احجز ملعبك المفضل بخطوات بسيطة وسريعة، وتجنب الانتظار الطويل.',
      color: 'from-teal-500 to-cyan-500',
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      title: t('feature_24_7') || 'متاح 24/7',
      desc: t('feature_24_7_desc') || 'احجز في أي وقت من اليوم، منصة ArenaBook متاحة دائماً لخدمتك.',
      color: 'from-cyan-500 to-green-500',
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: t('feature_community') || 'مجتمع رياضي',
      desc: t('feature_community_desc') || 'انضم إلى مجتمع رياضي نشط وشارك تجربتك مع اللاعبين الآخرين.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: <FiShield className="w-6 h-6" />,
      title: t('feature_guarantee') || 'ضمان الجودة',
      desc: t('feature_guarantee_desc') || 'جميع الملاعب معتمدة ومتأكد من جودتها لضمان تجربة ممتازة.',
      color: 'from-emerald-500 to-teal-500',
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            {t('features_title') || 'لماذا تختار'}{' '}
            <span className="text-green-600 dark:text-green-400">{t('features_title_brand') || 'ArenaBook'}</span>؟
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('features_subtitle') || 'نوفر لك أفضل تجربة حجز للملاعب الرياضية مع ميزات متقدمة وخدمة عملاء متميزة'}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl border border-green-100 dark:border-gray-700 p-8 hover:border-green-300 dark:hover:border-green-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Icon with gradient background */}
              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
              >
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                {feature.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.desc}</p>

              {/* Hover effect decoration */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-300 -z-10`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
