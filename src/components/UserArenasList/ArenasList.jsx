import ArenaCard from "../ArenaCard/ArenaCard";

export default function ArenasList() {
    const arenas = [
        {
            title: "ساحة الأبطال",
            location: "جدة، حي السلامة",
            price: 120,
            rating: 4.5,
            image: "src/assets/imgs/arena-img.png",
        },
        {
            title: "نادي التنس الذهبي",
            location: "القاهرة",
            price: 100,
            rating: 4.9,
            image: "src/assets/imgs/arena-img.png",
        },
        {
            title: "ساحة الأبطال",
            location: "جدة، حي السلامة",
            price: 120,
            rating: 4.5,
            image: "src/assets/imgs/arena-img.png",
        },
        {
            title: "نادي التنس الذهبي",
            location: "القاهرة",
            price: 100,
            rating: 4.9,
            image: "src/assets/imgs/arena-img.png",
        },
        {
            title: "نادي التنس الذهبي",
            location: "القاهرة",
            price: 100,
            rating: 4.9,
            image: "src/assets/imgs/arena-img.png",
        },
        {
            title: "نادي التنس الذهبي",
            location: "القاهرة",
            price: 100,
            rating: 4.9,
            image: "src/assets/imgs/arena-img.png",
        },
        {
            title: "نادي التنس الذهبي",
            location: "القاهرة",
            price: 100,
            rating: 4.9,
            image: "src/assets/imgs/arena-img.png",
        },
        {
            title: "ساحة الأبطال",
            location: "جدة، حي السلامة",
            price: 120,
            rating: 4.5,
            image: "src/assets/imgs/arena-img.png",
        },
    ];

    return (
        <div dir="ltr" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-[5px] my-10 mx-10">
            {arenas.map((arena, index) => (
                <ArenaCard
                    key={index}
                    title={arena.title}
                    location={arena.location}
                    price={arena.price}
                    rating={arena.rating}
                    image={arena.image}
                />
            ))}
        </div>
    );
}
