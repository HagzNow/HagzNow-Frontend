import React, { useEffect, useState, useMemo } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import baseUrl from "../../apis/config";
import { formatTime, getTimeRanges } from "../../utils/timeRange";
import { useTranslation } from "react-i18next";

export default function ConfirmReservation() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const location = useLocation();
  const reservationData = location.state;
  console.log(reservationData);

  const [reservation, setReservation] = useState(null);
  const [arenaDetails, setArenaDetails] = useState(null);
  const [loadingArena, setLoadingArena] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("lastReservation");
      if (stored) {
        const parsed = JSON.parse(stored);
        setReservation(parsed);
        if (parsed?.arenaId) {
          getArenaDetails(parsed.arenaId);
        }
      }
    } catch (error) {
      console.error("Error parsing reservation from localStorage:", error);
    }
  }, []);

  async function getArenaDetails(arenaId) {
    try {
      setLoadingArena(true);
      const { data } = await baseUrl.get(`/arenas/${arenaId}`);
      setArenaDetails(data.data);
    } catch (err) {
      console.error("Error fetching arena details:", err);
    } finally {
      setLoadingArena(false);
    }
  }

  const { hoursPrice, extrasPrice, totalPrice } = useMemo(() => {
    if (!arenaDetails || !reservation)
      return { hoursPrice: 0, extrasPrice: 0, totalPrice: 0 };

    const slots = reservation?.slots || [];
    const selectedExtras = reservation?.selectedExtras || [];

    const pricePerHour = Number(arenaDetails.pricePerHour) || 0;
    const hoursPrice = pricePerHour * slots.length;

    const extrasPrice = selectedExtras.reduce(
      (sum, extra) => sum + Number(extra.price || 0),
      0
    );

    return { hoursPrice, extrasPrice, totalPrice: hoursPrice + extrasPrice };
  }, [arenaDetails, reservation]);

  if (!reservation) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        لا توجد بيانات حجز متاحة
      </div>
    );
  }

  const { slots = [] } = reservation;
  const ranges = getTimeRanges(slots);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="flex flex-col items-center text-center mb-8">
        <FaCheckCircle className="text-green-500 text-6xl mb-3" />
        <h1 className="text-3xl font-bold text-green-700 mb-1">
          تم تأكيد حجزك!
        </h1>
        <p className="text-gray-600">
          لقد تم تأكيد حجزك بنجاح. نتطلع لرؤيتك قريبًا.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md w-full max-w-2xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-right border-b pb-2 border-b-gray-300">
          تفاصيل الحجز
        </h2>

        <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-700">
          <p className="font-medium">الملعب</p>
          <p className="text-right">{reservationData?.data.arena.name}</p>
          <p className="font-medium">التاريخ</p>
          <p className="text-right">
            {reservationData?.data.dateOfReservation}
          </p>

          <p className="font-medium">الموقع</p>
          <p className="text-right">
            {reservationData?.data.arena.locationSummary}
          </p>

          <p className="font-medium">الوقت</p>
          <div className="text-right flex flex-wrap gap-2 justify-start">
            {ranges.length > 0 ? (
              ranges.map((range, index) => (
                <span
                  key={index}
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
            {reservationData?.data.extras.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {reservationData?.data.extras.map((extra) => (
                  <li
                    key={extra.id}
                    className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg border border-gray-100 shadow-sm"
                  >
                    <span className="text-gray-800 font-medium">
                      {extra.name}
                    </span>
                    <span className="text-mainColor font-semibold">
                      {extra.price}{" "}
                      <span className="text-sm text-gray-500">ج.م</span>
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
            <span>{reservationData?.data.playTotalAmount}جنيه</span>
          </div>
          <div className="flex justify-between">
            <span>سعر الإضافات</span>
            <span>{reservationData?.data.extrasTotalAmount} جنيه</span>
          </div>
          <div className="flex justify-between font-bold text-green-600 mt-2">
            <span>الإجمالي المستحق</span>
            <span>{reservationData?.data.totalAmount} جنيه</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md w-full max-w-2xl p-6 mb-6 text-right">
        <h3 className="text-lg font-semibold mb-2 border-b pb-2 border-b-gray-300">
          سياسة الإلغاء
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          يمكن الإلغاء مجانًا حتى 24 ساعة قبل الموعد. بعد ذلك، سيتم خصم 50% من
          سعر الخدمة. في حال عدم الحضور سيتم خصم 100% من سعر الخدمة.
        </p>
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
