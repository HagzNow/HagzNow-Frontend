import AdminArenaCard from "../AdminArenaCard/AdminArenaCard";

export default function AdminArenasReqsList({ arenaRequests = [], loading }) {
    const handleApprove = (id) => {
        console.log("Approved arena:", id);
        // Add your approve logic here
        // After approval, you can call onRefresh() to reload the list
    };

    const handleReject = (id) => {
        console.log("Rejected arena:", id);
        // Add your reject logic here
        // After rejection, you can call onRefresh() to reload the list
    };

    const handleViewMore = (id) => {
        console.log("View more details for arena:", id);
        // Add your view more logic here
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    if (!arenaRequests || arenaRequests.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500 text-lg">لا توجد طلبات ملاعب متاحة</p>
            </div>
        );
    }

    return (
        <div dir="ltr" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-[10px] my-10 mx-10">
            {arenaRequests.map((arena) => (
                <AdminArenaCard
                    key={arena.id}
                    title={arena.name}
                    location={arena.locationSummary}
                    sport={arena.categoryName}
                    price={arena.pricePerHour}
                    image={arena.thumbnail || 'src/assets/imgs/arena-img.png'}
                    onApprove={() => handleApprove(arena.id)}
                    onReject={() => handleReject(arena.id)}
                    onViewMore={() => handleViewMore(arena.id)}
                />
            ))}
        </div>
    );
}
