import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarView({ filters, setFilters }) {
  return (
    <div className="mb-6">
      <Calendar
        value={filters.date}
        onChange={(date) => setFilters((f) => ({ ...f, date }))}
        locale="ar-EG"
        className="rounded-lg border border-primary shadow-md p-4 bg-white"
      />
    </div>
  );
}
