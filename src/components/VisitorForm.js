"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DateTime } from "luxon";
import en from "../translations/en.json";
import zh from "../translations/zh.json";
import sharedTranslations from "../translations/sharedTranslations";
import { checkIn, checkOut } from "../utils/api";

import Header from "./Header";
import FormField from "./FormField";
import SubmittedScreen from "./SubmittedScreen";
import CheckedOutScreen from "./CheckedOutScreen";
import WhiteContainer from "./common/Container";

const translations = { en, zh };

export default function VisitorForm() {
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);
  const [language, setLanguage] = useState("zh");
  const [showOtherField, setShowOtherField] = useState(false);

  const t = translations[language] || {};
  const sharedT = sharedTranslations[language] || {};

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReasonChange = (e) => {
    const value = e.target.value.trim();

    setFormData({ ...formData, visitReason: value });

    if (value.toLowerCase() === "other (specify)" || value.includes("其它")) {
      setShowOtherField(true);
    } else {
      setShowOtherField(false);
    }
  };

  const handleCheckIn = async (e) => {
    e.preventDefault();

    const formID = uuidv4();
    const visitTime = DateTime.now().setZone("Asia/Taipei").toISO();

    const finalFormData = { ...formData, formID, visitTime };

    try {
      await checkIn(finalFormData);
      console.log("Check-in data:", finalFormData);
      setFormData(finalFormData);
      setSubmitted(true);
    } catch (error) {
      console.error("Error during check-in:", error);
      alert("Error during check-in. Please try again.");
    }
  };

  const handleCheckOut = async () => {
    const checkOutTime = DateTime.now().setZone("Asia/Taipei").toISO();

    const checkoutData = { formID: formData.formID, checkOutTime };

    try {
      await checkOut(checkoutData);
      console.log("Check-out data:", checkoutData);
      setCheckedOut(true);
    } catch (error) {
      console.error("Error during check-out:", error);
      alert("Error during check-out. Please try again.");
    }
  };

  if (checkedOut) {
    return <CheckedOutScreen sharedT={sharedT} />;
  }

  if (submitted) {
    return <SubmittedScreen onSignOut={handleCheckOut} sharedT={sharedT} />;
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-4 w-11/12">
      <Header
        language={language}
        toggleLanguage={() => setLanguage(language === "en" ? "zh" : "en")}
        title={sharedT.visitorRegistration}
      />

      <WhiteContainer>
        <form onSubmit={handleCheckIn} className="space-y-4">
          <FormField
            label={t.form?.visitorName || "Visitor's Name"}
            name="visitorName"
            required
            onChange={handleInputChange}
          />
          <FormField
            label={t.form?.visitorCompany || "Visitor's Company"}
            name="visitorCompany"
            required
            onChange={handleInputChange}
          />
          <FormField
            label={t.form?.hostName || "Host's Name"}
            name="hostName"
            required
            onChange={handleInputChange}
          />
          <FormField
            label={t.form?.hostDepartment || "Host's Department"}
            name="hostDepartment"
            required
            onChange={handleInputChange}
          />
          <FormField
            label={t.form?.hostPosition || "Host's Position"}
            name="hostPosition"
            required
            onChange={handleInputChange}
          />
          <FormField
            label={t.form?.visitReason || "Reason for Visit"}
            name="visitReason"
            required
            onChange={handleReasonChange}
            options={t.form?.visitReasonOptions || []}
          />
          {showOtherField && (
            <FormField
              label={sharedT.otherSpecify}
              name="visitReasonDetail"
              required={showOtherField}
              onChange={handleInputChange}
            />
          )}
          <FormField
            label={t.form?.temperature || "Temperature"}
            name="temperature"
            required
            onChange={handleInputChange}
          />
          <FormField
            label={t.form?.specialRequirements || "Special Requirements"}
            name="specialRequirements"
            isTextarea
            onChange={handleInputChange}
          />
          <FormField
            label={t.form?.irregularities || "Irregularities"}
            name="irregularities"
            isTextarea
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded w-full"
          >
            {t.buttons?.submit || "Submit"}
          </button>
        </form>
      </WhiteContainer>
    </div>
  );
}
