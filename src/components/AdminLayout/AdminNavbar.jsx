import { useState } from "react";
import { Menu, Bell, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminNavbar({ onMenuClick, notifCount = 3 }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    console.log("Logged out successfully!");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 shadow-sm bg-white/80 backdrop-blur-md dark:bg-neutral-900/70 border-b border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* اليسار */}
          <div className="flex items-center gap-2">
            <button
              onClick={onMenuClick}
              className="inline-flex md:hidden items-center justify-center rounded-xl p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="فتح القائمة"
            >
              <Menu className="h-5 w-5" />
            </button>
            <a
              href="#"
              className="flex items-center gap-2 rounded-xl px-2 py-1"
            >
              <span className="font-extrabold tracking-tight text-neutral-900 dark:text-white">
                ArenaAdmin
              </span>
            </a>
          </div>

          {/* اليمين */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* إشعارات */}
            <button
              className="relative inline-flex items-center justify-center rounded-xl p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="الإشعارات"
            >
              <Bell className="h-5 w-5" />
              {notifCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white px-1">
                  {notifCount}
                </span>
              )}
            </button>

            {/* أيقونة المستخدم */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-2xl ps-2 pe-3 py-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                aria-label="الملف الشخصي"
              >
                <User className="h-5 w-5 text-neutral-900 dark:text-white" />
                <span className="hidden sm:inline">Admin</span>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-lg z-50 flex flex-col">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-t-xl"
                  >
                    <LogOut className="h-4 w-4" />
                    تسجيل الخروج
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
