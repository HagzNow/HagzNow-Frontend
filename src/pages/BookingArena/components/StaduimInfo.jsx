export default function StadiumInfo({ description, policy, extras }) {
  return (
    <div className="bg-white rounded-md shadow p-6">
      <h2 className="text-lg font-bold text-green-700 mb-2">وصف الملعب</h2>
      <p className="text-slate-700 leading-relaxed mb-4">{description}</p>

      <h3 className="font-semibold text-green-700 mb-1">القواعد والأنظمة</h3>
      <ul className="list-disc list-inside text-slate-600 mb-3">
        <li>احترام مواعيد الحجز بدقة.</li>
        <li>الحفاظ على نظافة الملعب والمرافق.</li>
        <li>يُمنع التدخين داخل المرافق.</li>
      </ul>

      <h3 className="font-semibold text-green-700 mb-1">السياسات</h3>
      <p className="text-slate-600 text-sm">{policy}</p>

      <h3 className="font-semibold text-green-700 mb-2 mt-4">الخدمات الإضافية</h3>
      <div className="flex flex-wrap gap-2">
        {extras.map((extra) => (
          <span
            key={extra.id}
            className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full"
          >
            {extra.name} ({extra.price} جنيه)
          </span>
        ))}
      </div>
    </div>
  );
}
