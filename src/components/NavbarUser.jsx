import { useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { User } from "lucide-react"; // أيقونة المستخدم
import { authContext } from "../Contexts/AuthContext";

const UserNavbar = () => {
  const { user, logout } = useContext(authContext);
  const isLoggedIn = localStorage.getItem("token");

  return (
    <nav className="bg-white text-green-700 py-3 px-6 shadow-md">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* ✅ Logo + Search */}
        <div className="flex items-center justify-center lg:justify-start gap-8 w-full lg:w-auto">
          {/* Logo */}
          <Link to="/home" className="text-2xl font-bold whitespace-nowrap">
            ArenaBook
          </Link>

          {/* Search box */}
          <div className="relative w-full sm:w-[240px] md:w-[280px] lg:w-[300px]">
            <CiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-green-700 w-5 h-5 pointer-events-none" />
            <input
              type="text"
              placeholder="ابحث عن ملعب..."
              className="w-full py-2 pr-10 pl-3 rounded-md focus:outline-none text-green-700 bg-transparent border border-green-300 focus:border-green-700 placeholder-green-400 transition"
            />
          </div>
        </div>

        {/* ✅ Links */}
        <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto justify-center lg:justify-start">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 lg:ml-14">
            <Link to="/book" className="hover:underline whitespace-nowrap">
              أحجز معنا
            </Link>
            <Link to="/settings" className="hover:underline whitespace-nowrap">
              إعدادات الحساب
            </Link>
            <Link to="/wallet" className="hover:underline whitespace-nowrap">
              المحفظة
            </Link>
            <Link to="/my-bookings" className="hover:underline whitespace-nowrap">
              حجوزاتي
            </Link>
            <Link to="/arenas" className="hover:underline whitespace-nowrap">
              الملاعب
            </Link>
          </div>
        </div>

        {/* ✅ User Info + Logout */}
        {isLoggedIn && (
          <div className="flex items-center gap-3">
            {/* user info */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border hover:bg-gray-100">
              <User className="size-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {user?.name || user?.username || "User"}
              </span>
            </div>

            {/* logout button */}
            <button
              onClick={logout}
              className="px-3 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 text-sm font-medium"
            >
              تسجيل خروج
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default UserNavbar;
