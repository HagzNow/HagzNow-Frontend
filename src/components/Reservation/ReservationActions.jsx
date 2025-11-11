import React from "react";

export default function ReservationActions({
  isPreview,
  loading,
  onConfirm,
  onCancel,
  onEdit,
}) {
  return (
    <div className="flex flex-col gap-4 p-5 border border-gray-200 rounded-2xl shadow-sm w-fit">
      {isPreview ? (
        <>
          <button
            disabled={loading}
            className="btn bg-mainColor w-full"
            onClick={onConfirm}
          >
            {loading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              "تأكيد الحجز"
            )}
          </button>
          <button className="btn bg-red-600 w-full" onClick={onCancel}>
            إلغاء الحجز
          </button>
          <button className="btn bg-thirdColor w-full" onClick={onEdit}>
            تعديل الحجز
          </button>
        </>
      ) : (
        <>
          <button className="btn bg-red-600 w-full">إلغاء الحجز</button>
        </>
      )}
    </div>
  );
}
