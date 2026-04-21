import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `Kamu adalah AI pintar yang menjawab dengan jelas.\n\nUser: ${message}`,
    });

    const text = response.output_text || "Tidak ada jawaban.";

    return Response.json({ text });
  } catch (error: any) {
    console.error("ERROR:", error);
    return Response.json(
      { text: "Terjadi error: " + (error?.message || "Unknown") },
      { status: 500 }
    );
  }
}
