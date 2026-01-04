import { Field, ErrorMessage } from "formik";

const FieldTextarea = ({ name, label, rows = 3 }) => (
  <div className="mt-4">
    <label className="block mb-2 text-gray-600 dark:text-gray-400">{label}</label>
    <Field
      as="textarea"
      name={name}
      rows={rows}
      className="w-full border dark:border-gray-600 rounded-xl p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-300 dark:focus:ring-green-500 focus:outline-none transition-colors"
    />
    <ErrorMessage name={name} component="div" className="text-red-500 dark:text-red-400 text-sm" />
  </div>
);

export default FieldTextarea;
