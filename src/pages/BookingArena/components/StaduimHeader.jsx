import { useNavigate } from "react-router-dom";
export default function StadiumHeader({ name, id ,status}) {
  const navigate = useNavigate();
  function handleBookingClick() {
    console.log("esafs");

    navigate(`/reservation/${id}`);

  }
  console.log(status)
  
    const isDisabled = status !== "active";

  return (
    <div className="flex justify-between m-4 text-white text-center py-3 rounded-t-md">
      <div>
        <h1 className="text-xl text-black font-bold">{name}</h1>
        <p className="text-sm text-black opacity-90">تقييم: 4.5 ⭐⭐⭐⭐⭐</p>
      </div>
      <div>
           <button
          className={`mt-2 px-4 py-1 rounded-md font-semibold transition 
            ${isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-700 text-white cursor-pointer'}`}
          onClick={handleBookingClick}
          disabled={isDisabled}
        >
          احجز الملعب
        </button>
      </div>
    </div>
  );
}
