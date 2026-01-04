import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../Contexts/AuthContext';
import { useTheme } from '../../Contexts/ThemeContext';
import toast from 'react-hot-toast';
import loginBg from '../../assets/images/login bg.jpg';
import loginBgLight from '../../assets/images/login-lite.webp';
import { userInitialValues, ownerInitialValues } from './formConfigs';
import { userSchema, ownerSchema } from './validationSchemas';
import { submitUser, submitOwner } from './submitHandlers';
import UserFormFields from './UserFormFields';
import OwnerFormFields from './OwnerFormFields';
import { useTranslation } from 'react-i18next';

export default function Register() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  const { setToken } = useContext(authContext);
  const [role, setRole] = useState('user');
  const [loadButton, setLoadButton] = useState(false);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    formik.resetForm({
      values: newRole === 'owner' ? ownerInitialValues : userInitialValues,
    });
  };

  const formik = useFormik({
    initialValues: role === 'owner' ? ownerInitialValues : userInitialValues,
    validationSchema: role === 'owner' ? ownerSchema : userSchema,
    onSubmit: async (values) => {
      setLoadButton(true);
      try {
        const data = role === 'owner' ? await submitOwner(values) : await submitUser(values);

        // Check if owner registration is pending approval
        if (
          role === 'owner' &&
          data?.data?.message &&
          (data.data.message.includes('Pending approval') ||
            data.data.message.includes('pending approval') ||
            data.data.message.includes('Pending'))
        ) {
          // Owner registration successful but pending approval
          // Don't set token since account is not yet approved
          toast.success(t('register_success') || 'Account registered successfully', {
            duration: 2000,
          });
          setTimeout(() => {
            navigate('/pending-approval');
          }, 1500);
        } else {
          // Regular user registration or owner with immediate approval
          // Only set token if it exists in the response
          if (data?.data?.token) {
            setToken(data.data.token);
            localStorage.setItem('token', data.data.token);
          }
          toast.success(t('register_success') || 'Account registered successfully', {
            duration: 2000,
          });
          setTimeout(() => {
            navigate('/');
          }, 1200);
        }
      } catch (err) {
        const msg = err.response?.data?.error?.code || 'Unknown error';
        const translated = t(`errors.${msg}`, { defaultValue: msg });
        toast.error(translated);
      } finally {
        setLoadButton(false);
      }
    },
  });

  return (
    <section
      className="min-h-screen flex items-center justify-center py-12 px-4 relative"
      style={{
        backgroundImage: `url(${isDarkMode ? loginBg : loginBgLight})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="container mx-auto px-4 text-center py-5 relative z-10">
        <div className="title space-y-2 mb-6">
          <h2 className="text-2xl font-bold text-white drop-shadow-lg">{t('title')}</h2>
          <h2 className="text-2xl font-bold text-white drop-shadow-lg">{t('register_title')}</h2>
          <p className="font-medium text-white/90 text-xs md:text-sm drop-shadow-md">{t('register_subtitle')}</p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="bg-white/10 backdrop-blur-xl w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/20 space-y-4 transition-colors duration-300">
            {/* Role selection */}
            <div className="flex justify-center gap-2">
              <label
                className={`cursor-pointer px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  role === 'owner'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="owner"
                  className="hidden"
                  checked={role === 'owner'}
                  onChange={() => handleRoleChange('owner')}
                />
                مالك
              </label>

              <label
                className={`cursor-pointer px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  role === 'user'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="user"
                  className="hidden"
                  checked={role === 'user'}
                  onChange={() => handleRoleChange('user')}
                />
                لاعب
              </label>
            </div>

            {role === 'owner' ? <OwnerFormFields formik={formik} /> : <UserFormFields formik={formik} />}

            <button
              disabled={loadButton}
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadButton ? <i className="fa-solid fa-spinner fa-spin"></i> : t('create_account')}
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
  );
}
