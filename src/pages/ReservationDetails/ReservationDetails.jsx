import React, { useContext } from "react";
import arena from "../../../public/arena.jpg";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { GiDuration } from "react-icons/gi";
import { CiCreditCard1 } from "react-icons/ci";
import { reservationContext } from "../../Contexts/ReservationContext";

export default function ReservationDetails() {
  let { selectedExtras, slots, date } = useContext(reservationContext);
  console.log(selectedExtras);
  console.log(slots);
  console.log(date);

  return (
    <>
      <div className="max-w-6xl mx-auto p-4 py-5">
        <div className="rounded-xl overflow-hidden shadow-md">
          <div className="relative">
            <img
              src={arena}
              alt="stadium"
              className="w-full h-90 object-cover"
            />
            <div className="absolute bottom-4 right-6 text-white">
              <h2 className="text-2xl font-bold">برنابيو</h2>
              <p className="text-sm">برلين - قسم الأهرام</p>
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
                  <h4>الأحد، 15 ديسمبر 2024</h4>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2"> الوقت :</p>
                <div className="flex space-x-2 items-center">
                  <FaRegClock className=" text-blue-400" />
                  <h4>2:00 مساءً - 3:00 مساءً</h4>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">المدة :</p>
                <div className="flex space-x-2 items-center">
                  <GiDuration className=" text-blue-400" />
                  <h4>ساعة واحدة</h4>
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
                  <h4>كرة قدم قياس 5</h4>
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
              <button className="btn bg-mainColor w-1/2">تاكيد الحجز</button>
              <button className="btn bg-red-600 w-1/2">الغاء الحجز</button>
              <button className="btn bg-thirdColor w-1/2">اعاده الحجز</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
