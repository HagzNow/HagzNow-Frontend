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

export default function Sidebar({ open, onClose }) {
  const initialOpen = Object.fromEntries(navSections.map((s) => [s.title, !!s.openByDefault]));
  const [expanded, setExpanded] = useState(initialOpen);
  const [active, setActive] = useState("new-booking");

  const Section = ({ section }) => {
    const isOpen = expanded[section.title];
    return (
      <div className="rounded-xl border border-gray-100 bg-white">
        <button
          onClick={() => setExpanded((s) => ({ ...s, [section.title]: !s[section.title] }))}
          className="w-full px-3 py-2 flex items-center justify-between text-2xl font-medium text-gray-700 hover:bg-gray-50 rounded-xl"
        >
          <span>{section.title}</span>
          {isOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
        </button>
        {isOpen && (
          <ul className="px-1 pb-2">
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id && item.type === "link";
              const base = "w-full flex items-center justify-between gap-2 px-3 py-2 my-1 rounded-lg text-sm";
              const state = isActive ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 text-gray-700";

              if (item.type === "static") {
                return (
                  <li key={item.id}>
                    <div className={`${base} text-gray-600`}>
                      <span className="flex items-center gap-3">
                        <Icon className="size-4" />
                        {item.label}
                      </span>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.id}>
                  <button onClick={() => setActive(item.id)} className={`${base} ${state}`}>
                    <span className="flex items-center gap-3">
                      <Icon className="size-4" />
                      {item.label}
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
        <div className="h-full w-72 bg-white border-s border-gray-200 flex flex-col p-2" dir="rtl">
          <nav className="flex-1 overflow-y-auto space-y-2">
            {navSections.map((section) => (
              <Section key={section.title} section={section} />
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
