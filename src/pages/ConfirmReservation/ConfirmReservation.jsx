import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ConfirnReservation() {
  const navegate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="flex flex-col items-center text-center mb-8">
        <FaCheckCircle className="text-green-500 text-6xl mb-3" />
        <h1 className="text-3xl font-bold text-green-700 mb-1">
          تم تأكيد حجزك!
        </h1>
        <p className="text-gray-600">
          لقد تم تأكيد حجزك بنجاح. نتطلع لرؤيتك قريبًا
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md w-full max-w-2xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-right border-b pb-2 border-b-gray-300">
          تفاصيل الحجز
        </h2>
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
          <p className="font-medium">الخدمة</p>
          <p className="text-right">جلسة تدريب شخصي</p>

          <p className="font-medium">المقدّم</p>
          <p className="text-right">المدرب أحمد</p>

          <p className="font-medium">التاريخ</p>
          <p className="text-right">الأربعاء، 24 يوليو 2024</p>

          <p className="font-medium">الوقت</p>
          <p className="text-right">10:00 صباحًا - 11:00 صباحًا</p>

          <p className="font-medium">الموقع</p>
          <p className="text-right">صالة الألعاب الرياضية المركزية</p>
        </div>

        <div className="border-t border-t-gray-300 mt-4 pt-3 text-sm ">
          <div className="flex justify-between">
            <span>السعر الأصلي</span>
            <span>200.00 رس</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>الخصم</span>
            <span>-50.00 رس</span>
          </div>
          <div className="flex justify-between font-bold text-green-600 mt-2">
            <span>الإجمالي المستحق</span>
            <span>150.00 رس</span>
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

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl justify-center">
        <button
          onClick={() => navegate("/user-arena")}
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
