import { useContext, useState } from "react";
import { reservationContext } from "../../Contexts/ReservationContext";
import Loader from "../Loader/Loader";

export default function TimeSlots() {
  let { times, loading } = useContext(reservationContext);
  const [selectedTime, setSelectedTime] = useState(null);

  const formatTime = (time) => {
    if (typeof time !== "number") return "Invalid time";

    const hours = Math.floor(time / 100);
    const minutes = time % 100;

    const suffix = hours >= 12 ? "PM" : "AM";
    const formattedHours = ((hours + 11) % 12) + 1;
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes} ${suffix}`;
  };

  if (loading) return <Loader />;

  return (
    <>
      {times?.map((time, i) => {
        const formatted = formatTime(time);
        const isSelected = selectedTime === time;

        return (
          <button
            key={i}
            onClick={() => setSelectedTime(time)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              isSelected
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {formatted}
          </button>
        );
      })}
    </>
  );
}
