// import React, { useState } from "react";
// import { Formik, Form } from "formik";

// import { useTranslation } from "react-i18next";

// import LocationPriceSection from "../../components/OwnerComponents/AddArenaComponents/LocationPriceSection";
// import FeaturesSection from "../../components/OwnerComponents/AddArenaComponents/FeaturesSection";
// import DescriptionSection from "../../components/OwnerComponents/AddArenaComponents/DescriptionSection";
// import MediaSection from "../../components/OwnerComponents/AddArenaComponents/MediaSection";
// import BasicInfoSection from "../../components/OwnerComponents/AddArenaComponents/BasicInfoSection";
// import ArenaSchema from "../../components/OwnerComponents/AddArenaComponents/ArenaSchema";
// import baseUrl from "@/apis/config";


// const AddArena = () => {
//   const { t } = useTranslation();
//   const [loading, setLoading] = useState(false);



//   const handleSubmit = async (values, { resetForm }) => {
//     try {
//       setLoading(true);
//       console.log("Submitting...", values);
//       const formData = new FormData();
//       if (Array.isArray(values.extras)) {
//         values.extras.forEach((extra, index) => {
//           formData.append(`extras[${index}][name]`, extra.name);
//           formData.append(`extras[${index}][price]`, extra.price);
//         });
//       }

//       console.log(typeof Array.isArray(values.extras));
//       console.log(values.extras);

//       formData.append("name", values.name);
//       formData.append("categoryId", values.categoryId);
//       formData.append("pricePerHour", values.price || 150);
//       formData.append("description", values.description || "");
//       formData.append("status", values.status || "pending");
//       formData.append("minPeriod", values.minPeriod || 60);
//       formData.append("openingHour", values.openingHour || 8);
//       formData.append("closingHour", values.closingHour || 22);
//       formData.append("depositPercent", values.depositPercent || 20);
//       formData.append("policy", values.notes || "");

//       formData.append("location[lat]", values.latitude);
//       formData.append("location[lng]", values.longitude);
//       formData.append("location[governorate]", values.governorate || "Cairo");
//       formData.append("location[city]", values.city || "Zamalek");

//       if (values.thumbnail instanceof File) {
//         formData.append("thumbnail", values.thumbnail);
//       }
//       if (Array.isArray(values.images)) {
//         values.images.forEach((img) => {
//           if (img instanceof File) formData.append("images", img);
//         });
//       }

//       const res = await baseUrl.post("http://localhost:3000/arenas", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       console.log("Response:", res.data);

//       if (res.data?.isSuccess) {
//         alert("✅ تم إضافة الملعب بنجاح!");
//         resetForm();
//       } else {
//         alert(
//           "⚠️ Error adding arena: " + (res.data?.message || "Unknown error")
//         );
//       }
//     } catch (err) {
//       console.error("Error adding arena:", err.response?.data || err.message);
//       alert("❌ حدث خطأ أثناء الإضافة. راجع الكونسول لمعرفة التفاصيل.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-800">
//         {t("addArenaTitle")}
//       </h2>

//       <div className="bg-white shadow-md rounded-2xl p-4 sm:p-8">
//         <Formik
//           initialValues={{
//             policy: "",
//             name: "",
//             price: "",
//             description: "",
//             extras: [],
//             notes: "",
//             status: "",
//             latitude: "",
//             longitude: "",
//             governorate: "",
//             categoryId: "",
//             city: "",
//             minPeriod: "",
//             openingHour: "",
//             closingHour: "",
//             depositPercent: "",
//             mainImage: null,
//              galleryImages: [],

//             // thumbnail: null,     
//             // images: [],  
//           }}
//           validationSchema={ArenaSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ setFieldValue }) => (
//             <Form className="space-y-6 sm:space-y-8">
//               <BasicInfoSection />
//               <MediaSection />
//               <LocationPriceSection setFieldValue={setFieldValue} />
//               <FeaturesSection />
//               <DescriptionSection />

//               <div className="text-center">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="bg-green-600 text-white px-8 py-3 rounded-lg shadow hover:bg-green-700 transition disabled:opacity-50 w-full sm:w-auto"
//                 >
//                   {loading ? "جاري الحفظ..." : t("saveArena")}
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </>
//   );
// };

// export default AddArena;




// import React, { useState} from "react";
// import { Formik, Form } from "formik";
// import { useTranslation } from "react-i18next";

// import LocationPriceSection from "../../components/OwnerComponents/AddArenaComponents/LocationPriceSection";
// import FeaturesSection from "../../components/OwnerComponents/AddArenaComponents/FeaturesSection";
// import DescriptionSection from "../../components/OwnerComponents/AddArenaComponents/DescriptionSection";
// import MediaSection from "../../components/OwnerComponents/AddArenaComponents/MediaSection";
// import BasicInfoSection from "../../components/OwnerComponents/AddArenaComponents/BasicInfoSection";
// import ArenaSchema from "../../components/OwnerComponents/AddArenaComponents/ArenaSchema";
// import baseUrl from "@/apis/config";

// const AddArena = () => {
//   const { t } = useTranslation();
//   const [loading, setLoading] = useState(false);

//   // Toast state
//   const [toast, setToast] = useState({ message: "", type: "success", visible: false });

//   const showToast = (message, type = "success", duration = 10000) => {
//     setToast({ message, type, visible: true });
//     setTimeout(() => {
//       setToast(prev => ({ ...prev, visible: false }));
//     }, duration);
//   };

//   const handleSubmit = async (values, { resetForm }) => {
//     try {
//       setLoading(true);
//       console.log("Submitting...", values);

//       const formData = new FormData();
//       if (Array.isArray(values.extras)) {
//         values.extras.forEach((extra, index) => {
//           formData.append(`extras[${index}][name]`, extra.name);
//           formData.append(`extras[${index}][price]`, extra.price);
//         });
//       }

//       formData.append("name", values.name);
//       formData.append("categoryId", values.categoryId);
//       formData.append("pricePerHour", values.price || 150);
//       formData.append("description", values.description || "");
//       formData.append("status", values.status || "pending");
//       formData.append("minPeriod", values.minPeriod || 60);
//       formData.append("openingHour", values.openingHour || 8);
//       formData.append("closingHour", values.closingHour || 22);
//       formData.append("depositPercent", values.depositPercent || 20);
//       formData.append("policy", values.notes || "");

//       formData.append("location[lat]", values.latitude);
//       formData.append("location[lng]", values.longitude);
//       formData.append("location[governorate]", values.governorate || "Cairo");
//       formData.append("location[city]", values.city || "Zamalek");

//       if (values.thumbnail instanceof File) formData.append("thumbnail", values.thumbnail);
//       if (Array.isArray(values.images)) {
//         values.images.forEach(img => {
//           if (img instanceof File) formData.append("images", img);
//         });
//       }

//       const res = await baseUrl.post("http://localhost:3000/arenas", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       console.log("Response:", res.data);

//       if (res.data?.isSuccess) {
//         showToast("✅ Arena added successfully!", "success");
//         resetForm();
//       } else {
//         showToast("⚠️ Error adding arena: " + (res.data?.message || "Unknown error"), "error");
//       }
//     } catch (err) {
//       console.error("Error adding arena:", err.response?.data || err.message);
//       showToast("❌ حدث خطأ أثناء الإضافة. راجع الكونسول لمعرفة التفاصيل.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Toast JSX
//   const Toast = ({ message, type }) => {
//     const getTypeStyles = () => {
//       switch (type) {
//         case "success": return "bg-green-600 border-green-700";
//         case "error": return "bg-red-600 border-red-700";
//         case "warning": return "bg-yellow-600 border-yellow-700";
//         default: return "bg-blue-600 border-blue-700";
//       }
//     };

   

//     if (!toast.visible) return null;

//     return (
//       <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
//         <div className={`${getTypeStyles()} text-white px-6 py-4 rounded-lg shadow-2xl border-2 flex items-center gap-3 min-w-[300px] max-w-md`}>
          
//           <p className="flex-1 font-medium">{message}</p>
//           <button
//             onClick={() => setToast(prev => ({ ...prev, visible: false }))}
//             className="flex-shrink-0 hover:bg-white hover:bg-opacity-20 rounded p-1 transition-colors"
//           >
//             ✖️
//           </button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-800">
//         {t("addArenaTitle")}
//       </h2>

//       <div className="bg-white shadow-md rounded-2xl p-4 sm:p-8">
//         <Formik
//           initialValues={{
//             policy: "",
//             name: "",
//             price: "",
//             description: "",
//             extras: [],
//             notes: "",
//             status: "",
//             latitude: "",
//             longitude: "",
//             governorate: "",
//             categoryId: "",
//             city: "",
//             minPeriod: "",
//             openingHour: "",
//             closingHour: "",
//             depositPercent: "",
//             mainImage: null,
//             galleryImages: [],
//           }}
//           validationSchema={ArenaSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ setFieldValue }) => (
//             <Form className="space-y-6 sm:space-y-8">
//               <BasicInfoSection />
//               <MediaSection />
//               <LocationPriceSection setFieldValue={setFieldValue} />
//               <FeaturesSection />
//               <DescriptionSection />

//               <div className="text-center">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="bg-green-600 text-white px-8 py-3 rounded-lg shadow hover:bg-green-700 transition disabled:opacity-50 w-full sm:w-auto"
//                 >
//                   {loading ? "جاري الحفظ..." : t("saveArena")}
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>

//       {/* Toast */}
//       <Toast message={toast.message} type={toast.type} />
//     </>
//   );
// };

// export default AddArena;



import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";

import LocationPriceSection from "../../components/OwnerComponents/AddArenaComponents/LocationPriceSection";
import FeaturesSection from "../../components/OwnerComponents/AddArenaComponents/FeaturesSection";
import DescriptionSection from "../../components/OwnerComponents/AddArenaComponents/DescriptionSection";
import MediaSection from "../../components/OwnerComponents/AddArenaComponents/MediaSection";
import BasicInfoSection from "../../components/OwnerComponents/AddArenaComponents/BasicInfoSection";
import ArenaSchema from "../../components/OwnerComponents/AddArenaComponents/ArenaSchema";
import baseUrl from "@/apis/config";

const AddArena = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  // Toast state
  const [toast, setToast] = useState({
    message: "",
    type: "success", // success | error | warning | info
    visible: false,
  });

  const showToast = (message, type = "success", duration = 3000) => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, duration);
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      console.log("Submitting...", values);

      const formData = new FormData();

      if (Array.isArray(values.extras)) {
        values.extras.forEach((extra, index) => {
          formData.append(`extras[${index}][name]`, extra.name);
          formData.append(`extras[${index}][price]`, extra.price);
        });
      }

      formData.append("name", values.name);
      formData.append("categoryId", values.categoryId);
      formData.append("pricePerHour", values.price || 150);
      formData.append("description", values.description || "");
      formData.append("status", values.status || "pending");
      formData.append("minPeriod", values.minPeriod || 60);
      formData.append("openingHour", values.openingHour || 8);
      formData.append("closingHour", values.closingHour || 22);
      formData.append("depositPercent", values.depositPercent || 20);
      formData.append("policy", values.notes || "");

      formData.append("location[lat]", values.latitude);
      formData.append("location[lng]", values.longitude);
      formData.append("location[governorate]", values.governorate || "Cairo");
      formData.append("location[city]", values.city || "Zamalek");

      if (values.thumbnail instanceof File) formData.append("thumbnail", values.thumbnail);
      if (Array.isArray(values.images)) {
        values.images.forEach((img) => {
          if (img instanceof File) formData.append("images", img);
        });
      }

      const res = await baseUrl.post("http://localhost:3000/arenas", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Response:", res.data);

      if (res.data?.isSuccess) {
        showToast(" تم إضافة الملعب بنجاح", "success");
        resetForm();
      } else {
        showToast(" لم يتم الإضافة: " + (res.data?.message || "حدث خطأ غير معروف"), "warning");
      }
    } catch (err) {
      console.error("Error adding arena:", err?.response?.data || err.message);
      showToast(" حدث خطأ أثناء الإضافة. راجع الكونسول لمعرفة التفاصيل.", "error");
    } finally {
      setLoading(false);
    }
  };

  // ===== Toast Component (محسّن ويظهر فوق يمين) =====
  const Toast = ({ message, type }) => {
    if (!toast.visible) return null;

    const typeStyles = {
      success: { wrap: "bg-emerald-600 border-emerald-700" },
      error: { wrap: "bg-red-600 border-red-700" },
      warning: { wrap: "bg-amber-600 border-amber-700"},
      info: { wrap: "bg-blue-600 border-blue-700"},
    };

    const { wrap, icon } = typeStyles[type] || typeStyles.info;

    return (
      <div
        className="
            fixed top-4 left-1/2 -translate-x-1/2 z-50
          pointer-events-none
          space-y-3
        "
        aria-live="polite"
        aria-atomic="true"
      >
  <div
  className={`
    ${wrap}
    text-white px-4 sm:px-5 py-3 sm:py-3.5
    rounded-xl shadow-2xl border
    flex items-start gap-3 sm:gap-4
    w-fit max-w-[92vw] sm:max-w-md
    pointer-events-auto
    transition-transform duration-200
    animate-[slideDown_.25s_ease-out]
  `}
  role="status"
>
  <div className="text-xl leading-none mt-0.5">{icon}</div>

  <p className="flex-1 font-medium text-sm sm:text-base break-words">{message}</p>
</div>
      </div>
    );
  };

  return (
    <>
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-800">
        {t("addArenaTitle")}
      </h2>

      <div className="bg-white shadow-md rounded-2xl p-4 sm:p-8">
        <Formik
          initialValues={{
            policy: "",
            name: "",
            price: "",
            description: "",
            extras: [],
            notes: "",
            status: "",
            latitude: "",
            longitude: "",
            governorate: "",
            categoryId: "",
            city: "",
            minPeriod: "",
            openingHour: "",
            closingHour: "",
            depositPercent: "",
            // موحّد مع handleSubmit
            thumbnail: null,
            images: [],
          }}
          validationSchema={ArenaSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-6 sm:space-y-8">
              <BasicInfoSection />
              <MediaSection />
              <LocationPriceSection setFieldValue={setFieldValue} />
              <FeaturesSection />
              <DescriptionSection />

              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg shadow hover:bg-green-700 transition disabled:opacity-50 w-full sm:w-auto"
                >
                  {loading ? "جاري الحفظ..." : t("saveArena")}
                </button>
              </div>

  
            </Form>
          )}
        </Formik>
      </div>

      {/* Toast */}
      <Toast message={toast.message} type={toast.type} />
    </>
  );
};

export default AddArena;

