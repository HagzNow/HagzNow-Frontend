import { useEffect, useState } from "react";
import { Field, ErrorMessage } from "formik";
import { useTranslation } from "react-i18next";
import axios from "axios";

const BasicInfoSection = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/categories");
        if (res.data?.isSuccess) {
          setCategories(res.data.data);
        } else {
          console.error("Failed to load categories:", res.data?.message);
        }
      } catch (err) {
        console.error("Error fetching categories:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="border dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800 transition-colors">
      <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
        {t("basicInfo")}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 🏟️ Arena Name */}
        <div>
          <label className="block mb-2 text-gray-600 dark:text-gray-400">{t("arenaName")}</label>
          <Field
            name="name"
            placeholder={t("enterArenaName")}
            className="w-full border dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring focus:ring-green-200 dark:focus:ring-green-500 outline-none transition-colors"
          />
          <ErrorMessage
            name="name"
            component="div"
            className="text-red-500 dark:text-red-400 text-sm mt-1"
          />
        </div>

        {/* 🏅 Sport Type (Dynamic Categories) */}
        <div>
          <label className="block mb-2 text-gray-600 dark:text-gray-400">{t("sportType")}</label>
          {loading ? (
            <p className="text-gray-500 dark:text-gray-400">{t("loading")}...</p>
          ) : (
            <Field
              as="select"
              name="categoryId"
              className="w-full border dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring focus:ring-green-200 dark:focus:ring-green-500 outline-none transition-colors"
            >
              <option value="">{t("selectSportType")}</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Field>
          )}
          <ErrorMessage
            name="categoryId"
            component="div"
            className="text-red-500 dark:text-red-400 text-sm mt-1"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoSection;
