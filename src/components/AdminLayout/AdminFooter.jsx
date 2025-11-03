export default function AdminFooter() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-neutral-500 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span>الشروط</span>
          <span>الخصوصية</span>
          <span>الدعم</span>
        </div>
        <div>نسخة العرض — {new Date().getFullYear()}</div>
      </div>
    </footer>
  );
}
