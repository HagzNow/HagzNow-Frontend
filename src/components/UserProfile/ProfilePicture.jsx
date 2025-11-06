import { User, UserPen } from "lucide-react";

export default function ProfilePicture({ isEditing, selectedImage, setSelectedImage }) {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="relative w-28 h-28">
        <div className="w-full h-full rounded-full overflow-hidden border-2 border-green-500">
          {selectedImage ? (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-blue-100 flex items-center justify-center">
              <User size={48} className="text-blue-400" />
            </div>
          )}
        </div>

        {isEditing && (
          <>
            <label
              htmlFor="profileImage"
              className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full cursor-pointer hover:bg-green-700 transition"
            >
              <UserPen />
            </label>
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setSelectedImage(file);
              }}
              className="hidden"
            />
          </>
        )}
      </div>
      <p className="text-sm text-gray-500 mt-3">
        اضغط على الكاميرا لتغيير الصورة
      </p>
    </div>
  );
}
