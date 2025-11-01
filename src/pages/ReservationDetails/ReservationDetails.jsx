import React, { useContext, useEffect, useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { GiDuration } from "react-icons/gi";
import { CiCreditCard1 } from "react-icons/ci";
import { reservationContext } from "../../Contexts/ReservationContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../apis/config";

export default function ReservationDetails() {
  let [arena, setArena] = useState();
  let [loadbuttom, setLoadButtom] = useState(false);

  let {
    selectedExtras,
    slots,
    date,
    submitReservation,
    arenaId,
    resetReservation,
    handleBack,
  } = useContext(reservationContext);
  const startHour = slots[0];
  const endHour = slots.length > 0 ? slots[slots.length - 1] + 1 : null;
  const navigate = useNavigate();

  async function handelSubmit() {
    setLoadButtom(true);
    let { isSuccess } = await submitReservation();
    setLoadButtom(false);
    if (isSuccess) {
      navigate("/confirm");
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
    resetReservation();
    navigate("/user-arena");
    
  }
  function formatHour(hour) {
    if (hour == null) return "";
    const period = hour >= 12 ? "مساءً" : "صباحًا";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${hour12} ${period}`;
  }

  const timeRange =
    slots.length > 0
      ? `من ${formatHour(startHour)} إلى ${formatHour(endHour)}`
      : "لم يتم اختيار وقت";



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
      <div className="max-w-6xl mx-auto p-4 py-5">
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

        <div className="grid grid-cols-2 gap-5 mt-5  p-5 ">
          <div>
            <h3 className="mb-5 font-bold ">تفاصيل الحجز</h3>
            <div className="grid grid-cols-2 gap-2 p-5 border-2 border-secondColor rounded-2xl ">
              <div>
                <p className=" text-sm text-gray-500 mb-2"> التاريخ : </p>
                <div className="flex space-x-2 items-center">
                  <MdOutlineDateRange className=" text-blue-400" />
                  <h4>{dayName}</h4>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2"> الوقت :</p>
                <div className="flex space-x-2 items-center">
                  <FaRegClock className=" text-blue-400" />
                  <h4>{timeRange}</h4>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">المدة :</p>
                <div className="flex space-x-2 items-center">
                  <GiDuration className=" text-blue-400" />
                  <h4>
                    {slots.length < 2 ? "ساعة واحدة" : `${slots.length} ساعات`}
                  </h4>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2"> طريقة الدفع :</p>
                <div className="flex space-x-2 items-center">
                  <CiCreditCard1 className=" text-blue-400" />
                  <h4>محفظة التطبيق</h4>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">إضافات :</p>
                <div className="flex space-x-2 items-center">
                  <CiCreditCard1 className=" text-blue-400" />
                  <h4>
                    {selectedExtras.join(", ") || "لا توجد إضافات مختارة"}
                  </h4>
                </div>
              </div>
            </div>
            <p className=" font-bold text-thirdColor text-2xl">
              الإجمالي :
              <span className=" text-mainColor font-bold"> 250 جنية مصرى </span>
            </p>
          </div>
          <div>
            <h3 className=" mb-5 font-bold">الاجراءات</h3>
            <div className="flex flex-col gap-4 p-5">
              <button
                disabled={loadbuttom}
                className="btn bg-mainColor w-1/2"
                onClick={handelSubmit}
              >
                {loadbuttom ? (
                  <i className=" fa-solid fa-spinner fa-spin"></i>
                ) : (
                  " تاكيد الحجز"
                )}
              </button>
              <button
                className="btn bg-red-600 w-1/2"
                onClick={handleCancelReservation}
              >
                الغاء الحجز
              </button>
              <button className="btn bg-thirdColor w-1/2" onClick={handleBack}>
                تعديل الحجز
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
