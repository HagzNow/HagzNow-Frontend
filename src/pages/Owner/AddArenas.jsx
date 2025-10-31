import React, { useState } from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Header from "../../components/OwnerComponents/Header";
import Sidebar from "../../components/OwnerComponents/Sidebar";
import LocationPriceSection from "../../components/OwnerComponents/AddArenaComponents/LocationPriceSection";
import FeaturesSection from "../../components/OwnerComponents/AddArenaComponents/FeaturesSection";
import DescriptionSection from "../../components/OwnerComponents/AddArenaComponents/DescriptionSection";
import MediaSection from "../../components/OwnerComponents/AddArenaComponents/MediaSection";
import BasicInfoSection from "../../components/OwnerComponents/AddArenaComponents/BasicInfoSection";
import ArenaSchema from "../../components/OwnerComponents/AddArenaComponents/ArenaSchema";

const AddArena = () => {
  const { t, i18n } = useTranslation();
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const isRTL = i18n.language === "ar";

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);

      // 🧩 إعداد البيانات في FormData
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("sportType", values.sportType);
      formData.append("location", values.location);
      formData.append("addressDescription", values.addressDescription || "");
      formData.append("price", values.price);
      formData.append("description", values.description);
      formData.append("notes", values.notes || "");
      formData.append("status", values.status);
      formData.append("latitude", values.latitude);
      formData.append("longitude", values.longitude);

      // 🧩 المميزات (features)
      values.features.forEach((feature, i) => {
        formData.append(`features[${i}]`, feature);
      });

      // 🧩 الصور
      if (mainImage) formData.append("mainImage", mainImage);
      if (galleryImages.length > 0) {
        galleryImages.forEach((img) => formData.append("galleryImages", img));
      }

      // 🧩 إرسال البيانات إلى السيرفر
      const res = await axios.post("http://localhost:3000/arenas", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization: `Bearer ${token}`, // لو عندك توكن
        },
      });

      if (res.data.isSuccess) {
        alert("✅ تمت إضافة الساحة بنجاح!");
        resetForm();
        setMainImage(null);
        setGalleryImages([]);
      } else {
        alert("⚠️ حدث خطأ أثناء الإضافة: " + res.data.message);
      }
    } catch (err) {
      console.error("Error adding arena:", err);
      alert("❌ فشل الاتصال بالسيرفر!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex" dir={isRTL ? "rtl" : "ltr"}>
      {/* ✅ Sidebar */}
      <div
        className={`hidden md:block fixed top-0 ${
          isRTL ? "right-0" : "left-0"
        } h-full w-64 bg-white shadow-lg z-40`}
      >
        <Sidebar open={true} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* ✅ Main Section */}
      <div className={`flex-1 flex flex-col ${isRTL ? "md:mr-64" : "md:ml-64"}`}>
        <Header onMenuClick={() => setSidebarOpen(true)} isRTL={isRTL} />

        <main className="flex-1 overflow-y-auto px-6 py-4">
          <div className="flex justify-end mb-4">
            <button
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
              onClick={() => i18n.changeLanguage(isRTL ? "en" : "ar")}
            >
              {isRTL ? "English" : "العربية"}
            </button>
          </div>

          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            {t("addArenaTitle")}
          </h2>

          <div className="bg-white shadow-md rounded-2xl p-8">
            <Formik
              initialValues={{
                name: "",
                sportType: "",
                location: "",
                addressDescription: "",
                price: "",
                description: "",
                features: [],
                notes: "",
                status: "",
                latitude: "",
                longitude: "",
              }}
              validationSchema={ArenaSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => (
                <Form className="space-y-8">
                  <BasicInfoSection />
                  <MediaSection
                    mainImage={mainImage}
                    setMainImage={setMainImage}
                    galleryImages={galleryImages}
                    setGalleryImages={setGalleryImages}
                  />
                  <LocationPriceSection setFieldValue={setFieldValue} />
                  <FeaturesSection />
                  <DescriptionSection />

                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-green-600 text-white px-10 py-3 rounded-lg shadow hover:bg-green-700 transition disabled:opacity-50"
                    >
                      {loading ? "جاري الحفظ..." : t("saveArena")}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </main>
      </div>

      {/* ✅ Sidebar for Mobile */}
      <div className="md:hidden">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
    </div>
  );
};

export default AddArena;
