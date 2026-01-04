import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

import baseUrl from '@/apis/config';
import { useState, useContext, useMemo } from 'react';
import { authContext } from '@/Contexts/AuthContext';

export default function ProfileForm({
  isEditing,
  isSubmitting,
  setSubmitting,
  userData,
  serverError,
  setServerError,
  setSubmitRef,
  onSaved,
}) {
  const { t, i18n } = useTranslation();
  const { setUser } = useContext(authContext);
  const [selectedImage, setSelectedImage] = useState(null);

  const infoValidationSchema = Yup.object({
    name: Yup.string().required(t('first_name_required')),
    email: Yup.string().email(t('email_invalid')).required(t('email_required')),
    phone: Yup.string()
      .matches(/^(\+20)?01[0-2,5]{1}[0-9]{8}$/, t('phone_invalid'))
      .required(t('phone_required')),
  });

  const passwordValidationSchema = Yup.object({
    oldPassword: Yup.string().min(6, t('UserProfile.password_invalid')),
    newPassword: Yup.string().min(6, t('UserProfile.password_invalid')),
    confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], t('password_not_match')),
  });

  const infoInitialValues = useMemo(
    () => ({
      name: `${userData.fName} ${userData.lName}`.trim(),
      email: userData.email,
      phone: userData.phone,
    }),
    [userData],
  );

  const passwordInitialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const splitFullName = (fullName) => {
    const parts = fullName.trim().split(/\s+/);
    const fName = parts[0] || '';
    const lName = parts.slice(1).join(' ');
    return { fName, lName };
  };

  const hasNameChanged = (fullName) => {
    const { fName, lName } = splitFullName(fullName);
    return fName !== (userData.fName || '') || (lName || '') !== (userData.lName || '');
  };

  // ---------- Submit Handlers ----------
  const handleSaveInfo = async (values, { setSubmitting: setFormikSubmitting }) => {
    try {
      setServerError('');
      setSubmitting(true);
      setFormikSubmitting(true);

      const wantsToChangeImage = !!selectedImage;
      const wantsToChangeInfo =
        hasNameChanged(values.name) || values.email !== userData.email || values.phone !== userData.phone;

      if (!wantsToChangeInfo && !wantsToChangeImage) {
        toast.info(t('UserProfile.no_changes') || 'لا توجد تغييرات', {
          duration: 3000,
          style: {
            direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
          },
        });
        onSaved?.();
        return;
      }

      const formData = new FormData();
      const { fName, lName } = splitFullName(values.name);
      formData.append('fName', fName);
      formData.append('lName', lName);
      formData.append('email', values.email);
      formData.append('phone', values.phone);
      if (selectedImage) formData.append('avatar', selectedImage);

      const res = await baseUrl.patch(`https://api.hagznow.com/users/profile`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      const serverAvatar = res?.data?.data?.avatar;
      const updatedUser = {
        fName,
        lName,
        email: values.email,
        phone: values.phone,
        avatar: serverAvatar || userData.avatar,
        avatarVersion: Date.now(),
      };

      setUser((prev) => ({ ...prev, ...updatedUser }));
      onSaved?.(updatedUser);
      toast.success(t('successMessageProfile') || 'تم تحديث الملف الشخصي بنجاح', {
        duration: 3000,
        style: {
          direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
        },
      });
      setSelectedImage(null);
    } catch (err) {
      console.error(err);
      const raw = err?.response?.data?.message;
      const errorMap = {
        'User not found': t('errors.USER_NOT_FOUND'),
        'Invalid token': t('errors.INVALID_TOKEN'),
        INVALID_CREDENTIALS: t('errors.INVALID_CREDENTIALS'),
        EMAIL_IN_USE: t('errors.EMAIL_IN_USE'),
      };
      const msg = errorMap[raw] || t('UserProfile.password_invalid') || 'حدث خطأ أثناء تحديث البيانات';
      setServerError(msg);
      toast.error(msg, {
        duration: 4000,
        style: {
          direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
        },
      });
    } finally {
      setSubmitting(false);
      setFormikSubmitting(false);
    }
  };

  const handleChangePassword = async (values, { setSubmitting: setFormikSubmitting, resetForm }) => {
    try {
      setServerError('');
      setSubmitting(true);
      setFormikSubmitting(true);

      const wantsToChangePassword = (values.newPassword || '').trim() !== '';
      if (!wantsToChangePassword) {
        toast.info(t('UserProfile.no_changes') || 'لا توجد تغييرات', {
          duration: 3000,
          style: {
            direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
          },
        });
        return;
      }

      if (!values.oldPassword || !values.confirmPassword || !values.newPassword) {
        const msg = t('UserProfile.password_incomplete') || 'يرجى ملء جميع حقول كلمة المرور';
        setServerError(msg);
        toast.error(msg, {
          duration: 4000,
          style: {
            direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
          },
        });
        return;
      }

      if ((values.newPassword || '').trim() !== (values.confirmPassword || '').trim()) {
        const msg = t('password_not_match') || 'كلمات المرور غير متطابقة';
        setServerError(msg);
        toast.error(msg, {
          duration: 4000,
          style: {
            direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
          },
        });
        return;
      }

      await baseUrl.patch(
        `https://api.hagznow.com/auth/change-password`,
        {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
      );

      resetForm();
      onSaved?.();
      toast.success(t('successMessagePassword') || 'تم تغيير كلمة المرور بنجاح', {
        duration: 3000,
        style: {
          direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
        },
      });
    } catch (err) {
      console.error(err);
      const raw = err?.response?.data?.message;
      const errorMap = {
        'Old password is incorrect': t('UserProfile.old_password_incorrect'),
        'User not found': t('errors.USER_NOT_FOUND'),
        'Invalid token': t('errors.INVALID_TOKEN'),
        INVALID_CREDENTIALS: t('errors.INVALID_CREDENTIALS'),
        EMAIL_IN_USE: t('errors.EMAIL_IN_USE'),
      };
      const msg = errorMap[raw] || t('UserProfile.password_invalid') || 'حدث خطأ أثناء تحديث البيانات';
      setServerError(msg);
      toast.error(msg, {
        duration: 4000,
        style: {
          direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
        },
      });
    } finally {
      setSubmitting(false);
      setFormikSubmitting(false);
    }
  };

  const isInfoLocked = () => !isEditing || isSubmitting;

  return (
    <>
      {/* ---------- Info Form ---------- */}
      <Formik
        enableReinitialize
        initialValues={infoInitialValues}
        validationSchema={infoValidationSchema}
        onSubmit={handleSaveInfo}
      >
        {({ handleSubmit, submitForm, values }) => {
          setSubmitRef?.(submitForm);
          return (
            <Form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-6 mb-12">
                {['name', 'email'].map((field) => (
                  <div className="text-right" key={field}>
                    <label className="block text-gray-600 dark:text-gray-300 mb-2">
                      {field === 'name' ? t('first_name') : t('email')}
                    </label>
                    {isEditing ? (
                      <>
                        <Field
                          type={field === 'email' ? 'email' : 'text'}
                          name={field}
                          disabled={isInfoLocked()}
                          className={`w-full px-3 py-2 border rounded-lg text-right focus:outline-none transition-colors ${
                            isInfoLocked()
                              ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'
                              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400'
                          }`}
                        />
                        <ErrorMessage
                          name={field}
                          component="div"
                          className="text-red-500 dark:text-red-400 text-sm mt-1"
                        />
                      </>
                    ) : (
                      <div className="text-gray-900 dark:text-white font-medium">
                        {field === 'name' ? values.name : values.email}
                      </div>
                    )}
                  </div>
                ))}

                <div className="text-right col-span-2">
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">{t('phone')}</label>
                  {isEditing ? (
                    <>
                      <Field
                        type="tel"
                        name="phone"
                        disabled={isInfoLocked()}
                        className={`w-full px-3 py-2 border rounded-lg text-right focus:outline-none transition-colors ${
                          isInfoLocked()
                            ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400'
                        }`}
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-500 dark:text-red-400 text-sm mt-1"
                      />
                    </>
                  ) : (
                    <div className="text-gray-900 dark:text-white">{infoInitialValues.phone}</div>
                  )}
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>

      {/* ---------- Password Form ---------- */}
      <Formik
        enableReinitialize
        initialValues={passwordInitialValues}
        validationSchema={passwordValidationSchema}
        onSubmit={handleChangePassword}
      >
        {({ handleSubmit, values }) => {
          const isFormFilled =
            (values.oldPassword || '').trim() !== '' &&
            (values.newPassword || '').trim() !== '' &&
            (values.confirmPassword || '').trim() !== '';
          const passwordsMatch = (values.newPassword || '').trim() === (values.confirmPassword || '').trim();
          const canSubmitPwd = isFormFilled && passwordsMatch && !isSubmitting;

          return (
            <Form onSubmit={handleSubmit}>
              <div className="border-t dark:border-gray-700 pt-8 mb-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('labels.security')}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{t('labels.updatePassword')}</p>

                <div className="space-y-4">
                  {['oldPassword', 'newPassword', 'confirmPassword'].map((field) => (
                    <div key={field}>
                      <label className="block text-gray-600 dark:text-gray-300 mb-2">
                        {field === 'oldPassword'
                          ? 'كلمة المرور القديمة'
                          : field === 'newPassword'
                          ? t('password')
                          : t('confirm_password')}
                      </label>
                      <Field
                        type="password"
                        name={field}
                        disabled={isSubmitting}
                        placeholder={
                          field === 'oldPassword'
                            ? t('password_placeholder')
                            : field === 'newPassword'
                            ? t('password_placeholder')
                            : t('confirm_password_placeholder')
                        }
                        className={`w-full px-4 py-3 border rounded-lg text-right focus:outline-none transition-colors ${
                          isSubmitting
                            ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400'
                        }`}
                      />
                      {/* <ErrorM~essage name={field} component="div" className="text-red-500 dark:text-red-400 text-sm mt-1" /> */}
                      {field === 'confirmPassword' && isFormFilled && !passwordsMatch && (
                        <div className="text-red-500 dark:text-red-400 text-sm mt-1">{t('password_not_match')}</div>
                      )}
                    </div>
                  ))}

                  {serverError && (
                    <div className="text-red-500 dark:text-red-400 text-sm mt-2 text-center">{serverError}</div>
                  )}

                  <button
                    type="submit"
                    disabled={!canSubmitPwd}
                    className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                      !canSubmitPwd
                        ? 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed'
                        : 'bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-600 text-white'
                    }`}
                  >
                    {isSubmitting ? t('buttons.saving') : t('buttons.changePassword')}
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
