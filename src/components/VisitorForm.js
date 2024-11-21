"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import en from "../translations/en.json";
import zh from "../translations/zh.json";

const translations = { en, zh };

export default function VisitorForm({ language }) {
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState(""); // QR code link after submission
  const t = translations[language] || {};

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate the UUID and visit time
    const formID = uuidv4();
    const visitTime = new Date().toISOString(); // Automatically generate visit time

    // Include UUID and visit time in the form data
    const finalFormData = { ...formData, formID, visitTime };

    const response = await fetch("/api/form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalFormData),
    });

    if (response.ok) {
      setQrCodeUrl(`${window.location.origin}/checkout/${formID}`); // QR code for checkout
      setSubmitted(true);
    } else {
      alert("Error submitting the form. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="text-center">
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
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-8 rounded-md shadow-md max-w-lg w-full"
    >
      <h1 className="text-2xl font-bold text-center mb-6">
        {language === "en" ? "Visitor Registration Form" : "訪客登記表"}
      </h1>
      <div>
        <label className="block text-sm font-medium">
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
        <label className="block text-sm font-medium">
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
        <label className="block text-sm font-medium">
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
        <label className="block text-sm font-medium">
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
        <label className="block text-sm font-medium">
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
        <label className="block text-sm font-medium">
          {t.form?.visitReason || "Reason for Visit"}:
        </label>
        <select
          name="visitReason"
          required
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          {Array.isArray(t.form?.visitReasonOptions)
            ? t.form.visitReasonOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))
            : null}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">
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
        <label className="block text-sm font-medium">
          {t.form?.specialRequirements || "Special Requirements"}:
        </label>
        <textarea
          name="specialRequirements"
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">
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
  );
}
