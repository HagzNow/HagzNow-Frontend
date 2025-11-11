import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import baseUrl from "../../apis/config";
import { formatTime, getTimeRanges } from "../../utils/timeRange";
import { useTranslation } from "react-i18next";

export default function ConfirmReservation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReservation() {
      try {
        setLoading(true);
        const { data } = await baseUrl.get(`/reservations/${id}`);
        setReservation(data.data);
      } catch (err) {
        console.error(err);
        setError("حدث خطأ أثناء جلب بيانات الحجز");
      } finally {
        setLoading(false);
      }
    }

    fetchReservation();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">جاري تحميل بيانات الحجز...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  if (!reservation) {
    return <p className="text-center mt-10">لا توجد بيانات حجز</p>;
  }

  const arena = reservation.arena;
  const ranges = getTimeRanges(reservation.slots || []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="flex flex-col items-center text-center mb-8">
        <FaCheckCircle className="text-green-500 text-6xl mb-3" />
        <h1 className="text-3xl font-bold text-green-700 mb-1">
          تم تأكيد حجزك!
        </h1>
        <p className="text-gray-600">
          تم تأكيد الحجز بنجاح. نتطلع لرؤيتك قريبًا.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md w-full max-w-2xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-right border-b pb-2 border-b-gray-300">
          تفاصيل الحجز
        </h2>

        <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-700">
          <p className="font-medium">الملعب</p>
          <p className="text-right">{arena?.name}</p>

          <p className="font-medium">التاريخ</p>
          <p className="text-right">{reservation.date}</p>

          <p className="font-medium">الموقع</p>
          <p className="text-right">{arena?.locationSummary}</p>

          <p className="font-medium">الوقت</p>
          <div className="text-right flex flex-wrap gap-2 justify-start">
            {ranges.length > 0 ? (
              ranges.map((range, i) => (
                <span
                  key={i}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg shadow-sm text-sm"
                >
                  من {formatTime(range.start, i18n.language)} إلى{" "}
                  {formatTime(range.end + 1, i18n.language)}
                </span>
              ))
            ) : (
              <span>غير محدد</span>
            )}
          </div>

          <p className="font-medium">الإضافات</p>
          <div className="text-right">
            {reservation.selectedExtras?.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {reservation.selectedExtras.map((extra) => (
                  <li
                    key={extra.id}
                    className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg border border-gray-100 shadow-sm"
                  >
                    <span className="text-gray-800 font-medium">
                      {extra.name}
                    </span>
                    <span className="text-mainColor font-semibold">
                      {extra.price} ج.م
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">لا توجد إضافات</p>
            )}
          </div>
        </div>

        <div className="border-t border-t-gray-300 mt-4 pt-3 text-sm">
          <div className="flex justify-between">
            <span>سعر الساعات</span>
            <span>{reservation.playTotalAmount} جنيه</span>
          </div>
          <div className="flex justify-between">
            <span>سعر الإضافات</span>
            <span>{reservation.extrasTotalAmount} جنيه</span>
          </div>
          <div className="flex justify-between font-bold text-green-600 mt-2">
            <span>الإجمالي المستحق</span>
            <span>{reservation.totalAmount} جنيه</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl justify-center">
        <button
          onClick={() => navigate("/user-arena")}
          className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition"
        >
          العودة للرئيسية
        </button>
        <button className="bg-gray-200 text-gray-700 py-2 px-6 rounded-full hover:bg-gray-300 transition">
          عرض حجوزاتي
        </button>
      </div>
    </div>
  );
}
