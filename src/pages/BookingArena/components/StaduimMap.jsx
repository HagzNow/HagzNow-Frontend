export default function StadiumMap({ location }) {
  const { lat, lng, city, governorate } = location || {};
  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  return (
    <div className="bg-white rounded-md shadow p-6">
      <h2 className="text-lg font-bold text-green-700 mb-2">موقع الملعب</h2>
      <p className="text-sm text-slate-600 mb-3">
        {city}, {governorate}
      </p>
      <iframe
        src={mapSrc}
        width="100%"
        height="200"
        allowFullScreen=""
        loading="lazy"
        className="rounded-md border"
        title="Stadium Map"
      ></iframe>
    </div>
  );
}
