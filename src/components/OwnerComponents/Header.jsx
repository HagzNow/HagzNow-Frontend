import { Menu, Search, Bell, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Header({ onMenuClick, isRTL }) {
  const [adminName, setAdminName] = useState("المسؤول");

  useEffect(() => {
    // ✅ لو عندك توكن أو بيانات الأدمن متخزنة بعد الـ login:
    const token = localStorage.getItem("token");

    const fetchAdmin = async () => {
      try {
        // كده كده اللوكل هوست ده كده افتراضي
        const res = await axios.get("http://localhost:3000/admin/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // ✅ لو الـ API بيرجع الاسم في res.data.data.name مثلًا:
        if (res.data?.data?.name) {
          setAdminName(res.data.data.name);
        }
      } catch (err) {
        console.error("Error fetching admin name:", err);
      }
    };

    fetchAdmin();
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
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm">
              <Plus className="size-4" />
              <span className="text-sm">إضافة ساحة جديدة</span>
            </button>

            <button className="p-2 rounded-xl hover:bg-gray-100">
              <Bell className="size-5" />
            </button>

            {/* ✅ عرض اسم الأدمن */}
            <span className="font-semibold text-gray-800">{adminName}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
