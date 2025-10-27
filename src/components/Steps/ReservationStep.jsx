import { Box, Grid } from "@mui/material";
import React from "react";
import DateSelector from "./DateSelector";
import TimeSlots from "./TimeSlots";
import { useTranslation } from "react-i18next";

export default function ReservationStep({}) {
  let [times, setTimes] = useState([]);
  async function getTimeAvailable(selectedDate) {
    setDate(selectedDate);
    const formattedDate = date.format("YYYY-MM-DD");
    try {
      let { data } = await baseUrl.get(
        `/arenas/0d730fd2-1c4b-4a0d-8ddf-5462be0a58c6/slots/available?date=${formattedDate}`
      );
      console.log(data);
      setTimes(data.availableHours);
    } catch (error) {
      console.log(error);
    }
  }
  const { t } = useTranslation();
  return (
    <>
      <div>
        <Grid container spacing={5} sx={{ p: 3 }}>
          <Grid item xs={6}>
            <DateSelector getTimeAvailable={getTimeAvailable} />
          </Grid>

          <Grid item xs={6}>
            <div className=" mb-3">
              <h3>{t("reservation.available_times")}</h3>
              <p className=" text-thirdColor">
                {t("reservation.select_preferred_time")}
              </p>
            </div>
            <div className=" grid grid-cols-4 gap-4">
              <TimeSlots />
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
