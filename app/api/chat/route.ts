import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.4-mini",
      input: [
        {
          role: "system",
          content: process.env.SYSTEM_PROMPT || "Kamu adalah AI pintar dan ramah",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const text = response.output_text || "Tidak ada jawaban";

    return Response.json({ text });
  } catch (error: any) {
    console.error("ERROR:", error);
    return Response.json(
      { text: "ERROR: " + (error?.message || "Unknown error") },
      { status: 500 }
    );
  }
}
