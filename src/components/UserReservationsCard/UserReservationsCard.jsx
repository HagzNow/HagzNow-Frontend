import React from "react";
import { CalendarDays, Clock } from "lucide-react";
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
    <div
      dir="rtl"
      className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-2xl dark:hover:shadow-gray-900 overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 ease-in-out group border border-gray-100 dark:border-gray-700"
      onClick={handleViewMore}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-48 sm:h-52 md:h-56 lg:h-48">
        <img
          src={arenaImage}
          alt={arenaName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Status Badge */}
        <span
          className="absolute top-3 right-3 text-white text-sm px-3 py-1.5 rounded-full font-medium shadow-lg dark:shadow-gray-900/50 group-hover:scale-105 transition-transform duration-300"
          style={{ backgroundColor: statusInfo.color }}
        >
          {statusInfo.label}
        </span>
      </div>

      {/* Content Container with Gradient Background on Hover */}
      <div className="relative p-5 sm:p-6 bg-white dark:bg-gray-800 group-hover:bg-gradient-to-br group-hover:from-green-600 group-hover:via-emerald-600 group-hover:to-teal-600 dark:group-hover:from-green-500 dark:group-hover:via-emerald-500 dark:group-hover:to-teal-500 transition-all duration-500 ease-in-out">
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate group-hover:text-white transition-colors duration-300 mb-3">
          {arenaName}
        </h3>

        {/* Date and Time */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm group-hover:text-white/95 transition-colors duration-300">
            <CalendarDays size={16} className="ml-2 flex-shrink-0 text-base group-hover:text-white/90 dark:text-gray-400" />
            <span className="truncate font-medium">{date}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm group-hover:text-white/95 transition-colors duration-300">
            <Clock size={16} className="ml-2 flex-shrink-0 text-base group-hover:text-white/90 dark:text-gray-400" />
            <span className="truncate font-medium">{timeSlot}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 dark:bg-gray-700 my-4 group-hover:bg-white/30 transition-colors duration-300"></div>

        {/* Price and Details */}
        <div className="flex items-center justify-between mt-4">
          {/* View Details Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewMore();
            }}
            className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-700 px-3 py-1.5 rounded-full group-hover:bg-white/20 transition-colors duration-300 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group-hover:text-white font-medium text-sm"
          >
            عرض التفاصيل
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 transform rotate-180 group-hover:translate-x-0.5 transition-transform duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          {/* Price */}
          <div className="flex flex-col items-end">
            <div className="flex items-baseline">
              <span className="text-green-600 dark:text-green-400 font-extrabold text-xl sm:text-2xl group-hover:text-white transition-colors duration-300">
                {price}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm mr-1 group-hover:text-white/90 transition-colors duration-300 font-medium">
                ج.م
              </span>
            </div>
            <span className="text-gray-400 dark:text-gray-500 text-xs mt-0.5 group-hover:text-white/80 transition-colors duration-300">
              /ساعة
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}