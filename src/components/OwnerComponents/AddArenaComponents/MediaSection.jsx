import React from "react";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";

export default function MediaSection() {
  const { values, setFieldValue } = useFormikContext();
  const { t } = useTranslation();

  return (
    <div className="border dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800 transition-colors">
      {/* ✅ Flex container for both sections */}
      <div className="flex flex-wrap gap-8">
        {/* ✅ Main Image */}
        <div className="flex-1 min-w-[250px]">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("Main Image")}
          </label>

          <div className="flex items-center gap-3 mb-2">
            <label
              htmlFor="thumbnail"
              className="cursor-pointer bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {t("Choose File")}
            </label>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              {values.thumbnail ? values.thumbnail.name : t("No file chosen")}
            </span>
          </div>

          <input
            id="thumbnail"
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={(e) => setFieldValue("thumbnail", e.target.files[0])}
            className="hidden"
          />

          {values.thumbnail && (
            <img
              src={URL.createObjectURL(values.thumbnail)}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-md border dark:border-gray-600"
            />
          )}

       
        </div>

        {/* ✅ Gallery Images */}
        <div className="flex-1 min-w-[250px]">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("Gallery Images")}
          </label>

          <div className="flex items-center gap-3 mb-2">
            <label
              htmlFor="gallery"
              className="cursor-pointer bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {t("Choose Files")}
            </label>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              {values.images?.length
                ? `${values.images.length} ${t("files selected")}`
                : t("No files chosen")}
            </span>
          </div>

          <input
            id="gallery"
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={(e) =>
              setFieldValue("images", Array.from(e.target.files))
            }
            className="hidden"
          />

          <div className="flex flex-wrap gap-2 mt-2">
            {values.images?.map((file, i) => (
              <img
                key={i}
                src={URL.createObjectURL(file)}
                alt={`Gallery ${i}`}
                className="w-40 h-40 object-cover rounded-md border dark:border-gray-600"
              />
            ))}
          </div>

         
        </div>
      </div>
    </div>
  );
}
