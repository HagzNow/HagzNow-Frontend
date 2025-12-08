const Section = ({ title, icon, color = "green", children }) => (
  <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm dark:shadow-gray-900/50 transition-colors">
    <div className="flex items-center gap-2 mb-4">
      <span className={`text-${color}-600 dark:text-${color}-400`}>{icon}</span>
      <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-lg">{title}</h3>
    </div>
    {children}
  </div>
);

export default Section;
