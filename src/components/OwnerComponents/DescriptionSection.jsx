import { Field } from "formik";
import { useTranslation } from "react-i18next";

const DescriptionSection = () => {
  const { t } = useTranslation();

  return (
    <div className="border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">{t("descriptionNotes")}</h3>

      <label className="block mb-2 text-gray-600">{t("arenaDescription")}</label>
      <Field as="textarea" name="description" rows="3" placeholder={t("enterDescription")} className="w-full border rounded-lg p-3 focus:ring focus:ring-green-200 outline-none mb-4" />

      <label className="block mb-2 text-gray-600">{t("cancellationPolicy")}</label>
      <Field as="textarea" name="cancellationPolicy" rows="3" placeholder={t("enterPolicy")} className="w-full border rounded-lg p-3 focus:ring focus:ring-green-200 outline-none mb-4" />

      <label className="block mb-2 text-gray-600">{t("status")}</label>
      <div className="flex items-center gap-6 mb-4">
        <label className="flex items-center gap-2">
          <Field type="radio" name="status" value="active" className="accent-green-600 w-4 h-4" />
          <span>{t("active")}</span>
        </label>
        <label className="flex items-center gap-2">
          <Field type="radio" name="status" value="inactive" className="accent-red-600 w-4 h-4" />
          <span>{t("inactive")}</span>
        </label>
      </div>

      <label className="block mb-2 text-gray-600">{t("notes")}</label>
      <Field name="notes" placeholder={t("enterNotes")} className="w-full border rounded-lg p-3 focus:ring focus:ring-green-200 outline-none" />
    </div>
  );
};

export default DescriptionSection;
