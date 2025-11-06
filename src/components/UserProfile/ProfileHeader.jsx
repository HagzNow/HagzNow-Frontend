import { Pencil, Save } from "lucide-react";

export default function ProfileHeader({ isEditing, setIsEditing }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-bold text-gray-900">
        معلومات الملف الشخصي
      </h1>
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="text-green-600 hover:text-green-700 flex items-center gap-2 cursor-pointer transition"
      >
        <span>{isEditing ? "حفظ" : "تعديل"}</span>
        {isEditing ? <Save /> : <Pencil />}
      </button>
    </div>
  );
}
