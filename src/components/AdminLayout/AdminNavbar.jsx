import { useState } from "react";
import { Menu, Bell, ChevronDown, LogOut, User, Settings } from "lucide-react";

export default function AdminNavbar({
  onMenuClick,
  notifCount = 3,
  userName = "ArenaAdmin",
}) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-sm bg-white/80 backdrop-blur-md dark:bg-neutral-900/70 border-b border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div className="flex items-center justify-between h-16">
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

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              className="inline-flex items-center justify-center rounded-xl p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="تبديل الوضع"
            ></button>

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

            <div className="relative">
              <button
                onClick={() => setProfileOpen((p) => !p)}
                className="inline-flex items-center gap-2 rounded-2xl ps-2 pe-3 py-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <span className="hidden sm:inline text-sm font-semibold">
                  {userName}
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {profileOpen && (
                <div className="absolute end-0 mt-2 w-56 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl overflow-hidden">
                  <a
                    href="#profile"
                    className="flex items-center gap-2 px-4 py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  >
                    <User className="h-4 w-4" /> الملف الشخصي
                  </a>
                  <a
                    href="#settings"
                    className="flex items-center gap-2 px-4 py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  >
                    <Settings className="h-4 w-4" /> الإعدادات
                  </a>
                  <hr className="border-neutral-200 dark:border-neutral-800" />
                  <a
                    href="#logout"
                    className="flex items-center gap-2 px-4 py-2.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                  >
                    <LogOut className="h-4 w-4" /> تسجيل الخروج
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
