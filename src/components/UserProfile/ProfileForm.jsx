// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useTranslation } from "react-i18next";

// import baseUrl from "@/apis/config";
// import { useState,useContext } from "react";
// import { authContext } from "@/Contexts/AuthContext";


// export default function ProfileForm({
//   isEditing,
//   isSubmitting,
//   setSubmitting,
//   selectedImage,
//   userData,
//   serverError,
//   setServerError,
//   setSubmitRef,
//   onSaved,
// }) {
//   const { t } = useTranslation();
//   const {  setUser } = useContext(authContext);
//   const [toast, setToast] = useState({ message: "", type: "success", visible: false });

//   const showToast = (message, type = "success", duration = 3000) => {
//     setToast({ message, type, visible: true });
//     setTimeout(() => setToast(prev => ({ ...prev, visible: false })), duration);
//   };

//   const validationSchema = Yup.object({
//     name: Yup.string().required(t("first_name_required")),
//     email: Yup.string()
//       .email(t("email_invalid"))
//       .required(t("email_required")),
//     phone: Yup.string()
//       .matches(/^(\+20)?01[0-2,5]{1}[0-9]{8}$/, t("phone_invalid"))
//       .required(t("phone_required")),
//     oldPassword: Yup.string().min(6, t("UserProfile.password_invalid")),
//     newPassword: Yup.string().min(6, t("UserProfile.password_invalid")),
//     confirmPassword: Yup.string().oneOf(
//       [Yup.ref("newPassword"), null],
//       t("password_not_match")
//     ),
//   });

//   const handleSave = async (values, { setSubmitting: setFormikSubmitting }) => {
//     try {
//       setServerError("");
//       setSubmitting(true);
//       setFormikSubmitting(true);

//       const formData = new FormData();
//       formData.append("fName", values.name.split(" ")[0]);
//       formData.append("lName", values.name.split(" ")[1] || "");
//       formData.append("email", values.email);
//       formData.append("phone", values.phone);
//        if (selectedImage) formData.append("avatar", selectedImage)


//       await baseUrl.patch(`http://localhost:3000/users/profile`, formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       const wantsToChangePassword = values.newPassword.trim() !== "";

//       if (wantsToChangePassword) {
//         if (!values.oldPassword || !values.confirmPassword) {
//           setServerError(
//             t("UserProfile.password_incomplete") || "❌ الرجاء إدخال كل حقول كلمة المرور لتحديثها"
//           );
//           return;
//         }

//         await baseUrl.patch(
//           `http://localhost:3000/auth/change-password`,
//           {
//             oldPassword: values.oldPassword,
//             newPassword: values.newPassword,
//             confirmPassword: values.confirmPassword,
//           },
//           {
//             headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//           }
//         );
//       }
      

//       const updatedUser = {
//         fName: values.name.split(" ")[0],
//         lName: values.name.split(" ")[1] || "",
//         email: values.email,
//         phone: values.phone,
//         avatar:  userData.avatar,
//       };


//       setUser(prev => ({ ...prev, ...updatedUser }));

//            onSaved?.(updatedUser);


// // لو عندك authContext
// if (selectedImage) {
//   setUser(prev => ({
//     ...prev,
//     avatar: URL.createObjectURL(selectedImage),
//   }));
// }


//       // استبدال alert بتوست
//       showToast(t("successMessageProfile") || "✅ تم تحديث بياناتك بنجاح", "success");

//     } catch (err) {
//       console.error(err);
//       const raw = err.response?.data?.message;
//       const errorMap = {
//         "Old password is incorrect": t("errors.OLD_PASSWORD_INCORRECT") || "كلمة المرور القديمة غير صحيحة",
//         "User not found": t("errors.USER_NOT_FOUND") || "المستخدم غير موجود",
//         "Invalid token": t("errors.INVALID_TOKEN") || "جلسة المستخدم غير صالحة",
//         "INVALID_CREDENTIALS": t("errors.INVALID_CREDENTIALS"),
//         "EMAIL_IN_USE": t("errors.EMAIL_IN_USE"),
//       };

//       setServerError(errorMap[raw] || t("password_invalid") || "حدث خطأ أثناء تحديث البيانات");
//       showToast(errorMap[raw] || t("password_invalid") || "حدث خطأ أثناء تحديث البيانات", "error");
//     } finally {
//       setSubmitting(false);
//       setFormikSubmitting(false);
//     }
//   };

//   const initialValues = {
//     name: `${userData.fName} ${userData.lName}`,
//     email: userData.email,
//     phone: userData.phone,
//     oldPassword: "",
//     newPassword: "",
//     confirmPassword: "",
    
//   };
  

//   const isLocked = !isEditing || isSubmitting;

//   // Toast component
//   const Toast = ({ message, type }) => {
//     if (!toast.visible) return null;
//     const typeStyles = {
//       success: "bg-emerald-600 border-emerald-700",
//       error: "bg-red-600 border-red-700",
//       warning: "bg-amber-600 border-amber-700",
//       info: "bg-blue-600 border-blue-700",
//     };
//     return (
//       <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
//         <div
//           className={`${
//             typeStyles[type] || typeStyles.info
//           } text-white px-4 py-3 rounded-xl border shadow-2xl w-fit max-w-[92vw] transition-transform animate-[slideDown_.25s_ease-out]`}
//         >
//           {message}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       <Formik
//         enableReinitialize
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSave}
//       >
//         {({ handleSubmit, submitForm }) => {
//           setSubmitRef?.(submitForm);
//           return (
//             <Form onSubmit={handleSubmit}>
//               {/* بقية الحقول تبقى كما هي */}
//               <div className="grid grid-cols-2 gap-6 mb-12">
//                 {["name", "email"].map((field) => (
//                   <div className="text-right" key={field}>
//                     <label className="block text-gray-600 mb-2">
//                       {field === "name" ? t("first_name") : t("email")}
//                     </label>
//                     {isEditing ? (
//                       <>
//                         <Field
//                           type={field === "email" ? "email" : "text"}
//                           name={field}
//                           disabled={isLocked}
//                           className={`w-full px-3 py-2 border rounded-lg text-right focus:outline-none ${
//                             isLocked
//                               ? "bg-gray-100 cursor-not-allowed"
//                               : "border-gray-300 focus:ring-2 focus:ring-green-500"
//                           }`}
//                         />
//                         <ErrorMessage
//                           name={field}
//                           component="div"
//                           className="text-red-500 text-sm mt-1"
//                         />
//                       </>
//                     ) : (
//                       <div className="text-gray-900 font-medium">{initialValues[field]}</div>
//                     )}
//                   </div>
//                 ))}
//                 <div className="text-right col-span-2">
//                   <label className="block text-gray-600 mb-2">{t("phone")}</label>
//                   {isEditing ? (
//                     <>
//                       <Field
//                         type="tel"
//                         name="phone"
//                         disabled={isLocked}
//                         className={`w-full px-3 py-2 border rounded-lg text-right focus:outline-none ${
//                           isLocked
//                             ? "bg-gray-100 cursor-not-allowed"
//                             : "border-gray-300 focus:ring-2 focus:ring-green-500"
//                         }`}
//                       />
//                       <ErrorMessage
//                         name="phone"
//                         component="div"
//                         className="text-red-500 text-sm mt-1"
//                       />
//                     </>
//                   ) : (
//                     <div className="text-gray-900">{initialValues.phone}</div>
//                   )}
//                 </div>
//               </div>

//               {/* الأمان */}
//               <div className="border-t pt-8 mb-8">
//                 <h2 className="text-xl font-bold text-gray-900 mb-2">{t("labels.security") || "الأمان"}</h2>
//                 <p className="text-gray-600 mb-6">{t("labels.updatePassword") || "تحديث كلمة المرور الخاصة بك"}</p>

//                 <div className="space-y-4">
//                   {["oldPassword", "newPassword", "confirmPassword"].map((field) => (
//                     <div key={field}>
//                       <Field
//                         type="password"
//                         name={field}
//                         disabled={isLocked}
//                         placeholder={
//                           field === "oldPassword"
//                             ? t("password_placeholder") || "كلمة المرور القديمة"
//                             : field === "newPassword"
//                             ? t("password_placeholder") || "كلمة المرور الجديدة"
//                             : t("confirm_password_placeholder") || "تأكيد كلمة المرور الجديدة"
//                         }
//                         className={`w-full px-4 py-3 border rounded-lg text-right focus:outline-none ${
//                           isLocked
//                             ? "bg-gray-100 cursor-not-allowed"
//                             : "border-gray-300 focus:ring-2 focus:ring-green-500"
//                         }`}
//                       />
//                       <ErrorMessage
//                         name={field}
//                         component="div"
//                         className="text-red-500 text-sm mt-1"
//                       />
//                     </div>
//                   ))}

//                   {serverError && (
//                     <div className="text-red-500 text-sm mt-2 text-center">{serverError}</div>
//                   )}

//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className={`px-8 py-3 rounded-lg font-medium transition-colors ${
//                       isSubmitting
//                         ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//                         : "bg-green-600 hover:bg-green-700 text-white"
//                     }`}
//                   >
//                     {isSubmitting
//                       ? t("buttons.saving") || "جارٍ الحفظ..."
//                       : t("buttons.saveChanges") || "حفظ التغييرات"}
//                   </button>
//                 </div>
//               </div>
//             </Form>
//           );
//         }}
//       </Formik>

//       <Toast message={toast.message} type={toast.type} />
//     </>
//   );
// }



import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

import baseUrl from "@/apis/config";
import { useState, useContext } from "react";
import { authContext } from "@/Contexts/AuthContext";

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
  const { t } = useTranslation();
  const { setUser } = useContext(authContext);
  const [toast, setToast] = useState({ message: "", type: "success", visible: false });

  const showToast = (message, type = "success", duration = 3000) => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), duration);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(t("first_name_required")),
    email: Yup.string().email(t("email_invalid")).required(t("email_required")),
    phone: Yup.string()
      .matches(/^(\+20)?01[0-2,5]{1}[0-9]{8}$/, t("phone_invalid"))
      .required(t("phone_required")),
    oldPassword: Yup.string().min(6, t("UserProfile.password_invalid")),
    newPassword: Yup.string().min(6, t("UserProfile.password_invalid")),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      t("password_not_match")
    ),
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

      const res = await baseUrl.patch(`http://localhost:3000/users/profile`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const wantsToChangePassword = values.newPassword.trim() !== "";
      if (wantsToChangePassword) {
        if (!values.oldPassword || !values.confirmPassword) {
          setServerError(
            t("UserProfile.password_incomplete") || "❌ الرجاء إدخال كل حقول كلمة المرور لتحديثها"
          );
          return;
        }

        await baseUrl.patch(
          `http://localhost:3000/auth/change-password`,
          {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
          },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
      }

      const updatedUser = {
        fName: values.name.split(" ")[0],
        lName: values.name.split(" ")[1] || "",
        email: values.email,
        phone: values.phone,
        avatar: res.data.data.avatar || userData.avatar, // الصورة النهائية من السيرفر
      };

      setUser(prev => ({ ...prev, ...updatedUser }));
      onSaved?.(updatedUser);

      showToast(t("successMessageProfile") || "✅ تم تحديث بياناتك بنجاح", "success");
    } catch (err) {
      console.error(err);
      const raw = err.response?.data?.message;
      const errorMap = {
        "Old password is incorrect": t("errors.OLD_PASSWORD_INCORRECT") || "كلمة المرور القديمة غير صحيحة",
        "User not found": t("errors.USER_NOT_FOUND") || "المستخدم غير موجود",
        "Invalid token": t("errors.INVALID_TOKEN") || "جلسة المستخدم غير صالحة",
        "INVALID_CREDENTIALS": t("errors.INVALID_CREDENTIALS"),
        "EMAIL_IN_USE": t("errors.EMAIL_IN_USE"),
      };

      setServerError(errorMap[raw] || t("password_invalid") || "حدث خطأ أثناء تحديث البيانات");
      showToast(errorMap[raw] || t("password_invalid") || "حدث خطأ أثناء تحديث البيانات", "error");
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

  const Toast = ({ message, type }) => {
    if (!toast.visible) return null;
    const typeStyles = {
      success: "bg-emerald-600 border-emerald-700",
      error: "bg-red-600 border-red-700",
      warning: "bg-amber-600 border-amber-700",
      info: "bg-blue-600 border-blue-700",
    };
    return (
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <div
          className={`${
            typeStyles[type] || typeStyles.info
          } text-white px-4 py-3 rounded-xl border shadow-2xl w-fit max-w-[92vw] transition-transform animate-[slideDown_.25s_ease-out]`}
        >
          {message}
        </div>
      </div>
    );
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSave}
      >
        {({ handleSubmit, submitForm }) => {
          setSubmitRef?.(submitForm);
          return (
            <Form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-6 mb-12">
                {["name", "email"].map(field => (
                  <div className="text-right" key={field}>
                    <label className="block text-gray-600 mb-2">
                      {field === "name" ? t("first_name") : t("email")}
                    </label>
                    {isEditing ? (
                      <>
                        <Field
                          type={field === "email" ? "email" : "text"}
                          name={field}
                          disabled={isLocked}
                          className={`w-full px-3 py-2 border rounded-lg text-right focus:outline-none ${
                            isLocked
                              ? "bg-gray-100 cursor-not-allowed"
                              : "border-gray-300 focus:ring-2 focus:ring-green-500"
                          }`}
                        />
                        <ErrorMessage
                          name={field}
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </>
                    ) : (
                      <div className="text-gray-900 font-medium">{initialValues[field]}</div>
                    )}
                  </div>
                ))}
                <div className="text-right col-span-2">
                  <label className="block text-gray-600 mb-2">{t("phone")}</label>
                  {isEditing ? (
                    <>
                      <Field
                        type="tel"
                        name="phone"
                        disabled={isLocked}
                        className={`w-full px-3 py-2 border rounded-lg text-right focus:outline-none ${
                          isLocked
                            ? "bg-gray-100 cursor-not-allowed"
                            : "border-gray-300 focus:ring-2 focus:ring-green-500"
                        }`}
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </>
                  ) : (
                    <div className="text-gray-900">{initialValues.phone}</div>
                  )}
                </div>
              </div>

              <div className="border-t pt-8 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{t("labels.security") || "الأمان"}</h2>
                <p className="text-gray-600 mb-6">{t("labels.updatePassword") || "تحديث كلمة المرور الخاصة بك"}</p>

                <div className="space-y-4">
                  {["oldPassword", "newPassword", "confirmPassword"].map(field => (
                    <div key={field}>
                      <Field
                        type="password"
                        name={field}
                        disabled={isLocked}
                        placeholder={
                          field === "oldPassword"
                            ? t("password_placeholder") || "كلمة المرور القديمة"
                            : field === "newPassword"
                            ? t("password_placeholder") || "كلمة المرور الجديدة"
                            : t("confirm_password_placeholder") || "تأكيد كلمة المرور الجديدة"
                        }
                        className={`w-full px-4 py-3 border rounded-lg text-right focus:outline-none ${
                          isLocked
                            ? "bg-gray-100 cursor-not-allowed"
                            : "border-gray-300 focus:ring-2 focus:ring-green-500"
                        }`}
                      />
                      <ErrorMessage
                        name={field}
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  ))}

                  {serverError && (
                    <div className="text-red-500 text-sm mt-2 text-center">{serverError}</div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                      isSubmitting
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {isSubmitting
                      ? t("buttons.saving") || "جارٍ الحفظ..."
                      : t("buttons.saveChanges") || "حفظ التغييرات"}
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>

      <Toast message={toast.message} type={toast.type} />
    </>
  );
}

