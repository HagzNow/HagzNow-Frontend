import { useState } from "react";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";

import Header from "../../components/OwnerComponents/Header";


import ArenaSchema from "../../components/OwnerComponents/ArenaSchema";
import BasicInfoSection from "../../components/OwnerComponents/BasicInfoSection";
import MediaSection from "../../components/OwnerComponents/MediaSection";
import LocationPriceSection from "../../components/OwnerComponents/LocationPriceSection";
import FeaturesSection from "../../components/OwnerComponents/FeaturesSection";
import DescriptionSection from "../../components/OwnerComponents/DescriptionSection";
import Sidebar from "../../components/OwnerComponents/SideBar";

const AddArena = () => {
  const { t, i18n } = useTranslation();
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <Header onMenuClick={() => setSidebarOpen(true)} />

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-3 hidden md:block">
          <Sidebar open={true} onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Form Section */}
        <div className="md:col-span-9">
          <div className="bg-white shadow-md rounded-2xl p-8">
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

            <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
              {t("addArenaTitle")}
            </h2>

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
        </div>
      </div>

      {/* Sidebar for mobile */}
      <div className="md:hidden">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
    </div>
  );
};

export default AddArena;
