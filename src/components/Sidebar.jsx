import { useState, useMemo, useEffect } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function Sidebar({
  mode,
  menuItems = [],
  navSections = [],
  activeKey,
  onChange = () => { },
  open = true,
  onClose = () => { },
  isRTL = true,
  className = '',
}) {
  const navigate = useNavigate();
  const location = useLocation();

  // determine mode if not explicitly provided
  const inferredMode = mode || (navSections && navSections.length ? 'owner' : 'admin');

  // expanded sections state
  const initialOpen = useMemo(() => {
    if (!navSections || navSections.length === 0) return {};
    return Object.fromEntries(navSections.map((s) => [s.title, !!s.openByDefault]));
  }, [navSections]);
  const [expanded, setExpanded] = useState(initialOpen);

  // active item state
  const [localActive, setLocalActive] = useState(activeKey || menuItems[0]?.key || navSections[0]?.items?.[0]?.id);
  const active = activeKey ?? localActive;

  const handleSelect = (keyOrId, to) => {
    setLocalActive(keyOrId);
    onChange(keyOrId);
    if (to) navigate(to);
  };

  const normalizePath = (p) => {
    if (!p) return '';
    if (p === '/') return '/';
    return p.replace(/\/+$/, '');
  };

  const currentPath = normalizePath(location.pathname);
  const isActivePath = (path) => {
    const target = normalizePath(path);
    if (!target) return false;
    if (target === '/') return currentPath === '/';
    return currentPath === target || currentPath.startsWith(`${target}/`);
  };

  // sync active item with current path when navigation happens outside the sidebar (e.g., clicking logo)
  useEffect(() => {
    // admin menu check
    const menuMatch = menuItems.find((item) => item.to && isActivePath(item.to));
    if (menuMatch) {
      setLocalActive(menuMatch.key);
      return;
    }

    // nav sections check
    for (const section of navSections) {
      const itemMatch = (section.items || []).find((item) => isActivePath(item.path));
      if (itemMatch) {
        setLocalActive(itemMatch.id);
        return;
      }
    }
  }, [currentPath, isActivePath, menuItems, navSections]);

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40  bg-black/40 lg:hidden transition-opacity duration-200 ${open ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <aside
        dir={isRTL ? 'rtl' : 'ltr'}
        className={[
          'fixed top-0 bottom-0 z-50 bg-white dark:bg-gray-800 shadow-xl dark:shadow-gray-900/50 transform transition-all duration-300 ease-in-out',
          isRTL ? 'right-0' : 'left-0',
          open ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full',
          'lg:translate-x-0 lg:static lg:shadow-none lg:w-72',
          className,
        ].join(' ')}
      >
        {/* Header */}
        <div
        // className={`flex items-center justify-between px-4 py-[10px] ${
        //   inferredMode !== "admin"
        //     ? "border-b border-neutral-200 dark:border-gray-700"
        //     : ""
        // }`}
        >
          {inferredMode !== 'admin' && (
            <div className="flex flex-1 items-center justify-center py-2">
              <span className="font-extrabold text-lg text-gray-900 dark:text-white">لوحة التحكم</span>
            </div>
          )}
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="إغلاق القائمة"
          >
            <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col h-full bg-white dark:bg-gray-800 mt-5">
          {/* Menu Items (admin mode) */}
          {inferredMode === 'admin' && menuItems.length > 0 && (
            <ul className="px-3 py-2 space-y-1">
              {menuItems.map((item) => {
                const isActiveItem = item.to ? isActivePath(item.to) : active === item.key;
                return (
                  <li key={item.key}>
                    {item.to ? (
                      <Link
                        to={item.to}
                        onClick={() => handleSelect(item.key, item.to)}
                        className={[
                          'group flex items-center gap-3 rounded-xl px-3 py-2 transition-colors',
                          isActiveItem
                            ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-semibold'
                            : 'text-neutral-700 dark:text-gray-300 hover:bg-neutral-50 dark:hover:bg-gray-700',
                        ].join(' ')}
                      >
                        <span className="shrink-0">{item.icon}</span>
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <span className="ms-auto rounded-full text-[10px] px-2 py-0.5 bg-neutral-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleSelect(item.key)}
                        className={[
                          'w-full text-left flex items-center gap-3 rounded-xl px-3 py-2 transition-colors',
                          isActiveItem
                            ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-semibold'
                            : 'text-neutral-700 dark:text-gray-300 hover:bg-neutral-50 dark:hover:bg-gray-700',
                        ].join(' ')}
                      >
                        <span className="shrink-0">{item.icon}</span>
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <span className="ms-auto rounded-full text-[10px] px-2 py-0.5 bg-neutral-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          )}

          {/* Nav Sections */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-3">
            {navSections.map((section) => {
              const isOpen = !!expanded[section.title];
              const sectionActive =
                (section.path && isActivePath(section.path)) ||
                (section.items || []).some((item) => isActivePath(item.path));

              return (
                <div
                  key={section.title}
                  className="rounded-xl border border-neutral-100 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors"
                >
                  <button
                    onClick={() => {
                      if (section.items && section.items.length > 0) {
                        setExpanded((s) => ({
                          ...s,
                          [section.title]: !s[section.title],
                        }));
                      } else if (section.path) navigate(section.path);
                    }}
                    className={[
                      'w-full px-3 py-2 flex items-center justify-between text-sm font-medium rounded-t-xl transition-colors',
                      sectionActive
                        ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-semibold'
                        : 'text-neutral-700 dark:text-gray-300 hover:bg-neutral-50 dark:hover:bg-gray-700',
                    ].join(' ')}
                  >
                    <span className="flex items-center gap-2">
                      {section.icon && <section.icon className="h-4 w-4" />}
                      <span>{section.title}</span>
                    </span>

                    {section.items &&
                      section.items.length > 0 &&
                      (isOpen ? (
                        <ChevronUp className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      ))}
                  </button>

                  {isOpen && section.items && (
                    <ul className="px-1 pb-2">
                      {section.items.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => handleSelect(item.id, item.path)}
                            className={[
                              'w-full flex items-center gap-3 px-3 py-2 my-1 rounded-lg text-sm transition-colors',
                              isActivePath(item.path)
                                ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-semibold'
                                : 'text-neutral-700 dark:text-gray-300 hover:bg-neutral-50 dark:hover:bg-gray-700',
                            ].join(' ')}
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
        </div>
      </aside>
    </>
  );
}
