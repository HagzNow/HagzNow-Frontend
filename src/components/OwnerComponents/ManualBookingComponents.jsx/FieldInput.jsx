import { Field, ErrorMessage } from "formik";

const FieldInput = ({ name, label, type = "text", className = "" }) => (
  <div className={className}>
    <label className="block mb-2 text-gray-600">{label}</label>
    <Field
      type={type}
      name={name}
      className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-green-300 focus:outline-none"
    />
    <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
  </div>
);

export default FieldInput;
