import React, {  useState } from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import { useTranslation } from "react-i18next";

import LocationPriceSection from "../../components/OwnerComponents/AddArenaComponents/LocationPriceSection";
import FeaturesSection from "../../components/OwnerComponents/AddArenaComponents/FeaturesSection";
import DescriptionSection from "../../components/OwnerComponents/AddArenaComponents/DescriptionSection";
import MediaSection from "../../components/OwnerComponents/AddArenaComponents/MediaSection";
import BasicInfoSection from "../../components/OwnerComponents/AddArenaComponents/BasicInfoSection";
import ArenaSchema from "../../components/OwnerComponents/AddArenaComponents/ArenaSchema";



const AddArena = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
 
 

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      console.log("Submitting...", values);
      const formData = new FormData();

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

      if (values.thumbnail instanceof File) {
        formData.append("thumbnail", values.thumbnail);
      }
      if (Array.isArray(values.images)) {
        values.images.forEach((img) => {
          if (img instanceof File) formData.append("images", img);
        });
      }

      const res = await axios.post("http://localhost:3000/arenas", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Response:", res.data);

      if (res.data?.isSuccess) {
        alert("✅ Arena added successfully!");
        resetForm();
      } else {
        alert("⚠️ Error adding arena: " + (res.data?.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Error adding arena:", err.response?.data || err.message);
      alert("❌ حدث خطأ أثناء الإضافة. راجع الكونسول لمعرفة التفاصيل.");
    } finally {
      setLoading(false);
    }
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
            mainImage: null,
            galleryImages: [],
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
      </>
 
  );
};

export default AddArena;
