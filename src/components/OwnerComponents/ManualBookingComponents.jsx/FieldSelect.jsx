import { Field, ErrorMessage } from "formik";

const FieldSelect = ({ name, label, options }) => (
  <div>
    <label className="block mb-2 text-gray-600">{label}</label>
    <Field
      as="select"
      name={name}
      className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-green-300 focus:outline-none"
    >
      {options.map((opt, idx) => (
        <option key={idx} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </Field>
    <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
  </div>
);

export default FieldSelect;
