import React, { useState } from 'react'
import UserAllReservationsList from '../../components/UserAllReservationsList/UserAllReservationsList'

export default function UserAllReservation() {
    const [loading] = useState(false);
    const [activeTab, setActiveTab] = useState('current'); // 'current' or 'past'

    // Sample data - replace with API call later
    const sampleReservations = [
        {
            id: 1,
            arenaName: "ملعب البتراء لكرة القدم",
            arenaImage: "src/assets/uploads/arenas/1761586560207-812713071.jpeg",
            date: "2024-07-25",
            timeSlot: "18:00 - 19:00",
            price: 150,
            status: "قادمة"
        },
        {
            id: 2,
            arenaName: "ملعب الأهلي الرياضي",
            arenaImage: "src/assets/uploads/arenas/1761586560207-812713071.jpeg",
            date: "2024-07-20",
            timeSlot: "16:00 - 17:00",
            price: 200,
            status: "منتهية"
        },
        {
            id: 3,
            arenaName: "ملعب الزمالك",
            arenaImage: "src/assets/uploads/arenas/1761586560207-812713071.jpeg",
            date: "2024-07-18",
            timeSlot: "14:00 - 15:00",
            price: 180,
            status: "ملغاة"
        },
        {
            id: 4,
            arenaName: "ملعب المعادي الرياضي",
            arenaImage: "src/assets/uploads/arenas/1761586560207-812713071.jpeg",
            date: "2024-07-28",
            timeSlot: "20:00 - 21:00",
            price: 220,
            status: "قادمة"
        },
        {
            id: 5,
            arenaName: "ملعب النادي الأولمبي",
            arenaImage: "src/assets/uploads/arenas/1761586560207-812713071.jpeg",
            date: "2024-07-30",
            timeSlot: "17:00 - 18:00",
            price: 190,
            status: "قادمة"
        }
    ];

    // Filter reservations based on active tab
    const currentReservations = sampleReservations.filter(res => res.status === "قادمة");
    const pastReservations = sampleReservations.filter(res => res.status === "منتهية" || res.status === "ملغاة");

    const displayedReservations = activeTab === 'current' ? currentReservations : pastReservations;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page Title */}
            <div className="text-center py-4 sm:py-6 px-4">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800">
                    حجوزاتي
                </h1>
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-2 sm:gap-4 px-4 mb-6">
                <button
                    onClick={() => setActiveTab('current')}
                    className={`px-4 sm:px-8 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-colors ${activeTab === 'current'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                >
                    القادمة
                </button>
                <button
                    onClick={() => setActiveTab('past')}
                    className={`px-4 sm:px-8 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-colors ${activeTab === 'past'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                >
                    السابقة
                </button>
            </div>

            {/* Reservations List */}
            <UserAllReservationsList
                reservations={displayedReservations}
                loading={loading}
            />
        </div>
    )
}
