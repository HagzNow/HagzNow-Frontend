import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import StaduimReviews from "./components/StaduimReviews";
import StadiumHeader from "./components/StaduimHeader";
import StadiumMap from "./components/StaduimMap";
import StadiumInfo from "./components/StaduimInfo";
import StadiumImage from "./components/StaduimImages";

const BookingArena = () => {
  const { id } = useParams();
  const [arena, setArena] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArena = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/arenas/${id}`);
        if (res.data.isSuccess) {
          setArena(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching arena:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArena();
  }, [id]);

  if (loading)
    return <p className="text-center mt-10">جاري تحميل بيانات الملعب...</p>;
  if (!arena)
    return <p className="text-center mt-10">حدث خطأ أثناء تحميل البيانات.</p>;

  return (
    <>
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="container mx-auto px-4">
          <StadiumImage images={arena.images} name={arena.name} />
          {console.log(arena.images)}
          <StadiumHeader name={arena.name} id={arena.id} status={arena.status} />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <StadiumInfo
                description={arena.description}
                policy={arena.policy}
                extras={arena.extras}
              />
            </div>
            <div className="space-y-4">
              <StadiumMap location={arena.location} />
            </div>
          </div>
          <StaduimReviews />
        </div>
      </div>
    </>
  );
};

export default BookingArena;
