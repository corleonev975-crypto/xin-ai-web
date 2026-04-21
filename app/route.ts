import OpenAI from 'openai';
import { NextResponse } from 'next/server';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const model = process.env.OPENAI_MODEL || 'gpt-5.4-mini';
const systemPrompt =
  process.env.SYSTEM_PROMPT ||
  'Kamu adalah Xin AI, asisten AI yang cerdas, ramah, cepat, dan jelas. Gunakan bahasa Indonesia yang natural dan bantu user sebaik mungkin.';

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY belum diisi di environment variables.' },
        { status: 500 }
      );
    }

    const body = (await request.json()) as { messages?: Message[] };
    const messages = Array.isArray(body.messages) ? body.messages.slice(-12) : [];

    if (!messages.length) {
      return NextResponse.json({ error: 'Pesan kosong.' }, { status: 400 });
    }

    const input = [
      {
        role: 'system' as const,
        content: systemPrompt
      },
      ...messages.map((message) => ({
        role: message.role,
        content: message.content
      }))
    ];

    const response = await client.responses.create({
      model,
      input
    });

    const reply = response.output_text?.trim();

    if (!reply) {
      return NextResponse.json({ error: 'AI tidak mengembalikan jawaban.' }, { status: 500 });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menghubungi AI.' },
      { status: 500 }
    );
  }
}
