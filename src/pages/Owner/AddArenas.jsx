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

      const formData = new FormData();

      // ✅ الحقول الأساسية
      formData.append("name", values.name);
      formData.append("categoryId", "a1d6e75d-82ab-4346-b49e-e948393a6497");
      formData.append("pricePerHour", values.price);
      formData.append("description", values.description);
      formData.append("status", values.status || "pending");
      formData.append("minPeriod", values.minPeriod || 60);
      formData.append("openingHour", values.openingHour || 8);
      formData.append("closingHour", values.closingHour || 22);
      formData.append("depositPercent", values.depositPercent || 20);
      formData.append("policy", values.notes || "");

      // ✅ الموقع
      formData.append("location[lat]", values.latitude);
      formData.append("location[lng]", values.longitude);
      formData.append("location[governorate]", values.governorate || "Cairo");
      formData.append("location[city]", values.city || "Zamalek");

      // ✅ المميزات
      values.features.forEach((feature, i) => {
        formData.append(`features[${i}]`, feature);
      });

      // ✅ صور مؤقتة
      formData.append("thumbnail", "/uploads/arenas/thumbnail.jpg");
      formData.append("images[0][path]", "/uploads/arenas/sample1.jpg");
      formData.append("images[1][path]", "/uploads/arenas/sample2.jpg");

      const res = await axios.post("http://localhost:3000/arenas", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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
      console.error("Error adding arena:", err.response?.data || err);
      alert("❌ فشل الاتصال بالسيرفر!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50 flex flex-col md:flex-row"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* ✅ Sidebar Desktop */}
      <div
        className={`hidden md:block fixed top-0 ${
          isRTL ? "right-0" : "left-0"
        } h-full w-64 bg-white shadow-lg z-40`}
      >
        <Sidebar open={true} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* ✅ Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isRTL ? "md:mr-64" : "md:ml-64"
        }`}
      >
        <Header onMenuClick={() => setSidebarOpen(true)} isRTL={isRTL} />

        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
          {/* لغة */}
          <div className="flex justify-end mb-4">
            <button
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
              onClick={() => i18n.changeLanguage(isRTL ? "en" : "ar")}
            >
              {isRTL ? "English" : "العربية"}
            </button>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-800">
            {t("addArenaTitle")}
          </h2>

          <div className="bg-white shadow-md rounded-2xl p-4 sm:p-8">
            <Formik
              initialValues={{
                name: "",
                sportType: "",
                price: "",
                description: "",
                features: [],
                notes: "",
                status: "",
                latitude: "",
                longitude: "",
                governorate: "",
                city: "",
                minPeriod: "",
                openingHour: "",
                closingHour: "",
                depositPercent: "",
              }}
              validationSchema={ArenaSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => (
                <Form className="space-y-6 sm:space-y-8">
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
                      className="bg-green-600 text-white px-8 py-3 rounded-lg shadow hover:bg-green-700 transition disabled:opacity-50 w-full sm:w-auto"
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

      {/* ✅ Sidebar Mobile Overlay */}
      {sidebarOpen && (
  <div
    className="fixed inset-0 z-50 md:hidden transition-opacity duration-300"
    style={{
      backgroundColor: "#00000030", // أسود شفاف بنسبة 18-20%
      backdropFilter: "blur(3px)", // ضباب خفيف
      WebkitBackdropFilter: "blur(3px)", // دعم سفاري
    }}
    onClick={() => setSidebarOpen(false)}
  >
    <div
      className={`absolute top-0 h-full w-64 bg-white shadow-xl rounded-l-2xl transition-transform duration-300 ${
        isRTL ? "right-0 translate-x-0" : "left-0 translate-x-0"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  </div>
)}

    </div>
  );
};

export default AddArena;
