import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import { useContext, useEffect } from 'react';
import { reservationContext } from '../../Contexts/ReservationContext';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function DateSelector() {
  let { getTimeAvailable, date, setDate, setArenaId, slots } = useContext(reservationContext);
  let { id } = useParams();

  function handleChange(newDate) {
    if (slots.length > 0) {
      toast.error('من فضلك أزل المواعيد المختارة قبل تغيير التاريخ');
      return;
    }

    setDate(newDate);
    getTimeAvailable(newDate, id);
  }

  useEffect(() => {
    setArenaId(id);
    getTimeAvailable(date, id);
  }, []);

  return (
    <div className="rounded-2xl bg-secondColor dark:bg-gray-800 transition-colors duration-300">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={date}
          onChange={handleChange}
          disabled={slots.length > 0}
          minDate={dayjs()}
          sx={{
            '& .MuiPickersDay-root.Mui-selected': {
              backgroundColor: '#10b981',
              color: 'white',
              '&:hover': {
                backgroundColor: '#059669',
              },
            },
            '& .MuiPickersDay-root': {
              color: 'var(--foreground)',
              '&:hover': {
                backgroundColor: 'rgba(16,185,129,0.2)',
              },
            },
            '& .MuiDayCalendar-weekContainer': {
              color: 'var(--foreground)',
            },
            '& .MuiPickersCalendarHeader-root': {
              color: 'var(--foreground)',
            },
            '& .MuiPickersCalendarHeader-label': {
              color: 'var(--foreground)',
            },
            '& .MuiPickersArrowSwitcher-button': {
              color: 'var(--foreground)',
            },
            backgroundColor: 'transparent',
            color: 'var(--foreground)',
          }}
        />
      </LocalizationProvider>
    </div>
  );
}

