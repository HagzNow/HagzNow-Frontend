import React from "react";
import { Stepper, Step, StepLabel, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function BookingStepper({ steps, activeStep }) {
  const { i18n } = useTranslation();
  let x = i18n.language;

  return (
    <div className=" w-1/2">
      <Box sx={{ direction: x === "ar" ? "rtl" : "ltr" }}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            "& .MuiStepIcon-root": {
              color: "#c8e6c9",
              "&.Mui-active": {
                color: "#4caf50",
              },
              "&.Mui-completed": {
                color: "#4caf50",
              },
            },
            "& .MuiStepLabel-label.Mui-active": {
              color: "#4caf50",
              fontWeight: "bold",
            },
            "& .MuiStepLabel-label.Mui-completed": {
              color: "#388e3c",
            },
          }}
        >
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </div>
  );
}
