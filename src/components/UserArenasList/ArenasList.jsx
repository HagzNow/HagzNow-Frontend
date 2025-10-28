import ArenaCard from "../ArenaCard/ArenaCard";

export default function ArenasList({ arenas, loading }) {
    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    if (!arenas || arenas.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500 text-lg">لا توجد ملاعب متاحة</p>
            </div>
        );
    }

    return (
        <div dir="ltr" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-[5px] my-10 mx-10">
            {arenas.map((arena) => {
                // Format location
                const location = arena.location
                    ? `${arena.location.city}, ${arena.location.governorate}`
                    : 'غير محدد';

                // Get category name
                const category = arena.category?.name || null;

                return (
                    <ArenaCard
                        key={arena.id}
                        title={arena.name}
                        location={location}
                        category={category}
                        price={arena.pricePerHour}
                        rating={arena.rating || 0}
                        // image={arena.thumbnail ? `http://localhost:3000/${arena.thumbnail}` : 'src/assets/imgs/arena-img.png'}
                        image={`src/assets/${arena.thumbnail}`}
                    />
                );
            })}
        </div>
    );
}
