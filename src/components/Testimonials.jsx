import Image1 from "../assets/images/user1.jpeg";
import Image2 from "../assets/images/user2.jpeg";
import Image3 from "../assets/images/user3.jpeg";

export default function Testimonials() {
  const testimonials = [
    {
      img: Image1,
      name: "ساره علي",
      text: "الدعم ممتاز والعملية سلسة. لم أعد أجد صعوبة في حجز ملاعبي المفضلة.",
    },
    {
      img: Image2,
      name: "اسامه محمد",
      text: "واجهة رائعة ومجموعة كبيرة من الملاعب. أوصي به بشدة لكل رياضي.",
    },
    {
      img: Image3,
      name: "أحمد إبراهيم",
      text: "لقد غير ArenaBook طريقة حجزى للملاعب تمامًا! سريع وسهل وآمن.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAFAFB] ml-10 mr-10">
      <div className="container mx-auto px-4">
        {/* العنوان */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-12">
          ماذا يقول <span className="text-green-700">عملاؤنا</span> ؟
        </h2>

        {/* البطاقات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8 text-center hover:shadow-md transition h-[280px] sm:h-[300px] md:h-[320px] flex flex-col justify-center"
            >
              <img
                src={t.img}
                alt={t.name}
                className="w-16 h-16 mx-auto rounded-full mb-4 object-cover"
              />
              <p className="text-slate-700 italic mb-3 leading-relaxed">
                “{t.text}”
              </p>
              <span className="text-green-700 font-semibold text-sm">
                {t.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
