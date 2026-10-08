import React from 'react';
import {
  Compass,
  Fingerprint,
  Brain,
  Sparkles,
  GraduationCap,
  Layers,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Award,
  Users,
  Lightbulb,
  UploadCloud,
  FileCheck,
  BookOpen,
  ArrowRight,
  Target,
  Sparkle,
} from 'lucide-react';

interface LandingPageProps {
  onStartAnalysis: () => void;
  onOpenLogin: () => void;
  isAdminLoggedIn: boolean;
  institutionName: string;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartAnalysis,
  onOpenLogin,
  isAdminLoggedIn,
  institutionName,
}) => {
  return (
    <div className="space-y-16 sm:space-y-24 py-4 sm:py-8">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl lg:rounded-[2.5rem] bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white p-6 sm:p-12 lg:p-16 xl:p-20 shadow-2xl border border-indigo-900/60">
        {/* Glow ambient background elements */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center lg:text-left">
          {/* Top Pill / Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm text-cyan-200 mb-6 sm:mb-8 shadow-xs">
            <Compass className="w-4 h-4 text-teal-300 animate-spin" style={{ animationDuration: '8s' }} />
            <span className="font-bold tracking-wide">ARAH &bull; Analisa Rahasia Anak Hebat</span>
          </div>

          {/* Main Slogan & Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] sm:leading-[1.12] text-white mb-6">
            Beri{' '}
            <span className="bg-gradient-to-r from-teal-300 via-indigo-200 to-cyan-300 bg-clip-text text-transparent">
              ARAH Pasti
            </span>{' '}
            untuk Masa Depannya.
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-300 mb-8 sm:mb-10 leading-relaxed max-w-3xl mx-auto lg:mx-0">
            Platform diagnostik biometrik Dermatoglyphics (DMIT) bertenaga AI Gemini untuk{' '}
            <strong className="text-teal-300">{institutionName || 'GenZi Academy'}</strong>. Memetakan potensi
            genetik, kecerdasan majemuk, dominasi belahan otak, gaya belajar VAK, serta arah studi dan karier anak
            secara ilmiah sejak dini.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              onClick={isAdminLoggedIn ? onStartAnalysis : onOpenLogin}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-teal-500 via-indigo-600 to-indigo-700 hover:from-teal-400 hover:to-indigo-600 text-white font-bold text-sm sm:text-base rounded-2xl shadow-xl shadow-teal-900/40 active:scale-95 transition-all flex items-center justify-center space-x-2.5 group cursor-pointer"
            >
              <Fingerprint className="w-5 h-5 text-teal-200 group-hover:scale-110 transition-transform" />
              <span>{isAdminLoggedIn ? 'Buka Form & Scan Sidik Jari' : 'Mulai Analisis (Login Admin)'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            {!isAdminLoggedIn ? (
              <button
                onClick={onOpenLogin}
                className="w-full sm:w-auto px-6 py-4 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm sm:text-base rounded-2xl backdrop-blur-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5 text-teal-300" />
                <span>Login Portal Konselor / Admin</span>
              </button>
            ) : (
              <div className="px-5 py-3.5 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-semibold rounded-2xl flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Terotentikasi &bull; Akses Penuh Aktif</span>
              </div>
            )}
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-xs">
            <p className="text-xl sm:text-3xl font-extrabold text-teal-300">10 Jari</p>
            <p className="text-[11px] sm:text-xs text-slate-300 mt-1 font-medium">Auto-Scan Foto Biometrik</p>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-xs">
            <p className="text-xl sm:text-3xl font-extrabold text-indigo-300">8 Kecerdasan</p>
            <p className="text-[11px] sm:text-xs text-slate-300 mt-1 font-medium">Howard Gardner Framework</p>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-xs">
            <p className="text-xl sm:text-3xl font-extrabold text-cyan-300">Gaya Belajar</p>
            <p className="text-[11px] sm:text-xs text-slate-300 mt-1 font-medium">Profil VAK Guru &amp; Siswa</p>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-xs">
            <p className="text-xl sm:text-3xl font-extrabold text-emerald-300">Cetak PDF</p>
            <p className="text-[11px] sm:text-xs text-slate-300 mt-1 font-medium">Laporan Resmi A4 Siap Print</p>
          </div>
        </div>
      </section>

      {/* CARA KERJA 4 LANGKAH (WORKFLOW) */}
      <section className="bg-white rounded-3xl lg:rounded-[2.5rem] p-6 sm:p-10 lg:p-12 border border-slate-200/80 shadow-xs">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3.5 py-1.5 rounded-lg border border-indigo-100">
            Alur Pemeriksaan Modern
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Bagaimana ARAH Menganalisis Potensi Anak?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Menggabungkan sains dermatoglyphics dan kecerdasan buatan Google Gemini Vision untuk mendeteksi pola sidik jari otomatis.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-sm shadow-indigo-200">
                1
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">Input Biodata Klien</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Masukkan identitas siswa. Sistem otomatis menghitung usia presisi (Tahun dan Bulan) dari tanggal lahir.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-semibold text-indigo-700 flex items-center">
              <span>Otomatis &amp; Real-time</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal-300 hover:bg-teal-50/20 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-sm shadow-teal-200">
                2
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">Upload Foto Sidik Jari</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Unggah atau foto sidik jari untuk tiap jari (L1-L5 &amp; R1-R5). AI secara cerdas mendeteksi pola dan ridge count.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-semibold text-teal-700 flex items-center">
              <span>AI Vision Auto-Detect</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-cyan-300 hover:bg-cyan-50/20 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-sm shadow-cyan-200">
                3
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">Analisis Psikometrik AI</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gemini API memproses korelasi neokorteks, dominasi otak, kecerdasan majemuk, dan gaya belajar VAK.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-semibold text-cyan-700 flex items-center">
              <span>Google Gemini Engine</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-sm shadow-emerald-200">
                4
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">Cetak Dokumen Resmi</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tinjau visual metrics, simpan ke database, dan cetak laporan resmi berformat PDF untuk orang tua &amp; siswa.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-semibold text-emerald-700 flex items-center">
              <span>Format A4 Siap Cetak</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5 PILAR ANALISIS ARAH */}
      <section className="bg-gradient-to-b from-slate-50 to-white rounded-3xl lg:rounded-[2.5rem] p-6 sm:p-10 lg:p-14 border border-slate-200/80 shadow-xs">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-md border border-teal-100">
            5 Pilar Diagnostik Unggulan
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Pemetaan Potensi Komprehensif Tanpa Spekulasi
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Membantu pendidik dan orang tua melihat potensi otentik anak dari sudut pandang ilmiah biometrik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-indigo-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center mb-4">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-1.5">Dominasi Belahan Otak</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mengukur persentase fungsi Otak Kiri (logika, matematika, bahasa analitis) vs Otak Kanan (kreativitas, seni,
              intuisi, gambaran global) berdasarkan perbandingan jari tangan kanan dan kiri.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-teal-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-1.5">8 Kecerdasan Majemuk</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mengurutkan secara rinci kecerdasan Logis-Matematis, Linguistik, Spasial, Kinestetik, Musikal,
              Interpersonal, Intrapersonal, dan Naturalis dari yang paling dominan hingga yang perlu stimulasi.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-cyan-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700 flex items-center justify-center mb-4">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-1.5">Gaya Belajar VAK</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Menemukan cara terbaik anak menyerap materi: Visual (gambar/grafik), Auditori (mendengar/diskusi), atau
              Kinestetik (praktik/gerak). Disertai panduan praktis untuk guru dan orang tua.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-amber-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-1.5">Kapasitas Belajar (TFRC)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Total Fingerprint Ridge Count mencerminkan kepadatan neuron korteks otak, kecepatan memproses instruksi,
              serta ketahanan mental siswa dalam belajar intensif.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mb-4">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-1.5">Arah Penjurusan SMA &amp; SMK</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rekomendasi objektif peminatan SMA (MIPA, IPS, Bahasa) atau program keahlian kejuruan SMK tanpa paksaan
              atau spekulasi.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-purple-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-1.5">Karier &amp; Jurusan Kuliah</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              3-5 Program studi perguruan tinggi yang paling selaras dengan bakat alami siswa, plus proyeksi profesi masa
              depan yang relevan di era modern.
            </p>
          </div>
        </div>
      </section>

      {/* PANDUAN POLA SIDIK JARI INTERAKTIF */}
      <section className="bg-white rounded-3xl lg:rounded-[2.5rem] p-6 sm:p-10 lg:p-12 border border-slate-200/80 shadow-xs">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-md">
            Biometrik Neokorteks
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            5 Pola Dasar Dermatoglyphics yang Dikenali AI
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Setiap lekukan garis sidik jari memiliki korelasi langsung dengan formasi syaraf otak janin sejak minggu ke-13 kehamilan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-indigo-300 transition-all">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                W
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Whorl (Pusaran/Spiral)</h4>
                <p className="text-[11px] text-indigo-600 font-medium">Target-Oriented &amp; Mandiri</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Garis konsentris melingkar dengan 2 delta. Memiliki tekad baja, fokus pada hasil akhir, kepemimpinan kuat,
              dan tidak suka diatur berlebihan.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-teal-300 transition-all">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
                UL
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Ulnar Loop (Lekukan Luar)</h4>
                <p className="text-[11px] text-teal-600 font-medium">Adaptive &amp; Kooperatif</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Garis melengkung ke arah jari kelingking. Menyerap informasi seperti spons, fleksibel, mudah berteman,
              dan sangat berorientasi pada kerja tim.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-amber-300 transition-all">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-sm">
                RL
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Radial Loop (Lekukan Dalam)</h4>
                <p className="text-[11px] text-amber-600 font-medium">Kritis &amp; Out-of-the-Box</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Garis melengkung ke arah ibu jari (sangat langka). Berpikir unik, daya cipta radikal, berani berbeda,
              dan mempertanyakan tradisi yang tidak logis.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-emerald-300 transition-all">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                A
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Arch (Busur Gelombang)</h4>
                <p className="text-[11px] text-emerald-600 font-medium">Stabil &amp; Metodis</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Garis melengkung landai tanpa delta. Belajar secara bertahap dan pasti, hati-hati, loyal, dapat diandalkan,
              dan menyukai aturan yang jelas.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-purple-300 transition-all">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
                DL
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Double Loop (Pusaran Ganda S)</h4>
                <p className="text-[11px] text-purple-600 font-medium">Diplomatis &amp; Multi-Perspektif</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dua lengkungan yang saling mengunci membentuk pola S. Mahir bernegosiasi, melihat masalah dari berbagai
              sudut pandang, dan terampil multi-tasking.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-slate-300 transition-all">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-slate-600 text-white flex items-center justify-center font-bold text-sm">
                AI
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Auto-Scan via Kamera</h4>
                <p className="text-[11px] text-slate-500 font-medium">Deteksi Otomatis Real-time</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Admin cukup mengunggah foto sidik jari siswa; algoritma AI langsung mengekstrak tipe pola dan jumlah garis
              secara instan.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION CARD */}
      <section className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-teal-600 rounded-3xl lg:rounded-[2.5rem] p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="max-w-xl text-center md:text-left">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            <span>GenZi Academy Digital Assessment</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Mulai Pengujian Sekarang dengan ARAH
          </h3>
          <p className="text-indigo-100 text-xs sm:text-sm mt-1.5 leading-relaxed">
            Dapatkan laporan komprehensif lengkap dengan grafik dominasi belahan otak, kecerdasan majemuk, dan strategi
            belajar dalam hitungan detik.
          </p>
        </div>

        <button
          onClick={isAdminLoggedIn ? onStartAnalysis : onOpenLogin}
          className="shrink-0 px-8 py-4 bg-white text-indigo-700 hover:bg-slate-50 active:scale-95 font-bold text-sm sm:text-base rounded-2xl shadow-lg transition-all flex items-center space-x-2.5 cursor-pointer"
        >
          <Fingerprint className="w-5 h-5 text-indigo-600" />
          <span>{isAdminLoggedIn ? 'Masuk ke Form Sidik Jari' : 'Login Admin untuk Menguji'}</span>
        </button>
      </section>
    </div>
  );
};
