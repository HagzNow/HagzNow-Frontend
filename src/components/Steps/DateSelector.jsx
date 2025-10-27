import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { useContext, useEffect } from "react";
import { reservationContext } from "../../Contexts/ReservationContext";
import { useParams } from "react-router-dom";

export default function DateSelector() {
  let { getTimeAvailable, date } = useContext(reservationContext);
  let { id } = useParams();

  function handleChange(newDate) {
    getTimeAvailable(newDate, id);
  }

  useEffect(() => {
    getTimeAvailable(date, id);
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
