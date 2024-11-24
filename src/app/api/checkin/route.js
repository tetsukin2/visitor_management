export async function POST(req) {
  const data = await req.json();
  console.log("Check-in data received:", data);

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
