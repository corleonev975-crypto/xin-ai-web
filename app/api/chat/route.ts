import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const client = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
    });

    const response = await client.chat.completions.create({
      model: "mistralai/mistral-7b-instruct:free",
      messages: [
        {
          role: "system",
          content: "Kamu adalah AI pintar yang menjawab dengan jelas.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const text =
      response.choices[0]?.message?.content || "Tidak ada jawaban.";

    return Response.json({ text });
  } catch (error: any) {
    console.error("ERROR:", error);
    return Response.json(
      { text: "Error: " + (error?.message || "Unknown") },
      { status: 500 }
    );
  }
}
