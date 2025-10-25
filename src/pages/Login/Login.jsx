import React from "react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { object, string } from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const passwordRegx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;

  const validationSchema = object({
    email: string().required(t("email_required")).email(t("email_invalid")),
    password: string()
      .required(t("password_required"))
      .matches(passwordRegx, t("password_invalid")),
  });

  async function sendDataToLogin(values) {
    try {
      const option = {
        url: "http://localhost:3000/auth/login",
        method: "POST",
        data: values,
      };

      const { data } = await axios.request(option);
      localStorage.setItem("token", data.token);
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: sendDataToLogin,
    validationSchema,
  });

  return (
    <section className="container text-center py-5">
      <div className="title space-y-2">
        <h2 className="text-2xl font-bold text-mainColor">{t("title")}</h2>
        <h2 className="text-2xl font-bold">{t("login_title")}</h2>
        <p className="font-medium text-thirdColor text-sm">
          {t("login_subtitle")}
        </p>
      </div>

      <form className="mt-4" onSubmit={formik.handleSubmit}>
        <div className="bg-secondColor w-[90%] sm:w-[70%] md:w-[40%] lg:w-[30%] mx-auto p-5 rounded-xl space-y-5 shadow-md">
          <div className="flex flex-col space-y-1 text-sm">
            <label className="font-medium text-start">{t("email")}</label>
            <input
              type="text"
              placeholder={t("email_placeholder")}
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="p-2 rounded-md bg-white border border-slate-200 focus:outline-none"
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-xs">{formik.errors.email}</p>
            )}
          </div>

          <div className="flex flex-col space-y-1 text-sm">
            <label className="font-medium text-start">{t("password")}</label>
            <input
              type="password"
              placeholder={t("password_placeholder")}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="p-2 rounded-md bg-white border border-slate-200 focus:outline-none"
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-500 text-xs">{formik.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn bg-mainColor w-full md:w-3/4 text-sm py-2"
          >
            {t("login_button")}
          </button>

          <p className="text-mainColor py-2 text-xs">{t("forgot_password")}</p>
          <p className="text-xs">{t("or")}</p>

          <div className="flex flex-col space-y-2 items-center w-full md:w-3/4 mx-auto">
            <button className="p-2 border rounded-lg w-full bg-white border-thirdColor flex justify-center items-center gap-2 text-xs">
              <FaGoogle /> {t("continue_google")}
            </button>
            <button className="p-2 border rounded-lg w-full bg-white border-thirdColor flex justify-center items-center gap-2 text-xs">
              <FaFacebookF /> {t("continue_facebook")}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
