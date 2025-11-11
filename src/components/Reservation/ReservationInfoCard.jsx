import React from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { GiDuration } from "react-icons/gi";
import { CiCreditCard1 } from "react-icons/ci";
import { formatTime, getTimeRanges } from "../../utils/timeRange";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import "dayjs/locale/en";

export default function ReservationInfoCard({ data, i18n }) {
  const { date, arena, slots, selectedExtras, totalAmount, extrasTotalAmount } =
    data;
  const ranges = getTimeRanges(slots);

  const dayName =
    i18n.language === "ar"
      ? dayjs(date).locale("ar").format("dddd")
      : dayjs(date).locale("en").format("dddd");

  const totalPrice = Number(totalAmount) + Number(extrasTotalAmount);

  return (
    <div className="space-y-6">
      <div className="rounded-xl overflow-hidden shadow-md relative">
        <img
          src={arena?.thumbnail}
          alt="stadium"
          className="w-full h-90 object-cover"
        />
        <div className="absolute bottom-4 right-6 text-white">
          <h2 className="text-2xl font-bold">{arena?.name}</h2>
          <p className="text-sm">{arena?.locationSummary}</p>
        </div>
      </div>

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
            <h4>{slots.length < 2 ? "ساعة واحدة" : `${slots.length} ساعات`}</h4>
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
            {selectedExtras?.length > 0 ? (
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
  );
}
