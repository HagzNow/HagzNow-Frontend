import {
  X,
 
} from "lucide-react";
export default function Sidebar({
  menuItems = [],
  activeKey,
  onChange = () => {},
  collapsed,
  open,
  setOpen,
}) {
  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 md:hidden ${
          open ? "block" : "hidden"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Panel */}
      <aside
        className={`fixed md:static end-0 top-0 z-50 h-full md:h-auto w-80 md:w-72 ${
          collapsed ? "md:w-20" : ""
        } max-w-[85vw] bg-white dark:bg-neutral-950 border-s border-neutral-200 dark:border-neutral-800 shadow-xl md:shadow-none transform transition-transform ${
          open ? "translate-x-0" : "translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800 md:hidden">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-2xl bg-emerald-600" />
            <span className="font-extrabold">ArenaAdmin</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-xl p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex items-center justify-between p-5 border-b border-neutral-200 dark:border-neutral-800">
         
            القائمة
       
          <button className="hidden md:inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800"></button>
        </div>

        <nav className="p-2">
          {menuItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={() => onChange(item.key)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 my-0.5 text-sm font-medium ${
                activeKey === item.key
                  ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300"
                  : "hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
              }`}
            >
              <span className="shrink-0">{item.icon}</span>
              <span className={`${collapsed ? "md:hidden" : ""}`}>
                {item.label}
              </span>
              {item.badge && (
                <span
                  className={`ms-auto ${
                    collapsed ? "md:hidden" : ""
                  } rounded-full text-[10px] px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800`}
                >
                  {item.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        <div
          className={`mt-auto p-3 text-xs text-neutral-500 border-t border-neutral-200 dark:border-neutral-800 ${
            collapsed ? "md:hidden" : ""
          }`}
        >
          © {new Date().getFullYear()} ملعبك — كل الحقوق محفوظة
        </div>
      </aside>
    </>
  );
}
