import { useState, useContext, useRef, useEffect } from "react";
import { Menu, Search, Bell, Plus, User as UserIcon, LogOut } from "lucide-react";
import { authContext } from "../../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header({ onMenuClick, isRTL }) {
  const { user, setToken, setUser } = useContext(authContext); // نضيف setToken و setUser
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // ✅ handleLogout
  const handleLogout = () => {
    localStorage.removeItem("token"); // فقط احذف التوكن بدل clear الكلي
    setUser(null);
    setToken(null);
    console.log("✅ Logged out successfully!");
  };

  // ✅ useEffect لمراقبة تغيّر حالة المستخدم/التوكن
  useEffect(() => {
    // لو المستخدم اتصفر أو التوكن اتحذف
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  // ✅ إغلاق القائمة عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 bg-white border-b shadow-sm transition-all duration-300 
        ${isRTL ? "md:mr-8" : "md:ml-8"}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between gap-3">
          {/* Left Section */}
          <div className="flex items-center gap-2">
            <button
              className="md:hidden p-2 rounded-xl hover:bg-gray-100"
              onClick={onMenuClick}
            >
              <Menu className="size-5" />
            </button>

            <div className="relative">
              <Search className="size-4 absolute top-1/2 -translate-y-1/2 end-3 text-gray-400" />
              <input
                placeholder="ابحث عن ساحات أو حجوزات..."
                className="w-72 ps-3 pe-9 py-2 rounded-xl border bg-gray-50 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 relative" ref={menuRef}>
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm">
              <Plus className="size-4" />
              <span className="hidden sm:inline text-sm">إضافة ساحة جديدة</span>
            </button>

            <button className="p-2 rounded-xl hover:bg-gray-100">
              <Bell className="size-5" />
            </button>

            {/* ✅ User Menu */}
            <div className="relative">
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border hover:bg-gray-100"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <UserIcon className="size-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  {`${user?.fName || "User"} ${user?.lName || ""}`}
                </span>
              </button>

              {menuOpen && (
                <div
                  className={`absolute ${isRTL ? "right-0" : "left-0"} mt-2 w-44 bg-white border rounded-xl shadow-lg z-50`}
                >
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <LogOut className="size-4" />
                    تسجيل خروج
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
