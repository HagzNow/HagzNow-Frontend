import { useFormik } from "formik";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { object, string, ref } from "yup";

export default function Register() {
  const passwordRegx = /^[A-Z][a-z0-9]{5,}$/;
  const phoneRegx = /^01[0125][0-9]{8}$/;

  const validationSchema = object({
    firstName: string("الاسم الاول يجب أن يكون نصًّا")
      .required("الاسم الاول مطلوب")
      .min(3, "الاسم الاول يجب ألا يقل عن 3 أحرف")
      .max(20, "الاسم الاول  يجب ألا يزيد عن 20 حرفًا"),

    lastName: string("الاسم الاخير يجب أن يكون نصًّا")
      .required("الاسم الاخير مطلوب")
      .min(3, "الاسم الاخير يجب ألا يقل عن 3 أحرف")
      .max(20, "الاسم الاخير  يجب ألا يزيد عن 20 حرفًا"),

    email: string("البريد الإلكتروني يجب أن يكون نصًّا")
      .required("البريد الإلكتروني مطلوب")
      .email("يجب إدخال بريد إلكتروني صالح"),
    role: string().required("يجب اختيار الدور (مالك أو لاعب)"),
    password: string()
      .required("كلمة المرور مطلوبة")
      .matches(
        passwordRegx,
        "يجب أن تبدأ كلمة المرور بحرف كبير متبوع بـ 5 أحرف أو أكثر"
      ),
    rePassword: string()
      .required("تأكيد كلمة المرور مطلوب")
      .matches(passwordRegx, "صيغة كلمة المرور غير صحيحة")
      .oneOf([ref("password")], "كلمة المرور غير متطابقة"),

    phone: string()
      .required("رقم الهاتف مطلوب")
      .matches(phoneRegx, "يجب إدخال رقم هاتف مصري صالح"),
  });

  async function sendDataToRegister(values) {
    console.log(values);
  }

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      role: "player",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    onSubmit: sendDataToRegister,
    validationSchema,
  });

  return (
    <>
      <section className="container text-center py-5">
        <div className="title  space-y-3">
          <h2 className=" text-4xl font-bold text-mainColor ">ارينا بوك</h2>
          <h2 className="text-4xl font-bold">إنشاء حساب في أرينا بوك</h2>
          <p className=" font-medium text-thirdColor">
            سجل لتبدأ رحلتك الرياضية
          </p>
        </div>

        <form action="" className=" mt-5" onSubmit={formik.handleSubmit}>
          <div className=" space-x-3 space-y-6 bg-secondColor w-1/2 m-auto p-7 rounded-2xl">
            <div className="flex gap-3 justify-center">
              <div>
                <input
                  type="radio"
                  id="owner"
                  name="role"
                  value="owner"
                  className="hidden peer/option1"
                  onChange={formik.handleChange}
                  checked={formik.values.role === "owner"}
                />
                <label
                  htmlFor="owner"
                  className={`btn text-2xl ${
                    formik.values.role === "owner"
                      ? "bg-mainColor text-white"
                      : "bg-secondColor text-black"
                  }`}
                >
                  مالك
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="player"
                  name="role"
                  value="player"
                  className="hidden peer/option2"
                  onChange={formik.handleChange}
                  checked={formik.values.role === "B"}
                />
                <label
                  htmlFor="player"
                  className={`btn text-2xl ${
                    formik.values.role === "player"
                      ? "bg-mainColor text-white"
                      : "bg-secondColor text-black"
                  }`}
                >
                  لاعب
                </label>
              </div>
            </div>

            <div className="flex flex-col space-y-1.5 mt-5">
              <label htmlFor="" className=" text-start">
                الاسم الاول
              </label>
              <input
                type="text"
                placeholder="أدخل اسمك الأول"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="p-3 rounded-md bg-white border-2 border-slate-200  focus:outline-none"
              />
            </div>
            {formik.errors.firstName && formik.touched.firstName && (
              <p className=" text-red-500 font-semibold">
                {formik.errors.firstName}
              </p>
            )}

            <div className="flex flex-col space-y-1.5 mt-5">
              <label htmlFor="" className=" text-start">
                الاسم الاخير
              </label>
              <input
                type="text"
                placeholder="أدخل اسمك الاخير"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="p-3 rounded-md bg-white border-2 border-slate-200  focus:outline-none"
              />
            </div>
            {formik.errors.lastName && formik.touched.lastName && (
              <p className=" text-red-500 font-semibold">
                {formik.errors.lastName}
              </p>
            )}
            <div className="flex flex-col space-y-1.5 mt-5">
              <label htmlFor="" className=" text-start">
                بريدك الإلكتروني
              </label>
              <input
                type="text"
                placeholder="أدخل بريدك الإلكتروني"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="p-3 rounded-md bg-white border-2 border-slate-200  focus:outline-none"
              />
            </div>
            {formik.errors.email && formik.touched.email && (
              <p className=" text-red-500 font-semibold">
                {formik.errors.email}
              </p>
            )}
            <div className="flex flex-col space-y-1.5 mt-5">
              <label htmlFor="" className=" text-start">
                رقم هاتفك
              </label>
              <input
                type="text"
                placeholder="أدخل رقم هاتفك"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="p-3 rounded-md bg-white border-2 border-slate-200  focus:outline-none"
              />
            </div>
            {formik.errors.phone && formik.touched.phone && (
              <p className=" text-red-500 font-semibold">
                {formik.errors.phone}
              </p>
            )}
            <div className="flex flex-col space-y-1.5 mt-5">
              <label htmlFor="" className=" text-start">
                كلمة المرور
              </label>
              <input
                type="text"
                placeholder="أأدخل كلمة المرور"
                name="password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="p-3 rounded-md bg-white border-2 border-slate-200  focus:outline-none"
              />
            </div>
            {formik.errors.password && formik.touched.password && (
              <p className=" text-red-500 font-semibold">
                {formik.errors.password}
              </p>
            )}
            <div className="flex flex-col space-y-1.5 mt-5">
              <label htmlFor="" className=" text-start">
                تاكيد كلمة المرور
              </label>
              <input
                type="text"
                placeholder="أعد إدخال كلمة المرور"
                name="rePassword"
                value={formik.values.rePassword}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="p-3 rounded-md bg-white border-2 border-slate-200  focus:outline-none"
              />
            </div>
            {formik.errors.rePassword && formik.touched.rePassword && (
              <p className=" text-red-500 font-semibold">
                {formik.errors.rePassword}
              </p>
            )}
            <button type="submit" className="btn bg-mainColor w-3/4">
              إنشاء حساب
            </button>

            <p className=" text-mainColor py-3">
              لدي حساب بالفعل؟ تسجيل الدخول
            </p>
            <p>او</p>

            <div className="flex flex-col  space-y-2 items-center w-3/4 m-auto">
              <button className="p-4 border rounded-2xl w-full bg-white border-thirdColor flex justify-center  items-center gap-3">
                <FaGoogle /> المتابعة باستخدام جوجل
              </button>
              <button className="p-4 border rounded-2xl w-full bg-white border-thirdColor flex justify-center  items-center gap-3">
                <FaFacebookF /> المتابعة باستخدام فيسبوك
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
