// // import React from "react";

// // const StadiumImage = ({ images = [], name }) => {
// //   if (!images.length) return <p className="text-center">لا توجد صور متاحة</p>;

// //   return (
// //     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
// //       {images.map((img) => (
// //         <img
// //           key={img.id}
// //           src={img.path}
// //           alt={name}
// //           className="w-full h-64 object-cover rounded-lg shadow"
// //         />
// //       ))}
// //     </div>
// //   );
// // };

// // export default StadiumImage;


// // import React from "react";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // import { Navigation, Pagination } from "swiper/modules";
// // import "swiper/css";
// // import "swiper/css/navigation";
// // import "swiper/css/pagination";

// // const StadiumImage = ({ images = [], name }) => {
// //   if (!images.length) return <p className="text-center">لا توجد صور متاحة</p>;

// //   return (
// //     <div className="relative mb-6">
// //       <Swiper
// //         modules={[Navigation, Pagination]}
// //         spaceBetween={10}
// //         slidesPerView={1}
// //         navigation={{
// //           nextEl: ".swiper-button-next-custom",
// //           prevEl: ".swiper-button-prev-custom",
// //         }}
// //         pagination={{ clickable: true }}
// //         className="rounded-lg shadow-lg"
// //       >
// //         {images.map((img) => (
// //           <SwiperSlide key={img.id}>
// //             <img
// //               src={img.path}
// //               alt={name}
// //               className="w-full h-80 object-cover rounded-lg"
// //             />
// //           </SwiperSlide>
// //         ))}
// //       </Swiper>

// //       {/* أزرار التنقل */}
// //       <button
// //         className="swiper-button-prev-custom absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-md transition"
// //         aria-label="السابق"
// //       >
// //         ‹
// //       </button>
// //       <button
// //         className="swiper-button-next-custom absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-md transition"
// //         aria-label="التالي"
// //       >
// //         ›
// //       </button>
// //     </div>
// //   );
// // };

// // export default StadiumImage;


// // import React from "react";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // import { Navigation } from "swiper/modules";
// // import "swiper/css";
// // import "swiper/css/navigation";

// // // ملاحظة: لا تحتاج لِـ h-100 (مش كلاس في Tailwind)
// // // استخدم ارتفاعات مناسبة ومتجاوبة + overflow-hidden لقص الحواف مع التقويس

// // const StadiumImage = ({ images = [], name }) => {
// //   if (!images.length) return <p className="text-center">لا توجد صور متاحة</p>;

// //   return (
// //     <div className="relative mb-6">
// //       <div className="rounded-3xl overflow-hidden shadow-lg">
// //         <Swiper
// //           modules={[Navigation]}
// //           spaceBetween={0}
// //           slidesPerView={1}
// //           loop
// //           speed={500}
// //           navigation={{
// //             nextEl: ".swiper-button-next-custom",
// //             prevEl: ".swiper-button-prev-custom",
// //           }}
// //           className="w-full"
// //         >
// //           {images.map((img) => (
// //             <SwiperSlide key={img.id}>
// //               <img
// //                 src={img.path}
// //                 alt={name}
// //                 className="
// //                   w-full
// //                   h-64 sm:h-72 md:h-[420px]
// //                   object-cover
// //                 "
// //                 loading="lazy"
// //               />
// //             </SwiperSlide>
// //           ))}
// //         </Swiper>
// //       </div>

// //       {/* أزرار الأسهم بنفس شكل الصورة */}
// //       <button
// //         className="
// //           swiper-button-prev-custom
// //           absolute top-1/2 left-4 -translate-y-1/2
// //           bg-white/90 hover:bg-white
// //           w-9 h-9 flex items-center justify-center
// //           rounded-full shadow-md
// //           ring-1 ring-black/5
// //           transition
// //         "
// //         aria-label="السابق"
// //       >
// //         {/* سهم يسار */}
// //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
// //              className="w-5 h-5">
// //           <path d="M15 6l-6 6 6 6" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
// //         </svg>
// //       </button>

// //       <button
// //         className="
// //           swiper-button-next-custom
// //           absolute top-1/2 right-4 -translate-y-1/2
// //           bg-white/90 hover:bg-white
// //           w-9 h-9 flex items-center justify-center
// //           rounded-full shadow-md
// //           ring-1 ring-black/5
// //           transition
// //         "
// //         aria-label="التالي"
// //       >
// //         {/* سهم يمين */}
// //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
// //              className="w-5 h-5">
// //           <path d="M9 6l6 6-6 6" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
// //         </svg>
// //       </button>
// //     </div>
// //   );
// // };

// // export default StadiumImage;


// // import React from "react";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // import { Navigation, Pagination } from "swiper/modules";
// // import { ChevronLeft, ChevronRight } from "lucide-react";
// // import "swiper/css";
// // import "swiper/css/navigation";
// // import "swiper/css/pagination";

// // const StadiumImage = ({ images = [], name }) => {
// //   if (!images.length) return <p className="text-center">لا توجد صور متاحة</p>;

// //   return (
// //     <div className="relative mb-6">
// //       <div className="rounded-3xl overflow-hidden shadow-lg">
// //         <Swiper
// //           modules={[Navigation, Pagination]}
// //           spaceBetween={0}
// //           slidesPerView={1}
// //           loop
// //           speed={600}
// //           navigation={{
// //             nextEl: ".swiper-button-next-custom",
// //             prevEl: ".swiper-button-prev-custom",
// //           }}
// //           pagination={{
// //             clickable: true,
// //             bulletClass: "swiper-pagination-bullet !bg-gray-300",
// //             bulletActiveClass: "!bg-green-500",
// //           }}
// //           className="w-full"
// //         >
// //           {images.map((img) => (
// //             <SwiperSlide key={img.id}>
// //               <img
// //                 src={img.path}
// //                 alt={name}
// //                 className="w-full h-64 sm:h-72 md:h-[420px] object-cover"
// //                 loading="lazy"
// //               />
// //             </SwiperSlide>
// //           ))}
// //         </Swiper>
// //       </div>

// //       {/* زر اليسار */}
// //       <button
// //         className="
// //           swiper-button-prev-custom
// //           absolute top-1/2 left-4 -translate-y-1/2
// //           bg-white/90 hover:bg-white
// //           w-9 h-9 flex items-center justify-center
// //           rounded-full shadow-md
// //           ring-1 ring-black/5
// //           transition
// //         "
// //         aria-label="السابق"
// //       >
// //         <ChevronLeft className="w-5 h-5 text-gray-700" />
// //       </button>

// //       {/* زر اليمين */}
// //       <button
// //         className="
// //           swiper-button-next-custom
// //           absolute top-1/2 right-4 -translate-y-1/2
// //           bg-white/90 hover:bg-white
// //           w-9 h-9 flex items-center justify-center
// //           rounded-full shadow-md
// //           ring-1 ring-black/5
// //           transition
// //         "
// //         aria-label="التالي"
// //       >
// //         <ChevronRight className="w-5 h-5 text-gray-700" />
// //       </button>
// //     </div>
// //   );
// // };

// // export default StadiumImage;


// // import React from "react";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // import { Navigation, Pagination } from "swiper/modules";
// // import { ChevronLeft, ChevronRight } from "lucide-react";
// // import "swiper/css";
// // import "swiper/css/navigation";
// // import "swiper/css/pagination";

// // const StadiumImage = ({ images = [], name }) => {
// //   if (!images.length) return <p className="text-center">لا توجد صور متاحة</p>;

// //   return (
// //     <div className="relative mb-6">
// //       <div className="rounded-3xl overflow-hidden shadow-lg relative">
// //         <Swiper
// //           modules={[Navigation, Pagination]}
// //           spaceBetween={0}
// //           slidesPerView={1}
// //           loop
// //           speed={600}
// //           onInit={(swiper) => {
// //             swiper.params.navigation.prevEl = ".swiper-button-prev-custom";
// //             swiper.params.navigation.nextEl = ".swiper-button-next-custom";
// //             swiper.navigation.init();
// //             swiper.navigation.update();
// //           }}
// //           pagination={{
// //             clickable: true,
// //             bulletClass:
// //               "swiper-pagination-bullet !bg-gray-400 opacity-80 transition",
// //             bulletActiveClass: "!bg-green-700 !opacity-100",
// //           }}
// //           className="w-full"
// //         >
// //           {images.map((img) => (
// //             <SwiperSlide key={img.id}>
// //               <img
// //                 src={img.path}
// //                 alt={name}
// //                 className="w-full h-64 sm:h-72 md:h-[420px] object-cover"
// //                 loading="lazy"
// //               />
// //             </SwiperSlide>
// //           ))}
// //         </Swiper>

// //         {/* الأزرار */}
// //         <button
// //           className="
// //             swiper-button-prev-custom
// //             absolute top-1/2 left-4 -translate-y-1/2 z-10
// //             bg-white/90 hover:bg-white
// //             w-9 h-9 flex items-center justify-center
// //             rounded-full shadow-md
// //             ring-1 ring-black/5
// //             transition
// //           "
// //           aria-label="السابق"
// //         >
// //           <ChevronLeft className="w-5 h-5 text-gray-700" />
// //         </button>

// //         <button
// //           className="
// //             swiper-button-next-custom
// //             absolute top-1/2 right-4 -translate-y-1/2 z-10
// //             bg-white/90 hover:bg-white
// //             w-9 h-9 flex items-center justify-center
// //             rounded-full shadow-md
// //             ring-1 ring-black/5
// //             transition
// //           "
// //           aria-label="التالي"
// //         >
// //           <ChevronRight className="w-5 h-5 text-gray-700" />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default StadiumImage;


// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const StadiumImage = ({ images = [], name }) => {
//   if (!images.length) return <p className="text-center">لا توجد صور متاحة</p>;

//   return (
//     <div className="relative mb-6">
//       <div className="rounded-3xl overflow-hidden shadow-lg relative">
//         <Swiper
//           modules={[Navigation, Pagination]}
//           spaceBetween={0}
//           slidesPerView={1}
//           loop
//           speed={600}
//           onInit={(swiper) => {
//             swiper.params.navigation.prevEl = ".swiper-button-prev-custom";
//             swiper.params.navigation.nextEl = ".swiper-button-next-custom";
//             swiper.navigation.init();
//             swiper.navigation.update();
//           }}
//           pagination={{
//             clickable: true,
//             renderBullet: (index, className) => {
//               return `<span class="${className} !bg-gray-400 opacity-80 transition"></span>`;
//             },
//           }}
//           className="w-full custom-pagination"
//         >
//           {images.map((img) => (
//             <SwiperSlide key={img.id}>
//               <img
//                 src={img.path}
//                 alt={name}
//                 className="w-full h-64 sm:h-72 md:h-[420px] object-cover"
//                 loading="lazy"
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* الأزرار */}
//         <button
//           className="swiper-button-prev-custom
//             absolute top-1/2 left-4 -translate-y-1/2 z-10
//             bg-white/90 hover:bg-white
//             w-9 h-9 flex items-center justify-center
//             rounded-full shadow-md ring-1 ring-black/5 transition"
//           aria-label="السابق"
//         >
//           <ChevronLeft className="w-5 h-5 text-gray-700" />
//         </button>

//         <button
//           className="swiper-button-next-custom
//             absolute top-1/2 right-4 -translate-y-1/2 z-10
//             bg-white/90 hover:bg-white
//             w-9 h-9 flex items-center justify-center
//             rounded-full shadow-md ring-1 ring-black/5 transition"
//           aria-label="التالي"
//         >
//           <ChevronRight className="w-5 h-5 text-gray-700" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default StadiumImage;


import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const StadiumImage = ({ images = [], name }) => {
  if (!images.length) return <p className="text-center">لا توجد صور متاحة</p>;

  return (
    <>
      <style>{`
        .custom-pagination .swiper-pagination-bullet {
          width: 10px !important;
          height: 10px !important;
          background: gray !important;
          opacity: 0.5 !important;
        }

        .custom-pagination .swiper-pagination-bullet-active {
          background: black !important;
          opacity: 1 !important;
        }
      `}</style>

      <div className="relative mb-6">
        <div className="rounded-3xl overflow-hidden shadow-lg relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            loop
            speed={600}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = ".swiper-button-prev-custom";
              swiper.params.navigation.nextEl = ".swiper-button-next-custom";
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            pagination={{
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className} !bg-gray-400 opacity-80 transition"></span>`;
              },
            }}
            className="w-full custom-pagination"
          >
            {images.map((img) => (
              <SwiperSlide key={img.id}>
                <img
                  src={img.path}
                  alt={name}
                  className="w-full h-64 sm:h-72 md:h-[420px] object-cover"
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* أزرار التنقل */}
          <button
            className="swiper-button-prev-custom
              absolute top-1/2 left-4 -translate-y-1/2 z-10
              bg-white/90 hover:bg-white
              w-9 h-9 flex items-center justify-center
              rounded-full shadow-md ring-1 ring-black/5 transition cursor-pointer"
            aria-label="السابق"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <button
            className="swiper-button-next-custom
              absolute top-1/2 right-4 -translate-y-1/2 z-10
              bg-white/90 hover:bg-white
              w-9 h-9 flex items-center justify-center
              rounded-full shadow-md ring-1 ring-black/5 transition cursor-pointer"
            aria-label="التالي"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </>
  );
};

export default StadiumImage;
