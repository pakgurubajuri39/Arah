import React, { useState } from 'react';
import { Copy, Check, FolderTree, Code, Cloud, Terminal, Shield, Sparkles } from 'lucide-react';

export const NextjsDeploymentGuide: React.FC = () => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const folderStructureCode = `my-dmit-app/
├── app/
│   ├── api/
│   │   └── analyze-dmit/
│   │       └── route.ts          # API Route pemanggil Google Gemini API (@google/genai)
│   ├── dashboard/
│   │   └── page.tsx              # Dashboard Admin & Form Sidik Jari (10 Jari + TFRC)
│   ├── login/
│   │   └── page.tsx              # Halaman Login Admin (Password: "bajuri39")
│   ├── result/
│   │   └── page.tsx              # Tampilan Hasil Analisis DMIT & Cetak PDF
│   ├── layout.tsx                # Root Layout dengan Font & Metadata
│   ├── page.tsx                  # Landing Page Beranda & Pengenalan DMIT
│   └── globals.css               # Tailwind CSS & Aturan Cetak PDF (@media print)
├── components/
│   ├── Navbar.tsx                # Navigasi & Status Konselor GenZi Academy
│   ├── FingerprintInput.tsx      # Komponen Input 10 Jari (Pola & Ridge Count)
│   ├── MultipleIntelligenceChart.tsx # Visualisasi Radar & Bar 8 Kecerdasan
│   ├── VAKLearningStyle.tsx      # Profil Visual, Auditori, Kinestetik
│   └── PrintableReport.tsx       # Modul Laporan Resmi Siswa GenZi Academy
├── lib/
│   ├── firebase.ts               # Inisialisasi Firebase App & Firestore
│   ├── dmitCalculators.ts        # Kalkulasi Umur Presisi, TFRC, dan Neokorteks
│   └── types.ts                  # TypeScript Interfaces Data Klien & Sidik Jari
├── public/
│   └── patterns/                 # Ikon pola Whorl, Loop, Arch
├── .env.local                    # Environment Variables (GEMINI_API_KEY, FIREBASE)
├── next.config.mjs               # Konfigurasi Next.js
├── package.json
└── tailwind.config.ts`;

  const firebaseConfigCode = `// lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Mencegah re-inisialisasi ganda pada Next.js SSR / HMR
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };`;

  const nextApiRouteCode = `// app/api/analyze-dmit/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Inisialisasi Google GenAI SDK (Server-Side Saja)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { clientIdentity, fingerprints, calculatedMetrics, institutionName } = body;

    const systemInstruction = \`Kamu adalah Ahli Psikometrik dan Analis DMIT (Dermatoglyphics Multiple Intelligence Test). Tugasmu adalah menganalisis data identitas dan pola sidik jari klien untuk menghasilkan laporan komprehensif, rinci, dan mudah dimengerti. 
Data klien: \${JSON.stringify({ clientIdentity, fingerprints, calculatedMetrics })}

Berikan analisis terstruktur dalam format JSON yang mencakup:
1. Dominasi Belahan Otak: Persentase dan penjelasan dominasi Otak Kanan vs Otak Kiri.
2. Kecerdasan Majemuk (Multiple Intelligences): Urutkan 8 kecerdasan (Linguistik, Logis-Matematik, Spasial, Kinestetik, Musikal, Interpersonal, Intrapersonal, Naturalis) dari yang paling dominan hingga yang paling lemah berdasarkan pola. Berikan penjelasan detail kekuatannya.
3. Gaya Belajar (VAK): Persentase kecenderungan Visual, Auditori, dan Kinestetik. Berikan strategi belajar praktis untuk guru dan anak.
4. Gaya Berpikir dan Kepribadian: Karakteristik utama, cara mengambil keputusan, dan respon terhadap tekanan.
5. Kapasitas Pembelajaran: Analisa dari Total Fingerprint Ridge Count (TFRC) mengenai kecepatan otak memproses informasi.
6. Orientasi Kecerdasan: Distribusi EQ, IQ, AQ, dan CQ.
7. Rekomendasi Pendidikan & Karier:
   - Rekomendasi penjurusan SMA (IPA/IPS/Bahasa) atau SMK (sebutkan keahlian spesifiknya).
   - Rekomendasi Program Studi / Jurusan Kuliah (sebutkan 3-5 jurusan paling ideal).
   - Rekomendasi Karier/Profesi di masa depan.
Gunakan bahasa Indonesia yang profesional, memotivasi, dan mudah dipahami oleh pendidik dan orang tua.\`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: 'Lakukan analisis psikometrik DMIT lengkap untuk data di atas.',
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const parsedData = JSON.parse(response.text || '{}');
    return NextResponse.json({ success: true, data: parsedData });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Gagal memproses data dengan Gemini API' },
      { status: 500 }
    );
  }
}`;

  const vercelInstructions = `### Langkah Deploy ke Vercel:

1. **Persiapkan Git Repository:**
   \`\`\`bash
   git init
   git add .
   git commit -m "feat: initial DMIT analyzer release"
   git remote add origin https://github.com/username/dmit-analyzer.git
   git push -u origin main
   \`\`\`

2. **Buka Dashboard Vercel (vercel.com):**
   - Klik **"Add New..."** -> **"Project"**.
   - Import repositori GitHub Anda.
   - Framework Preset otomatis terdeteksi sebagai **Next.js**.

3. **Atur Environment Variables di Vercel Settings:**
   Tambahkan variabel berikut pada menu **Settings > Environment Variables**:
   - \`GEMINI_API_KEY\`: Masukkan API Key dari Google AI Studio.
   - \`NEXT_PUBLIC_FIREBASE_API_KEY\`: API Key Web Firebase Anda.
   - \`NEXT_PUBLIC_FIREBASE_PROJECT_ID\`: ID Proyek Firebase Anda.
   - \`NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN\`: domain auth firebase.

4. **Deploy:**
   - Tekan tombol **"Deploy"**.
   - Tunggu proses build selesai (~1 menit). Aplikasi DMIT siap diakses di URL publik Vercel (*.vercel.app)!`;

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-md mb-2">
          <Code className="w-4 h-4 text-amber-600" />
          <span>Panduan Arsitektur &amp; Deploy Produksi</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Struktur Next.js, Firebase, &amp; Panduan Deploy Vercel
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
          Dokumentasi lengkap kode sumber dan konfigurasi siap pakai jika Anda ingin mengekspor aplikasi ini ke repositori Next.js terpisah dan menyebarkannya ke platform Vercel.
        </p>
      </div>

      {/* 1. Struktur Folder Next.js */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FolderTree className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-base text-slate-900">1. Struktur Folder Project Next.js (App Router)</h3>
          </div>
          <button
            onClick={() => copyToClipboard(folderStructureCode, 'folder')}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition flex items-center space-x-1"
          >
            {copiedSection === 'folder' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Salin Struktur</span>
          </button>
        </div>
        <pre className="p-4 bg-slate-900 text-slate-200 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed">
          {folderStructureCode}
        </pre>
      </div>

      {/* 2. Kode Integrasi Firebase */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-teal-600" />
            <h3 className="font-bold text-base text-slate-900">2. Kode Integrasi Firebase (lib/firebase.ts)</h3>
          </div>
          <button
            onClick={() => copyToClipboard(firebaseConfigCode, 'firebase')}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition flex items-center space-x-1"
          >
            {copiedSection === 'firebase' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Salin Kode Firebase</span>
          </button>
        </div>
        <pre className="p-4 bg-slate-900 text-emerald-300 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed">
          {firebaseConfigCode}
        </pre>
      </div>

      {/* 3. Kode API Route Next.js (Gemini SDK) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-base text-slate-900">3. Kode API Route Next.js (app/api/analyze-dmit/route.ts)</h3>
          </div>
          <button
            onClick={() => copyToClipboard(nextApiRouteCode, 'api')}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition flex items-center space-x-1"
          >
            {copiedSection === 'api' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Salin API Route</span>
          </button>
        </div>
        <p className="text-xs text-slate-500">
          Menggunakan modern SDK <code>@google/genai</code> dengan model <code>gemini-3.8-flash</code> di sisi server tanpa mengekspos API Key ke peramban.
        </p>
        <pre className="p-4 bg-slate-900 text-cyan-300 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed">
          {nextApiRouteCode}
        </pre>
      </div>

      {/* 4. Instruksi Deploy ke Vercel */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cloud className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-base text-slate-900">4. Instruksi Singkat Deploy ke Vercel</h3>
          </div>
          <button
            onClick={() => copyToClipboard(vercelInstructions, 'vercel')}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition flex items-center space-x-1"
          >
            {copiedSection === 'vercel' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Salin Panduan Deploy</span>
          </button>
        </div>
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-700 space-y-4 leading-relaxed">
          <div className="flex items-start space-x-3">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
              1
            </span>
            <div>
              <strong className="text-slate-900 block text-sm">Push Code ke GitHub / GitLab:</strong>
              <p className="text-slate-600 mt-0.5">
                Pastikan folder <code>.env.local</code> masuk ke dalam <code>.gitignore</code> agar API Key rahasia tidak bocor.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
              2
            </span>
            <div>
              <strong className="text-slate-900 block text-sm">Hubungkan ke Vercel:</strong>
              <p className="text-slate-600 mt-0.5">
                Masuk ke <strong>vercel.com</strong>, pilih <strong>&quot;Add New Project&quot;</strong>, lalu import repository Anda.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
              3
            </span>
            <div>
              <strong className="text-slate-900 block text-sm">Tambahkan Environment Variables di Vercel:</strong>
              <p className="text-slate-600 mt-0.5">
                Pada bagian Environment Variables, masukkan <code>GEMINI_API_KEY</code> yang didapatkan dari Google AI Studio.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
              4
            </span>
            <div>
              <strong className="text-slate-900 block text-sm">Klik Deploy &amp; Selesai:</strong>
              <p className="text-slate-600 mt-0.5">
                Aplikasi langsung ter-deploy dalam ~60 detik dengan SSL otomatis dan CDN global Vercel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
