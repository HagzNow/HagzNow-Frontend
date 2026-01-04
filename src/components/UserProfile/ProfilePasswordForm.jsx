import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

import baseUrl from '@/apis/config';

export default function ProfilePasswordForm({ isSubmitting, setSubmitting, serverError, setServerError, onSaved }) {
  const { t, i18n } = useTranslation();

  const passwordValidationSchema = Yup.object({
    oldPassword: Yup.string().min(6, t('UserProfile.password_invalid')),
    newPassword: Yup.string().min(6, t('UserProfile.password_invalid')),
    confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], t('password_not_match')),
  });

  const passwordInitialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
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

  return (
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
            <div className="border-t dark:border-gray-700 pt-8">
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
  );
}
