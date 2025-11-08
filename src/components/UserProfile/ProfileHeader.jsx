import { Pencil, Save } from "lucide-react";

export default function ProfileHeader({ isEditing, isSubmitting, onClick }) {
  const label = !isEditing ? "تعديل" : isSubmitting ? "جارٍ الحفظ..." : "حفظ";

  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-bold text-gray-900">معلومات الملف الشخصي</h1>
      <button
        onClick={onClick}
        disabled={isSubmitting}
        className={`flex items-center gap-2 transition ${
          isSubmitting ? "text-gray-400 cursor-not-allowed" : "text-green-600 hover:text-green-700"
        }`}
      >
        <span>{label}</span>
        {isEditing ? <Save /> : <Pencil />}
      </button>
    </div>
  );
}
