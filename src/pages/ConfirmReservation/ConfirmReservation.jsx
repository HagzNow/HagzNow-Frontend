import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function ConfirmReservation() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-md rounded-2xl p-10 flex flex-col items-center gap-6 text-center">
        <AiOutlineCheckCircle className="text-green-500 text-8xl" />
        <h1 className="text-3xl font-bold text-gray-900">تم الحجز بنجاح!</h1>
        <p className="text-gray-500">شكرًا لك على استخدام التطبيق.</p>

        <button
          onClick={() => navigate("/user-arena")}
          className="btn bg-mainColor text-white px-6 py-2 rounded-lg mt-4"
        >
          رجوع
        </button>
      </div>
    </div>
  );
}
