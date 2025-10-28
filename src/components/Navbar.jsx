import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-green-700 text-white py-3 px-6 shadow-md">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* ✅ اللوجو + السيرش */}
        <div className="flex items-center justify-center lg:justify-start gap-8 w-full lg:w-auto">
          {/* اللوجو */}
          <span className="text-2xl font-bold whitespace-nowrap">
            ArenaBook
          </span>

          {/* مربع البحث */}
          <div className="relative w-full sm:w-[240px] md:w-[280px] lg:w-[300px]">
            <CiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-white w-5 h-5 pointer-events-none" />
            <input
              type="text"
              placeholder="ابحث عن ملعب..."
              className="w-full py-2 pr-10 pl-3 rounded-md focus:outline-none text-white bg-transparent border border-transparent focus:border-white placeholder-white transition"
            />
          </div>
        </div>

        {/* ✅ الروابط + الأزرار */}
        <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto justify-center lg:justify-start">
          {/* ✅ اللينكات بعد الانبوت على طول في الديسكتوب */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 lg:ml-14">
            <span className="hover:underline cursor-pointer whitespace-nowrap">
              تواصل معنا
            </span>
            <span className="hover:underline cursor-pointer whitespace-nowrap">
              عن المنصة
            </span>
            <Link
              to="/user-arena"
              className="hover:underline cursor-pointer whitespace-nowrap"
            >
              <span className="hover:underline cursor-pointer whitespace-nowrap">
                الملاعب الرئيسية
              </span>
            </Link>
            <span className="hover:underline cursor-pointer whitespace-nowrap">
              المساعدة
            </span>
          </div>
        </div>

        {/* أزرار الدخول / التسجيل */}
        <div className="inline-flex rounded-md overflow-hidden shadow bg-white text-green-700">
          <Link
            to="/login"
            className="px-3 py-1 hover:bg-green-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            تسجيل الدخول
          </Link>
          <div className="w-px bg-green-200/60" />
          <Link
            to="/register"
            className="px-3 py-1 hover:bg-green-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            التسجيل
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
