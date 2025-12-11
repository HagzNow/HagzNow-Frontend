import React from "react";
import { MapPin, Star, Clock, Users, Shield } from "lucide-react";

export default function ReservationHeader({ data }) {
  const { arena } = data;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 overflow-hidden group">
      {/* Main Image with Overlay */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={arena?.thumbnail}
          alt={arena?.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 dark:from-black/70 via-black/20 dark:via-black/30 to-transparent"></div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            {/* Arena Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-1">{arena?.name}</h2>
                  <div className="flex items-center gap-4 flex-wrap">
                    {/* Location */}
                    <div className="flex items-center gap-1.5 bg-white/20 dark:bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-2xl border border-white/20 dark:border-white/10">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {arena?.locationSummary}
                      </span>
                    </div>

                    {/* Category */}
                    <div className="flex items-center gap-1.5 bg-white/20 dark:bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-2xl border border-white/20 dark:border-white/10">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {arena?.categoryName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
          </div>
        </div>
      </div>
    </div>
  );
}
