import * as Yup from "yup";

const ArenaSchema = Yup.object().shape({
  name: Yup.string().required("اسم الملعب مطلوب"),
  categoryId: Yup.string().required("نوع الرياضة مطلوب"),

  price: Yup.number()
    .required("سعر الساعة مطلوب")
    .positive("يجب أن يكون السعر رقم إيجابي"),
  description: Yup.string().required("وصف الملعب مطلوب"),
  extras: Yup.array()
    .min(1, "يجب إضافة خدمة واحدة على الأقل")
    .required("يجب إضافة خدمات الملعب"),
  governorate: Yup.string().required("المحافظة مطلوبة"),
  city: Yup.string().required("المدينة مطلوبة"),
  latitude: Yup.number().required("يجب اختيار الموقع على الخريطة"),
  longitude: Yup.number().required("يجب اختيار الموقع على الخريطة"),
  depositPercent: Yup.number()
    .required("نسبة التأمين مطلوبة")
    .min(20, "يجب أن تكون النسبة 0 أو أكثر")
    .max(100, "يجب أن تكون النسبة 100 أو أقل"),
});

export default ArenaSchema;
