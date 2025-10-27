import React from "react";

const ArenaCardPremium = ({ arena }) => {
  const a = arena || {};

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto hover:shadow-2xl transition-shadow duration-300">
      <div className="grid md:grid-cols-3 gap-6 p-6">
        {/* Main Image */}
        <div className="md:col-span-1">
          {a.mainImage ? (
            <img
              src={a.mainImage}
              alt={a.name || "Arena"}
              className="w-full h-48 md:h-full object-cover rounded-xl"
            />
          ) : (
            <div className="w-full h-48 md:h-full bg-gray-100 flex items-center justify-center rounded-xl text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* Details */}
        <div className="md:col-span-2 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-green-700 mb-2">{a.name || "Arena Name"}</h2>

            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 font-medium">{a.sportType || "Sport Type"}</span>
              <span
                className={`font-semibold ${
                  a.status === "active" ? "text-green-600" : "text-red-600"
                }`}
              >
                {a.status || "Inactive"}
              </span>
            </div>

            <p className="text-gray-700 mb-2">{a.location || "Location"}</p>
            <p className="text-gray-700 font-semibold mb-3">
              سعر الساعة: {a.price || "-"} جنيه
            </p>

            {/* Features Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {a.features && a.features.length > 0
                ? a.features.map((f, i) => (
                    <span
                      key={i}
                      className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {f}
                    </span>
                  ))
                : null}
            </div>

            {/* Description */}
            {a.description && <p className="text-gray-700 text-sm mb-2">{a.description}</p>}
          </div>

          {/* Notes & Coordinates */}
          <div className="mt-4">
            {a.notes && <p className="text-gray-500 text-sm italic mb-2">{a.notes}</p>}
            {a.latitude && a.longitude && (
              <p className="text-gray-500 text-sm">
                Lat: {a.latitude.toFixed(4)}, Lng: {a.longitude.toFixed(4)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArenaCardPremium;
