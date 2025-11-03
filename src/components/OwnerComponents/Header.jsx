import { Menu, Search, Bell, Plus, User as UserIcon } from "lucide-react";
import { useContext } from "react";
import { authContext } from "../../Contexts/AuthContext";

export default function Header({ onMenuClick, isRTL }) {
  const { user } = useContext(authContext);

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
          <div className="flex items-center gap-3">
            <button
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
            >
              <Plus className="size-4" />
              <span className="hidden sm:inline text-sm">إضافة ساحة جديدة</span>
            </button>

            <button className="p-2 rounded-xl hover:bg-gray-100">
              <Bell className="size-5" />
            </button>

            {/* بدل الصورة هنا هنحط الاسم + أيقونة */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border hover:bg-gray-100">
              <UserIcon className="size-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {user?.name || user?.username || "User"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}



