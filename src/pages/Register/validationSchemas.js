import { object, string, ref, mixed } from "yup";
import { t } from "i18next";
const passwordRegx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;
const phoneRegx = /^01[0125][0-9]{8}$/;

export const userSchema = object({
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

export const ownerSchema = object({
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
  nationalIdFront: mixed().required(t("nationalIdFront")),
  nationalIdBack: mixed().required(t("nationalIdBack")),
  selfieWithId: mixed().required(t("selfieWithId")),
});
