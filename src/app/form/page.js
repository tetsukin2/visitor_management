"use client";

import { useState } from "react";
import VisitorForm from "@/components/VisitorForm";

export default function VisitorFormPage() {
  const [language, setLanguage] = useState("en"); // Default to English

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-default">
      <VisitorForm language={language} />
    </div>
  );
}
