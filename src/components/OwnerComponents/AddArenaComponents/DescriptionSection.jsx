import { Field } from "formik";
import { useTranslation } from "react-i18next";

const DescriptionSection = () => {
  const { t } = useTranslation();

  return (
    <div className="border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        {t("descriptionNotes")}
      </h3>

      {/* Description */}
      <label className="block mb-2 text-gray-600">
        {t("arenaDescription")}
      </label>
      <Field
        as="textarea"
        name="description"
        rows="3"
        placeholder={t("enterDescription")}
        className="w-full border rounded-lg p-3 focus:ring focus:ring-green-200 outline-none mb-4"
      />

      {/* Policy */}
      <label className="block mb-2 text-gray-600">
        {t("policy")}
      </label>
      <Field
        as="textarea"
        name="policy"
        rows="3"
        placeholder={t("enterPolicy")}
        className="w-full border rounded-lg p-3 focus:ring focus:ring-green-200 outline-none mb-4"
      />

      
    </div>
  );
};

export default DescriptionSection;
