export default function StadiumMap({ location }) {
  const { lat, lng, city, governorate } = location || {};
  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md shadow dark:shadow-gray-900/50 p-6 transition-colors duration-300">
      <h2 className="text-lg font-bold text-green-700 dark:text-green-400 mb-2">موقع الملعب</h2>
      <p className="text-sm text-slate-600 dark:text-gray-300 mb-3">
        {city}, {governorate}
      </p>
      <iframe
        src={mapSrc}
        width="100%"
        height="200"
        allowFullScreen=""
        loading="lazy"
        className="rounded-md border border-gray-200 dark:border-gray-700"
        title="Stadium Map"
      ></iframe>
    </div>
  );
}
