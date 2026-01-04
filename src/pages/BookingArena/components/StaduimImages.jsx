import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Expand, X, Image as ImageIcon } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const StadiumImage = ({ images = [], name }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const swiperRef = useRef(null);

  if (!images.length)
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 overflow-hidden p-12 text-center">
        <div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
          <ImageIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-gray-600 dark:text-gray-300 text-lg font-medium mb-2">لا توجد صور متاحة</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">سيتم إضافة صور للملعب قريباً</p>
      </div>
    );

  const openFullscreen = (index = 0) => {
    setCurrentImageIndex(index);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  const handleThumbnailClick = (index) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  return (
    <>
      <style>{`
        .stadium-swiper .swiper-pagination-bullet {
          width: 12px !important;
          height: 12px !important;
          background: rgba(255, 255, 255, 0.6) !important;
          opacity: 0.8 !important;
          transition: all 0.3s ease !important;
          border: 2px solid transparent !important;
        }

        .stadium-swiper .swiper-pagination-bullet-active {
          background: #10B981 !important;
          opacity: 1 !important;
          transform: scale(1.2) !important;
          border-color: white !important;
        }

        .stadium-swiper .swiper-pagination {
          bottom: 20px !important;
        }

        .image-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%);
        }

        .fullscreen-swiper .swiper-button-next,
        .fullscreen-swiper .swiper-button-prev {
          color: white !important;
          background: rgba(0,0,0,0.5);
          width: 60px !important;
          height: 60px !important;
          border-radius: 50%;
          backdrop-filter: blur(10px);
        }

        .fullscreen-swiper .swiper-button-next:after,
        .fullscreen-swiper .swiper-button-prev:after {
          font-size: 24px !important;
        }
      `}</style>

      {/* Main Image Gallery */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-700 overflow-hidden group">
        <div className="relative rounded-2xl overflow-hidden">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            loop={images.length > 1}
            speed={800}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: '.stadium-swiper-next',
              prevEl: '.stadium-swiper-prev',
            }}
            pagination={{
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className}"></span>`;
              },
            }}
            onSlideChange={(swiper) => {
              setCurrentImageIndex(swiper.realIndex);
            }}
            className="w-full stadium-swiper"
          >
            {images.map((img, index) => (
              <SwiperSlide key={img.id}>
                <div className="relative cursor-pointer" onClick={() => openFullscreen(index)}>
                  <img
                    src={img.path}
                    alt={`${name} - صورة ${index + 1}`}
                    className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 image-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Image Counter */}
                  <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-2xl text-sm font-medium backdrop-blur-sm transition-opacity duration-500">
                    {index + 1} / {images.length}
                  </div>

                  {/* Expand Icon */}
                  <div className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-2xl backdrop-blur-sm transition-all duration-500 hover:bg-black/80 hover:scale-110 cursor-pointer">
                    <Expand className="w-4 h-4" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons - Always Visible */}
          {images.length > 1 && (
            <>
              <button
                className="stadium-swiper-prev
                  absolute top-1/2 left-4 -translate-y-1/2 z-10
                  bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800
                  w-12 h-12 flex items-center justify-center
                  rounded-2xl shadow-lg dark:shadow-gray-900/50
                  ring-1 ring-black/5 dark:ring-white/10
                  transition-all duration-300 ease-in-out
                  hover:scale-110 hover:shadow-xl dark:hover:shadow-gray-900
                  cursor-pointer"
                aria-label="الصورة السابقة"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>

              <button
                className="stadium-swiper-next
                  absolute top-1/2 right-4 -translate-y-1/2 z-10
                  bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800
                  w-12 h-12 flex items-center justify-center
                  rounded-2xl shadow-lg dark:shadow-gray-900/50
                  ring-1 ring-black/5 dark:ring-white/10
                  transition-all duration-300 ease-in-out
                  hover:scale-110 hover:shadow-xl dark:hover:shadow-gray-900
                  cursor-pointer"
                aria-label="الصورة التالية"
              >
                <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>
            </>
          )}

          {/* Stadium Name Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent text-white p-6 pt-12 transform transition-all duration-500 ease-in-out">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg truncate">{name}</h3>
              <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-lg text-xs">
                <ImageIcon className="w-3 h-3" />
                <span>{images.length} صورة</span>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
            <div className="flex gap-2 justify-center overflow-x-auto pb-2">
              {images.map((img, index) => (
                <div
                  key={img.id}
                  className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                    currentImageIndex === index
                      ? 'border-green-500 dark:border-green-400 opacity-100 scale-105'
                      : 'border-transparent dark:border-gray-600 opacity-70 hover:border-green-300 dark:hover:border-green-600 hover:opacity-100'
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <img src={img.path} alt={`${name} - مصغرة ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black dark:bg-black z-50 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeFullscreen}
            className="absolute top-6 right-6 z-50 bg-black/50 dark:bg-black/70 text-white p-3 rounded-2xl hover:bg-black/70 dark:hover:bg-black/90 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image Counter */}
          <div className="absolute top-6 left-6 z-50 bg-black/50 dark:bg-black/70 text-white px-4 py-2 rounded-2xl backdrop-blur-sm">
            {currentImageIndex + 1} / {images.length}
          </div>

          {/* Fullscreen Swiper */}
          <div className="w-full h-full">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              initialSlide={currentImageIndex}
              speed={500}
              navigation={true}
              pagination={{
                clickable: true,
                renderBullet: (index, className) => {
                  return `<span class="${className} !bg-white/60"></span>`;
                },
              }}
              onSlideChange={(swiper) => {
                setCurrentImageIndex(swiper.activeIndex);
              }}
              className="w-full h-full fullscreen-swiper"
            >
              {images.map((img, index) => (
                <SwiperSlide key={img.id}>
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={img.path}
                      alt={`${name} - صورة ${index + 1}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Image Name */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-black/50 dark:bg-black/70 text-white px-6 py-3 rounded-2xl backdrop-blur-sm text-center">
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-white/80 dark:text-white/90 text-sm">
              الصورة {currentImageIndex + 1} من {images.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default StadiumImage;
