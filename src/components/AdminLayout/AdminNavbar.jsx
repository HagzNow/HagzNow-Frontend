import { Menu, Bell, ChevronDown, LogOut, User, Settings } from "lucide-react";

export default function AdminNavbar({
  onMenuClick,
  notifCount = 3,
}) {
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
            {/* وضع مظلم */}
            <button
              className="inline-flex items-center justify-center rounded-xl p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="تبديل الوضع"
            ></button>

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
                className="inline-flex items-center gap-2 rounded-2xl ps-2 pe-3 py-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                aria-label="الملف الشخصي"
              >
                <User className="h-5 w-5 text-neutral-900 dark:text-white" />
                <span className="hidden sm:inline">Admin</span>

              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
