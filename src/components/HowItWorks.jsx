import { useTranslation } from "react-i18next";
import { FiSearch, FiCalendar, FiCreditCard, FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      icon: <FiSearch className="w-6 h-6" />,
      title: t("how_it_works_step1_title") || "ابحث عن ملعب",
      description: t("how_it_works_step1_desc") || "استخدم محرك البحث للعثور على الملاعب المتاحة في منطقتك",
      number: "01",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <FiCalendar className="w-6 h-6" />,
      title: t("how_it_works_step2_title") || "اختر التاريخ والوقت",
      description: t("how_it_works_step2_desc") || "حدد التاريخ والوقت المناسبين لك من الجدول الزمني",
      number: "02",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: <FiCreditCard className="w-6 h-6" />,
      title: t("how_it_works_step3_title") || "ادفع بسهولة",
      description: t("how_it_works_step3_desc") || "أكمل عملية الدفع الآمنة عبر بوابات الدفع الإلكترونية",
      number: "03",
      color: "from-teal-500 to-cyan-500",
    },
    {
      icon: <FiCheckCircle className="w-6 h-6" />,
      title: t("how_it_works_step4_title") || "احصل على التأكيد",
      description: t("how_it_works_step4_desc") || "استلم تأكيد الحجز عبر البريد الإلكتروني والرسائل النصية",
      number: "04",
      color: "from-cyan-500 to-green-500",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            {t("how_it_works_title") || "كيف"} <span className="text-green-600">{t("how_it_works_title_works") || "تعمل"}</span> {t("how_it_works_title_platform") || "المنصة"}؟
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("how_it_works_subtitle") || "خطوات بسيطة لحجز ملعبك المفضل في دقائق"}
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Step Card */}
              <div className="bg-white rounded-2xl border border-green-100 p-8 hover:border-green-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {step.number}
                </div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector Line (hidden on mobile, visible on desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-green-300 to-emerald-300 transform -translate-y-1/2 z-0">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            to="/user-arena"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {t("how_it_works_cta") || "ابدأ الحجز الآن"}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

