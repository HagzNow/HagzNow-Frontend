import React from "react";
import { FiAward, FiLock, FiZap } from "react-icons/fi";

export default function WhyChooseArenaBook() {
  const features = [
    {
      icon: <FiAward className="w-8 h-8 text-green-600" />,
      title: "ملاعب متنوعة",
      desc: "اكتشف مجموعة واسعة من الملاعب لمختلف الرياضات. اختر ما يناسبك.",
    },
    {
      icon: <FiLock className="w-8 h-8 text-blue-600" />,
      title: "دفع آمن",
      desc: "استمتع بعملية دفع آمنة وموثوقة عبر بوابات الدفع الإلكترونية المتعددة.",
    },
    {
      icon: <FiZap className="w-8 h-8 text-emerald-600" />,
      title: "حجز سريع",
      desc: "احجز ملعبك المفضل بخطوات بسيطة وسريعة، وتجنب الانتظار الطويل.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 ml-15 mr-15">
      <div className="container mx-auto px-4">
        {/* العنوان */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-12">
          لماذا تختار <span className="text-green-700">ArenaBook</span>؟
        </h2>

        {/* البطاقات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm p-8 text-center hover:shadow-md transition h-[260px] sm:h-[280px] md:h-[260px] flex flex-col justify-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-6">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

