{
  /*

  import { useState } from "react";
import {
  Menu,
  X,
  Search,
  Bell,
  Plus,
  LayoutDashboard,
  CalendarDays,
  Settings,
  SquarePlus,
  Rows3,
  ChevronDown,
  ChevronUp,
  Building2,
  ShieldCheck,
} from "lucide-react";


const navSections = [
  {
    title: "لوحة التحكم",
    openByDefault: true,
    items: [
      { id: "dashboard", type: "link", label: "لوحة التحكم", icon: LayoutDashboard },
      { id: "templates", type: "link", label: "عرض كل القوالب", icon: Rows3 },
      { id: "add-field", type: "link", label: "إضافة ملعب", icon: SquarePlus },
    ],
  },
  {
    title: "الحجوزات",
    openByDefault: true,
    items: [
      { id: "calendar", type: "static", label: "التقويم", icon: CalendarDays },
      { id: "new-booking", type: "link", label: "حجز جديد", icon: Plus },
    ],
  },
  {
    title: "الإعدادات",
    openByDefault: false,
    items: [
      { id: "venues", type: "link", label: "الساحات", icon: Building2 },
      { id: "policies", type: "link", label: "السياسات", icon: ShieldCheck },
      { id: "settings", type: "link", label: "الإعدادات", icon: Settings },
    ],
  },
];

function Sidebar({ open, onClose }) {
  const initialOpen = Object.fromEntries(navSections.map(s => [s.title, !!s.openByDefault]));
  const [expanded, setExpanded] = useState(initialOpen);
  const [active, setActive] = useState("new-booking");

  const Section = ({ section }) => {
    const isOpen = expanded[section.title];
    return (
      <div className="rounded-xl border border-gray-100 bg-white">
        <button
          onClick={() => setExpanded(s => ({ ...s, [section.title]: !s[section.title] }))}
          className="w-full px-3 py-2 flex items-center justify-between text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl"
          aria-expanded={isOpen}
        >
          <span className="flex items-center gap-2">
            <span>{section.title}</span>
          </span>
          {isOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
        </button>
        {isOpen && (
          <ul className="px-1 pb-2">
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id && item.type === "link";
              const baseCls =
                "w-full flex items-center justify-between gap-2 px-3 py-2 my-1 rounded-lg text-sm";
              const stateCls = isActive
                ? "bg-gray-100 text-gray-900"
                : "hover:bg-gray-50 text-gray-700";

              if (item.type === "static") {
                return (
                  <li key={item.id}>
                    <div className={`${baseCls} text-gray-600 border border-transparent`}>
                      <span className="flex items-center gap-3">
                        <Icon className="size-4" />
                        <span>{item.label}</span>
                      </span>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActive(item.id)}
                    className={`${baseCls} ${stateCls}`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="size-4" />
                      <span>{item.label}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  };

  const Content = (
    <div
      className="h-full w-72 bg-white border-s border-gray-200 flex flex-col p-2"
      dir="rtl"
    >
   
      <nav className="flex-1 overflow-y-auto space-y-2">
        {navSections.map((section) => (
          <Section key={section.title} section={section} />
        ))}
      </nav>
    </div>
  );

  return (
    <>
    
      <div
        className={`fixed inset-0 bg-black/30 z-40 md:hidden transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
    
      <aside
        className={`fixed top-0 bottom-0 end-0 z-50 transform transition-transform md:translate-x-0 ${
          open ? "translate-x-0" : "translate-x-full"
        } md:static md:block md:h-auto`}
      >
        {Content}
      </aside>
    </>
  );
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
   
      <header className="sticky top-0 z-30 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between gap-3">
        
            <div className="flex items-center gap-2">
              <button
                className="md:hidden p-2 rounded-xl hover:bg-gray-100"
                onClick={() => setSidebarOpen(true)}
                aria-label="فتح القائمة"
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

    
      <div className="max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-12 gap-6">
        
        <div className="md:col-span-3 hidden md:block">
          <Sidebar open={true} onClose={() => setSidebarOpen(false)} />
        </div>

        <div className="md:col-span-9">
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="mb-4 p-3 rounded-xl border bg-amber-50 text-amber-800 text-sm text-center max-w-md mx-auto">
              شبه هذا الوقت محجوز جزئياً، قد يتداخل مع حجوزات أخرى
            </div>

            <div className="grid gap-6">
              <section className="rounded-2xl border p-4">
                <h3 className="font-semibold text-center mb-3">تفاصيل الحجز</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">التاريخ</label>
                    <input type="date" className="w-full rounded-xl border bg-gray-50 px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">الملعب</label>
                    <select className="w-full rounded-xl border bg-gray-50 px-3 py-2">
                      <option>ملعب كرة قدم 1</option>
                      <option>ملعب كرة قدم 2</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">الرياضة</label>
                    <select className="w-full rounded-xl border bg-gray-50 px-3 py-2">
                      <option>كرة قدم</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">الوقت</label>
                    <select className="w-full rounded-xl border bg-gray-50 px-3 py-2">
                      <option>10:00 صباحًا - 11:00 صباحًا</option>
                    </select>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border p-4">
                <h3 className="font-semibold text-center mb-3">معلومات العميل</h3>
                <div className="grid gap-3">
                  <input className="rounded-xl border bg-gray-50 px-3 py-2" placeholder="اسم العميل" />
                  <input className="rounded-xl border bg-gray-50 px-3 py-2" placeholder="البريد الإلكتروني" />
                  <input className="rounded-xl border bg-gray-50 px-3 py-2" placeholder="رقم الهاتف" />
                </div>
              </section>

              <section className="rounded-2xl border p-4">
                <h3 className="font-semibold text-center mb-3">الدفع والملاحظات</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input className="rounded-xl border bg-gray-50 px-3 py-2" placeholder="السعر" />
                  <select className="rounded-xl border bg-gray-50 px-3 py-2">
                    <option>مدفوع</option>
                    <option>غير مدفوع</option>
                  </select>
                  <div className="sm:col-span-2">
                    <input className="w-full rounded-xl border bg-gray-50 px-3 py-2" placeholder="ملاحظات" />
                  </div>
                </div>
              </section>

              <div className="flex items-center gap-2">
                <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white">حفظ الحجز</button>
                <button className="px-4 py-2 rounded-xl border">إلغاء</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="md:hidden">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
    </div>
  );
}

  
  */
}



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
