import { useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { useTranslation } from "react-i18next";

const LocationPicker = ({ setFieldValue }) => {
  const [position, setPosition] = useState(null);
  const { i18n } = useTranslation();

  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);
      setFieldValue("latitude", lat);
      setFieldValue("longitude", lng);

      try {
        // ✅ Reverse Geocoding من Nominatim
        const resp = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=${i18n.language || "en"}`
        );
        const data = await resp.json();
        const a = data?.address || {};

        // governorate/state/province حسب ما يتوفر
        const governorate =
          a.state || a.county || a.region || a.state_district || "";
        // city/town/village/municipality حسب ما يتوفر
        const city = a.city || a.town || a.village || a.municipality || "";

        if (governorate) setFieldValue("governorate", governorate);
        if (city) setFieldValue("city", city);
      } catch (err) {
        console.warn("Reverse geocoding failed:", err);
      }
    },
  });

  return position ? <Marker position={position} /> : null;
};

export default LocationPicker;
