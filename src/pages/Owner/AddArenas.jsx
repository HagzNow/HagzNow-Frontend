import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { Plus, Save, Loader2 } from 'lucide-react';

import BasicInfoSection from '../../components/OwnerComponents/AddArenaComponents/BasicInfoSection';
import MediaSection from '../../components/OwnerComponents/AddArenaComponents/MediaSection';
import LocationPriceSection from '../../components/OwnerComponents/AddArenaComponents/LocationPriceSection';
import FeaturesSection from '../../components/OwnerComponents/AddArenaComponents/FeaturesSection';
import DescriptionSection from '../../components/OwnerComponents/AddArenaComponents/DescriptionSection';
import ArenaSchema from '../../components/OwnerComponents/AddArenaComponents/ArenaSchema';
import baseUrl from '@/apis/config';

const AddArena = () => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);

      const formData = new FormData();

      // Append extras
      if (Array.isArray(values.extras)) {
        values.extras.forEach((extra, index) => {
          formData.append(`extras[${index}][name]`, extra.name);
          formData.append(`extras[${index}][price]`, extra.price);
        });
      }

      // Append basic info
      formData.append('name', values.name);
      formData.append('categoryId', values.categoryId);
      formData.append('pricePerHour', values.price || 150);
      formData.append('description', values.description || '');
      formData.append('status', values.status || 'pending');
      formData.append('minPeriod', values.minPeriod || 60);
      formData.append('openingHour', values.openingHour || 8);
      formData.append('closingHour', values.closingHour || 22);
      formData.append('depositPercent', values.depositPercent || 20);
      formData.append('policy', values.policy || '');

      // Append location
      formData.append('location[lat]', values.latitude);
      formData.append('location[lng]', values.longitude);
      formData.append('location[governorate]', values.governorate || 'Cairo');
      formData.append('location[city]', values.city || 'Zamalek');

      // Append media
      if (values.thumbnail instanceof File) formData.append('thumbnail', values.thumbnail);
      if (Array.isArray(values.images)) {
        values.images.forEach((img) => {
          if (img instanceof File) formData.append('images', img);
        });
      }

      const res = await baseUrl.post('http://localhost:3000/arenas', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data?.isSuccess) {
        toast.success(t('addArenaSuccess') || 'تم إضافة الملعب بنجاح', {
          duration: 4000,
          style: {
            direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
          },
        });
        resetForm();
      } else {
        toast.error(t('addArenaError') || 'لم يتم الإضافة: ' + (res.data?.message || 'حدث خطأ غير معروف'), {
          duration: 5000,
          style: {
            direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
          },
        });
      }
    } catch (err) {
      console.error('Error adding arena:', err?.response?.data || err.message);
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        t('addArenaErrorGeneric') ||
        'حدث خطأ أثناء الإضافة. يرجى المحاولة مرة أخرى.';
      toast.error(errorMessage, {
        duration: 5000,
        style: {
          direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 shadow-lg mb-4">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
            {t('addArenaTitle') || 'إضافة ملعب جديد'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            {t('addArenaSubtitle') || 'املأ النموذج أدناه لإضافة ملعبك الرياضي إلى المنصة'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 shadow-xl dark:shadow-gray-900/50 rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl dark:hover:shadow-gray-900/70">
          <Formik
            initialValues={{
              policy: '',
              name: '',
              price: '',
              description: '',
              extras: [],
              notes: '',
              status: '',
              latitude: '',
              longitude: '',
              governorate: '',
              categoryId: '',
              city: '',
              minPeriod: '',
              openingHour: '',
              closingHour: '',
              depositPercent: '',
              thumbnail: null,
              images: [],
            }}
            validationSchema={ArenaSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, isValid, dirty }) => (
              <Form className="space-y-8 sm:space-y-10">
                {/* Section 1: Basic Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-2 border-b border-gray-200 dark:border-gray-700">
                    <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 font-bold text-lg">1</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      {t('basicInfo') || 'المعلومات الأساسية'}
                    </h2>
                  </div>
                  <BasicInfoSection />
                </div>

                {/* Section 2: Media */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-2 border-b border-gray-200 dark:border-gray-700">
                    <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 font-bold text-lg">2</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      {t('media') || 'الصور'}
                    </h2>
                  </div>
                  <MediaSection />
                </div>

                {/* Section 3: Location & Price */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-2 border-b border-gray-200 dark:border-gray-700">
                    <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 font-bold text-lg">3</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      {t('locationPrice') || 'الموقع والسعر'}
                    </h2>
                  </div>
                  <LocationPriceSection setFieldValue={setFieldValue} />
                </div>

                {/* Section 4: Features/Extras */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-2 border-b border-gray-200 dark:border-gray-700">
                    <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 font-bold text-lg">4</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      {t('features') || 'الخدمات الإضافية'}
                    </h2>
                  </div>
                  <FeaturesSection />
                </div>

                {/* Section 5: Description */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-2 border-b border-gray-200 dark:border-gray-700">
                    <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 font-bold text-lg">5</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      {t('descriptionNotes') || 'الوصف والسياسات'}
                    </h2>
                  </div>
                  <DescriptionSection />
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-right">
                      {t('addArenaHint') || 'تأكد من ملء جميع الحقول المطلوبة قبل الحفظ'}
                    </p>
                    <button
                      type="submit"
                      disabled={loading || !isValid || !dirty}
                      className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 text-white font-semibold rounded-xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900/70 hover:from-green-700 hover:to-emerald-700 dark:hover:from-green-600 dark:hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg min-w-[180px]"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>{t('saving') || 'جاري الحفظ...'}</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          <span>{t('saveArena') || 'حفظ الملعب'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddArena;
