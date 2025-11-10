import { useState, useEffect, useContext, useRef } from "react";
import { authContext } from "@/Contexts/AuthContext";
import ProfileHeader from "@/components/UserProfile/ProfileHeader";
import ProfilePicture from "@/components/UserProfile/ProfilePicture";
import ProfileForm from "@/components/UserProfile/ProfileForm";
import LanguageSwitcher from "@/components/UserProfile/LanguageSwitcher";
import baseUrl from "@/apis/config";

export default function UserProfile() {
  const [language, setLanguage] = useState("arabic");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isSubmittingInfo, setIsSubmittingInfo] = useState(false);
  const [userData, setUserData] = useState(null);
  const [serverError, setServerError] = useState("");
  const { token } = useContext(authContext);

  const submitRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await baseUrl.get(`http://localhost:3000/users/profile`, {
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
    if (!isEditingInfo) {
      setIsEditingInfo(true);
      return;
    }
    submitRef.current?.();
  };

  const handleSavedInfo = (updated) => {
    if (updated) setUserData(prev => ({ ...prev, ...updated }));
    setSelectedImage(null);
    setIsEditingInfo(false);
    setIsSubmittingInfo(false);
  };

  const handleSubmittingInfoChange = (flag) => setIsSubmittingInfo(flag);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <main className="w-3/4 mt-[20px] mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <ProfileHeader
            isEditing={isEditingInfo}
            isSubmitting={isSubmittingInfo}
            onClick={handleHeaderClick}
          />

          <ProfilePicture
            isEditing={isEditingInfo && !isSubmittingInfo}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            userData={userData}
          />

          <ProfileForm
            isEditing={isEditingInfo}
            isSubmitting={isSubmittingInfo}
            setSubmitting={handleSubmittingInfoChange}
            selectedImage={selectedImage}
            userData={userData}
            serverError={serverError}
            setServerError={setServerError}
            setSubmitRef={(fn) => (submitRef.current = fn)}
            onSaved={handleSavedInfo}
          />

          <LanguageSwitcher language={language} setLanguage={setLanguage} />
        </div>
      </main>
    </div>
  );
}
