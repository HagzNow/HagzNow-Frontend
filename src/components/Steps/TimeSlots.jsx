import { useContext } from "react";
import { reservationContext } from "../../Contexts/ReservationContext";
import Loader from "../Loader/Loader";
import { useTranslation } from "react-i18next";

export default function TimeSlots() {
  const { times, loading, slots, setSlots } = useContext(reservationContext);

  const { i18n } = useTranslation();

  const formatTime = (time) => {
    if (typeof time !== "number") return "Invalid time";

    let hour = time;
    const suffix = hour >= 12 ? "PM" : "AM";

    if (hour === 0) hour = 12;
    if (hour > 12) hour -= 12;

    if (i18n.language === "ar") {
      return `${hour} ${suffix === "AM" ? "ص" : "م"}`;
    }

    return `${hour} ${suffix}`;
  };

  const toggleTime = (time) => {
    setSlots((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };
  if (loading) return <Loader />;

  return (
    <>
      {times?.map((time, i) => {
        const formatted = formatTime(time);
        const isSelected = slots.includes(time);

        return (
          <button
            key={i}
            onClick={() => toggleTime(time)}
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
