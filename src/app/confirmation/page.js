"use client";

import { useSearchParams, useRouter } from "next/navigation";
import ConfirmationScreen from "@/components/screens/ConfirmationScreen";
import sharedTranslations from "@/translations/sharedTranslations";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const language = searchParams.get("lang") || "en";

  const sharedT = sharedTranslations[language] || sharedTranslations.en;

  const handleConfirmLeave = () => {
    router.push(`/checked-out?lang=${language}`); // Redirect to CheckedOutScreen
  };

  const handleCancel = () => {
    router.push(`/form?lang=${language}`); // Redirect back to form
  };

  return (
    <ConfirmationScreen
      onConfirmLeave={handleConfirmLeave}
      onCancel={handleCancel}
      sharedT={sharedT}
    />
  );
}
