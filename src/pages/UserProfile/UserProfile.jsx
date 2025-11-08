import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";

import { authContext } from "@/Contexts/AuthContext";
import ProfileHeader from "@/components/UserProfile/ProfileHeader";
import ProfilePicture from "@/components/UserProfile/ProfilePicture";
import ProfileForm from "@/components/UserProfile/ProfileForm";
import LanguageSwitcher from "@/components/UserProfile/LanguageSwitcher";

export default function UserProfile() {
  const [language, setLanguage] = useState("arabic");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // ⬅️ جديد
  const [userData, setUserData] = useState(null);
  const [serverError, setServerError] = useState("");
  const { token } = useContext(authContext);

  const submitRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };
    if (token) fetchUserData();
  }, [token]);

  if (!userData)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">جارٍ تحميل البيانات...</p>
      </div>
    );

  const handleHeaderClick = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    // في وضع التعديل → نفذ الحفظ (الفورم هيبلّغنا بحالة الإرسال)
    submitRef.current?.();
  };

  const handleSaved = (updated) => {
    if (updated) setUserData((prev) => ({ ...prev, ...updated }));
    setIsEditing(false);      // يرجّع الزرار لـ "تعديل"
    setIsSubmitting(false);   // يحرر الحالة
  };

  const handleSubmittingChange = (flag) => setIsSubmitting(flag);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <main className="w-3/4 mt-[20px] mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <ProfileHeader
            isEditing={isEditing}
            isSubmitting={isSubmitting}   // ⬅️ جديد
            onClick={handleHeaderClick}
          />

          <ProfilePicture
            isEditing={isEditing && !isSubmitting} // يمنع التغيير أثناء الحفظ
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />

          <ProfileForm
            isEditing={isEditing}
            isSubmitting={isSubmitting}             // ⬅️ جديد
            setSubmitting={handleSubmittingChange}  // ⬅️ جديد
            selectedImage={selectedImage}
            userData={userData}
            serverError={serverError}
            setServerError={setServerError}
            setSubmitRef={(fn) => (submitRef.current = fn)}
            onSaved={handleSaved}
          />

          <LanguageSwitcher language={language} setLanguage={setLanguage} />
        </div>
      </main>
    </div>
  );
}
