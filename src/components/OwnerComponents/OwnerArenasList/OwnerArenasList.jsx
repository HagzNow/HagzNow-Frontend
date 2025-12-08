import OwnerArenaCard from "../OwnerArenaCard/OwnerArenaCard";

export default function OwnerArenasList({ arenas, loading }) {
    if (loading) {
        return (
            <div dir="ltr" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-6 gap-x-[15px] my-10 mx-4 sm:mx-6 md:mx-8 lg:mx-10">
                {/* Show 8 skeleton cards while loading */}
                {[...Array(8)].map((_, index) => (
                    <OwnerArenaCard key={index} isLoading={true} />
                ))}
            </div>
        );
    }

    if (!arenas || arenas.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500 dark:text-gray-400 text-lg">لا توجد ملاعب متاحة</p>
            </div>
        );
    }

    return (
        <div
            dir="ltr"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-6 gap-x-[15px] my-10 mx-4 sm:mx-6 md:mx-8 lg:mx-10"
        >
            {arenas.map((arena) => {
                // Format location
                const location = arena.locationSummary || "غير محدد";

                // Get category name
                const category = arena.categoryName || null;

                return (
                    <OwnerArenaCard
                        key={arena.id}
                        id={arena.id}
                        title={arena.name}
                        location={location}
                        category={category}
                        price={arena.pricePerHour}
                        rating={arena.rating || 0}
                        image={arena.thumbnail || '/src/assets/imgs/arena-img.png'}
                        status={arena.status}
                    />
                );
            })}
        </div>
    );
}
