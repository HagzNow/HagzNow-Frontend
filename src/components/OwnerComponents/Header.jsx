import { Menu, Search, Bell, Plus } from "lucide-react";

export default function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between gap-3">
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

          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm">
              <Plus className="size-4" />
              <span className="text-sm">إضافة ساحة جديدة</span>
            </button>
            <button className="p-2 rounded-xl hover:bg-gray-100">
              <Bell className="size-5" />
            </button>
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=128&auto=format&fit=crop"
              alt="avatar"
              className="w-9 h-9 rounded-full object-cover border"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
