// import { useState, useMemo } from "react";
// import {
//   X,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";
// import { Link } from "react-router-dom"; 


// export default function Sidebar({
//   mode,
//   menuItems = [],
//   navSections = [],
//   activeKey,
//   onChange = () => {},
//   open = true,
//   onClose = () => {},
//   isRTL = true,
//   className = "",
// }) {
//   // determine mode if not explicitly provided
//   const inferredMode = mode || (navSections && navSections.length ? "owner" : "admin");
//   // owner state
//   const initialOpen = useMemo(() => {
//     if (!navSections || navSections.length === 0) return {};
//     return Object.fromEntries(navSections.map((s) => [s.title, !!s.openByDefault]));
//   }, [navSections]);

//   const [expanded, setExpanded] = useState(initialOpen);
//   const [localActive, setLocalActive] = useState(activeKey || (menuItems[0]?.key || navSections[0]?.items?.[0]?.id));

//   // keep localActive in sync if parent controls activeKey
//   const active = activeKey ?? localActive;

//   const handleSelect = (keyOrId, to) => {
//     setLocalActive(keyOrId);
//     onChange(keyOrId);
//     if (to) {
//       // reasonable navigation attempt for react-router-dom
//       // if using react-router, better to wrap items in <Link> and avoid programmatic navigation here
//     }
//   };

//   // mobile overlay visibility classes
//   const overlayVisible = open;

//   return (
//     <>
//       {/* Mobile overlay */}
//       <div
//         className={`fixed inset-0 z-40 bg-black/40 md:hidden transition-opacity duration-200 ${overlayVisible ? "opacity-100 visible" : "opacity-0 invisible"}`}
//         onClick={onClose}
//       />

//       {/* Sidebar Panel */}
//       <aside
//         dir={isRTL ? "rtl" : "ltr"}
//         className={[
//           "fixed top-0 bottom-0 z-50 w-72 bg-white border-s border-neutral-200 shadow-xl transform transition-transform duration-300 ease-in-out",
//           isRTL ? "right-0" : "left-0",
//           // slide in/out on mobile; always visible on md+
//           open ? "translate-x-0" : (isRTL ? "translate-x-full" : "-translate-x-full"),
//           "md:translate-x-0 md:static md:shadow-none md:w-72",
//           className,
//         ].join(" ")}
//         style={{ maxWidth: "85vw" }}
//       >
//         {/* Header (mobile shows close button) */}
//         {/* <div className="flex items-center justify-between px-4 py-[10px] border-b border-neutral-200"> */}

//       <div
//       className={`flex items-center justify-between px-4 py-[10px] ${
//       mode === "admin" ? "" : "border-b border-neutral-200"
//         }`}>
//             {mode !== "admin" && (
//             <div className="flex flex-1 items-center justify-center py-2">
//                   <span className="font-extrabold text-lg">لوحة التحكم</span>
//             </div>
//             )}
//           <button
//             onClick={onClose}
//             className="md:hidden p-2 rounded-full hover:bg-neutral-100 transition"
//             aria-label="إغلاق القائمة"
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="flex flex-col h-full">
//           {/* Title / small band */}
//           <div className="px-5 py-4 border-b">
//             <div className="text-sm font-semibold">القائمة</div>
//             <div className="text-xs text-neutral-500">تحكم سريع بالموقع</div>
//           </div>

//           {/* Nav area */}
//           <nav className="flex-1 overflow-y-auto p-3 space-y-3">
//             {inferredMode === "admin" && (
//               <ul className="space-y-1">
//                 {menuItems.map((item) => {
//                   const isActive = active === item.key;
//                   return (
//                     <li key={item.key}>
                      
//                       {item.to ? (
//                         <Link
//                           to={item.to}
//                           onClick={() => handleSelect(item.key, item.to)}
//                           className={[
//                             "group flex items-center gap-3 rounded-xl px-3 py-2 transition",
//                             isActive
//                               ? "bg-emerald-50 text-emerald-700 font-semibold"
//                               : "text-neutral-700 hover:bg-neutral-50",
//                           ].join(" ")}
//                         >
//                           <span className="shrink-0">{item.icon}</span>
//                           <span className="truncate">{item.label}</span>
//                           {item.badge && <span className="ms-auto rounded-full text-[10px] px-2 py-0.5 bg-neutral-100">{item.badge}</span>}
//                         </Link>
//                       ) : (
//                         <button
//                           onClick={() => handleSelect(item.key)}
//                           className={[
//                             "w-full text-left flex items-center gap-3 rounded-xl px-3 py-2 transition",
//                             isActive
//                               ? "bg-emerald-50 text-emerald-700 font-semibold"
//                               : "text-neutral-700 hover:bg-neutral-50",
//                           ].join(" ")}
//                         >
//                           <span className="shrink-0">{item.icon}</span>
//                           <span className="truncate">{item.label}</span>
//                           {item.badge && <span className="ms-auto rounded-full text-[10px] px-2 py-0.5 bg-neutral-100">{item.badge}</span>}
//                         </button>
//                       )}
//                     </li>
//                   );
//                 })}
//               </ul>
//             )}

//       {navSections.map((section) => {
//   const isOpen = !!expanded[section.title];

//   return (
//     <div key={section.title} className="rounded-xl border border-neutral-100 bg-white">
//       <button
//         onClick={() => {
          
//           if (section.items && section.items.length > 0) {
//             setExpanded((s) => ({ ...s, [section.title]: !s[section.title] }));
//           }
//         }}
//         className="w-full px-3 py-2 flex items-center justify-between text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-t-xl"
//       >
//         <span>{section.title}</span>
//         {/* السهم يظهر فقط لو فيه عناصر فرعية */}
//         {section.items && section.items.length > 0 && (
//           isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
//         )}
//       </button>

//       {isOpen && section.items && (
//         <ul className="px-1 pb-2">
//           {section.items.map((item) => (
//             <li key={item.id}>
//               <button
//                 onClick={() => handleSelect(item.id)}
//                 className="w-full flex items-center gap-3 px-3 py-2 my-1 rounded-lg text-sm text-neutral-700 hover:bg-neutral-50"
//               >
//                 {item.icon ? <item.icon className="h-4 w-4" /> : <span className="w-4" />}
//                 <span className="truncate">{item.label}</span>
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// })}

//           </nav>

//           {/* Footer */}
//           <div className="mt-auto p-3 text-xs text-neutral-500 border-t border-neutral-200">
//             © {new Date().getFullYear()} ملعبك — كل الحقوق محفوظة
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }


import { useState, useMemo } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom"; 

export default function Sidebar({

  navSections = [],
  open = true,
  onClose = () => {},
  isRTL = true,
  className = "",
}) {
  const navigate = useNavigate();
  const location = useLocation(); // 👈 هنا ناخد path الحالي

  const initialOpen = useMemo(() => {
    if (!navSections || navSections.length === 0) return {};
    return Object.fromEntries(navSections.map((s) => [s.title, !!s.openByDefault]));
  }, [navSections]);

  const [expanded, setExpanded] = useState(initialOpen);

  const handleSelect = (item) => {
    if (item.path) navigate(item.path);
  };

  const isActive = (path) => location.pathname === path; // 👈 تحديد العنصر النشط

  return (
    <>
      {/* Overlay Mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 md:hidden transition-opacity duration-200 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      <aside
        dir={isRTL ? "rtl" : "ltr"}
        className={[
          "fixed top-0 bottom-0 z-50 w-72 bg-white border-s border-neutral-200 shadow-xl transform transition-transform duration-300 ease-in-out",
          isRTL ? "right-0" : "left-0",
          open ? "translate-x-0" : isRTL ? "translate-x-full" : "-translate-x-full",
          "md:translate-x-0 md:static md:shadow-none md:w-72",
          className,
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-[10px] border-b border-neutral-200">
          <div className="flex flex-1 items-center justify-center py-2">
            <span className="font-extrabold text-lg">لوحة التحكم</span>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-2 rounded-full hover:bg-neutral-100 transition"
            aria-label="إغلاق القائمة"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-3">
          {navSections.map((section) => {
            const isOpen = !!expanded[section.title];
            const sectionActive = section.path && isActive(section.path); // لو القسم عنده path

            return (
              <div key={section.title} className="rounded-xl border border-neutral-100 bg-white">
                <button
                  onClick={() => {
                    if (section.items && section.items.length > 0) {
                      setExpanded((s) => ({ ...s, [section.title]: !s[section.title] }));
                    } else if (section.path) {
                      navigate(section.path);
                    }
                  }}
                  className={[
                    "w-full px-3 py-2 flex items-center justify-between text-sm font-medium rounded-t-xl",
                    sectionActive
                      ? "bg-emerald-50 text-emerald-700 font-semibold"
                      : "text-neutral-700 hover:bg-neutral-50",
                  ].join(" ")}
                >
                  <span>{section.title}</span>
                  {section.items && section.items.length > 0 &&
                    (isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                </button>

                {isOpen && section.items && (
                  <ul className="px-1 pb-2">
                    {section.items.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => handleSelect(item)}
                          className={[
                            "w-full flex items-center gap-3 px-3 py-2 my-1 rounded-lg text-sm",
                            isActive(item.path)
                              ? "bg-emerald-50 text-emerald-700 font-semibold"
                              : "text-neutral-700 hover:bg-neutral-50",
                          ].join(" ")}
                        >
                          {item.icon ? <item.icon className="h-4 w-4" /> : <span className="w-4" />}
                          <span className="truncate">{item.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>

        <div className="mt-auto p-3 text-xs text-neutral-500 border-t border-neutral-200">
          © {new Date().getFullYear()} ملعبك — كل الحقوق محفوظة
        </div>
      </aside>
    </>
  );
}
