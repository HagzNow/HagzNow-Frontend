export default function AdminFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm">
      <div className="w-full px-4 sm:px-6 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-neutral-600 dark:text-neutral-400">
        <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
          <span className="hover:text-green-600 dark:hover:text-green-400 transition-colors cursor-pointer">الشروط</span>
          <span className="h-4 w-px bg-neutral-200 dark:bg-neutral-700" />
          <span className="hover:text-green-600 dark:hover:text-green-400 transition-colors cursor-pointer">الخصوصية</span>
          <span className="h-4 w-px bg-neutral-200 dark:bg-neutral-700" />
          <span className="hover:text-green-600 dark:hover:text-green-400 transition-colors cursor-pointer">الدعم</span>
        </div>
        <div className="text-neutral-500 dark:text-neutral-500">نسخة العرض — {year}</div>
      </div>
    </footer>
  );
}
