import React from "react";
import { useTranslation } from "react-i18next";

export default function UserFormFields({ formik }) {
    const { t } = useTranslation();
  
    return (
    <>
      <div className="flex flex-col text-start space-y-2 text-sm">
        <label className="text-white font-medium drop-shadow-md">
          {t("first_name")}
        </label>
        <input
          type="text"
          name="fName"
          placeholder={t("first_name_placeholder")}
          value={formik.values.fName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`p-3 rounded-lg bg-white/20 backdrop-blur-sm border ${
            formik.errors.fName && formik.touched.fName
              ? "border-red-400 focus:ring-red-400"
              : "border-white/30 focus:ring-green-500"
          } text-white placeholder-white/60 focus:outline-none focus:ring-2 transition-colors`}
        />
        {formik.errors.fName && formik.touched.fName && (
          <p className="text-red-300 text-xs drop-shadow-md">
            {formik.errors.fName}
          </p>
        )}
      </div>

      <div className="flex flex-col text-start space-y-2 text-sm">
        <label className="text-white font-medium drop-shadow-md">
          {t("last_name")}
        </label>
        <input
          type="text"
          name="lName"
          placeholder={t("last_name_placeholder")}
          value={formik.values.lName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`p-3 rounded-lg bg-white/20 backdrop-blur-sm border ${
            formik.errors.lName && formik.touched.lName
              ? "border-red-400 focus:ring-red-400"
              : "border-white/30 focus:ring-green-500"
          } text-white placeholder-white/60 focus:outline-none focus:ring-2 transition-colors`}
        />
        {formik.errors.lName && formik.touched.lName && (
          <p className="text-red-300 text-xs drop-shadow-md">
            {formik.errors.lName}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col text-start space-y-2 text-sm">
        <label className="text-white font-medium drop-shadow-md">
          {t("email")}
        </label>
        <input
          type="text"
          name="email"
          placeholder={t("email_placeholder")}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`p-3 rounded-lg bg-white/20 backdrop-blur-sm border ${
            formik.errors.email && formik.touched.email
              ? "border-red-400 focus:ring-red-400"
              : "border-white/30 focus:ring-green-500"
          } text-white placeholder-white/60 focus:outline-none focus:ring-2 transition-colors`}
        />
        {formik.errors.email && formik.touched.email && (
          <p className="text-red-300 text-xs drop-shadow-md">
            {formik.errors.email}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="flex flex-col text-start space-y-2 text-sm">
        <label className="text-white font-medium drop-shadow-md">
          {t("phone")}
        </label>
        <input
          type="text"
          name="phone"
          placeholder={t("phone_placeholder")}
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`p-3 rounded-lg bg-white/20 backdrop-blur-sm border ${
            formik.errors.phone && formik.touched.phone
              ? "border-red-400 focus:ring-red-400"
              : "border-white/30 focus:ring-green-500"
          } text-white placeholder-white/60 focus:outline-none focus:ring-2 transition-colors`}
        />
        {formik.errors.phone && formik.touched.phone && (
          <p className="text-red-300 text-xs drop-shadow-md">
            {formik.errors.phone}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col text-start space-y-2 text-sm">
        <label className="text-white font-medium drop-shadow-md">
          {t("password")}
        </label>
        <input
          type="password"
          name="password"
          placeholder={t("password_placeholder")}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`p-3 rounded-lg bg-white/20 backdrop-blur-sm border ${
            formik.errors.password && formik.touched.password
              ? "border-red-400 focus:ring-red-400"
              : "border-white/30 focus:ring-green-500"
          } text-white placeholder-white/60 focus:outline-none focus:ring-2 transition-colors`}
        />
        {formik.errors.password && formik.touched.password && (
          <p className="text-red-300 text-xs drop-shadow-md">
            {formik.errors.password}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col text-start space-y-2 text-sm">
        <label className="text-white font-medium drop-shadow-md">
          {t("confirm_password")}
        </label>
        <input
          type="password"
          name="rePassword"
          placeholder={t("confirm_password_placeholder")}
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`p-3 rounded-lg bg-white/20 backdrop-blur-sm border ${
            formik.errors.rePassword && formik.touched.rePassword
              ? "border-red-400 focus:ring-red-400"
              : "border-white/30 focus:ring-green-500"
          } text-white placeholder-white/60 focus:outline-none focus:ring-2 transition-colors`}
        />
        {formik.errors.rePassword && formik.touched.rePassword && (
          <p className="text-red-300 text-xs drop-shadow-md">
            {formik.errors.rePassword}
          </p>
        )}
      </div>
    </>
  );
}
