'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const starter: Message[] = [
  {
    role: 'assistant',
    content:
      'Halo, saya Xin AI. Tulis pertanyaan apa saja, nanti saya bantu jawab dengan cepat dan jelas.'
  }
];

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>(starter);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: 'user' as const, content: text }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || 'Gagal mendapatkan jawaban AI.');
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan.';
      setError(message);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Maaf, ada gangguan saat memproses jawaban. Coba lagi sebentar.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  function resetChat() {
    setMessages(starter);
    setError('');
    setInput('');
  }

  return (
    <main className="page-shell">
      <section className="chat-frame">
        <header className="topbar">
          <div>
            <p className="eyebrow">Xin AI</p>
            <h1>AI web responsif siap deploy</h1>
          </div>
          <button type="button" className="ghost-btn" onClick={resetChat}>
            Reset
          </button>
        </header>

        <div className="chat-list" ref={listRef}>
          {messages.map((message, index) => (
            <article key={`${message.role}-${index}`} className={`bubble-row ${message.role}`}>
              <div className={`bubble ${message.role}`}>
                <span className="badge">{message.role === 'assistant' ? 'AI' : 'Kamu'}</span>
                <p>{message.content}</p>
              </div>
            </article>
          ))}

          {loading && (
            <article className="bubble-row assistant">
              <div className="bubble assistant typing">
                <span className="badge">AI</span>
                <div className="dots">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </article>
          )}
        </div>

        <form className="composer" onSubmit={handleSubmit}>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Tulis pesan kamu di sini..."
            rows={1}
          />
          <button type="submit" disabled={loading || !input.trim()}>
            {loading ? 'Mengirim...' : 'Kirim'}
          </button>
        </form>

        {error ? <p className="error-text">{error}</p> : null}

        <footer className="footer-note">
          <span>Deploy ke GitHub lalu import ke Vercel.</span>
          <span>Isi environment variable di dashboard Vercel.</span>
        </footer>
      </section>
    </main>
  );
}
