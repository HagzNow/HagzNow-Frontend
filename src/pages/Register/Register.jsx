import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { object, string, ref } from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authContext } from '../../Contexts/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const { t, i18n } = useTranslation();
  const passwordRegx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;
  const phoneRegx = /^01[0125][0-9]{8}$/;
  const naviagte = useNavigate();
  let { setToken } = useContext(authContext);
  let [loadbuttom, setLoadButtom] = useState(false);

  const validationSchema = object({
    fName: string().required(t('first_name_required')).min(3).max(20),
    lName: string().required(t('last_name_required')).min(3).max(20),
    email: string().required(t('email_required')).email(t('email_invalid')),
    role: string().required(t('role_required')),
    password: string().required(t('password_required')).matches(passwordRegx, t('password_invalid')),
    rePassword: string()
      .required(t('confirm_password_required'))
      .matches(passwordRegx, t('password_invalid'))
      .oneOf([ref('password')], t('password_not_match')),
    phone: string().required(t('phone_required')).matches(phoneRegx, t('phone_invalid')),
  });

  async function sendDataToRegister(values) {
    const loadingToast = toast.loading(t('loading') || 'loading.....', {
      style: {
        direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
      },
    });
    setLoadButtom(true);
    try {
      const { rePassword: _, ...userData } = values;
      const option = {
        url: 'http://localhost:3000/auth/register',
        method: 'POST',
        data: userData,
      };
      const { data } = await axios.request(option);
      setToken(data.data.token);
      localStorage.setItem('token', data.data.token);
      toast.success(t('register_success') || 'Account registered successfully', {
        duration: 2000,
        style: {
          direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
        },
      });
      setToken(data.data.token);
      setTimeout(() => {
        naviagte('/');
      }, 2000);
    } catch (error) {
      const msg = error.response?.data?.error?.code || 'Unknown error';
      const translated = t(`errors.${msg}`, { defaultValue: msg });
      toast.error(translated, {
        duration: 4000,
        style: {
          direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
        },
      });
    } finally {
      toast.dismiss(loadingToast);
      setLoadButtom(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      fName: '',
      lName: '',
      role: 'user',
      email: '',
      phone: '',
      password: '',
      rePassword: '',
    },
    onSubmit: sendDataToRegister,
    validationSchema,
  });

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30 dark:from-gray-900 dark:to-gray-800 py-8 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center py-5">
          <div className="title space-y-2">
            <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">{t('title')}</h2>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('register_title')}</h2>
            <p className="font-medium text-gray-600 dark:text-gray-300 text-xs md:text-sm">{t('register_subtitle')}</p>
          </div>

          <form
            className="mt-4"
            onSubmit={formik.handleSubmit}
            // dir={i18n.language === "ar" ? "rtl" : "ltr"}
          >
            <div
              className="
        bg-white dark:bg-gray-800
        w-[90%] sm:w-[70%] md:w-[40%] lg:w-[30%]
        mx-auto 
        p-6 sm:p-8
        rounded-2xl 
        shadow-lg dark:shadow-gray-900/50
        border border-gray-100 dark:border-gray-700
        space-y-4
        transition-colors duration-300
      "
            >
              <div className="flex justify-center gap-2">
                <label
                  htmlFor="owner"
                  className={`cursor-pointer px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    formik.values.role === 'owner'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <input
                    type="radio"
                    id="owner"
                    name="role"
                    value="owner"
                    className="hidden"
                    onChange={formik.handleChange}
                    checked={formik.values.role === 'owner'}
                  />
                  {t('role_owner')}
                </label>

                <label
                  htmlFor="user"
                  className={`cursor-pointer px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    formik.values.role === 'user'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <input
                    type="radio"
                    id="user"
                    name="role"
                    value="user"
                    className="hidden"
                    onChange={formik.handleChange}
                    checked={formik.values.role === 'user'}
                  />
                  {t('role_user')}
                </label>
              </div>

              <div className="flex flex-col text-start space-y-2 text-sm">
                <label className="text-gray-700 dark:text-gray-300 font-medium">{t('first_name')}</label>
                <input
                  type="text"
                  name="fName"
                  placeholder={t('first_name_placeholder')}
                  value={formik.values.fName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition-colors"
                />
                {formik.errors.fName && formik.touched.fName && (
                  <p className="text-red-500 dark:text-red-400 text-xs">{formik.errors.fName}</p>
                )}
              </div>

              <div className="flex flex-col text-start space-y-2 text-sm">
                <label className="text-gray-700 dark:text-gray-300 font-medium">{t('last_name')}</label>
                <input
                  type="text"
                  name="lName"
                  placeholder={t('last_name_placeholder')}
                  value={formik.values.lName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition-colors"
                />
                {formik.errors.lName && formik.touched.lName && (
                  <p className="text-red-500 dark:text-red-400 text-xs">{formik.errors.lName}</p>
                )}
              </div>

              <div className="flex flex-col text-start space-y-2 text-sm">
                <label className="text-gray-700 dark:text-gray-300 font-medium">{t('email')}</label>
                <input
                  type="text"
                  name="email"
                  placeholder={t('email_placeholder')}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition-colors"
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="text-red-500 dark:text-red-400 text-xs">{formik.errors.email}</p>
                )}
              </div>

              <div className="flex flex-col text-start space-y-2 text-sm">
                <label className="text-gray-700 dark:text-gray-300 font-medium">{t('phone')}</label>
                <input
                  type="text"
                  name="phone"
                  placeholder={t('phone_placeholder')}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition-colors"
                />
                {formik.errors.phone && formik.touched.phone && (
                  <p className="text-red-500 dark:text-red-400 text-xs">{formik.errors.phone}</p>
                )}
              </div>

              <div className="flex flex-col text-start space-y-2 text-sm">
                <label className="text-gray-700 dark:text-gray-300 font-medium">{t('password')}</label>
                <input
                  type="password"
                  name="password"
                  placeholder={t('password_placeholder')}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition-colors"
                />
                {formik.errors.password && formik.touched.password && (
                  <p className="text-red-500 dark:text-red-400 text-xs">{formik.errors.password}</p>
                )}
              </div>

              <div className="flex flex-col text-start space-y-2 text-sm">
                <label className="text-gray-700 dark:text-gray-300 font-medium">{t('confirm_password')}</label>
                <input
                  type="password"
                  name="rePassword"
                  placeholder={t('confirm_password_placeholder')}
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition-colors"
                />
                {formik.errors.rePassword && formik.touched.rePassword && (
                  <p className="text-red-500 dark:text-red-400 text-xs">{formik.errors.rePassword}</p>
                )}
              </div>

              <button
                disabled={loadbuttom}
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 hover:from-green-600 hover:to-emerald-600 dark:hover:from-green-700 dark:hover:to-emerald-700 text-white rounded-xl font-semibold text-sm shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg"
              >
                {loadbuttom ? <i className="fa-solid fa-spinner fa-spin"></i> : t('create_account')}
              </button>

              <p className="text-green-600 dark:text-green-400 text-xs py-1">{t('already_have_account')}</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">{t('or')}</p>

              <div className="flex flex-col space-y-2">
                <button className="p-3 border rounded-lg w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 flex justify-center items-center gap-2 text-xs font-medium transition-colors">
                  <FaGoogle className="text-blue-600 dark:text-blue-400" /> {t('continue_google')}
                </button>
                <button className="p-3 border rounded-lg w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 flex justify-center items-center gap-2 text-xs font-medium transition-colors">
                  <FaFacebookF className="text-blue-600 dark:text-blue-400" /> {t('continue_facebook')}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
