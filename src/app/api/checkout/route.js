export async function POST(req) {
  try {
    const { formID, checkOutTime } = await req.json();
    console.log("Check-out data received:", { formID, checkOutTime });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error in checkout route:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Invalid checkout data" }),
      { status: 400 }
    );
  }
}
