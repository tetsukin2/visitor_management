"use client";

export default function CheckoutPage({ params }) {
  const { id: formID } = params;

  const handleCheckout = async () => {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formID }),
    });

    if (response.ok) {
      alert("Checkout recorded successfully!");
    } else {
      alert("Error during checkout!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <button
        onClick={handleCheckout}
        className="bg-green-600 text-white py-2 px-4 rounded mt-4"
      >
        Confirm Checkout
      </button>
    </div>
  );
}
