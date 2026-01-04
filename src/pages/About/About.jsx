import React from 'react';
import { useTranslation } from 'react-i18next';
import { Target, Users, Shield, Zap, Heart, Award } from 'lucide-react';

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300" dir="rtl">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 text-white py-20 sm:py-24">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
              {t('about_title') || 'عن منصة HagzNow'}
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 drop-shadow-md">
              {t('about_subtitle') || 'منصة رائدة لحجز الملاعب الرياضية بسهولة وأمان'}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Mission */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-green-500 rounded-xl">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t('about_mission_title') || 'رؤيتنا'}
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('about_mission_text') ||
                  'نهدف إلى تسهيل عملية حجز الملاعب الرياضية وجعلها متاحة للجميع بسهولة وأمان. نسعى لبناء مجتمع رياضي نشط يربط بين ملاك الملاعب واللاعبين في مكان واحد.'}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-500 rounded-xl">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t('about_vision_title') || 'مهمتنا'}
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('about_vision_text') ||
                  'تقديم أفضل تجربة حجز للملاعب الرياضية من خلال منصة سهلة الاستخدام وآمنة. نعمل على دعم الرياضة في مصر وتشجيع ممارسة الأنشطة الرياضية للجميع.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('about_values_title') || 'قيمنا'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              {t('about_values_subtitle') || 'المبادئ التي نؤمن بها ونعمل من خلالها'}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Value 1 */}
            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg w-fit mb-4">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('about_value1_title') || 'الأمان والموثوقية'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {t('about_value1_text') || 'نضمن أمان جميع المعاملات وحماية بيانات المستخدمين بأعلى معايير الأمان.'}
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg w-fit mb-4">
                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('about_value2_title') || 'السهولة والسرعة'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {t('about_value2_text') || 'عملية حجز بسيطة وسريعة، يمكنك حجز ملعبك المفضل في دقائق معدودة.'}
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg w-fit mb-4">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('about_value3_title') || 'المجتمع الرياضي'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {t('about_value3_text') || 'نعمل على بناء مجتمع رياضي نشط يربط بين اللاعبين وملاك الملاعب.'}
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg w-fit mb-4">
                <Heart className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('about_value4_title') || 'الجودة والتميز'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {t('about_value4_text') || 'نحرص على تقديم أفضل الخدمات وضمان جودة الملاعب المعروضة على المنصة.'}
              </p>
            </div>

            {/* Value 5 */}
            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg w-fit mb-4">
                <Award className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('about_value5_title') || 'الابتكار'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {t('about_value5_text') || 'نستخدم أحدث التقنيات لتقديم تجربة مستخدم متميزة ومبتكرة.'}
              </p>
            </div>

            {/* Value 6 */}
            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg w-fit mb-4">
                <Target className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('about_value6_title') || 'الشفافية'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {t('about_value6_text') || 'نؤمن بالشفافية الكاملة في جميع معاملاتنا وخدماتنا.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('about_why_title') || 'لماذا HagzNow؟'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              {t('about_why_subtitle') || 'نقدم لك أفضل تجربة حجز للملاعب الرياضية'}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('about_why1_title') || 'سهولة الاستخدام'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t('about_why1_text') || 'واجهة مستخدم بسيطة وبديهية تجعل عملية البحث والحجز سهلة للجميع.'}
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('about_why2_title') || 'أمان المعاملات'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t('about_why2_text') || 'نظام دفع آمن ومحمي يضمن أمان جميع معاملاتك المالية.'}
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('about_why3_title') || 'مجموعة واسعة من الملاعب'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t('about_why3_text') || 'اختر من بين مجموعة كبيرة ومتنوعة من الملاعب الرياضية في جميع أنحاء مصر.'}
              </p>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('about_why4_title') || 'دعم العملاء'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t('about_why4_text') || 'فريق دعم متاح على مدار الساعة لمساعدتك في أي استفسار أو مشكلة.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('about_cta_title') || 'انضم إلينا اليوم'}</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('about_cta_text') || 'ابدأ رحلتك الرياضية معنا واحجز ملعبك المفضل بسهولة وأمان'}
          </p>
        </div>
      </section>
    </div>
  );
}
