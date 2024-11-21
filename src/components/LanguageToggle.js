"use client";

export default function LanguageToggle({ language, setLanguage }) {
  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="absolute top-4 right-4 bg-gray-200 p-2 rounded"
    >
      {language === "en" ? "中文" : "English"}
    </button>
  );
}
