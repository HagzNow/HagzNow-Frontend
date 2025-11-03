import { useState } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  Settings,
  SquarePlus,
  Rows3,
  ChevronDown,
  ChevronUp,
  Plus,
  Building2,
  ShieldCheck,
  X,
} from "lucide-react";

const navSections = [
  {
    title: "لوحة التحكم",
    openByDefault: true,
    items: [
      { id: "dashboard", label: "لوحة التحكم", icon: LayoutDashboard },
      { id: "templates", label: "عرض كل القوالب", icon: Rows3 },
      { id: "add-field", label: "إضافة ملعب", icon: SquarePlus },
    ],
  },
  {
    title: "الحجوزات",
    openByDefault: true,
    items: [
      { id: "calendar", label: "التقويم", icon: CalendarDays },
      { id: "new-booking", label: "حجز جديد", icon: Plus },
    ],
  },
  {
    title: "الإعدادات",
    openByDefault: false,
    items: [
      { id: "venues", label: "الساحات", icon: Building2 },
      { id: "policies", label: "السياسات", icon: ShieldCheck },
      { id: "settings", label: "الإعدادات", icon: Settings },
    ],
  },
];

export default function Sidebar({ open, onClose, isRTL }) {
  const initialOpen = Object.fromEntries(navSections.map((s) => [s.title, !!s.openByDefault]));
  const [expanded, setExpanded] = useState(initialOpen);
  const [active, setActive] = useState("new-booking");

  const Section = ({ section }) => {
    const isOpen = expanded[section.title];
    return (
      <div className="rounded-xl border border-gray-100 bg-white ">
        {/* عنوان القسم */}
        <button
          onClick={() => setExpanded((s) => ({ ...s, [section.title]: !s[section.title] }))}
          className="w-full px-3 py-2 flex items-center justify-between text-lg font-medium text-gray-700 hover:bg-gray-50 rounded-xl  "
        >
          <span>{section.title}</span>
          {isOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
        </button>

        {/* العناصر */}
        {isOpen && (
          <ul className="px-1 pb-2 ">
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActive(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 my-1 rounded-lg text-sm transition ${
                      isActive
                        ? "bg-green-100 text-green-800 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  };

  return (
    <>
      {/* ✅ Overlay للموبايل فقط */}
      <div
        className={`fixed inset-0 z-40 bg-[rgba(184,187,184,0.78)] backdrop-blur-md transition-all duration-300 md:hidden ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* ✅ Sidebar الرئيسي */}
      <aside
        className={`fixed top-0 bottom-0 z-50 w-72 bg-white border-s border-gray-200 shadow-xl transform transition-transform duration-300 ease-in-out
        ${isRTL ? "right-0" : "left-0"}
        ${open ? "translate-x-0" : isRTL ? "translate-x-full" : "-translate-x-full"}
        md:translate-x-0 md:static md:shadow-none md:w-64 lg:w-72`}
      >
        {/* ✅ Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 pb-[24px]">
          <h2 className="text-lg font-bold text-gray-800">لوحة التحكم</h2>
          {/* زر الإغلاق يظهر فقط في الموبايل */}
          <button
            onClick={onClose}
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X className="size-5 text-gray-700" />
          </button>
        </div>

        {/* ✅ Navigation */}
        <nav className="flex-1 overflow-y-auto space-y-3 p-3" dir={isRTL ? "rtl" : "ltr"}>
          {navSections.map((section) => (
            <Section key={section.title} section={section} />
          ))}
        </nav>
      </aside>
    </>
  );
}
