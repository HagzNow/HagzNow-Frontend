const Section = ({ title, icon, color = "green", children }) => (
  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
    <div className="flex items-center gap-2 mb-4">
      <span className={`text-${color}-600`}>{icon}</span>
      <h3 className="font-semibold text-gray-700 text-lg">{title}</h3>
    </div>
    {children}
  </div>
);

export default Section;
