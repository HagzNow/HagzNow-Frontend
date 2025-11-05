import { useState } from "react";
import { User } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function UserProfile() {
  const [language, setLanguage] = useState("arabic");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const initialValues = {
    name: "علي أحمد",
    email: "aliahmed@example.com",
    phone: "+201023456789",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  // ✅ Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required("الاسم مطلوب"),
    email: Yup.string()
      .email("البريد الإلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
    phone: Yup.string()
      .matches(/^(\+20)?01[0-2,5]{1}[0-9]{8}$/, "رقم الهاتف غير صالح")
      .required("رقم الهاتف مطلوب"),
    oldPassword: Yup.string()
      .min(6, "كلمة المرور القديمة قصيرة جدًا")
      .required("أدخل كلمة المرور القديمة"),
    newPassword: Yup.string()
      .min(6, "كلمة المرور الجديدة قصيرة جدًا")
      .required("أدخل كلمة المرور الجديدة"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "كلمة المرور غير متطابقة")
      .required("تأكيد كلمة المرور مطلوب"),
  });

  const handleSave = (values) => {
    setIsEditing(false);
    console.log("User info saved:", values);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <main className="w-3/4 mt-[20px] mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Title */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              معلومات الملف الشخصي
            </h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`${
                isEditing
                  ? "text-blue-600 hover:text-blue-700"
                  : "text-green-600 hover:text-green-700"
              } flex items-center gap-2`}
            >
              <span>{isEditing ? "حفظ" : "تعديل"}</span>
              <span>{isEditing ? "💾" : "✏️"}</span>
            </button>
          </div>

          {/* Profile Picture */}
          {/* Profile Picture with Upload */}
<div className="flex flex-col items-center mb-8">
  <div className="relative w-28 h-28">
    <div className="w-full h-full rounded-full overflow-hidden border-2 border-green-500">
      {selectedImage ? (
        <img
          src={URL.createObjectURL(selectedImage)}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-blue-100 flex items-center justify-center">
          <User size={48} className="text-blue-400" />
        </div>
      )}
    </div>

    {isEditing && (
      <>
        <label
          htmlFor="profileImage"
          className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full cursor-pointer hover:bg-green-700 transition"
        >
          📷
        </label>
        <input
          id="profileImage"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setSelectedImage(file);
          }}
          className="hidden"
        />
      </>
    )}
  </div>

  <p className="text-sm text-gray-500 mt-3">اضغط على الكاميرا لتغيير الصورة</p>
</div>

          {/* Formik Wrapper */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSave}
          >
            {({ values,  handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                {/* Personal Info */}
                <div className="grid grid-cols-2 gap-6 mb-12">
                  {/* Name */}
                  <div className="text-right">
                    <label className="block text-gray-600 mb-2">الاسم</label>
                    {isEditing ? (
                      <>
                        <Field
                          type="text"
                          name="name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </>
                    ) : (
                      <div className="text-gray-900 font-medium">
                        {values.name}
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="text-right">
                    <label className="block text-gray-600 mb-2">
                      البريد الإلكتروني
                    </label>
                    {isEditing ? (
                      <>
                        <Field
                          type="email"
                          name="email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </>
                    ) : (
                      <div className="text-gray-900">{values.email}</div>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="text-right col-span-2">
                    <label className="block text-gray-600 mb-2">
                      رقم الهاتف
                    </label>
                    {isEditing ? (
                      <>
                        <Field
                          type="tel"
                          name="phone"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </>
                    ) : (
                      <div className="text-gray-900">{values.phone}</div>
                    )}
                  </div>
                </div>

                {/* Password Section */}
                <div className="border-t pt-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">الأمان</h2>
                  <p className="text-gray-600 mb-6">
                    تحديث كلمة المرور الخاصة بك
                  </p>

                  <div className="space-y-4">
                    {["oldPassword", "newPassword", "confirmPassword"].map(
                      (field, i) => (
                        <div key={i}>
                          <Field
                            type="password"
                            name={field}
                            placeholder={
                              field === "oldPassword"
                                ? "كلمة المرور القديمة"
                                : field === "newPassword"
                                ? "كلمة المرور الجديدة"
                                : "تأكيد كلمة المرور الجديدة"
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                          <ErrorMessage
                            name={field}
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                      )
                    )}

                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                    >
                      حفظ التغييرات
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>

          {/* Language Section */}
          <div className="border-t mt-12 pt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">اللغة</h2>
            <p className="text-gray-600 mb-6">
              تغيير اللغة واللهجة المستخدمة
            </p>

            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <span className="text-gray-700">Arabic</span>
                <button
                  type="button"
                  onClick={() =>
                    setLanguage(language === "arabic" ? "english" : "arabic")
                  }
                  className="relative inline-block w-12 h-6 bg-green-600 rounded-full cursor-pointer"
                >
                  <div
                    className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                      language === "arabic" ? "right-1" : "right-7"
                    }`}
                  ></div>
                </button>
                <span className="text-gray-700">English</span>
              </div>
              <span className="text-gray-600">لغة العرض</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
