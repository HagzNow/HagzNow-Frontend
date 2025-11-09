import Sidebar from "@/components/AdminLayout/AdminSidebar";
import Header from "@/components/OwnerComponents/OwnerLayout/Header";
import Filters from "@/components/OwnerComponents/ReservationCalender/Filters";
import ReservationCard from "@/components/OwnerComponents/ReservationCalender/ReservationCard";
import React, { useState } from "react";

import { useTranslation } from "react-i18next";


function ReservationCalender() {
  const [filters, setFilters] = useState({
    sport: "كل الرياضات",
    field: "ملعب النادي",
    speed: "السريع",
    date: new Date(),
  });

  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const filteredArenas = arenas.filter(
    (arena) =>
      filters.sport === "كل الرياضات" || arena.sportType === filters.sport
  );

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <Header onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex">
        {/* Sidebar */}
        <div className="md:col-span-3 hidden md:block">
          <Sidebar open={true} onClose={() => setSidebarOpen(false)} />
        </div>

        <div
          dir={isArabic ? "rtl" : "ltr"}
          className="min-h-screen bg-primary/5 p-6 font-arabic text-right"
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-primary">{t("ratings")}</h1>
            <div className="flex gap-2">
              <button
                onClick={() => i18n.changeLanguage("en")}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                EN
              </button>
              <button
                onClick={() => i18n.changeLanguage("ar")}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                AR
              </button>
            </div>
          </div>

          <Filters filters={filters} setFilters={setFilters} />
          {/* <CalendarView filters={filters} setFilters={setFilters} /> */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArenas.length > 0 ? (
              filteredArenas.map((arena) => (
                <ReservationCard key={arena.id} arena={arena} />
              ))
            ) : (
              <p className="text-gray-500">{t("noResults")}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationCalender;
