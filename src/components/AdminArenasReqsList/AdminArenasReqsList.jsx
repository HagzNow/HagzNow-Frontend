import AdminArenaCard from "../AdminArenaCard/AdminArenaCard";

export default function AdminArenasReqsList() {
    const arenaRequests = [
        {
            id: 1,
            title: "الملاعب",
            location: "القاهرة،مصر",
            sport: "التنس 67",
            price: 100,
            image: "src/assets/imgs/arena-img.png",
        },
        {
            id: 2,
            title: "الملاعب",
            location: "القاهرة،مصر",
            sport: "كرة السلة 61",
            price: 120,
            image: "src/assets/imgs/arena-img.png",
        },
        {
            id: 3,
            title: "الملاعب",
            location: "القاهرة،مصر",
            sport: "كرة القدم 56",
            price: 150,
            image: "src/assets/imgs/arena-img.png",
        },
        {
            id: 4,
            title: "الملاعب",
            location: "القاهرة،مصر",
            sport: "متعدد الرياضات",
            price: 180,
            image: "src/assets/imgs/arena-img.png",
        },
        {
            id: 5,
            title: "الملاعب",
            location: "القاهرة،مصر",
            sport: "التنس ريش",
            price: 130,
            image: "src/assets/imgs/arena-img.png",
        },
        {
            id: 6,
            title: "الملاعب",
            location: "القاهرة،مصر",
            sport: "الكرة الطائرة 57",
            price: 90,
            image: "src/assets/imgs/arena-img.png",
        },
    ];

    const handleApprove = (id) => {
        console.log("Approved arena:", id);
        // Add your approve logic here
    };

    const handleReject = (id) => {
        console.log("Rejected arena:", id);
        // Add your reject logic here
    };

    const handleViewMore = (id) => {
        console.log("View more details for arena:", id);
        // Add your view more logic here
    };

    return (
        <div dir="ltr" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-[10px] my-10 mx-10">
            {arenaRequests.map((arena) => (
                <AdminArenaCard
                    key={arena.id}
                    title={arena.title}
                    location={arena.location}
                    sport={arena.sport}
                    price={arena.price}
                    image={arena.image}
                    onApprove={() => handleApprove(arena.id)}
                    onReject={() => handleReject(arena.id)}
                    onViewMore={() => handleViewMore(arena.id)}
                />
            ))}
        </div>
    );
}
