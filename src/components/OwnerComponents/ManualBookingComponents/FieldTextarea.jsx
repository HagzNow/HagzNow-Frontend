import { Field, ErrorMessage } from "formik";

const FieldTextarea = ({ name, label, rows = 3 }) => (
  <div className="mt-4">
    <label className="block mb-2 text-gray-600">{label}</label>
    <Field
      as="textarea"
      name={name}
      rows={rows}
      className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-green-300 focus:outline-none"
    />
    <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
  </div>
);

export default FieldTextarea;
