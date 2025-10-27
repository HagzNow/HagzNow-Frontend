import { Field, ErrorMessage } from "formik";
import { useTranslation } from "react-i18next";

const BasicInfoSection = () => {
  const { t } = useTranslation();

  return (
    <div className="border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        {t("basicInfo")}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-gray-600">{t("arenaName")}</label>
          <Field
            name="name"
            placeholder={t("enterArenaName")}
            className="w-full border rounded-lg p-3 focus:ring focus:ring-green-200 outline-none"
          />
          <ErrorMessage
            name="name"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-600">{t("sportType")}</label>
          <Field
            as="select"
            name="sportType"
            className="w-full border rounded-lg p-3 focus:ring focus:ring-green-200 outline-none"
          >
            <option value="">{t("selectSportType")}</option>
            <option value="football">{t("football")}</option>
            <option value="basketball">{t("basketball")}</option>
            <option value="tennis">{t("tennis")}</option>
            <option value="swimming">{t("swimming")}</option>
          </Field>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoSection;
