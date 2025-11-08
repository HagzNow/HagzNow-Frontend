// import { Field, FieldArray } from "formik";
// import { useTranslation } from "react-i18next";
// import { Plus, Trash2 } from "lucide-react";

// const FeaturesSection = () => {
//   const { t } = useTranslation();

//   return (
//     <div className="border rounded-xl p-6">
//       <h3 className="text-lg font-semibold mb-4 text-gray-700">
//         {t("features")}
//       </h3>

//       <FieldArray name="extras">
//         {({ push, remove, form }) => (
//           <div className="space-y-4">
//             {form.values.extras && form.values.extras.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {form.values.extras.map((extra, index) => (
//                   <div
//                     key={index}
//                     className="flex flex-col md:flex-row md:items-center gap-3 border rounded-lg p-3"
//                   >
//                     <div className="flex-1">
//                       <label className="block text-gray-600 text-sm mb-1">
//                         {t("serviceName")}
//                       </label>
//                       <Field
//                         name={`extras[${index}].name`}
//                         placeholder={t("enterServiceName")}
//                         className="w-full border rounded-lg p-2 outline-none focus:ring focus:ring-green-200"
//                       />
//                     </div>

//                     <div className="w-full md:w-24">
//                       <label className="block text-gray-600 text-sm mb-1">
//                         {t("price")}
//                       </label>
//                       <Field
//                         type="number"
//                         name={`extras[${index}].price`}
//                         placeholder="0"
//                         step="10"
//                         className="w-full border rounded-lg p-2 outline-none focus:ring focus:ring-green-200"
//                       />
//                     </div>

//                     <button
//                       type="button"
//                       onClick={() => remove(index)}
//                       className="text-red-500 hover:text-red-700 mt-2 md:mt-6"
//                     >
//                       <Trash2 size={20} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500">{t("noExtrasAdded")}</p>
//             )}

//             <button
//               type="button"
//               onClick={() => push({ name: "", price: "" })}
//               className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
//             >
//               <Plus size={18} /> {t("addExtra")}
//             </button>
//           </div>
//         )}
//       </FieldArray>
//     </div>
//   );
// };

// export default FeaturesSection;


import { Field, FieldArray, ErrorMessage } from "formik";
import { useTranslation } from "react-i18next";
import { Plus, Trash2 } from "lucide-react";

const FeaturesSection = () => {
  const { t } = useTranslation();

  return (
    <div className="border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        {t("features")}
      </h3>

      <FieldArray name="extras">
        {({ push, remove, form }) => (
          <div className="space-y-4">
            {form.values.extras && form.values.extras.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {form.values.extras.map((extra, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row md:items-center gap-3 border rounded-lg p-3"
                  >
                    <div className="flex-1">
                      <label className="block text-gray-600 text-sm mb-1">
                        {t("serviceName")}
                      </label>
                      <Field
                        name={`extras[${index}].name`}
                        placeholder={t("enterServiceName")}
                        className="w-full border rounded-lg p-2 outline-none focus:ring focus:ring-green-200"
                      />
                    </div>

                    <div className="w-full md:w-24">
                      <label className="block text-gray-600 text-sm mb-1">
                        {t("price")}
                      </label>
                      <Field
                        type="number"
                        name={`extras[${index}].price`}
                        placeholder="0"
                        step="10"
                        className="w-full border rounded-lg p-2 outline-none focus:ring focus:ring-green-200"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-700 mt-2 md:mt-6"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              // لو مفيش أي إضافات، نعرض رسالة الخطأ بدل النص الرمادي
              <ErrorMessage
                name="extras"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            )}

            <button
              type="button"
              onClick={() => push({ name: "", price: "" })}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
            >
              <Plus size={18} /> {t("addExtra")}
            </button>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default FeaturesSection;
