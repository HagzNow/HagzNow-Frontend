import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function ProfileForm({
  isEditing,
  isSubmitting,       
  setSubmitting,       
  selectedImage,
  userData,
  serverError,
  setServerError,
  setSubmitRef,
  onSaved,
}) {
  const validationSchema = Yup.object({
    name: Yup.string().required("الاسم مطلوب"),
    email: Yup.string().email("البريد الإلكتروني غير صالح").required("البريد الإلكتروني مطلوب"),
    phone: Yup.string().matches(/^(\+20)?01[0-2,5]{1}[0-9]{8}$/, "رقم الهاتف غير صالح").required("رقم الهاتف مطلوب"),
    oldPassword: Yup.string().min(6, "كلمة المرور القديمة قصيرة جدًا"),
    newPassword: Yup.string().min(6, "كلمة المرور الجديدة قصيرة جدًا"),
    confirmPassword: Yup.string().oneOf([Yup.ref("newPassword"), null], "كلمة المرور غير متطابقة"),
  });

  const handleSave = async (values, { setSubmitting: setFormikSubmitting }) => {
    try {
      setServerError("");
      setSubmitting(true);              
      setFormikSubmitting(true);

      const formData = new FormData();
      formData.append("fName", values.name.split(" ")[0]);
      formData.append("lName", values.name.split(" ")[1] || "");
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      if (selectedImage) formData.append("avatar", selectedImage);

      await axios.patch(`http://localhost:3000/users/profile`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (values.oldPassword && values.newPassword) {
        await axios.patch(
          `http://localhost:3000/auth/change-password`,
          {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
          },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
      } else if (values.oldPassword || values.newPassword) {
        setServerError("❌ الرجاء إدخال كلمة المرور القديمة والجديدة لتحديث كلمة المرور");
        return;
      }

      onSaved?.({
        fName: values.name.split(" ")[0],
        lName: values.name.split(" ")[1] || "",
        email: values.email,
        phone: values.phone,
      });
      alert("✅ تم تحديث بياناتك بنجاح");
    } catch (err) {
      console.error(err);
      setServerError(err.response?.data?.message || "❌ حدث خطأ أثناء تحديث البيانات");
    } finally {
      setSubmitting(false);       
      setFormikSubmitting(false);
    }
  };

  const initialValues = {
    name: `${userData.fName} ${userData.lName}`,
    email: userData.email,
    phone: userData.phone,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const isLocked = !isEditing || isSubmitting; 

  return (
    <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSave}>
      {({ handleSubmit, submitForm }) => {
        setSubmitRef?.(submitForm);
        return (
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6 mb-12">
              {["name", "email"].map((field) => (
                <div className="text-right" key={field}>
                  <label className="block text-gray-600 mb-2">
                    {field === "name" ? "الاسم" : "البريد الإلكتروني"}
                  </label>
                  {isEditing ? (
                    <>
                      <Field
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        disabled={isLocked} // ⬅️ يتبند أثناء الحفظ
                        className={`w-full px-3 py-2 border rounded-lg text-right focus:outline-none ${
                          isLocked ? "bg-gray-100 cursor-not-allowed" : "border-gray-300 focus:ring-2 focus:ring-green-500"
                        }`}
                      />
                      <ErrorMessage name={field} component="div" className="text-red-500 text-sm mt-1" />
                    </>
                  ) : (
                    <div className="text-gray-900 font-medium">{initialValues[field]}</div>
                  )}
                </div>
              ))}

              <div className="text-right col-span-2">
                <label className="block text-gray-600 mb-2">رقم الهاتف</label>
                {isEditing ? (
                  <>
                    <Field
                      type="tel"
                      name="phone"
                      disabled={isLocked}
                      className={`w-full px-3 py-2 border rounded-lg text-right focus:outline-none ${
                        isLocked ? "bg-gray-100 cursor-not-allowed" : "border-gray-300 focus:ring-2 focus:ring-green-500"
                      }`}
                    />
                    <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                  </>
                ) : (
                  <div className="text-gray-900">{initialValues.phone}</div>
                )}
              </div>
            </div>

            {/* الأمان */}
            <div className="border-t pt-8 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">الأمان</h2>
              <p className="text-gray-600 mb-6">تحديث كلمة المرور الخاصة بك</p>

              <div className="space-y-4">
                {["oldPassword", "newPassword", "confirmPassword"].map((field) => (
                  <div key={field}>
                    <Field
                      type="password"
                      name={field}
                      disabled={isLocked}
                      placeholder={
                        field === "oldPassword"
                          ? "كلمة المرور القديمة"
                          : field === "newPassword"
                          ? "كلمة المرور الجديدة"
                          : "تأكيد كلمة المرور الجديدة"
                      }
                      className={`w-full px-4 py-3 border rounded-lg text-right focus:outline-none ${
                        isLocked ? "bg-gray-100 cursor-not-allowed" : "border-gray-300 focus:ring-2 focus:ring-green-500"
                      }`}
                    />
                    <ErrorMessage name={field} component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                ))}

                {serverError && <div className="text-red-500 text-sm mt-2 text-center">{serverError}</div>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                    isSubmitting
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  {isSubmitting ? "جارٍ الحفظ..." : "حفظ التغييرات"}
                </button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
