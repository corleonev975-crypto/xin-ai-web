# Xin AI Web

Web chat AI bergaya modern, responsif di HP, dan siap di-push ke GitHub lalu deploy ke Vercel.

## Fitur
- UI chat mirip aplikasi AI modern
- Mobile-friendly
- Pakai OpenAI Responses API lewat server route Next.js
- Siap deploy ke Vercel

## Jalanin lokal
```bash
npm install
cp .env.example .env.local
npm run dev
```

Lalu buka `http://localhost:3000`

## Isi environment variable
Buat file `.env.local` saat lokal:
```env
OPENAI_API_KEY=sk-isi_api_key_kamu
OPENAI_MODEL=gpt-5.4-mini
SYSTEM_PROMPT=Kamu adalah Xin AI, asisten AI yang cerdas, ramah, cepat, dan jelas. Gunakan bahasa Indonesia yang natural dan bantu user sebaik mungkin.
```

## Push ke GitHub dari HP
1. Upload isi project ini ke repository GitHub baru.
2. Pastikan file `.env.local` atau `.env` **jangan ikut di-upload**.
3. Yang di-upload cukup file projectnya saja.

## Deploy ke Vercel
1. Login ke Vercel.
2. Import repository GitHub kamu.
3. Saat project sudah masuk, buka **Settings → Environment Variables**.
4. Tambahkan:
   - `OPENAI_API_KEY`
   - `OPENAI_MODEL` = `gpt-5.4-mini`
   - `SYSTEM_PROMPT` = prompt AI kamu
5. Redeploy project.

## Struktur
- `app/page.tsx` → tampilan chat
- `app/api/chat/route.ts` → koneksi ke OpenAI
- `app/globals.css` → desain responsif

## Catatan
Kalau mau gaya AI lebih mirip keinginan kamu, ubah isi `SYSTEM_PROMPT` di environment variable.
