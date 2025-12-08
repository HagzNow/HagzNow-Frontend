export default function LanguageSwitcher({ language, setLanguage }) {
  return (
    <div className="border-t dark:border-gray-700 mt-12 pt-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">اللغة</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">تغيير اللغة واللهجة المستخدمة</p>

      <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-colors">
        <div className="flex items-center gap-3">
          <span className="text-gray-700 dark:text-gray-300">Arabic</span>
          <button
            type="button"
            onClick={() => setLanguage(language === "arabic" ? "english" : "arabic")}
            className="relative inline-block w-12 h-6 bg-green-600 dark:bg-green-700 rounded-full cursor-pointer hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
          >
            <div
              className={`absolute top-1 bg-white dark:bg-gray-200 w-4 h-4 rounded-full transition-transform ${
                language === "arabic" ? "right-1" : "right-7"
              }`}
            ></div>
          </button>
          <span className="text-gray-700 dark:text-gray-300">English</span>
        </div>
        <span className="text-gray-600 dark:text-gray-400">لغة العرض</span>
      </div>
    </div>
  );
}
