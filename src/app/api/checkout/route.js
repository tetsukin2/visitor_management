export async function POST(req) {
  const { formID } = await req.json();
  console.log(`Checkout recorded for formID: ${formID}`);

  // Simulate updating the database
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
