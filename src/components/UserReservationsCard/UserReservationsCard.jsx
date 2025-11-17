import React from "react";
import { CalendarDays, Clock } from "lucide-react"; // icons from lucide-react
import { useNavigate } from "react-router-dom";
import { ReservationStatusMap } from "../../constants/reservationStatus";

export default function UserReservationsCard({ reservation }) {
  const {
    arenaName = "ملعب البتراء لكرة القدم",
    arenaImage = "src/assets/uploads/arenas/1761586560207-812713071.jpeg",
    date = "2024-07-25",
    timeSlot = "18:00 - 19:00",
    price = 150,
    status = "confirmed",
    id,
  } = reservation || {};

  // Get status details from the map
  const statusInfo = ReservationStatusMap[status] || ReservationStatusMap.confirmed;

  const navigate = useNavigate();
  const handleViewMore = () => {
    navigate(`/reservations/${id}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
      {/* Image section */}
      <div className="relative">
        <img
          src={arenaImage}
          alt={arenaName}
          className="w-full h-48 object-cover"
        />
        <span
          className="absolute top-3 right-3 text-white text-sm px-3 py-1 rounded-full font-medium"
          style={{ backgroundColor: statusInfo.color }}
        >
          {statusInfo.label}
        </span>
      </div>

      {/* Content section */}
      <div className="p-4 text-right">
        <h3 className="font-semibold text-gray-800 text-lg mb-3 truncate">
          {arenaName}
        </h3>

        {/* Date and Time */}
        <div className="flex flex-col items-start justify-end text-gray-600 text-sm mb-4 gap-4">
          <div className="flex items-center gap-1.5">
            <CalendarDays size={16} className="text-gray-500" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={16} className="text-gray-500" />
            <span>{timeSlot}</span>
          </div>
        </div>

        {/* Price and Details */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <button
            onClick={handleViewMore}

            className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1"
          >
            عرض التفاصيل
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <span dir="rtl" className="text-green-600 font-semibold text-xl">
            {price} ج.م
          </span>
        </div>
      </div>
    </div>
  );
}
