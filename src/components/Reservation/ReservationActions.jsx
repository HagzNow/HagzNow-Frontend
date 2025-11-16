import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ReservationActions({
  isPreview,
  loading,
  onConfirm,
  onCancel,
  onEdit,
  cancelRservation,
  status,
}) {
  const nanigate = useNavigate();
  const handleCancel = () => {
    if (status === "hold") {
      cancelRservation();
      setTimeout(() => {
        nanigate("/my-bookings");
      }, 1500);
    } else {
      toast.error("لا يمكن إلغاء هذا الحجز لأن حالته ليست قيد الانتظار.");
    }
  };

  return (
    <div className="flex flex-col gap-4 p-5 border border-gray-200 rounded-2xl shadow-sm ">
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
          <>
            <button
              className={`btn w-full ${
                status === "hold"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={handleCancel}
            >
              {loading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "الغاء الحجز"
              )}
            </button>
          </>
        </>
      )}
    </div>
  );
}
