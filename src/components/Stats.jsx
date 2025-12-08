import { useTranslation } from 'react-i18next';
import { FiAward, FiUsers, FiCalendar, FiStar } from 'react-icons/fi';

export default function Stats() {
  const { t } = useTranslation();

  const stats = [
    {
      icon: <FiAward className="w-8 h-8" />,
      value: '500+',
      label: t('stats_arenas') || 'ملعب معتمد',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      value: '10K+',
      label: t('stats_users') || 'مستخدم نشط',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: <FiCalendar className="w-8 h-8" />,
      value: '50K+',
      label: t('stats_bookings') || 'حجز ناجح',
      color: 'from-teal-500 to-cyan-500',
    },
    {
      icon: <FiStar className="w-8 h-8" />,
      value: '4.9',
      label: t('stats_rating') || 'تقييم المستخدمين',
      color: 'from-cyan-500 to-green-500',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-y border-green-100">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} text-white mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}
              >
                {stat.icon}
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm sm:text-base text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
