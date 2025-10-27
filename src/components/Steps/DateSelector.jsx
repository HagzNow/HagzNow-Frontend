import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { useContext, useEffect } from "react";
import { reservationContext } from "../../Contexts/ReservationContext";

export default function DateSelector() {
  let { getTimeAvailable, date } = useContext(reservationContext);

  function handleChange(newDate) {
    getTimeAvailable(newDate);
  }

  useEffect(() => {
    getTimeAvailable(dayjs());
  }, []);
  return (
    <div className="rounded-2xl bg-secondColor">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={date}
          onChange={handleChange}
          minDate={dayjs()}
          sx={{
            "& .MuiPickersDay-root.Mui-selected": {
              backgroundColor: "green",
              color: "white",
              "&:hover": {
                backgroundColor: "darkgreen",
              },
            },
            "& .MuiPickersDay-root": {
              "&:hover": {
                backgroundColor: "rgba(0,128,0,0.2)",
              },
            },
          }}
        />
      </LocalizationProvider>
    </div>
  );
}
