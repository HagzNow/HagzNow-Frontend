export default function StadiumHeader({ name }) {
  return (
    <div className="flex justify-between m-4 text-white text-center py-3 rounded-t-md">
      <div>
        <h1 className="text-xl text-black font-bold">{name}</h1>
        <p className="text-sm text-black opacity-90">تقييم: 4.5 ⭐⭐⭐⭐⭐</p>
      </div>
      <div>
        <button className="bg-green-700 text-white mt-2 px-4 py-1 rounded-md font-semibold transition">
          احجز الملعب
        </button>
      </div>
    </div>
  );
}
