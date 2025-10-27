const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY;

export async function POST() {
  try {
    if (!HEYGEN_API_KEY) {
      throw new Error("API key is missing from .env");
    }

    const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL || "https://api.heygen.com";

    // 🔧 Personaliza aquí con tu avatar y Knowledge Base
    const requestBody = {
      avatar_id: "Graham_Chair_Sitting_public", // o tu avatar real
      knowledge_base_names: ["Volaris CEO"],    // importante: nombre exacto
    };

    const res = await fetch(`${baseApiUrl}/v1/streaming-avatar/token`, {
      method: "POST",
      headers: {
        "x-api-key": HEYGEN_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!res.ok) {
      throw new Error(`HeyGen API error: ${res.statusText}`);
    }

    const data = await res.json();

    return new Response(data.data.token, {
      status: 200,
    });
  } catch (error) {
    console.error("Error retrieving access token:", error);

    return new Response("Failed to retrieve access token", {
      status: 500,
    });
  }
}
