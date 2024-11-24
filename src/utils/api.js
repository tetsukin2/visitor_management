import { DateTime } from "luxon";

/**
 * Handles the check-in API call.
 * @param {Object} formData - The form data to send.
 * @returns {Promise<Object>} - The response data.
 */
export async function checkIn(formData) {
  const visitTime = DateTime.now().setZone("Asia/Taipei").toISO();
  const finalFormData = { ...formData, visitTime };

  try {
    const response = await fetch("/api/checkin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalFormData),
    });

    if (!response.ok) {
      throw new Error("Error during check-in.");
    }

    console.log("Check-in data sent:", finalFormData);
    return finalFormData;
  } catch (error) {
    console.error("Check-in failed:", error);
    throw error;
  }
}

/**
 * Handles the check-out API call.
 * @param {string} formID - The form ID of the visitor.
 * @returns {Promise<Object>} - The response data.
 */
export async function checkOut(formID) {
  const checkOutTime = DateTime.now().setZone("Asia/Taipei").toISO();

  const checkoutData = {
    formID: typeof formID === "string" ? formID : formID.formID,
    checkOutTime,
  };

  try {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(checkoutData),
    });

    if (!response.ok) {
      throw new Error("Error during check-out.");
    }

    console.log("Check-out data sent:", checkoutData);
    return checkoutData;
  } catch (error) {
    console.error("Check-out failed:", error);
    throw error;
  }
}
