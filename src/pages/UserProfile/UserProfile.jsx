import { useState, useEffect, useContext, useRef } from "react";
import { authContext } from "@/Contexts/AuthContext";
import ProfileHeader from "@/components/UserProfile/ProfileHeader";
import ProfilePicture from "@/components/UserProfile/ProfilePicture";
import ProfileForm from "@/components/UserProfile/ProfileForm";
import LanguageSwitcher from "@/components/UserProfile/LanguageSwitcher";
import baseUrl from "@/apis/config";

export default function UserProfile() {
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
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <p className="text-lg text-gray-600 dark:text-gray-300">
          جارٍ تحميل البيانات...
        </p>
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
    if (updated) setUserData((prev) => ({ ...prev, ...updated }));
    setSelectedImage(null);
    setIsEditingInfo(false);
    setIsSubmittingInfo(false);
  };

  const handleSubmittingInfoChange = (flag) => setIsSubmittingInfo(flag);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900/40 border border-gray-100 dark:border-gray-700 p-6 sm:p-8 transition-colors duration-300">
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

          {/* <LanguageSwitcher language={language} setLanguage={setLanguage} /> */}
        </div>
      </main>
    </div>
  );
}
