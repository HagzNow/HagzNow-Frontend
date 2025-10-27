export default function StadiumInfo() {
  return (
    <div className="bg-white rounded-md shadow p-6">
      <h2 className="text-lg font-bold text-green-700 mb-2">وصف الملعب</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        ملعب الأبطال هو واحد من أحدث الملاعب الرياضية المجهزة بأفضل أنظمة الإضاءة
        والعشب الصناعي عالي الجودة. مناسب لكرة القدم والخماسيات، ويوفر بيئة مثالية
        للعب الترفيهي والمنافسات الرسمية.
      </p>

      <h3 className="font-semibold text-green-700 mb-1">القواعد والأنظمة</h3>
      <ul className="list-disc list-inside text-slate-600 mb-3">
        <li>احترام مواعيد الحجز بدقة.</li>
        <li>الحفاظ على نظافة الملعب والمرافق.</li>
        <li>يُمنع التدخين داخل المرافق.</li>
      </ul>

      <h3 className="font-semibold text-green-700 mb-1">السياسات</h3>
      <p className="text-slate-600 text-sm">يُسمح بالإلغاء قبل 24 ساعة من موعد الحجز.</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">غرف تبديل</span>
        <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">إضاءة ليلية</span>
        <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">موقف سيارات</span>
      </div>
    </div>
  );
}