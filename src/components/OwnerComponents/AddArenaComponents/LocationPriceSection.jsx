import { ErrorMessage, Field } from "formik";
import { MapContainer, TileLayer } from "react-leaflet";
import { useTranslation } from "react-i18next";
import LocationPicker from "./LocationPicker";
import "leaflet/dist/leaflet.css";

const LocationPriceSection = ({ setFieldValue }) => {
  const { t } = useTranslation();

  return (
    <div className="border dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800 transition-colors">
      <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
        {t("locationPrice")}
      </h3>

      {}

      <h3 className="text-lg font-semibold mb-1 text-gray-700 dark:text-gray-300">
        {t("mapTitle")}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{t("mapInstruction")}</p>

      <div className="h-64 rounded-xl overflow-hidden mb-4 relative z-0">
        <MapContainer
          center={[30.0444, 31.2357]}
          zoom={15}
          className="h-full w-full relative z-0"
          style={{ zIndex: 0 }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationPicker setFieldValue={setFieldValue} />
        </MapContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-2 text-gray-600 dark:text-gray-400">{t("governorate")}</label>
          <Field
            name="governorate"
            placeholder={t("enterGovernorate")}
            className="w-full border dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring focus:ring-green-200 dark:focus:ring-green-500 outline-none transition-colors"
          />
          <ErrorMessage
            name="governorate"
            component="div"
            className="text-red-500 dark:text-red-400 text-sm mt-1"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-600 dark:text-gray-400">{t("city")}</label>
          <Field
            name="city"
            placeholder={t("enterCity")}
            className="w-full border dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring focus:ring-green-200 dark:focus:ring-green-500 outline-none transition-colors"
          />
          <ErrorMessage
            name="city"
            component="div"
            className="text-red-500 dark:text-red-400 text-sm mt-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-2 text-gray-600 dark:text-gray-400">{t("latitude")}</label>
          <Field
            name="latitude"
            readOnly
            className="w-full border dark:border-gray-600 rounded-lg p-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-600 dark:text-gray-400">{t("longitude")}</label>
          <Field
            name="longitude"
            readOnly
            className="w-full border dark:border-gray-600 rounded-lg p-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
          />
        </div>
      </div>

      {/* ✅ سعر الساعة كما هو */}
      <label className="block mb-2 text-gray-600 dark:text-gray-400">{t("pricePerHour")}</label>
      <Field
        type="number"
        name="price"
        placeholder={t("enterPrice")}
        className="w-full border dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring focus:ring-green-200 dark:focus:ring-green-500 outline-none transition-colors"
      />
       <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500 dark:text-red-400 text-sm mt-1"
                />
    </div>
  );
};

export default LocationPriceSection;
