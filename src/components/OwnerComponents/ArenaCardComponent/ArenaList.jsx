import React, { useEffect, useState } from "react";
import ArenaCardPremium from "./ArenaCardPremium";
import arenasData from "../../../../public/cardtatic/arena.json";

const ArenasList = () => {
  const [arenas, setArenas] = useState([]);

  useEffect(() => {
    // هنا بعدين ممكن تجيب البيانات من API
    setArenas(arenasData);
  }, []);

  return (
    <div className="space-y-6 p-6">
      {arenas.map((arena) => (
        <ArenaCardPremium key={arena.id} arena={arena} />
      ))}
    </div>
  );
};

export default ArenasList;
