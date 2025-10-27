import React, { useState } from "react";
import { Formik, Form } from "formik";
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

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* ✅ Header */}
      <Header onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex">
        {/* ✅ Sidebar */}
        <div className="md:col-span-3 hidden md:block">
          <Sidebar open={true} onClose={() => setSidebarOpen(false)} />
        </div>

        {/* ✅ Main Content */}
        <main className="flex-1 max-w-7xl mx-auto px-4 py-6">
          {/* ✅ Language Switcher */}
          <div className="flex justify-end mb-4">
            <button
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
              onClick={() =>
                i18n.changeLanguage(i18n.language === "en" ? "ar" : "en")
              }
            >
              {i18n.language === "en" ? "العربية" : "English"}
            </button>
          </div>

          {/* ✅ Page Title */}
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            {t("addArenaTitle")}
          </h2>

          {/* ✅ Form */}
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
              onSubmit={(values) => {
                const data = { ...values, mainImage, galleryImages };
                console.log("Form Data Submitted:", data);
                alert(t("successMessage"));
              }}
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
                      className="bg-green-600 text-white px-10 py-3 rounded-lg shadow hover:bg-green-700 transition"
                    >
                      {t("saveArena")}
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
