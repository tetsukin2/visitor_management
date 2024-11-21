export async function POST(req) {
  const formData = await req.json();
  console.log("Form Data Received:", formData);

  // Simulate saving to a database
  // db.save(formData);

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
