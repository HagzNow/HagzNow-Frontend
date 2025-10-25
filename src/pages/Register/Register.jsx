import { useFormik } from "formik";
import React from "react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { object, string, ref } from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Register() {
  const { t } = useTranslation();
  const passwordRegx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;
  const phoneRegx = /^01[0125][0-9]{8}$/;
  const naviagte = useNavigate();

  const validationSchema = object({
    fName: string().required(t("first_name_required")).min(3).max(20),
    lName: string().required(t("last_name_required")).min(3).max(20),
    email: string().required(t("email_required")).email(t("email_invalid")),
    role: string().required(t("role_required")),
    password: string()
      .required(t("password_required"))
      .matches(passwordRegx, t("password_invalid")),
    rePassword: string()
      .required(t("confirm_password_required"))
      .matches(passwordRegx, t("password_invalid"))
      .oneOf([ref("password")], t("password_not_match")),
    phone: string()
      .required(t("phone_required"))
      .matches(phoneRegx, t("phone_invalid")),
  });

  async function sendDataToRegister(values) {
    try {
      const { rePassword: _, ...userData } = values;
      const option = {
        url: "http://localhost:3000/auth/register",
        method: "POST",
        data: userData,
      };
      const { data } = await axios.request(option);
      localStorage.setItem("token", data.token);
      setTimeout(() => {
        naviagte("/home");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      fName: "",
      lName: "",
      role: "user",
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
        <div className="title space-y-2">
          <h2 className="text-2xl font-bold text-mainColor">{t("title")}</h2>
          <h2 className="text-2xl font-bold">{t("register_title")}</h2>
          <p className="font-medium text-thirdColor text-xs md:text-sm">
            {t("register_subtitle")}
          </p>
        </div>

        <form
          className="mt-4"
          onSubmit={formik.handleSubmit}
          // dir={i18n.language === "ar" ? "rtl" : "ltr"}
        >
          <div
            className="
        bg-secondColor 
        w-[90%] sm:w-[70%] md:w-[40%] lg:w-[30%]
        mx-auto 
        p-4 
        rounded-xl 
        shadow-md 
        space-y-4
      "
          >
            <div className="flex justify-center gap-2">
              <label
                htmlFor="owner"
                className={`btn text-sm ${
                  formik.values.role === "owner"
                    ? "bg-mainColor text-white"
                    : "bg-secondColor text-black"
                }`}
              >
                <input
                  type="radio"
                  id="owner"
                  name="role"
                  value="owner"
                  className="hidden"
                  onChange={formik.handleChange}
                  checked={formik.values.role === "owner"}
                />
                {t("role_owner")}
              </label>

              <label
                htmlFor="user"
                className={`btn text-sm ${
                  formik.values.role === "user"
                    ? "bg-mainColor text-white"
                    : "bg-secondColor text-black"
                }`}
              >
                <input
                  type="radio"
                  id="user"
                  name="role"
                  value="user"
                  className="hidden"
                  onChange={formik.handleChange}
                  checked={formik.values.role === "user"}
                />
                {t("role_user")}
              </label>
            </div>

            <div className="flex flex-col text-start space-y-2 text-sm">
              <label>{t("first_name")}</label>
              <input
                type="text"
                name="fName"
                placeholder={t("first_name_placeholder")}
                value={formik.values.fName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="p-2 rounded-md border border-gray-300 focus:outline-none"
              />
              {formik.errors.fName && formik.touched.fName && (
                <p className="text-red-500 text-xs">{formik.errors.fName}</p>
              )}
            </div>

            <div className="flex flex-col text-start space-y-2 text-sm">
              <label>{t("last_name")}</label>
              <input
                type="text"
                name="lName"
                placeholder={t("last_name_placeholder")}
                value={formik.values.lName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="p-2 rounded-md border border-gray-300 focus:outline-none"
              />
              {formik.errors.lName && formik.touched.lName && (
                <p className="text-red-500 text-xs">{formik.errors.lName}</p>
              )}
            </div>

            <div className="flex flex-col text-start space-y-2 text-sm">
              <label>{t("email")}</label>
              <input
                type="text"
                name="email"
                placeholder={t("email_placeholder")}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="p-2 rounded-md border border-gray-300 focus:outline-none"
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-500 text-xs">{formik.errors.email}</p>
              )}
            </div>

            <div className="flex flex-col text-start space-y-2 text-sm">
              <label>{t("phone")}</label>
              <input
                type="text"
                name="phone"
                placeholder={t("phone_placeholder")}
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="p-2 rounded-md border border-gray-300 focus:outline-none"
              />
              {formik.errors.phone && formik.touched.phone && (
                <p className="text-red-500 text-xs">{formik.errors.phone}</p>
              )}
            </div>

            <div className="flex flex-col text-start space-y-2 text-sm">
              <label>{t("password")}</label>
              <input
                type="password"
                name="password"
                placeholder={t("password_placeholder")}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="p-2 rounded-md border border-gray-300 focus:outline-none"
              />
              {formik.errors.password && formik.touched.password && (
                <p className="text-red-500 text-xs">{formik.errors.password}</p>
              )}
            </div>

            <div className="flex flex-col text-start space-y-2 text-sm">
              <label>{t("confirm_password")}</label>
              <input
                type="password"
                name="rePassword"
                placeholder={t("confirm_password_placeholder")}
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="p-2 rounded-md border border-gray-300 focus:outline-none"
              />
              {formik.errors.rePassword && formik.touched.rePassword && (
                <p className="text-red-500 text-xs">
                  {formik.errors.rePassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn bg-mainColor text-white w-full py-2 text-sm"
            >
              {t("create_account")}
            </button>

            <p className="text-mainColor text-xs py-1">
              {t("already_have_account")}
            </p>
            <p className="text-xs">{t("or")}</p>

            <div className="flex flex-col space-y-2">
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
    </>
  );
}
