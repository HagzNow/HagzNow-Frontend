import { useContext } from 'react';
import { reservationContext } from '../../Contexts/ReservationContext';
import Loader from '../Loader/Loader';
import { useTranslation } from 'react-i18next';
import { formatTime } from '../../utils/timeRange';

export default function TimeSlots() {
  const { times, loading, slots, setSlots } = useContext(reservationContext);
  const { i18n } = useTranslation();

  const toggleTime = (time) => {
    setSlots((prev) => (prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]));
    
  };

  if (loading) return <Loader />;

  return (
    <>
      {times?.map((time, i) => {
        const nextHour = time + 1;
        const formattedRange =
          i18n.language === 'ar'
            ? `من ${formatTime(time, 'ar')} إلى ${formatTime(nextHour, 'ar')}`
            : `${formatTime(time, 'en')} - ${formatTime(nextHour, 'en')}`;

        const isSelected = slots.includes(time);

        return (
          <button
            key={i}
            onClick={() => toggleTime(time)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
              isSelected
                ? 'bg-green-500 dark:bg-green-600 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {formattedRange}
          </button>
        );
      })}
    </>
  );
}
