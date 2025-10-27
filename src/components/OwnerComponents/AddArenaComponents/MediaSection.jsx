import { useTranslation } from "react-i18next";

const MediaSection = ({ mainImage, setMainImage, galleryImages, setGalleryImages }) => {
  const { t } = useTranslation();

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Gallery */}
      <div className="border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">{t("galleryImages")}</h3>
        <div className="flex gap-4 mb-4 overflow-x-auto">
          {galleryImages.length > 0 ? (
            galleryImages.map((img, i) => (
              <img key={i} src={URL.createObjectURL(img)} alt="gallery" className="w-32 h-24 object-cover rounded-lg shadow" />
            ))
          ) : (
            <p className="text-gray-400 text-sm">{t("noImages")}</p>
          )}
        </div>

        <label className="block bg-gray-100 hover:bg-gray-200 text-center py-2 rounded-lg cursor-pointer">
          {t("uploadGallery")}
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => setGalleryImages(Array.from(e.target.files || []))}
          />
        </label>
      </div>

      {/* Main Image */}
      <div className="border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">{t("mainImage")}</h3>
        <div className="flex flex-col items-center">
          {mainImage ? (
            <img
              src={URL.createObjectURL(mainImage)}
              alt="main"
              className="w-64 h-40 object-cover rounded-lg shadow mb-4"
            />
          ) : (
            <div className="w-64 h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400">
              {t("noMainImage")}
            </div>
          )}
          <label className="bg-gray-100 hover:bg-gray-200 text-center py-2 w-full rounded-lg cursor-pointer">
            {t("uploadMainImage")}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setMainImage(e.target.files[0] || null)}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default MediaSection;
