"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import en from "../translations/en.json";
import zh from "../translations/zh.json";

const translations = { en, zh };

export default function VisitorForm() {
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [language, setLanguage] = useState("en");

  const t = translations[language] || {};

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formID = uuidv4();
    const visitTime = new Date().toISOString();

    const finalFormData = { ...formData, formID, visitTime };

    const response = await fetch("/api/form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalFormData),
    });

    if (response.ok) {
      setQrCodeUrl(`${window.location.origin}/checkout/${formID}`);
      setSubmitted(true);
    } else {
      alert("Error submitting the form. Please try again.");
    }
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "zh" : "en"));
  };

  if (submitted) {
    return (
      <div className="text-center h-screen flex items-center justify-center">
        <div>
          <h2 className="text-xl font-bold">
            {language === "en"
              ? "Form Submitted Successfully!"
              : "表格提交成功！"}
          </h2>
          <p>
            {language === "en"
              ? "Show this QR code at the exit."
              : "請在出口處出示此二維碼。"}
          </p>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
              qrCodeUrl
            )}&size=200x200`}
            alt="Checkout QR Code"
            className="mt-4"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {/* Header Section */}
      <div className="flex items-center justify-between w-full max-w-4xl mb-4 gap-x-2 sm:gap-x-4 md:gap-x-12">
        <h1 className="text-2xl font-bold truncate">
          {language === "en" ? "Visitor Registration" : "訪客登記表"}
        </h1>
        <button
          onClick={toggleLanguage}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-1 px-4 rounded"
        >
          {language === "en" ? "ZH" : "EN"}
        </button>
      </div>

      {/* Scrollable White Container */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[80vh] p-6 overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-base font-medium">
              {t.form?.visitorName || "Visitor's Name"}:
            </label>
            <input
              type="text"
              name="visitorName"
              required
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-base font-medium">
              {t.form?.visitorCompany || "Visitor's Company"}:
            </label>
            <input
              type="text"
              name="visitorCompany"
              required
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-base font-medium">
              {t.form?.hostName || "Host's Name"}:
            </label>
            <input
              type="text"
              name="hostName"
              required
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-base font-medium">
              {t.form?.hostDepartment || "Host's Department"}:
            </label>
            <input
              type="text"
              name="hostDepartment"
              required
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-base font-medium">
              {t.form?.hostPosition || "Host's Position"}:
            </label>
            <input
              type="text"
              name="hostPosition"
              required
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-base font-medium">
              {t.form?.visitReason || "Reason for Visit"}:
            </label>
            <div className="relative">
              <select
                name="visitReason"
                required
                onChange={handleInputChange}
                className="w-full p-2 border rounded truncate"
              >
                {Array.isArray(t.form?.visitReasonOptions)
                  ? t.form.visitReasonOptions.map((option, index) => (
                      <option key={index} value={option} className="truncate">
                        {option}
                      </option>
                    ))
                  : null}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-base font-medium">
              {t.form?.temperature || "Temperature"}:
            </label>
            <input
              type="text"
              name="temperature"
              required
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-base font-medium">
              {t.form?.specialRequirements || "Special Requirements"}:
            </label>
            <textarea
              name="specialRequirements"
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-base font-medium">
              {t.form?.irregularities || "Irregularities"}:
            </label>
            <textarea
              name="irregularities"
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded w-full"
          >
            {t.buttons?.submit || "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
