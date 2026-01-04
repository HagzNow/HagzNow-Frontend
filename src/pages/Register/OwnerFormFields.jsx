import React from "react";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import UserFormFields from "./UserFormFields";

export default function OwnerFormFields({ formik }) {
  return (
    <>
      <UserFormFields formik={formik} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10">
        <ImageUpload
          label="الصورة الأمامية للهوية"
          name="nationalIdFront"
          formik={formik}
        />
        <ImageUpload
          label="الصورة الخلفية للهوية"
          name="nationalIdBack"
          formik={formik}
        />
        <ImageUpload
          label="الصورة الشخصية مع الهوية"
          name="selfieWithId"
          formik={formik}
        />
      </div>
    </>
  );
}
