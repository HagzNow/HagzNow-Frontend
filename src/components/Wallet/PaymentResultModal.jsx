import React from "react";

export default function PaymentResultModal({
  status,
  amount,
  isOpen,
  onClose,
}) {

    
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center">
          {status ? (
            <>
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                عملية ناجحة
              </h2>
              <p>تم إضافة {amount} ج.م إلى رصيدك بنجاح.</p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-red-600 mb-2">
                فشل العملية
              </h2>
              <p>حدث خطأ أثناء عملية الدفع، برجاء المحاولة مرة أخرى.</p>
            </>
          )}
          <button
            onClick={onClose}
            className="btn cursor-pointer mt-4 bg-mainColor text-white  rounded-xl"
          >
            إغلاق
          </button>
        </div>
      </div>
    </>
  );
}
