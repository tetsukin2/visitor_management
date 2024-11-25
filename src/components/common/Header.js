export default function Header({ language, toggleLanguage, title }) {
  return (
    <div className="flex items-center justify-between w-full mb-4 gap-x-2 sm:gap-x-4 md:gap-x-12">
      <h1 className="text-2xl font-bold truncate">{title}</h1>
      <button
        onClick={toggleLanguage}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-1 px-6 rounded"
      >
        {language === "en" ? "EN" : "中文"}
      </button>
    </div>
  );
}
