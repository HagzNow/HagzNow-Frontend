import { Field } from "formik";
import { useTranslation } from "react-i18next";

const FeaturesSection = () => {
  const { t } = useTranslation();

  return (
    <div className="border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">{t("features")}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {["greatLocation", "wifi", "cafeteria", "nightLighting", "parking", "stands"].map((key) => (
          <label key={key} className="flex items-center gap-2">
            <Field type="checkbox" name="features" value={t(key)} className="accent-green-600 w-4 h-4" />
            <span>{t(key)}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
