"use client";

import Head from "next/head";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { DateTime } from "luxon";
import en from "../translations/en.json";
import zh from "../translations/zh.json";
import sharedTranslations from "../translations/sharedTranslations";
import { checkIn, checkOut } from "../utils/api";

import Header from "./common/Header";
import FormField from "./common/FormField";
import SubmittedScreen from "./screens/SubmittedScreen";
import CheckedOutScreen from "./screens/CheckedOutScreen";
import ConfirmationScreen from "./screens/ConfirmationScreen";
import WhiteContainer from "./common/Container";

const translations = { en, zh };

export default function VisitorForm() {
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [language, setLanguage] = useState("zh");
  const [showOtherField, setShowOtherField] = useState(false);
  const [branch, setBranch] = useState(null);

  const t = translations[language] || {};
  const sharedT = sharedTranslations[language] || {};

  useEffect(() => {
    try {
      document.documentElement.setAttribute("translate", "no");
      document.documentElement.lang = "en";

      if (typeof window !== "undefined") {
        const savedFormData = localStorage.getItem("visitorFormData");
        const isCheckedOut = localStorage.getItem("checkedOut");

        const urlParams = new URLSearchParams(window.location.search);
        const branchParam = urlParams.get("branch") || "branch1";
        setBranch(branchParam);

        if (savedFormData && isCheckedOut !== "true") {
          const parsedData = JSON.parse(savedFormData);
          setFormData(parsedData);
          setSubmitted(true);
        } else {
          localStorage.removeItem("visitorFormData");
          localStorage.removeItem("checkedOut");
        }
      }
    } catch (error) {
      console.error("Error reading localStorage data:", error);
    }
  }, []);

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

    const finalFormData = { ...formData, formID, visitTime, branch };

    try {
      await checkIn(finalFormData);
      setFormData(finalFormData);
      localStorage.setItem("visitorFormData", JSON.stringify(finalFormData));
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
      localStorage.removeItem("visitorFormData");
      localStorage.setItem("checkedOut", "true");
      setCheckedOut(true);
    } catch (error) {
      console.error("Error during check-out:", error);
      alert("Error during check-out. Please try again.");
    }
  };

  const navigateToConfirm = () => {
    setShowConfirmation(true);
  };

  const cancelConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleEndVisit = () => {
    const visitTime = new Date(formData.visitTime);
    const now = new Date();
    const diffInMinutes = Math.floor((now - visitTime) / 60000);

    if (diffInMinutes < 3) {
      navigateToConfirm();
    } else {
      handleCheckOut();
    }
  };

  if (checkedOut) {
    return <CheckedOutScreen sharedT={sharedT} />;
  }

  if (showConfirmation) {
    return (
      <ConfirmationScreen
        onConfirmLeave={handleCheckOut}
        onCancel={cancelConfirmation}
        sharedT={sharedT}
      />
    );
  }

  if (submitted) {
    return (
      <SubmittedScreen
        onSignOut={handleEndVisit}
        sharedT={sharedT}
        formData={formData}
        branch={branch} // Pass the branch to SubmittedScreen
        navigateToConfirm={navigateToConfirm}
      />
    );
  }

  return (
    <>
      <Head>
        <meta name="google" content="notranslate" />
      </Head>
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
    </>
  );
}
