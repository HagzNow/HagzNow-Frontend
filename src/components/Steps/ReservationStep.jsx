import { Box, Grid } from "@mui/material";

import DateSelector from "./DateSelector";
import TimeSlots from "./TimeSlots";
import { useTranslation } from "react-i18next";


export default function ReservationStep() {
 
  const { t } = useTranslation();
  return (
    <>
      <div>
        <Grid container spacing={5} sx={{ p: 3 }}>
          <Grid item xs={6}>
            <DateSelector />
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
