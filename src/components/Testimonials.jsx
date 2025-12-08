import { useTranslation } from 'react-i18next';
import { FaStar } from 'react-icons/fa';
import Image1 from '../assets/images/user1.jpeg';
import Image2 from '../assets/images/user2.jpeg';
import Image3 from '../assets/images/user3.jpeg';

export default function Testimonials() {
  const { t } = useTranslation();

  const testimonials = [
    {
      img: Image1,
      name: t('testimonial_name_1') || 'ساره علي',
      role: t('testimonial_role_1') || 'لاعبة كرة قدم',
      text:
        t('testimonial_text_1') || 'الدعم ممتاز والعملية سلسة. لم أعد أجد صعوبة في حجز ملاعبي المفضلة. تجربة رائعة!',
      rating: 5,
    },
    {
      img: Image2,
      name: t('testimonial_name_2') || 'اسامه محمد',
      role: t('testimonial_role_2') || 'لاعب كرة سلة',
      text:
        t('testimonial_text_2') || 'واجهة رائعة ومجموعة كبيرة من الملاعب. أوصي به بشدة لكل رياضي يبحث عن سهولة الحجز.',
      rating: 5,
    },
    {
      img: Image3,
      name: t('testimonial_name_3') || 'أحمد إبراهيم',
      role: t('testimonial_role_3') || 'مدرب رياضي',
      text:
        t('testimonial_text_3') ||
        'لقد غير ArenaBook طريقة حجزى للملاعب تمامًا! سريع وسهل وآمن. أفضل منصة حجز استخدمتها.',
      rating: 5,
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            {t('testimonials_title') || 'ماذا يقول'}{' '}
            <span className="text-green-600">{t('testimonials_title_clients') || 'عملاؤنا'}</span>؟
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('testimonials_subtitle') || 'آلاف المستخدمين يثقون بنا لحجز ملاعبهم المفضلة'}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl border border-green-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Rating Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed italic relative">
                <span className="text-4xl text-green-200 absolute -top-2 -right-2 font-serif">"</span>
                <span className="relative z-10">{testimonial.text}</span>
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-green-100">
                <img
                  src={testimonial.img}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-green-200"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>

              {/* Hover decoration */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
