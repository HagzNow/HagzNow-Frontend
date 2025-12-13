import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { object, string, ref } from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authContext } from '../../Contexts/AuthContext';
import toast from 'react-hot-toast';
import loginBg from '../../assets/images/login bg.jpg';


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
      <section 
        className="min-h-screen flex items-center justify-center py-12 px-4 relative"
        style={{
          backgroundImage: `url(${loginBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="container mx-auto px-4 text-center py-5 relative z-10">
          <div className="title space-y-2 mb-6">
            <h2 className="text-2xl font-bold text-white drop-shadow-lg">{t('title')}</h2>
            <h2 className="text-2xl font-bold text-white drop-shadow-lg">{t('register_title')}</h2>
            <p className="font-medium text-white/90 text-xs md:text-sm drop-shadow-md">{t('register_subtitle')}</p>
          </div>

          <form
            className="mt-4"
            onSubmit={formik.handleSubmit}
            // dir={i18n.language === "ar" ? "rtl" : "ltr"}
          >
            <div
              className="
        bg-white/10 backdrop-blur-xl
        w-[90%] sm:w-[70%] md:w-[40%] lg:w-[30%]
        mx-auto 
        p-6 sm:p-8
        rounded-2xl 
        shadow-2xl
        border border-white/20
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
                <label className="text-white font-medium drop-shadow-md">{t('first_name')}</label>
                <input
                  type="text"
                  name="fName"
                  placeholder={t('first_name_placeholder')}
                  value={formik.values.fName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`p-3 rounded-lg bg-white/20 backdrop-blur-sm border ${formik.errors.fName && formik.touched.fName ? 'border-red-400 focus:ring-red-400' : 'border-white/30 focus:ring-green-500'} text-white placeholder-white/60 focus:outline-none focus:ring-2 transition-colors`}
                />
                {formik.errors.fName && formik.touched.fName && (
                  <p className="text-red-300 text-xs drop-shadow-md">{formik.errors.fName}</p>
                )}
              </div>

              <div className="flex flex-col text-start space-y-2 text-sm">
                <label className="text-white font-medium drop-shadow-md">{t('last_name')}</label>
                <input
                  type="text"
                  name="lName"
                  placeholder={t('last_name_placeholder')}
                  value={formik.values.lName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`p-3 rounded-lg bg-white/20 backdrop-blur-sm border ${formik.errors.lName && formik.touched.lName ? 'border-red-400 focus:ring-red-400' : 'border-white/30 focus:ring-green-500'} text-white placeholder-white/60 focus:outline-none focus:ring-2 transition-colors`}
                />
                {formik.errors.lName && formik.touched.lName && (
                  <p className="text-red-300 text-xs drop-shadow-md">{formik.errors.lName}</p>
                )}
              </div>

              <div className="flex flex-col text-start space-y-2 text-sm">
                <label className="text-white font-medium drop-shadow-md">{t('email')}</label>
                <input
                  type="text"
                  name="email"
                  placeholder={t('email_placeholder')}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`p-3 rounded-lg bg-white/20 backdrop-blur-sm border ${formik.errors.email && formik.touched.email ? 'border-red-400 focus:ring-red-400' : 'border-white/30 focus:ring-green-500'} text-white placeholder-white/60 focus:outline-none focus:ring-2 transition-colors`}
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="text-red-300 text-xs drop-shadow-md">{formik.errors.email}</p>
                )}
              </div>

              <div className="flex flex-col text-start space-y-2 text-sm">
                <label className="text-white font-medium drop-shadow-md">{t('phone')}</label>
                <input
                  type="text"
                  name="phone"
                  placeholder={t('phone_placeholder')}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`p-3 rounded-lg bg-white/20 backdrop-blur-sm border ${formik.errors.phone && formik.touched.phone ? 'border-red-400 focus:ring-red-400' : 'border-white/30 focus:ring-green-500'} text-white placeholder-white/60 focus:outline-none focus:ring-2 transition-colors`}
                />
                {formik.errors.phone && formik.touched.phone && (
                  <p className="text-red-300 text-xs drop-shadow-md">{formik.errors.phone}</p>
                )}
              </div>

              <div className="flex flex-col text-start space-y-2 text-sm">
                <label className="text-white font-medium drop-shadow-md">{t('password')}</label>
                <input
                  type="password"
                  name="password"
                  placeholder={t('password_placeholder')}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`p-3 rounded-lg bg-white/20 backdrop-blur-sm border ${formik.errors.password && formik.touched.password ? 'border-red-400 focus:ring-red-400' : 'border-white/30 focus:ring-green-500'} text-white placeholder-white/60 focus:outline-none focus:ring-2 transition-colors`}
                />
                {formik.errors.password && formik.touched.password && (
                  <p className="text-red-300 text-xs drop-shadow-md">{formik.errors.password}</p>
                )}
              </div>

              <div className="flex flex-col text-start space-y-2 text-sm">
                <label className="text-white font-medium drop-shadow-md">{t('confirm_password')}</label>
                <input
                  type="password"
                  name="rePassword"
                  placeholder={t('confirm_password_placeholder')}
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`p-3 rounded-lg bg-white/20 backdrop-blur-sm border ${formik.errors.rePassword && formik.touched.rePassword ? 'border-red-400 focus:ring-red-400' : 'border-white/30 focus:ring-green-500'} text-white placeholder-white/60 focus:outline-none focus:ring-2 transition-colors`}
                />
                {formik.errors.rePassword && formik.touched.rePassword && (
                  <p className="text-red-300 text-xs drop-shadow-md">{formik.errors.rePassword}</p>
                )}
              </div>

              <button
                disabled={loadbuttom}
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 hover:from-green-600 hover:to-emerald-600 dark:hover:from-green-700 dark:hover:to-emerald-700 text-white rounded-xl font-semibold text-sm shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg"
              >
                {loadbuttom ? <i className="fa-solid fa-spinner fa-spin"></i> : t('create_account')}
              </button>

              <div className="text-center pt-2">
                <p className="text-sm text-white/90 drop-shadow-md">
                  {t('already_have_account') || 'هل لديك حساب بالفعل؟'}{' '}
                  <Link
                    to="/login"
                    className="text-green-300 hover:text-green-200 font-semibold transition-colors drop-shadow-md"
                  >
                    تسجيل الدخول
                  </Link>
                </p>
              </div>
              

              
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
