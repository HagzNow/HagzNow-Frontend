import React from 'react';
import UserReservationsCard from '../UserReservationsCard/UserReservationsCard';

export default function UserAllReservationsList({ reservations = [], loading }) {

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 dark:border-green-400"></div>
      </div>
    );
  }

  if (!reservations || reservations.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
          لا توجد حجوزات
        </p>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 my-6 md:my-10 mx-4 md:mx-8"
    >
      {reservations.map((reservation) => (
        <UserReservationsCard key={reservation.id} reservation={reservation} />
      ))}
    </div>
  );
}
