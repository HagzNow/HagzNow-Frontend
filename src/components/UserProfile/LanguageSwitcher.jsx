export default function LanguageSwitcher({ language, setLanguage }) {
  return (
    <div className="border-t mt-12 pt-8">
      <h2 className="text-xl font-bold text-gray-900 mb-2">اللغة</h2>
      <p className="text-gray-600 mb-6">تغيير اللغة واللهجة المستخدمة</p>

      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <span className="text-gray-700">Arabic</span>
          <button
            type="button"
            onClick={() => setLanguage(language === "arabic" ? "english" : "arabic")}
            className="relative inline-block w-12 h-6 bg-green-600 rounded-full cursor-pointer"
          >
            <div
              className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                language === "arabic" ? "right-1" : "right-7"
              }`}
            ></div>
          </button>
          <span className="text-gray-700">English</span>
        </div>
        <span className="text-gray-600">لغة العرض</span>
      </div>
    </div>
  );
}
