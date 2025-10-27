export default function StadiumMap() {
  return (
    <div className="bg-white rounded-md shadow p-6">
      <h2 className="text-lg font-bold text-green-700 mb-2">موقع الملعب</h2>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345094724!2d144.95373631550414!3d-37.81627974202173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577a8b5f4ef3e13!2sMelbourne%20Stadium!5e0!3m2!1sen!2sau!4v1632474972022!5m2!1sen!2sau"
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