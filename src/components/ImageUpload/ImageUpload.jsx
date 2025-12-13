function ImageUpload({ label, name, formik }) {
  const fileUploaded = Boolean(formik.values[name]);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-white text-start font-medium drop-shadow-md text-sm">
        {label}
      </label>

      <label
        className={`
          cursor-pointer
          p-4 rounded-xl
          bg-white/20 backdrop-blur-sm
          border border-white/30
          text-white text-sm
          flex items-center justify-between gap-3
          hover:bg-white/30
          transition-all duration-300
        `}
      >
        <span
          className={`text-xs px-3 py-1 rounded-lg ${
            fileUploaded ? "bg-green-500" : "bg-white/20"
          }`}
        >
          {fileUploaded ? "تم التحميل" : "تحميل"}
        </span>

        <input
          type="file"
          accept="image/*"
          hidden
          multiple={false}
          onChange={(e) => formik.setFieldValue(name, e.target.files[0])}
        />
      </label>

      {formik.touched[name] && formik.errors[name] && (
        <span className="text-red-300 text-xs drop-shadow-md text-start">
          {formik.errors[name]}
        </span>
      )}
    </div>
  );
}

export default ImageUpload;
