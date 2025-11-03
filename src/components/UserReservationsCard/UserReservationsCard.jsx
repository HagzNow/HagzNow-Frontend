import React from "react";
import { CalendarDays, Clock } from "lucide-react"; // icons from lucide-react

export default function UserReservationsCard({ reservation }) {
    const {
        arenaName = "ملعب البتراء لكرة القدم",
        arenaImage = "src/assets/uploads/arenas/1761586560207-812713071.jpeg",
        date = "2024-07-25",
        timeSlot = "18:00 - 19:00",
        price = 150,
        status = "قادمة", // قادمة, ملغاة, منتهية
        id
    } = reservation || {};

    const getStatusStyle = () => {
        switch (status) {
            case "ملغاة":
                return "bg-red-100 text-red-700";
            case "منتهية":
                return "bg-gray-100 text-gray-700";
            default:
                return "bg-green-100 text-green-700";
        }
    };

    return (
        <div className="max-w-sm bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
            {/* Image section */}
            <div className="relative">
                <img
                    src={arenaImage}
                    alt={arenaName}
                    className="w-full h-44 object-cover"
                />
                <span className={`absolute top-3 right-3 text-sm px-3 py-1 rounded-full ${getStatusStyle()}`}>
                    {status}
                </span>
            </div>

            {/* Content section */}
            <div className="p-4 text-right">
                <h3 className="font-semibold text-gray-800 text-lg mb-2 truncate">
                    {arenaName}
                </h3>

                {/* Date and Time */}
                <div className="flex items-center justify-end text-gray-500 text-sm mb-3">
                    <div className="flex items-center ml-3">
                        <CalendarDays size={16} className="ml-1" />
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center">
                        <Clock size={16} className="ml-1" />
                        <span>{timeSlot}</span>
                    </div>
                </div>

                {/* Price and Details */}
                <div className="flex items-center justify-between">
                    <a
                        href={`/reservation/${id}`}
                        className="text-blue-600 text-sm font-medium hover:underline flex items-center"
                    >
                        عرض التفاصيل
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 mr-1"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                        </svg>
                    </a>
                    <span className="text-green-600 font-semibold text-lg">{price} ج.م</span>
                </div>
            </div>
        </div>
    );
}
