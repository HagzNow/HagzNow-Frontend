import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleReservation = () => {
    navigate(`/reservation/6bff58ed-88b7-4a31-bfbb-2a2f26ee3f47`);
  };
  return (
    <div>
      <button onClick={handleReservation}>reserv</button>
    </div>
  );
}
