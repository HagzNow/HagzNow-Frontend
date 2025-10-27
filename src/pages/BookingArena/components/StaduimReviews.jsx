import Image1 from "../../../assets/images/user1.jpeg";
import Image2 from "../../../assets/images/user2.jpeg";
import Image3 from "../../../assets/images/user3.jpeg";
export default function StaduimReviews() {
  const reviews = [
    {
      img: Image3,
      name: "أحمد إبراهيم",
      text: "تجربة رائعة! الملعب نظيف والتنظيم ممتاز.",
      date: "2024/10/20",
      rating: 5,
    },
    {
      img: Image1,
      name: "سارة محمود",
      text: "خدمة سريعة وسهلة. أنصح الجميع بالحجز من هنا!",
      date: "2024/10/18",
      rating: 4.5,
    },
    {
      img: Image2,
      name: "محمد خالد",
      text: "الملعب ممتاز والإضاءة رائعة، أنصح بالتجربة.",
      date: "2024/10/15",
      rating: 4.8,
    },
  ];

  return (
    <div className="bg-white rounded-md shadow p-6 mt-6">
      <h2 className="text-lg font-bold text-green-700 mb-4">تقييمات المستخدمين</h2>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={r.img}
                alt={r.name}
                className="w-10 h-10 rounded-full object-cover border border-green-200"
              />
              <div>
                <h3 className="font-semibold text-green-700">{r.name}</h3>
                
              </div>
            </div>

            <p className="text-slate-700 italic mb-3">“{r.text}”</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-yellow-500">⭐ {r.rating}</span>
              <p className="text-xs text-slate-400">{r.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
