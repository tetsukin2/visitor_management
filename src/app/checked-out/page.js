"use client";

import { useSearchParams } from "next/navigation";
import CheckedOutScreen from "@/components/screens/CheckedOutScreen";
import sharedTranslations from "@/translations/sharedTranslations";

export default function CheckedOutPage() {
  const searchParams = useSearchParams();
  const language = searchParams.get("lang") || "en";

  const sharedT = sharedTranslations[language] || sharedTranslations.en;

  return <CheckedOutScreen sharedT={sharedT} />;
}
