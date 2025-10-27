import React from "react";

const StadiumImage = ({ images = [], name }) => {
  if (!images.length) return <p className="text-center">لا توجد صور متاحة</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {images.map((img) => (
        <img
          key={img.id}
          //src={`src/assets/${img.path}`}
           // src={new URL(`../../assets/uploads/arenas/${img.path.split('/').pop()}`, import.meta.url).href}
             src={`/uploads/arenas/${img.path.split('/').pop()}`}
          alt={name}
          className="w-full h-64 object-cover rounded-lg shadow"
        />
      ))}
    </div>
  );
};

export default StadiumImage;
