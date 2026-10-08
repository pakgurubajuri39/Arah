import React from 'react';
import {
  DMITAnalysisResult,
  ClientIdentity,
  FingerprintsRecord,
  CalculatedMetrics,
} from '../types/dmit';
import {
  Printer,
  Save,
  Check,
  Brain,
  Compass,
  GraduationCap,
  Briefcase,
  Target,
  Sparkles,
  School,
  Eye,
  Headphones,
  Activity,
  Layers,
  Award,
  CheckCircle2,
  Lightbulb,
  ShieldCheck,
  Zap,
  TrendingUp,
  Download,
  FileDown,
} from 'lucide-react';
import { generateA4HtmlReport } from '../utils/generateA4HtmlReport';

interface DMITReportViewProps {
  analysis: DMITAnalysisResult;
  client: ClientIdentity;
  fingerprints: FingerprintsRecord;
  metrics: CalculatedMetrics;
  institutionName: string;
  examinerName: string;
  copyrightFooter: string;
  onSaveToDatabase: () => void;
  isSaved: boolean;
  onNewAnalysis: () => void;
}

export const DMITReportView: React.FC<DMITReportViewProps> = ({
  analysis,
  client,
  fingerprints,
  metrics,
  institutionName,
  examinerName,
  copyrightFooter,
  onSaveToDatabase,
  isSaved,
  onNewAnalysis,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadHtml = () => {
    // Generate pristine, self-contained standalone A4 HTML document with zero external dependencies
    const htmlContent = generateA4HtmlReport({
      analysis,
      client,
      fingerprints,
      metrics,
      institutionName,
      examinerName,
      copyrightFooter,
    });

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Laporan_DMIT_ARAH_${(client.fullName || 'Siswa').replace(/\s+/g, '_')}_A4.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadWord = () => {
    const reportElement = document.getElementById('printable-report-document');
    if (!reportElement) return;

    const clone = reportElement.cloneNode(true) as HTMLElement;
    // Remove any pure SVG radar charts or decorative icons that might not render in Word
    const svgs = clone.querySelectorAll('svg');
    svgs.forEach((svg) => {
      // Keep simple indicators if needed or clean up
      if (svg.getAttribute('viewBox') === '0 0 200 200') {
        const replacement = document.createElement('div');
        replacement.style.cssText = 'padding: 8px; background: #f8fafc; border: 1px dashed #cbd5e1; font-size: 9pt; text-align: center; color: #64748b; margin: 8px 0;';
        replacement.innerText = '[Grafik Radar 8 Kecerdasan Majemuk - Lihat Tabel Detail di Bawah]';
        svg.parentNode?.replaceChild(replacement, svg);
      }
    });

    const docContent = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>Laporan Hasil Analisis ARAH DMIT - ${client.fullName || 'Siswa'}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    body { font-family: 'Calibri', 'Segoe UI', Arial, sans-serif; font-size: 11pt; color: #0f172a; line-height: 1.5; margin: 20mm; }
    h1 { font-size: 18pt; font-weight: bold; color: #1e1b4b; text-align: center; margin: 6pt 0; text-transform: uppercase; }
    h2 { font-size: 13pt; font-weight: bold; color: #312e81; border-bottom: 2pt solid #6366f1; padding-bottom: 4pt; margin-top: 16pt; margin-bottom: 8pt; }
    h3 { font-size: 11pt; font-weight: bold; color: #1e293b; margin-top: 10pt; margin-bottom: 4pt; }
    p { margin: 4pt 0; font-size: 10.5pt; text-align: justify; }
    table { width: 100%; border-collapse: collapse; margin: 10pt 0; }
    th { background-color: #f1f5f9; border: 1pt solid #cbd5e1; padding: 6pt 8pt; font-weight: bold; text-align: left; }
    td { border: 1pt solid #cbd5e1; padding: 6pt 8pt; font-size: 10pt; vertical-align: top; }
    .box { background-color: #f8fafc; padding: 10pt 12pt; border-left: 4pt solid #4f46e5; margin: 10pt 0; border-radius: 4pt; }
    ul, ol { margin: 4pt 0 8pt 20pt; padding: 0; }
    li { margin-bottom: 3pt; }
  </style>
</head>
<body>
  ${clone.innerHTML}
</body>
</html>`;

    const blob = new Blob(['\ufeff', docContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Laporan_DMIT_ARAH_${(client.fullName || 'Siswa').replace(/\s+/g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const brain = analysis.brainDominance || {
    leftPercentage: 50,
    rightPercentage: 50,
    summary: 'Seimbang Antara Otak Kiri & Kanan',
    detail: 'Anak memiliki keseimbangan yang baik antara pemikiran teratur-logis dan kreativitas-imajinasi.',
    sectionConclusion: 'Cara terbaik membimbing anak adalah memadukan ide-ide kreatifnya dengan rencana belajar harian yang teratur.',
  };

  const intelligences = analysis.multipleIntelligences || [];
  const intelligencesConclusion =
    analysis.multipleIntelligencesConclusion ||
    `Dua kecerdasan teratas (${intelligences[0]?.name || 'Logika & Hitungan'} dan ${intelligences[1]?.name || 'Gambar & Ruang'}) adalah bakat alami terkuat anak. Kembangkan dua bidang ini lewat pilihan pelajaran, hobi, dan ekstrakurikuler agar anak makin percaya diri dan berprestasi.`;

  const vak = analysis.learningStyleVAK || {
    visual: 35,
    auditory: 35,
    kinesthetic: 30,
    dominantStyle: 'Visual (Mata)',
    explanation: 'Anak paling cepat dan mudah memahami pelajaran lewat gambar, bagan warna, dan melihat contoh secara langsung.',
    teacherStrategies: ['Jelaskan materi dengan bahasa sederhana disertai gambar atau bagan alur yang jelas.'],
    studentStrategies: ['Buat catatan ringkas dengan stabilo warna-warni agar mata langsung fokus pada poin penting.'],
    sectionConclusion: 'Materi pelajaran yang disajikan dengan media visual dan gambar akan membuat anak jauh lebih cepat paham dan ingatannya tahan lama.',
  };

  const quotients = analysis.quotientOrientation || {
    iq: 28,
    eq: 26,
    aq: 24,
    cq: 22,
    explanation: 'Potensi kecerdasan anak terbagi seimbang antara IQ (nalar & logika), EQ (rasa & empati), AQ (daya tahan mental saat menghadapi kesulitan), dan CQ (kreativitas ide baru).',
  };

  const personality = analysis.personalityAndThinking || {
    primaryType: 'Tipe Pemikir Rapi & Terencana (Suka Keteraturan)',
    coreCharacteristics: ['Fokus pada tujuan', 'Mandiri', 'Teratur dan rapi', 'Suka hasil yang jelas'],
    decisionMakingStyle: 'Mengambil keputusan dengan tenang, melihat fakta yang ada, dan memikirkan akibatnya secara matang.',
    stressResponse: 'Bila tugas terasa menumpuk atau lelah, anak butuh waktu jeda santai sejenak, lalu dibantu memilah tugas mana yang perlu diselesaikan satu per satu.',
    communicationStyle: 'Suka diajak bicara secara jujur, ramah, tidak digurui, dan diberi ruang untuk menyampaikan pendapatnya.',
    sectionConclusion: 'Kunci utama membangkitkan semangat anak adalah komunikasi yang hangat, pujian atas usahanya (bukan hanya hasil akhir), dan arahan yang jelas.',
  };

  const tfrc = analysis.learningCapacityTFRC || {
    tfrcValue: metrics.tfrc,
    speedRating: metrics.tfrc > 140 ? 'Cepat & Lincah Adaptif' : 'Mantap & Stabil',
    analysis: `Nilai TFRC (${metrics.tfrc} garis) menggambarkan daya tampung memori dan kecepatan otak anak dalam menyerap pelajaran baru. Anak memiliki kapasitas otak yang sangat baik untuk belajar berbagai materi sekolah.`,
    capacityCategory: 'Tinggi',
    sectionConclusion: `Dengan daya tangkap otak sebesar ${metrics.tfrc} garis, anak cukup belajar rutin 30–45 menit setiap hari dengan suasana nyaman untuk mencapai hasil maksimal.`,
  };

  const recs = analysis.educationalCareerRecommendations || {
    highSchoolRecommendation: {
      recommendedTrack: 'SMA Jurusan MIPA / Sains Terapan',
      smkSpecializations: ['Rekayasa Perangkat Lunak', 'Teknik Desain Pemodelan', 'Mekatronika'],
      academicReasoning: 'Bakat alami anak sangat cocok untuk bidang yang melatih daya nalar, logika teratur, dan pemecahan masalah praktis.',
    },
    universityMajors: ['Teknik Informatika / Ilmu Komputer', 'Data Science & AI', 'Arsitektur & Desain Perencanaan', 'Teknik Biomedis'],
    careerProfessions: ['Ahli Software & AI', 'Data Scientist / Analis Data', 'Desainer Produk Digital / Arsitek', 'Peneliti R&D'],
    developmentAdvice: 'Beri anak ruang berkarya, dukung hobi yang melatih kreativitas, dan dampingi dengan komunikasi santai di rumah.',
    sectionConclusion: 'Pilihan jalur akademik di bidang sains, teknologi, dan nalar terapan memberikan tingkat kepuasan belajar dan prestasi tertinggi bagi anak.',
  };

  const executiveSummary = analysis.overallExecutiveSummary || {
    coreIdentity: `Anak memiliki bakat alami istimewa pada ${intelligences[0]?.name || 'Logika & Hitungan'}, didukung cara berpikir yang teratur dan gaya belajar yang mengandalkan ${vak.dominantStyle}. Pada dasarnya, anak adalah sosok yang cerdas, punya rasa ingin tahu tinggi, dan ingin memberikan hasil terbaik bila diarahkan dengan tepat.`,
    winningFormula: `Gunakan cara belajar berbasis ${vak.dominantStyle}, berikan arahan tugas yang jelas tanpa terlalu banyak tekanan, fokuskan pada minat anak, serta berikan apresiasi yang tulus setiap kali ia berusaha keras.`,
    parentTeacherActionPlan: [
      `Dampingi anak belajar dengan cara yang ia sukai (${vak.dominantStyle}), misalnya menggunakan gambar warna atau mengajak diskusi santai.`,
      `Dukung minat dan bakat anak pada ${intelligences[0]?.name || 'Logika & Hitungan'} dengan memberinya buku menarik atau kegiatan yang seru.`,
      `Atur jadwal istirahat yang cukup di sela-sela belajar (setiap 25–30 menit belajar fokus, beri jeda santai 5 menit) agar otak tidak cepat lelah.`,
      `Ketika nilai atau hasil tugasnya belum sempurna, beri semangat dan bantu cari letak kesalahannya bersama-sama tanpa membanding-bandingkannya.`,
      `Arahkan pemilihan jurusan sekolah (SMA/SMK) dan cita-cita masa depan sesuai rekomendasi bakat alaminya agar belajarnya selalu menyenangkan.`,
    ],
    counselorNote: `Setiap anak terlahir dengan benih kehebatan masing-masing. Bakat bawaan ini adalah kompas penunjuk jalan. Dengan kasih sayang orang tua dan bimbingan guru yang tepat, anak pasti akan tumbuh menjadi pribadi yang mandiri, percaya diri, dan berprestasi gemilang.`,
  };

  const resolvedInstitution = institutionName || 'GenZi Academy';
  const resolvedFooter = copyrightFooter || 'GenZi Academy by. Pak GuruAI';

  // Helper for Radar Polygon points (8 Intelligences)
  const radarPoints = intelligences.slice(0, 8).map((item, idx) => {
    const angle = (idx * (360 / 8) - 90) * (Math.PI / 180);
    const radius = ((item.score || 50) / 100) * 80;
    const x = 100 + radius * Math.cos(angle);
    const y = 100 + radius * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto py-2 sm:py-6">
      {/* Top Action Bar (Screen Only - Hidden during Print) */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs sm:text-sm font-bold text-slate-800">
            Hasil Analisis ARAH: <span className="text-indigo-600">{client.fullName}</span>
          </span>
          <span className="text-[11px] font-semibold text-slate-400 hidden sm:inline">&bull; GenZi Academy</span>
        </div>

        <div className="flex flex-wrap items-center space-x-2 sm:space-x-2.5 w-full sm:w-auto justify-end gap-y-2">
          <button
            onClick={onNewAnalysis}
            className="px-3 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition cursor-pointer"
          >
            Input Klien Baru
          </button>

          <button
            onClick={onSaveToDatabase}
            disabled={isSaved}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl shadow-xs transition flex items-center space-x-1.5 cursor-pointer ${
              isSaved
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {isSaved ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tersimpan</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Simpan</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadHtml}
            title="Unduh laporan mandiri dalam format berkas web (.html) siap cetak kertas A4 yang bersih dan rapi"
            className="px-3.5 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl shadow-xs transition flex items-center space-x-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-indigo-600" />
            <span>Unduh HTML (Format A4)</span>
          </button>

          <button
            onClick={handleDownloadWord}
            title="Unduh laporan dalam format Microsoft Word (.doc) rapi"
            className="px-3.5 py-2 text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl shadow-xs transition flex items-center space-x-1.5 cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5 text-teal-600" />
            <span>Unduh Word</span>
          </button>

          <button
            onClick={handlePrint}
            title="Cetak langsung ke kertas A4 atau pilih 'Save as PDF' di jendela peramban"
            className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition flex items-center space-x-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak / Simpan PDF (A4)</span>
          </button>
        </div>
      </div>

      {/* Helper Notification for PDF & Download (Screen Only) */}
      <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-2xl p-3 px-4 text-xs text-indigo-950 flex items-center justify-between print:hidden shadow-2xs">
        <div className="flex items-center space-x-2.5">
          <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>
            <strong>Format Laporan Kertas A4 Bersih &amp; Rapi:</strong> Klik tombol <strong>Cetak / Simpan PDF (A4)</strong> lalu pilih opsi tujuan <em>&quot;Save as PDF&quot;</em> pada peramban untuk hasil cetak A4 presisi, atau klik <strong>Unduh HTML (Format A4)</strong> untuk berkas mandiri bebas internet yang siap dicetak kapan saja.
          </span>
        </div>
      </div>

      {/* PRINTABLE REPORT DOCUMENT CONTAINER */}
      <div
        id="printable-report-document"
        className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200 shadow-xl print:border-none print:shadow-none print:p-0 print:m-0 space-y-9"
      >
        {/* DOCUMENT OFFICIAL HEADER */}
        <div className="border-b-2 border-slate-900 pb-6 text-center space-y-1">
          <div className="flex items-center justify-center space-x-2 text-xs font-black uppercase tracking-widest text-indigo-700">
            <School className="w-4 h-4 text-indigo-600" />
            <span>{resolvedInstitution}</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight uppercase">
            ARAH (ANALISA RAHASIA ANAK HEBAT)
          </h1>
          <p className="text-xs sm:text-sm text-indigo-600 font-bold italic tracking-wide">
            &ldquo;Beri ARAH Pasti untuk Masa Depannya.&rdquo;
          </p>
          <p className="text-[11px] sm:text-xs text-slate-500 uppercase tracking-wider font-semibold pt-1">
            Modul Materi Pembelajaran &amp; Laporan Hasil Asesmen Dermatoglyphics (DMIT)
          </p>
        </div>

        {/* BIO & METADATA BAR */}
        <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div>
              <span className="text-slate-400 block font-medium">Nama Siswa / Klien:</span>
              <strong className="text-slate-900 text-sm block mt-0.5">{client.fullName || '-'}</strong>
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Tempat, Tanggal Lahir:</span>
              <span className="text-slate-800 font-semibold block mt-0.5">
                {client.birthPlace || 'Depok'}, {client.birthDate || '-'}
              </span>
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Usia Saat Asesmen:</span>
              <span className="text-indigo-700 font-bold block mt-0.5">
                {client.ageYears} Tahun {client.ageMonths} Bulan
              </span>
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Jenis Kelamin / Kelas:</span>
              <span className="text-slate-800 font-semibold block mt-0.5">
                {client.gender} &bull; {client.schoolOrClass || '-'}
              </span>
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Total Ridge Count (TFRC):</span>
              <span className="text-emerald-700 font-bold block mt-0.5">
                {metrics.tfrc} Garis ({tfrc.speedRating || 'Normal'})
              </span>
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Pemeriksa / Konselor:</span>
              <span className="text-slate-800 font-semibold block mt-0.5">Konselor GenZi Academy</span>
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Tanggal Pengujian:</span>
              <span className="text-slate-800 font-semibold block mt-0.5">
                {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Status Sidik Jari:</span>
              <span className="text-slate-800 font-semibold block mt-0.5">
                {metrics.missingCount > 0 ? `${metrics.missingCount} Missing (Dinormalisasi)` : '10 Jari Lengkap'}
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 1: DOMINASI BELAHAN OTAK */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
            <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
              A
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Cara Berpikir Alami: Belahan Otak Kiri vs Belahan Otak Kanan
              </h2>
              <p className="text-[11px] text-slate-500">
                Memahami bagaimana cara anak memproses informasi, belajar, dan mengambil keputusan sehari-hari.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200 space-y-4">
            {/* Visual Dual-Bar & Hemisphere Graphic */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-indigo-700 flex items-center">
                  <Brain className="w-4 h-4 mr-1 text-indigo-600" />
                  Belahan Otak Kiri: {brain.leftPercentage}%
                </span>
                <span className="text-teal-700 flex items-center">
                  Belahan Otak Kanan: {brain.rightPercentage}%
                  <Brain className="w-4 h-4 ml-1 text-teal-600" />
                </span>
              </div>

              <div className="h-5 w-full bg-slate-200 rounded-full overflow-hidden flex shadow-inner">
                <div
                  className="bg-indigo-600 h-full transition-all duration-700 flex items-center justify-center text-[10px] text-white font-bold"
                  style={{ width: `${brain.leftPercentage}%` }}
                >
                  {brain.leftPercentage >= 15 ? `${brain.leftPercentage}% Kiri` : ''}
                </div>
                <div
                  className="bg-teal-500 h-full transition-all duration-700 flex items-center justify-center text-[10px] text-white font-bold"
                  style={{ width: `${brain.rightPercentage}%` }}
                >
                  {brain.rightPercentage >= 15 ? `${brain.rightPercentage}% Kanan` : ''}
                </div>
              </div>
            </div>

            {/* In-depth Narration Grid & Graphic Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <strong className="text-indigo-800 text-sm block">1. Belahan Otak Kiri ({brain.leftPercentage}%):</strong>
                    <span className="text-[10px] text-slate-400 font-medium">Ahli Logika, Keteraturan &amp; Fakta</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold text-[10px]">
                    {brain.leftPercentage >= brain.rightPercentage ? 'Dominan' : 'Pendukung'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-semibold text-slate-700">Berpikir Runtut</span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-semibold text-slate-700">Suka Angka &amp; Fakta</span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-semibold text-slate-700">Teratur &amp; Rapi</span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-semibold text-slate-700">Langkah demi Langkah</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Belahan kiri mengatur cara berpikir yang runtut, teratur, dan analitis. Anak cenderung menyukai aturan yang jelas, penjelasan langkah-demi-langkah, bukti nyata, dan mencari alasan yang masuk akal sebelum bertindak.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <strong className="text-teal-800 text-sm block">2. Belahan Otak Kanan ({brain.rightPercentage}%):</strong>
                    <span className="text-[10px] text-slate-400 font-medium">Ahli Kreativitas, Ide Segar &amp; Seni</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 font-bold text-[10px]">
                    {brain.rightPercentage > brain.leftPercentage ? 'Dominan' : 'Pendukung'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-semibold text-slate-700">Kaya Ide Baru</span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-semibold text-slate-700">Imajinasi Tinggi</span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-semibold text-slate-700">Kepekaan Seni &amp; Gambar</span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-semibold text-slate-700">Melihat Gambaran Luas</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Belahan kanan mengatur daya cipta ide baru, kepekaan seni, dan imajinasi. Anak sangat cepat melihat gambaran besar, menemukan solusi kreatif di luar kebiasaan, peka terhadap suasana sekitar, dan suka kebebasan berekspresi.
                </p>
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-indigo-100 text-xs text-slate-700 leading-relaxed">
              <strong className="text-indigo-900 block mb-1">Penjelasan Sederhana untuk Orang Tua &amp; Guru:</strong>
              {brain.detail || brain.summary}
            </div>

            {/* Kotak Kesimpulan Bagian 1 */}
            <div className="p-4 bg-indigo-50/80 border-l-4 border-indigo-600 rounded-r-xl text-xs text-indigo-950">
              <span className="font-extrabold uppercase tracking-wider block mb-1 flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-indigo-600" />
                Kesimpulan Bagian A: Cara Berpikir Alami Anak
              </span>
              <p className="leading-relaxed">
                {brain.sectionConclusion ||
                  `Cara terbaik membimbing anak adalah memadukan ide-ide kreatifnya (${brain.rightPercentage}%) dengan rencana belajar harian yang teratur dan bertahap (${brain.leftPercentage}%).`}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: KECERDASAN MAJEMUK (MULTIPLE INTELLIGENCES) */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
            <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
              B
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Pemetaan 8 Bakat Kecerdasan Alami Anak (Howard Gardner)
              </h2>
              <p className="text-[11px] text-slate-500">
                Setiap anak terlahir unik dan hebat! Berikut urutan bakat alami anak dari yang paling menonjol hingga yang perlu dilatih bertahap:
              </p>
            </div>
          </div>

          {/* Visual: Radar/Polygon Distribution Chart + Summary Metrics */}
          <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              {/* SVG Radar Chart Graphic */}
              <div className="lg:col-span-1 flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Grafik Sebaran Bakat Anak
                </span>
                <svg className="w-48 h-48 sm:w-52 sm:h-52" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="100" cy="100" r="55" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="100" cy="100" r="30" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <line
                      key={i}
                      x1="100"
                      y1="100"
                      x2={100 + 80 * Math.cos((angle - 90) * (Math.PI / 180))}
                      y2={100 + 80 * Math.sin((angle - 90) * (Math.PI / 180))}
                      stroke="#cbd5e1"
                      strokeWidth="1"
                    />
                  ))}
                  <polygon
                    points={radarPoints}
                    fill="rgba(79, 70, 229, 0.25)"
                    stroke="#4338ca"
                    strokeWidth="2.5"
                  />
                  <circle cx="100" cy="100" r="3" fill="#4338ca" />
                </svg>
                <span className="text-[10px] text-slate-400 mt-1">Semakin lebar bidang grafik, semakin kuat bakat alaminya</span>
              </div>

              {/* Ranked Highlights */}
              <div className="lg:col-span-2 space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {intelligences.slice(0, 4).map((intel, idx) => (
                    <div
                      key={intel.id || idx}
                      className="p-3 bg-white rounded-xl border border-indigo-100 flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                          #{idx + 1}
                        </span>
                        <div>
                          <strong className="text-xs text-slate-900 block truncate max-w-[140px] sm:max-w-[170px]">
                            {intel.name}
                          </strong>
                          <span className="text-[10px] text-indigo-600 font-semibold">{intel.strengthLevel}</span>
                        </div>
                      </div>
                      <span className="text-sm font-black text-indigo-700">{intel.score}%</span>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
                  <p>
                    Dua bakat alami paling menonjol pada anak adalah <strong>{intelligences[0]?.name}</strong> ({intelligences[0]?.score}%)
                    dan <strong>{intelligences[1]?.name}</strong> ({intelligences[1]?.score}%). Ini adalah pintu gerbang emas anak untuk meraih prestasi terbaik dengan rasa senang dan penuh percaya diri.
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed Cards for all 8 Intelligences with Progress Meters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-5">
              {intelligences.map((intel, idx) => (
                <div
                  key={intel.id || idx}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    idx < 2
                      ? 'bg-indigo-50/50 border-indigo-200 shadow-2xs'
                      : idx < 4
                      ? 'bg-teal-50/40 border-teal-200'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center ${
                          idx < 2
                            ? 'bg-indigo-600 text-white'
                            : idx < 4
                            ? 'bg-teal-600 text-white'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        #{idx + 1}
                      </span>
                      <span className="font-bold text-xs text-slate-900">{intel.name}</span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        idx < 2
                          ? 'bg-indigo-100 text-indigo-800'
                          : idx < 4
                          ? 'bg-teal-100 text-teal-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {intel.strengthLevel || `${intel.score}%`}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-200 rounded-full h-2 my-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        idx < 2 ? 'bg-indigo-600' : idx < 4 ? 'bg-teal-500' : 'bg-slate-400'
                      }`}
                      style={{ width: `${Math.min(100, Math.max(10, intel.score))}%` }}
                    ></div>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-snug">{intel.explanation}</p>
                </div>
              ))}
            </div>

            {/* Kotak Kesimpulan Bagian 2 */}
            <div className="p-4 bg-teal-50/80 border-l-4 border-teal-600 rounded-r-xl text-xs text-teal-950 mt-4">
              <span className="font-extrabold uppercase tracking-wider block mb-1 flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-teal-600" />
                Kesimpulan Bagian B: 8 Bakat Alami Anak
              </span>
              <p className="leading-relaxed">{intelligencesConclusion}</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: GAYA BELAJAR VAK (VISUAL, AUDITORI, KINESTETIK) */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
            <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
              C
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Gaya Belajar Paling Nyaman (VAK: Visual, Auditori, Kinestetik)
              </h2>
              <p className="text-[11px] text-slate-500">
                Setiap anak punya &ldquo;pintu masuk&rdquo; informasi yang paling cepat. Memahami gaya belajar membuat belajar jadi menyenangkan dan bebas stres.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200 space-y-4">
            {/* Visual: 3 Modal Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`p-4 rounded-xl border text-center shadow-xs ${vak.dominantStyle.includes('Visual') ? 'bg-indigo-50/70 border-indigo-300 ring-2 ring-indigo-200' : 'bg-white border-slate-200'}`}>
                <Eye className="w-6 h-6 text-indigo-600 mx-auto mb-1" />
                <span className="text-xs font-bold text-slate-700 block">Visual (Lewat Mata)</span>
                <span className="text-2xl font-black text-indigo-700 block my-0.5">{vak.visual}%</span>
                <p className="text-[10px] text-slate-500 leading-snug">Paling cepat paham lewat gambar, bagan warna, diagram alur, video edukasi, dan tulisan berstabilo.</p>
              </div>

              <div className={`p-4 rounded-xl border text-center shadow-xs ${vak.dominantStyle.includes('Auditori') ? 'bg-teal-50/70 border-teal-300 ring-2 ring-teal-200' : 'bg-white border-slate-200'}`}>
                <Headphones className="w-6 h-6 text-teal-600 mx-auto mb-1" />
                <span className="text-xs font-bold text-slate-700 block">Auditori (Lewat Telinga)</span>
                <span className="text-2xl font-black text-teal-700 block my-0.5">{vak.auditory}%</span>
                <p className="text-[10px] text-slate-500 leading-snug">Paling cepat paham lewat mendengarkan penjelasan guru, cerita, diskusi tanya-jawab, atau membaca bersuara.</p>
              </div>

              <div className={`p-4 rounded-xl border text-center shadow-xs ${vak.dominantStyle.includes('Kinestetik') ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-200' : 'bg-white border-slate-200'}`}>
                <Activity className="w-6 h-6 text-amber-600 mx-auto mb-1" />
                <span className="text-xs font-bold text-slate-700 block">Kinestetik (Gerak &amp; Praktik)</span>
                <span className="text-2xl font-black text-amber-700 block my-0.5">{vak.kinesthetic}%</span>
                <p className="text-[10px] text-slate-500 leading-snug">Paling cepat paham lewat praktik langsung, menyentuh alat praktik, eksperimen sains, atau simulasi gerak.</p>
              </div>
            </div>

            {/* VAK Distribution Stacked Bar */}
            <div className="space-y-1">
              <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden flex shadow-inner">
                <div style={{ width: `${vak.visual}%` }} className="bg-indigo-600 h-full flex items-center justify-center text-[9px] text-white font-bold">
                  {vak.visual >= 15 ? `${vak.visual}%` : ''}
                </div>
                <div style={{ width: `${vak.auditory}%` }} className="bg-teal-500 h-full flex items-center justify-center text-[9px] text-white font-bold">
                  {vak.auditory >= 15 ? `${vak.auditory}%` : ''}
                </div>
                <div style={{ width: `${vak.kinesthetic}%` }} className="bg-amber-500 h-full flex items-center justify-center text-[9px] text-white font-bold">
                  {vak.kinesthetic >= 15 ? `${vak.kinesthetic}%` : ''}
                </div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-semibold px-1">
                <span>Visual ({vak.visual}%)</span>
                <span>Auditori ({vak.auditory}%)</span>
                <span>Kinestetik ({vak.kinesthetic}%)</span>
              </div>
            </div>

            <p className="text-xs text-slate-700 bg-white p-4 rounded-xl border border-slate-200 leading-relaxed">
              <strong>Gaya Belajar Utama Anak:</strong> Anak paling nyaman belajar dengan gaya{' '}
              <strong className="text-indigo-700">{vak.dominantStyle}</strong>. {vak.explanation}
            </p>

            {/* Strategies for Teachers & Students */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-white p-4 rounded-xl border border-indigo-100">
                <h4 className="font-bold text-indigo-900 mb-2 flex items-center">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                  Tips Mengajar di Kelas (Untuk Guru / Pendidik):
                </h4>
                <ul className="space-y-1.5 list-disc list-inside text-slate-600">
                  {vak.teacherStrategies?.map((strat, i) => (
                    <li key={i} className="leading-snug">{strat}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-4 rounded-xl border border-teal-100">
                <h4 className="font-bold text-teal-900 mb-2 flex items-center">
                  <Target className="w-3.5 h-3.5 mr-1.5 text-teal-600" />
                  Tips Belajar Menyenangkan di Rumah (Orang Tua &amp; Siswa):
                </h4>
                <ul className="space-y-1.5 list-disc list-inside text-slate-600">
                  {vak.studentStrategies?.map((strat, i) => (
                    <li key={i} className="leading-snug">{strat}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Kotak Kesimpulan Bagian 3 */}
            <div className="p-4 bg-indigo-50/80 border-l-4 border-indigo-600 rounded-r-xl text-xs text-indigo-950">
              <span className="font-extrabold uppercase tracking-wider block mb-1 flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-indigo-600" />
                Kesimpulan Bagian C: Cara Belajar Efektif
              </span>
              <p className="leading-relaxed">
                {vak.sectionConclusion ||
                  `Penyediaan sarana belajar berbasis ${vak.dominantStyle} adalah kunci utama agar anak memahami materi pelajaran dengan lebih cepat, menyenangkan, dan ingatannya tahan lama.`}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4 & 5: GAYA BERPIKIR, KEPRIBADIAN & KAPASITAS TFRC */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SECTION 4: KEPRIBADIAN & CARA BERPIKIR */}
          <section className="space-y-3 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  D
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Karakter Alami &amp; Gaya Belajar Sehari-Hari</h3>
              </div>

              <div className="text-xs space-y-3">
                <div>
                  <span className="text-slate-400 block font-medium">Tipe Karakter Utama:</span>
                  <span className="font-extrabold text-indigo-700 text-base">{personality.primaryType}</span>
                </div>

                {personality.coreCharacteristics?.length > 0 && (
                  <div>
                    <span className="text-slate-500 font-semibold block mb-1">Ciri Khas Sehari-Hari:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {personality.coreCharacteristics.map((c, i) => (
                        <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 rounded-md text-[11px] text-slate-700 font-medium shadow-2xs">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-500 font-semibold block">Cara Mengambil Keputusan:</span>
                  <p className="text-slate-600 leading-snug">{personality.decisionMakingStyle}</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-500 font-semibold block">Saat Lelah atau Menghadapi Tugas Sulit:</span>
                  <p className="text-slate-600 leading-snug">{personality.stressResponse}</p>
                </div>

                {personality.communicationStyle && (
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-500 font-semibold block">Cara Berkomunikasi yang Disukai Anak:</span>
                    <p className="text-slate-600 leading-snug">{personality.communicationStyle}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Kotak Kesimpulan Bagian 4 */}
            <div className="p-3.5 bg-white border-l-4 border-indigo-600 rounded-r-xl text-xs text-indigo-950 mt-4 shadow-2xs">
              <span className="font-bold block mb-0.5 text-indigo-900 flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-indigo-600" />
                Kesimpulan Bagian D: Pendampingan Karakter &amp; Emosi
              </span>
              <p className="leading-snug text-slate-600">
                {personality.sectionConclusion ||
                  'Anak merespons paling positif terhadap komunikasi yang hangat, menghargai usahanya, dan mencari jalan keluar bersama tanpa memarahi.'}
              </p>
            </div>
          </section>

          {/* SECTION 5: TFRC & KAPASITAS PEMBELAJARAN */}
          <section className="space-y-3 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                  E
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Daya Tangkap Otak (TFRC) &amp; Sebaran Potensi</h3>
              </div>

              <div className="text-xs space-y-3">
                <div className="flex items-baseline justify-between p-3 bg-white rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 block font-medium">Daya Tangkap Otak (TFRC):</span>
                    <span className="font-black text-teal-700 text-xl">{metrics.tfrc} Garis</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block font-medium">Kecepatan Menangkap Pelajaran:</span>
                    <span className="font-bold text-indigo-700 text-sm">{tfrc.speedRating}</span>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 leading-relaxed text-slate-600">
                  {tfrc.analysis}
                </div>

                {/* Quotients Mini Distribution Cards with Progress */}
                <div>
                  <span className="text-slate-500 font-semibold block mb-1.5">Sebaran 4 Potensi Kecerdasan Anak:</span>
                  <div className="grid grid-cols-4 gap-1.5 text-center">
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-400 block font-bold">IQ</span>
                      <span className="text-[9px] text-slate-500 block truncate">Logika</span>
                      <strong className="text-xs text-indigo-700 block my-0.5">{quotients.iq}%</strong>
                      <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                        <div className="bg-indigo-600 h-full" style={{ width: `${quotients.iq * 2.5}%` }}></div>
                      </div>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-400 block font-bold">EQ</span>
                      <span className="text-[9px] text-slate-500 block truncate">Empati</span>
                      <strong className="text-xs text-teal-700 block my-0.5">{quotients.eq}%</strong>
                      <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                        <div className="bg-teal-600 h-full" style={{ width: `${quotients.eq * 2.5}%` }}></div>
                      </div>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-400 block font-bold">AQ</span>
                      <span className="text-[9px] text-slate-500 block truncate">Tangguh</span>
                      <strong className="text-xs text-amber-700 block my-0.5">{quotients.aq}%</strong>
                      <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                        <div className="bg-amber-600 h-full" style={{ width: `${quotients.aq * 2.5}%` }}></div>
                      </div>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-400 block font-bold">CQ</span>
                      <span className="text-[9px] text-slate-500 block truncate">Kreatif</span>
                      <strong className="text-xs text-purple-700 block my-0.5">{quotients.cq}%</strong>
                      <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                        <div className="bg-purple-600 h-full" style={{ width: `${quotients.cq * 2.5}%` }}></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-snug">
                    {quotients.explanation}
                  </p>
                </div>
              </div>
            </div>

            {/* Kotak Kesimpulan Bagian 5 */}
            <div className="p-3.5 bg-white border-l-4 border-teal-600 rounded-r-xl text-xs text-teal-950 mt-4 shadow-2xs">
              <span className="font-bold block mb-0.5 text-teal-900 flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-teal-600" />
                Kesimpulan Bagian E: Kapasitas Belajar &amp; Ritme Harian
              </span>
              <p className="leading-snug text-slate-600">
                {tfrc.sectionConclusion ||
                  'Jaga kebiasaan belajar rutin harian selama 25-30 menit dengan istirahat teratur agar daya serap otak selalu segar dan tidak jenuh.'}
              </p>
            </div>
          </section>
        </div>

        {/* SECTION 6: REKOMENDASI PENDIDIKAN & KARIER */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
            <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
              F
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Rekomendasi Pilihan Sekolah, Kuliah, &amp; Cita-Cita Masa Depan
              </h2>
              <p className="text-[11px] text-slate-500">
                Panduan praktis bagi orang tua dan siswa dalam merencanakan masa depan yang sesuai dengan bakat bawaan anak.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Penjurusan SMA / SMK */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-200 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center mb-3">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-indigo-950 mb-1">1. Pilihan Sekolah (SMA / SMK)</h3>
                <p className="text-base font-extrabold text-indigo-700 mb-2">
                  {recs.highSchoolRecommendation?.recommendedTrack || 'SMA Jurusan IPA/MIPA'}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {recs.highSchoolRecommendation?.academicReasoning}
                </p>
                {(recs.highSchoolRecommendation?.smkSpecializations?.length ?? 0) > 0 && (
                  <div className="text-[11px] text-slate-500">
                    <span className="font-bold text-slate-700 block">Pilihan Kejuruan (SMK) yang Cocok:</span>
                    <ul className="list-disc list-inside mt-1">
                      {recs.highSchoolRecommendation?.smkSpecializations?.map((spec, i) => (
                        <li key={i}>{spec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Jurusan Kuliah */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-50 to-white border border-teal-200 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center mb-3">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-teal-950 mb-1">2. Pilihan Jurusan Kuliah yang Pas</h3>
                <p className="text-xs text-slate-500 mb-3">Jurusan perguruan tinggi yang paling cocok dengan bakat alaminya:</p>
                <ul className="space-y-1.5 text-xs text-slate-800 font-bold">
                  {recs.universityMajors?.map((major, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-teal-600 mr-1.5 font-bold">&bull;</span>
                      <span>{major}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Karier Masa Depan */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center mb-3">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 mb-1">3. Peluang Karier Masa Depan</h3>
                <p className="text-xs text-slate-500 mb-3">Bidang profesi yang berpeluang sukses besar:</p>
                <div className="flex flex-wrap gap-1.5">
                  {recs.careerProfessions?.map((prof, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 shadow-2xs"
                    >
                      {prof}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Kotak Kesimpulan Bagian 6 */}
          <div className="p-4 bg-indigo-50/80 border-l-4 border-indigo-600 rounded-r-xl text-xs text-indigo-950">
            <span className="font-extrabold uppercase tracking-wider block mb-1 flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-indigo-600" />
              Kesimpulan Bagian F: Arah Masa Depan yang Pasti
            </span>
            <p className="leading-relaxed">
              {recs.sectionConclusion ||
                `Rekomendasi penjurusan ${recs.highSchoolRecommendation?.recommendedTrack} memberikan keselarasan sempurna antara bakat alami anak dan cita-cita masa depannya.`}
            </p>
          </div>
        </section>

        {/* SECTION 7: KESIMPULAN UMUM & REKOMENDASI PENDAMPINGAN HOLISTIK (EXECUTIVE SUMMARY) */}
        <section className="space-y-4 pt-4 border-t-2 border-slate-200">
          <div className="flex items-center space-x-2 pb-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-700 to-teal-600 text-white flex items-center justify-center font-black text-sm shadow-sm">
              ★
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                KESIMPULAN UMUM &amp; PANDUAN PENDAMPINGAN ANAK HEBAT
              </h2>
              <p className="text-xs text-slate-500">
                Rangkuman lengkap dan rencana langkah nyata untuk mendampingi masa depan anak tercinta.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-xl executive-summary-print print-avoid-break">
            {/* 1. Core Identity */}
            <div className="space-y-1.5 border-b border-white/10 pb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-300 flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                1. Siapakah Sosok Anak Anda Sebenarnya? (Profil Inti Anak)
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {executiveSummary.coreIdentity}
              </p>
            </div>

            {/* 2. Winning Formula */}
            <div className="space-y-1.5 border-b border-white/10 pb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 flex items-center">
                <Zap className="w-3.5 h-3.5 mr-1" />
                2. Resep Rahasia Sukses Belajar Anak (Winning Formula)
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {executiveSummary.winningFormula}
              </p>
            </div>

            {/* 3. Action Plan */}
            <div className="space-y-2 border-b border-white/10 pb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center">
                <Target className="w-3.5 h-3.5 mr-1" />
                3. Rencana Aksi Nyata 5 Langkah untuk Orang Tua &amp; Guru
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                {executiveSummary.parentTeacherActionPlan?.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="w-5 h-5 rounded-md bg-white/10 text-teal-300 font-bold text-xs flex items-center justify-center shrink-0 mr-2 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Counselor Note */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 flex items-center">
                <Lightbulb className="w-3.5 h-3.5 mr-1" />
                4. Catatan Kasih Sayang &amp; Motivasi dari Konselor
              </span>
              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                &ldquo;{executiveSummary.counselorNote}&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* OFFICIAL SIGNATURE AND VALIDATION STAMP */}
        <div className="pt-8 border-t-2 border-slate-200 grid grid-cols-2 gap-8 text-xs text-center print-avoid-break">
          <div>
            <p className="text-slate-400">Mengetahui,</p>
            <p className="font-bold text-slate-800 mt-0.5">Orang Tua / Wali Siswa</p>
            <div className="h-20 flex items-end justify-center">
              <span className="border-b border-slate-400 w-48 block"></span>
            </div>
            <p className="text-slate-500 text-[11px] mt-1">( Tanda Tangan &amp; Nama Terang )</p>
          </div>

          <div>
            <p className="text-slate-500 font-medium">Diverifikasi &amp; Ditetapkan di Depok,</p>
            <p className="font-extrabold text-slate-900 mt-0.5">Konselor GenZi Academy</p>
            <div className="h-20 flex items-end justify-center">
              <div className="border-b border-slate-400 w-48 text-center pb-1">
                <span className="text-[10px] text-indigo-600 font-bold block uppercase">
                  {resolvedInstitution}
                </span>
              </div>
            </div>
            <p className="text-slate-500 text-[11px] mt-1">NIP / Sertifikasi: ARAH-DMIT-DEPOK-2026</p>
          </div>
        </div>

        {/* OFFICIAL MANDATORY FOOTER */}
        <div className="pt-6 border-t border-slate-100 text-center">
          <p className="text-xs font-bold text-slate-500 tracking-wider">
            {resolvedFooter}
          </p>
        </div>
      </div>
    </div>
  );
};
