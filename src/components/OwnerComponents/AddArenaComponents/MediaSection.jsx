import React from "react";
import { useFormikContext } from "formik";

export default function MediaSection() {
  const { values, setFieldValue } = useFormikContext();

  return (
    <div className="space-y-4">
      {/* ✅ Main Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Main Image</label>
        <input
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={(e) => setFieldValue("thumbnail", e.target.files[0])}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
        {values.thumbnail && (
          <img
            src={URL.createObjectURL(values.thumbnail)}
            alt="Preview"
            className="mt-2 w-40 h-40 object-cover rounded-md"
          />
        )}
      </div>

      {/* ✅ Gallery Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Gallery Images</label>
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={(e) => setFieldValue("images", Array.from(e.target.files))}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {values.images?.map((file, i) => (
            <img
              key={i}
              src={URL.createObjectURL(file)}
              alt={`Gallery ${i}`}
              className="w-24 h-24 object-cover rounded-md"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
