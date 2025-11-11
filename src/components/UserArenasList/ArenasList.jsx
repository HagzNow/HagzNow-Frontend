import ArenaCard from "../ArenaCard/ArenaCard";
import { PiSoccerBall } from "react-icons/pi";

export default function ArenasList({ arenas, loading }) {
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-20 min-h-[400px]">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <PiSoccerBall className="text-green-600 text-xl animate-pulse" />
          </div>
        </div>
        <p className="mt-6 text-gray-600 text-lg font-medium">جاري تحميل الملاعب...</p>
      </div>
    );
  }

  if (!arenas || arenas.length === 0) {
    return (
      <div className="text-center py-20 min-h-[400px] flex flex-col items-center justify-center">
        <div className="bg-gray-100 rounded-full p-6 mb-6">
          <PiSoccerBall className="text-6xl text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">لا توجد ملاعب متاحة</h3>
        <p className="text-gray-500 text-lg max-w-md">
          لم يتم العثور على ملاعب تطابق معايير البحث الخاصة بك. جرب تغيير الفلاتر أو البحث مرة أخرى.
        </p>
      </div>
    );
  }

  return (
    <div
      dir="ltr"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-6"
    >
      {arenas.map((arena) => {
        // Format location - handle new API structure
        const location = arena.locationSummary || "غير محدد";

        // Get category name - handle new API structure
        const category = arena.categoryName || null;

        return (
          <ArenaCard
            key={arena.id}
            id={arena.id}
            title={arena.name}
            location={location}
            category={category}
            price={arena.pricePerHour}
            rating={arena.rating || 0}
            image={arena.thumbnail || 'src/assets/imgs/arena-img.png'}
          />
        );
      })}
    </div>
  );
}
