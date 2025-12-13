import React from "react";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import UserFormFields from "./UserFormFields";

export default function OwnerFormFields({ formik }) {
  return (
    <>
      <UserFormFields formik={formik} />
      <div className="space-y-4">
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
