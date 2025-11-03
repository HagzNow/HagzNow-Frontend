import React from "react";
import { CalendarDays, Clock } from "lucide-react"; // icons from lucide-react

export default function UserReservationsCard() {
    return (
        <div className="max-w-sm bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            {/* Image section */}
            <div className="relative">
                <img
                    src="src\assets\uploads\arenas\1761586560207-812713071.jpeg"
                    alt="ملعب"
                    className="w-full h-44 object-cover"
                />
                <span className="absolute top-3 right-3 bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                    قادمة
                </span>
            </div>

            {/* Content section */}
            <div className="p-4 text-right">
                <h3 className="font-semibold text-gray-800 text-lg mb-2">
                    ملعب البتراء لكرة القدم
                </h3>

                {/* Date and Time */}
                <div className="flex items-center justify-end text-gray-500 text-sm mb-3">
                    <div className="flex items-center ml-3">
                        <CalendarDays size={16} className="ml-1" />
                        <span>2024-07-25</span>
                    </div>
                    <div className="flex items-center">
                        <Clock size={16} className="ml-1" />
                        <span>18:00 - 19:00</span>
                    </div>
                </div>

                {/* Price and Details */}
                <div className="flex items-center justify-between">
                    <a
                        href="#"
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
                    <span className="text-green-600 font-semibold text-lg">150 ج.م</span>
                </div>
            </div>
        </div>
    );
}
