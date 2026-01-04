import { Field } from "formik";
import { useTranslation } from "react-i18next";

const DescriptionSection = () => {
  const { t } = useTranslation();

  return (
    <div className="border dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800 transition-colors">
      <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
        {t("descriptionNotes")}
      </h3>

      {/* Description */}
      <label className="block mb-2 text-gray-600 dark:text-gray-400">
        {t("arenaDescription")}
      </label>
      <Field
        as="textarea"
        name="description"
        rows="3"
        placeholder={t("enterDescription")}
        className="w-full border dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring focus:ring-green-200 dark:focus:ring-green-500 outline-none mb-4 transition-colors"
      />

      {/* Policy */}
      <label className="block mb-2 text-gray-600 dark:text-gray-400">
        {t("policy")}
      </label>
      <Field
        as="textarea"
        name="policy"
        rows="3"
        placeholder={t("enterPolicy")}
        className="w-full border dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring focus:ring-green-200 dark:focus:ring-green-500 outline-none mb-4 transition-colors"
      />

      
    </div>
  );
};

export default DescriptionSection;
