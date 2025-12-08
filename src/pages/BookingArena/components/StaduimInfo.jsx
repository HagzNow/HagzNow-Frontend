export default function StadiumInfo({ description, policy, extras }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-md shadow dark:shadow-gray-900/50 p-6 transition-colors duration-300">
      <h2 className="text-lg font-bold text-green-700 dark:text-green-400 mb-2">وصف الملعب</h2>
      <p className="text-slate-700 dark:text-gray-300 leading-relaxed mb-4">{description}</p>

      <h3 className="font-semibold text-green-700 dark:text-green-400 mb-1">القواعد والأنظمة</h3>
      <ul className="list-disc list-inside text-slate-600 dark:text-gray-300 mb-3">
        <li>احترام مواعيد الحجز بدقة.</li>
        <li>الحفاظ على نظافة الملعب والمرافق.</li>
        <li>يُمنع التدخين داخل المرافق.</li>
      </ul>

      <h3 className="font-semibold text-green-700 dark:text-green-400 mb-1">السياسات</h3>
      <p className="text-slate-600 dark:text-gray-300 text-sm">{policy}</p>

      <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2 mt-4">الخدمات الإضافية</h3>
      <div className="flex flex-wrap gap-2">
        {extras.map((extra) => (
          <span
            key={extra.id}
            className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-3 py-1 rounded-full border border-green-200 dark:border-green-700"
          >
            {extra.name} ({extra.price} جنيه)
          </span>
        ))}
      </div>
    </div>
  );
}
