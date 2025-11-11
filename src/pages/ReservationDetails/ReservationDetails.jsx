import React, { useContext, useEffect, useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { GiDuration } from "react-icons/gi";
import { CiCreditCard1 } from "react-icons/ci";
import { reservationContext } from "../../Contexts/ReservationContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../apis/config";
import { formatTime, getTimeRanges } from "../../utils/timeRange";

export default function ReservationDetails() {
  let [arena, setArena] = useState();
  let [loadbuttom, setLoadButtom] = useState(false);
  const navigate = useNavigate();

  let {
    selectedExtras,
    slots,
    date,
    submitReservation,
    arenaId,
    resetReservation,
    handleBack,
  } = useContext(reservationContext);

  /* to calculate price  */
  const hoursPrice =
    (arena?.data.pricePerHour * slots.length * arena?.data.depositPercent) /
    100;
  const extrasPrice = selectedExtras.reduce(
    (sum, extra) => sum + Number(extra.price || 0),
    0
  );
  const totalPrice = hoursPrice + extrasPrice;

  async function handelSubmit() {
    setLoadButtom(true);
    try {
      const response = await submitReservation();
      console.log(response);
      if (response?.isSuccess) {
        const reservationId = response.data.id;
        navigate(`/confirm/${reservationId}`);
      } else {
        console.error("فشل في إنشاء الحجز");
      }
    } catch (err) {
      console.error("Error in handelSubmit:", err);
    } finally {
      setLoadButtom(false);
    }
  }

  async function getarenaDetails() {
    try {
      let { data } = await baseUrl.get(`/arenas/${arenaId}`);
      setArena(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleCancelReservation() {
    navigate("/user-arena");
    resetReservation();
  }

  const ranges = getTimeRanges(slots);
  const { i18n } = useTranslation();
  const dayName =
    i18n.language === "ar"
      ? date.locale("ar").format("dddd")
      : date.locale("en").format("dddd");

  useEffect(() => {
    getarenaDetails();
  }, []);

  return (
    <>
      <div className="">
        <div className="rounded-xl overflow-hidden shadow-md">
          <div className="relative">
            <img
              src={arena?.data.thumbnail}
              alt="stadium"
              className="w-full h-90 object-cover"
            />
            <div className="absolute bottom-4 right-6 text-white">
              <h2 className="text-2xl font-bold">{arena?.data.name}</h2>
              <p className="text-sm">
                {arena?.data.location.city} - {arena?.data.location.governorate}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 mt-8">
          <div className="flex flex-col space-y-6">
            <h3 className="font-bold text-lg">تفاصيل الحجز</h3>

            <div className="p-6 border-2 border-secondColor rounded-2xl grid sm:grid-cols-2 grid-cols-1 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-2">التاريخ :</p>
                <div className="flex items-center gap-2">
                  <MdOutlineDateRange className="text-blue-400" />
                  <h4>{dayName}</h4>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">الوقت :</p>
                <div className="flex items-start gap-2">
                  <FaRegClock className="text-blue-400 mt-1" />
                  <div className="flex flex-col gap-1">
                    {ranges.map((range, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg shadow-sm text-sm"
                      >
                        من {formatTime(range.start, i18n.language)} إلى{" "}
                        {formatTime(range.end + 1, i18n.language)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">المدة :</p>
                <div className="flex items-center gap-2">
                  <GiDuration className="text-blue-400" />
                  <h4>
                    {slots.length < 2 ? "ساعة واحدة" : `${slots.length} ساعات`}
                  </h4>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">طريقة الدفع :</p>
                <div className="flex items-center gap-2">
                  <CiCreditCard1 className="text-blue-400" />
                  <h4>محفظة التطبيق</h4>
                </div>
              </div>

              <div className="sm:col-span-2">
                <p className="text-sm text-gray-500 mb-2">الإضافات :</p>
                <div className="flex items-start gap-2">
                  <CiCreditCard1 className="text-blue-400 mt-1" />
                  {selectedExtras.length > 0 ? (
                    <ul className="flex flex-col gap-2">
                      {selectedExtras.map((extra) => (
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
                    <h4 className="text-gray-500">لا توجد إضافات مختارة</h4>
                  )}
                </div>
              </div>
            </div>

            <p className="font-bold text-thirdColor text-2xl">
              الإجمالي :
              <span className="text-mainColor font-bold">
                {" "}
                {totalPrice} جنيه مصري{" "}
              </span>
            </p>
          </div>

          <div className="flex flex-col space-y-6">
            <h3 className="font-bold text-lg">الإجراءات</h3>
            <div className="flex flex-col gap-4 p-5 border border-gray-200 rounded-2xl shadow-sm">
              <button
                disabled={loadbuttom}
                className="btn bg-mainColor w-full"
                onClick={handelSubmit}
              >
                {loadbuttom ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  "تأكيد الحجز"
                )}
              </button>

              <button
                className="btn bg-red-600 w-full"
                onClick={handleCancelReservation}
              >
                إلغاء الحجز
              </button>

              <button className="btn bg-thirdColor w-full" onClick={handleBack}>
                تعديل الحجز
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
