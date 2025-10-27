import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="px-4 sm:px-6">
      <div className="relative container mx-auto h-[280px] sm:h-[360px] md:h-[420px] overflow-hidden rounded-xl shadow-lg">
        {/* الخلفية */}
        <img
          src="https://images.unsplash.com/photo-1521417538736-0a5f1a6f3cdd?q=80&w=1600&auto=format&fit=crop"
          alt="ملعب رياضي"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* طبقة تعتيم خفيفة */}
        <div className="absolute inset-0 bg-black/35" />

        {/* المحتوى */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white">
          {/* أيقونة بسيطة */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 mb-3 opacity-90"
          >
            <path d="M12 2.25a.75.75 0 01.75.75v6.25l5.41-3.125a.75.75 0 11.75 1.299L13.5 10.25l5.41 3.125a.75.75 0 11-.75 1.3L12.75 11.55V18a.75.75 0 01-1.5 0v-6.45L5.34 14.676a.75.75 0 11-.75-1.3L10 10.25 4.59 7.424a.75.75 0 11.75-1.299L11.25 9.25V3a.75.75 0 01.75-.75z" />
          </svg>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-2">
            احجز ملعبك المفضل بسهولة وسرعة
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-2xl mb-4">
            منصة <span className="font-semibold">ArenaBook</span> في خدمتك لعالم
            الملاعب الرياضية. ابحث، قارِن، واحجز خلال دقائق.
          </p>
          <Link
            to="/addarena"
            className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-md shadow transition"
          >
            احجز ملعبك الآن
          </Link>
        </div>
      </div>
    </section>
  );
}
