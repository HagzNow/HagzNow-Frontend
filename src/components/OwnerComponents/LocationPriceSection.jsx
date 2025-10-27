import { Field } from "formik";
import { MapContainer, TileLayer } from "react-leaflet";
import { useTranslation } from "react-i18next";
import LocationPicker from "./LocationPicker";
import 'leaflet/dist/leaflet.css'


const LocationPriceSection = ({ setFieldValue }) => {
  const { t } = useTranslation();

  return (
    <div className="border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">{t("locationPrice")}</h3>

      <label className="block mb-2 text-gray-600">{t("address")}</label>
      <Field
        name="location"
        placeholder={t("enterAddress")}
        className="w-full border rounded-lg p-3 focus:ring focus:ring-green-200 outline-none mb-4"
      />

      <h3 className="text-lg font-semibold mb-4 text-gray-700">{t("mapTitle")}</h3>
      <p className="text-gray-500 text-sm mb-2">{t("mapInstruction")}</p>

      <div className="h-64 rounded-xl overflow-hidden mb-4">
        <MapContainer center={[30.0444, 31.2357]} zoom={13} className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationPicker setFieldValue={setFieldValue} />
        </MapContainer>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-2 text-gray-600">{t("latitude")}</label>
          <Field name="latitude" readOnly className="w-full border rounded-lg p-3 bg-gray-100" />
        </div>
        <div>
          <label className="block mb-2 text-gray-600">{t("longitude")}</label>
          <Field name="longitude" readOnly className="w-full border rounded-lg p-3 bg-gray-100" />
        </div>
      </div>

      <label className="block mb-2 text-gray-600">{t("pricePerHour")}</label>
      <Field
        type="number"
        name="price"
        placeholder={t("enterPrice")}
        className="w-full border rounded-lg p-3 focus:ring focus:ring-green-200 outline-none"
      />
    </div>
  );
};

export default LocationPriceSection;
