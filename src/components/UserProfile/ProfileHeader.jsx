import { Pencil, Save } from "lucide-react";

export default function ProfileHeader({ isEditing, isSubmitting, onClick }) {
  const label = !isEditing ? "تعديل" : isSubmitting ? "جارٍ الحفظ..." : "حفظ";

  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">معلومات الملف الشخصي</h1>
      <button
        onClick={onClick}
        disabled={isSubmitting}
        className={`flex items-center gap-2 transition ${
          isSubmitting
            ? "text-gray-400 dark:text-gray-500 cursor-not-allowed"
            : "text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-500"
        }`}
      >
        <span className="cursor-pointer">{label}</span>
        {isEditing ? <Save /> : <Pencil />}
      </button>
    </div>
  );
}


