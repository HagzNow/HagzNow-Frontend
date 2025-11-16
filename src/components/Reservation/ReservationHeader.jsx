import React from "react";

export default function ReservationHeader({ data }) {
  const { arena } = data;
  return (
    <>
      <div className="rounded-xl overflow-hidden shadow-md relative">
        <img
          src={arena?.thumbnail}
          alt="stadium"
          className="w-full h-90 object-cover"
        />
        <div className="absolute bottom-4 right-6 text-white">
          <h2 className="text-2xl font-bold">{arena?.name}</h2>
          <p className="text-sm">{arena?.locationSummary}</p>
        </div>
      </div>
    </>
  );
}
