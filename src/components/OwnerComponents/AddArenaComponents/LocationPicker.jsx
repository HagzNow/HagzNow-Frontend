import { useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";

const LocationPicker = ({ setFieldValue }) => {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setFieldValue("latitude", e.latlng.lat);
      setFieldValue("longitude", e.latlng.lng);
    },
  });

  return position ? <Marker position={position}></Marker> : null;
};

export default LocationPicker;
