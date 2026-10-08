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
    const reportElement = document.getElementById('printable-report-document');
    if (!reportElement) return;

    const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Laporan Hasil Analisis ARAH DMIT - ${client.fullName || 'Siswa'}</title>
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <style>
    @media print {
      * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      body { background-color: #ffffff !important; font-size: 11pt !important; }
      section { page-break-inside: avoid; break-inside: avoid; }
      @page { size: A4 portrait; margin: 1.2cm; }
    }
  </style>
</head>
<body class="bg-slate-100 p-4 sm:p-8 font-sans antialiased text-slate-900">
  <div class="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-slate-200">
    ${reportElement.innerHTML}
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Laporan_DMIT_ARAH_${(client.fullName || 'Siswa').replace(/\s+/g, '_')}.html`;
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
    summary: 'Seimbang',
    detail: 'Keseimbangan belahan otak mendukung pemikiran analitis dan kreativitas secara harmonis.',
    sectionConclusion: 'Siswa bekerja optimal ketika ide kreatif diwadahi dalam target dan jadwal aksi terukur.',
  };

  const intelligences = analysis.multipleIntelligences || [];
  const intelligencesConclusion =
    analysis.multipleIntelligencesConclusion ||
    `Kombinasi dua kecerdasan teratas (${intelligences[0]?.name || 'Logis-Matematis'} dan ${intelligences[1]?.name || 'Spasial'}) merupakan kekuatan bawaan utama siswa yang harus menjadi poros pengembangan akademik dan ekstrakurikuler.`;

  const vak = analysis.learningStyleVAK || {
    visual: 35,
    auditory: 35,
    kinesthetic: 30,
    dominantStyle: 'Visual',
    explanation: 'Siswa memiliki kepekaan sensorik yang baik dalam mengolah informasi.',
    teacherStrategies: ['Gunakan media visual dan peta konsep berwarna.'],
    studentStrategies: ['Buat catatan terstruktur dengan stabilo.'],
    sectionConclusion: 'Materi pelajaran yang disajikan dengan media visual dan visualisasi diagram akan melipatgandakan retensi daya ingat siswa.',
  };

  const quotients = analysis.quotientOrientation || {
    iq: 28,
    eq: 26,
    aq: 24,
    cq: 22,
    explanation: 'Distribusi kuadran kecerdasan menunjukkan potensi intelektual dan emosional yang seimbang.',
  };

  const personality = analysis.personalityAndThinking || {
    primaryType: 'Visioner Analitis',
    coreCharacteristics: ['Fokus tujuan', 'Mandiri', 'Terstruktur', 'Berorientasi hasil nyata'],
    decisionMakingStyle: 'Mengumpulkan fakta dan alternatif secara sistematis sebelum memutuskan.',
    stressResponse: 'Memerlukan jeda reflektif sejenak untuk menata ulang strategi saat menghadapi tekanan.',
    communicationStyle: 'Lugas, jelas, dan mengutamakan substansi yang relevan.',
    sectionConclusion: 'Komunikasi apresiatif dan kejelasan target tugas akan mengoptimalkan ketahanan mental dan motivasi siswa.',
  };

  const tfrc = analysis.learningCapacityTFRC || {
    tfrcValue: metrics.tfrc,
    speedRating: metrics.tfrc > 140 ? 'Cepat & Adaptif' : 'Moderat & Stabil',
    analysis: `Total Ridge Count ${metrics.tfrc} garis mengindikasikan kapasitas neokorteks yang adaptif dalam menyerap konsep baru.`,
    capacityCategory: 'Tinggi',
    sectionConclusion: `Kapasitas TFRC ${metrics.tfrc} garis sangat potensial. Kunci utamanya adalah konsistensi belajar harian 30-45 menit yang fokus tanpa jeda panjang.`,
  };

  const recs = analysis.educationalCareerRecommendations || {
    highSchoolRecommendation: {
      recommendedTrack: 'SMA Jurusan MIPA / Sains Terapan',
      smkSpecializations: ['Rekayasa Perangkat Lunak', 'Teknik Desain Pemodelan', 'Mekatronika'],
      academicReasoning: 'Profil neokorteks selaras dengan penalaran logis dan pemecahan masalah ilmiah.',
    },
    universityMajors: ['Teknik Informatika', 'Data Science & AI', 'Arsitektur & Perencanaan Wilayah', 'Teknik Biomedis'],
    careerProfessions: ['Solution Architect', 'Data Scientist', 'Desainer Produk Digital', 'Peneliti R&D'],
    developmentAdvice: 'Kembangkan portofolio karya nyata dan asah keterampilan kolaboratif.',
    sectionConclusion: 'Jalur akademik di bidang sains, teknologi, dan analisis terapan memberikan tingkat pencapaian prestasi dan kepuasan belajar tertinggi bagi siswa.',
  };

  const executiveSummary = analysis.overallExecutiveSummary || {
    coreIdentity: `Siswa memiliki profil potensi genetik unggul dengan kecerdasan utama pada ${intelligences[0]?.name || 'Logis-Matematis'} dan modalitas belajar ${vak.dominantStyle}. Karakter dasarnya mandiri, kritis, dan berorientasi pada hasil nyata.`,
    winningFormula: `Kombinasikan pemahaman konseptual ${vak.dominantStyle} dengan latihan terstruktur, berikan otonomi dalam eksplorasi tugas, dan dukung dengan apresiasi berkala atas proses belajarnya.`,
    parentTeacherActionPlan: [
      `Fasilitasi gaya belajar ${vak.dominantStyle} dengan media belajar yang mendukung di rumah dan sekolah.`,
      `Arahkan minat peminatan akademik sesuai kekuatan ${intelligences[0]?.name || 'Logis-Matematis'}.`,
      `Jaga ritme belajar dengan interval 25-30 menit untuk menjaga stamina kognitif sesuai kapasitas TFRC (${tfrc.tfrcValue} garis).`,
      `Bangun komunikasi keluarga yang terbuka dan suportif untuk memupuk Adversity Quotient (AQ).`,
      `Konsultasikan perkembangan berkala dengan Konselor GenZi Academy untuk evaluasi kurikulum adaptif.`,
    ],
    counselorNote: `Bakat bawaan adalah anugerah genetik terbaik; dengan pendampingan yang tepat dari orang tua dan sekolah, siswa berpeluang besar mencapai prestasi luar biasa dan masa depan yang cemerlang.`,
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
            title="Unduh laporan mandiri dalam format web (.html) bersih"
            className="px-3.5 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl shadow-xs transition flex items-center space-x-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-indigo-600" />
            <span>Unduh HTML</span>
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
            title="Cetak langsung atau pilih 'Save as PDF' di peramban"
            className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition flex items-center space-x-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>
      </div>

      {/* Helper Notification for PDF & Download (Screen Only) */}
      <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-3 px-4 text-xs text-indigo-900 flex items-center justify-between print:hidden">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>
            <strong>Format Unduhan Bersih:</strong> Klik <strong>Cetak / Simpan PDF</strong> lalu pilih opsi <em>&quot;Save as PDF&quot;</em> untuk file PDF resmi, atau gunakan tombol <strong>Unduh HTML</strong> / <strong>Unduh Word</strong> untuk arsip mandiri.
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
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Dominasi Belahan Otak (Brain Hemisphere Dominance)
            </h2>
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
                  <strong className="text-indigo-800 text-sm block">1. Belahan Otak Kiri ({brain.leftPercentage}%):</strong>
                  <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold text-[10px]">
                    {brain.leftPercentage >= brain.rightPercentage ? 'Dominan' : 'Suportif'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-semibold text-slate-700">Logika Deduktif</span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-semibold text-slate-700">Bahasa Terstruktur</span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-semibold text-slate-700">Matematika &amp; Angka</span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-semibold text-slate-700">Sekuensial / Tahapan</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Belahan kiri mengatur cara berpikir analitis, pemecahan masalah berbasis fakta objektif, dan penalaran berbasis data.
                  Siswa dengan penguatan belahan kiri menyukai instruksi yang jelas, sistematika langkah-demi-langkah, dan pembuktian logis yang transparan.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-teal-800 text-sm block">2. Belahan Otak Kanan ({brain.rightPercentage}%):</strong>
                  <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 font-bold text-[10px]">
                    {brain.rightPercentage > brain.leftPercentage ? 'Dominan' : 'Suportif'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-semibold text-slate-700">Kreativitas &amp; Ide</span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-semibold text-slate-700">Imajinasi Spasial 3D</span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-semibold text-slate-700">Intuisi &amp; Visi</span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-semibold text-slate-700">Sintesis Holistik</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Belahan kanan mengatur daya imajinasi konseptual, kepekaan seni, pengenalan pola global (gambaran besar), serta orientasi spasial.
                  Siswa dengan potensi belahan kanan mahir menemukan solusi kreatif yang tidak biasa (out-of-the-box), adaptif terhadap perubahan visual, dan intuitif.
                </p>
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-indigo-100 text-xs text-slate-700 leading-relaxed">
              <strong className="text-indigo-900 block mb-1">Deskripsi &amp; Analisis Kognitif Mendalam:</strong>
              {brain.detail || brain.summary}
            </div>

            {/* Kotak Kesimpulan Bagian 1 */}
            <div className="p-4 bg-indigo-50/80 border-l-4 border-indigo-600 rounded-r-xl text-xs text-indigo-950">
              <span className="font-extrabold uppercase tracking-wider block mb-1 flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-indigo-600" />
                Kesimpulan Bagian: Dominasi Belahan Otak
              </span>
              <p className="leading-relaxed">
                {brain.sectionConclusion ||
                  `Siswa beroperasi paling efektif dengan kombinasi pemikiran ${
                    brain.leftPercentage >= brain.rightPercentage ? 'analitis terstruktur' : 'konseptual kreatif'
                  }. Penyelarasan antara ide-ide inovatif dengan jadwal target yang disiplin akan membuahkan hasil akademik yang optimal.`}
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
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Pemetaan 8 Kecerdasan Majemuk (Howard Gardner)
            </h2>
          </div>

          <p className="text-xs text-slate-500">
            Berikut adalah urutan 8 kecerdasan majemuk dari yang paling dominan (kekuatan bawaan genetik) hingga yang memerlukan stimulasi berkala:
          </p>

          {/* Visual: Radar/Polygon Distribution Chart + Summary Metrics */}
          <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              {/* SVG Radar Chart Graphic */}
              <div className="lg:col-span-1 flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Grafik Sebaran 8 Kecerdasan
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
                <span className="text-[10px] text-slate-400 mt-1">Multi-Intelligence Distribution Polygon</span>
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
                    Dua kecerdasan teratas siswa adalah <strong>{intelligences[0]?.name}</strong> ({intelligences[0]?.score}%)
                    dan <strong>{intelligences[1]?.name}</strong> ({intelligences[1]?.score}%). Ini merupakan keunggulan
                    bakat alami yang paling mudah dikonversi menjadi prestasi tinggi bila diberikan stimulus yang tepat.
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
                Kesimpulan Bagian: 8 Kecerdasan Majemuk
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
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Gaya Belajar Alami (VAK: Visual, Auditori, Kinestetik)
            </h2>
          </div>

          <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200 space-y-4">
            {/* Visual: 3 Modal Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`p-4 rounded-xl border text-center shadow-xs ${vak.dominantStyle.includes('Visual') ? 'bg-indigo-50/70 border-indigo-300 ring-2 ring-indigo-200' : 'bg-white border-slate-200'}`}>
                <Eye className="w-6 h-6 text-indigo-600 mx-auto mb-1" />
                <span className="text-xs font-semibold text-slate-600 block">Visual</span>
                <span className="text-2xl font-black text-indigo-700 block my-0.5">{vak.visual}%</span>
                <p className="text-[10px] text-slate-500">Menyerap informasi lewat gambar, bagan, warna, diagram alur, dan mind-map</p>
              </div>

              <div className={`p-4 rounded-xl border text-center shadow-xs ${vak.dominantStyle.includes('Auditori') ? 'bg-teal-50/70 border-teal-300 ring-2 ring-teal-200' : 'bg-white border-slate-200'}`}>
                <Headphones className="w-6 h-6 text-teal-600 mx-auto mb-1" />
                <span className="text-xs font-semibold text-slate-600 block">Auditori</span>
                <span className="text-2xl font-black text-teal-700 block my-0.5">{vak.auditory}%</span>
                <p className="text-[10px] text-slate-500">Menyerap informasi lewat penjelasan lisan, diskusi interaktif, dan intonasi suara</p>
              </div>

              <div className={`p-4 rounded-xl border text-center shadow-xs ${vak.dominantStyle.includes('Kinestetik') ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-200' : 'bg-white border-slate-200'}`}>
                <Activity className="w-6 h-6 text-amber-600 mx-auto mb-1" />
                <span className="text-xs font-semibold text-slate-600 block">Kinestetik</span>
                <span className="text-2xl font-black text-amber-700 block my-0.5">{vak.kinesthetic}%</span>
                <p className="text-[10px] text-slate-500">Menyerap informasi lewat praktik langsung, eksperimen laboratorium, dan simulasi gerak</p>
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
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-1">
                <span>Visual ({vak.visual}%)</span>
                <span>Auditori ({vak.auditory}%)</span>
                <span>Kinestetik ({vak.kinesthetic}%)</span>
              </div>
            </div>

            <p className="text-xs text-slate-700 bg-white p-4 rounded-xl border border-slate-200 leading-relaxed">
              <strong>Gaya Belajar Dominan:</strong> Siswa memiliki kecenderungan modalitas{' '}
              <strong className="text-indigo-700">{vak.dominantStyle}</strong>. {vak.explanation}
            </p>

            {/* Strategies for Teachers & Students */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-white p-4 rounded-xl border border-indigo-100">
                <h4 className="font-bold text-indigo-900 mb-2 flex items-center">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                  Strategi Mengajar di Kelas (Untuk Guru / Pendidik):
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
                  Strategi Belajar Mandiri di Rumah (Untuk Orang Tua &amp; Siswa):
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
                Kesimpulan Bagian: Gaya Belajar VAK
              </span>
              <p className="leading-relaxed">
                {vak.sectionConclusion ||
                  `Penyediaan sarana belajar berbasis ${vak.dominantStyle} adalah akselerator utama bagi anak untuk memahami materi sulit dengan lebih cepat, menyenangkan, dan berdaya ingat panjang.`}
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
                <h3 className="font-bold text-slate-900 text-sm">Gaya Berpikir &amp; Kepribadian</h3>
              </div>

              <div className="text-xs space-y-3">
                <div>
                  <span className="text-slate-400 block font-medium">Tipe Kepribadian Utama:</span>
                  <span className="font-extrabold text-indigo-700 text-base">{personality.primaryType}</span>
                </div>

                {personality.coreCharacteristics?.length > 0 && (
                  <div>
                    <span className="text-slate-500 font-semibold block mb-1">Karakteristik Kunci:</span>
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
                  <span className="text-slate-500 font-semibold block">Pengambilan Keputusan:</span>
                  <p className="text-slate-600 leading-snug">{personality.decisionMakingStyle}</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-500 font-semibold block">Respon Terhadap Tekanan (Stres):</span>
                  <p className="text-slate-600 leading-snug">{personality.stressResponse}</p>
                </div>

                {personality.communicationStyle && (
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-500 font-semibold block">Pola Komunikasi Efektif:</span>
                    <p className="text-slate-600 leading-snug">{personality.communicationStyle}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Kotak Kesimpulan Bagian 4 */}
            <div className="p-3.5 bg-white border-l-4 border-indigo-600 rounded-r-xl text-xs text-indigo-950 mt-4 shadow-2xs">
              <span className="font-bold block mb-0.5 text-indigo-900 flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-indigo-600" />
                Kesimpulan Bagian: Karakter &amp; Mentalitas
              </span>
              <p className="leading-snug text-slate-600">
                {personality.sectionConclusion ||
                  'Anak merespons paling positif terhadap pola komunikasi apresiatif yang mengedepankan solusi daripada penghakiman langsung.'}
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
                <h3 className="font-bold text-slate-900 text-sm">Kapasitas Belajar (TFRC)</h3>
              </div>

              <div className="text-xs space-y-3">
                <div className="flex items-baseline justify-between p-3 bg-white rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 block font-medium">Total Ridge Count (TFRC):</span>
                    <span className="font-black text-teal-700 text-xl">{metrics.tfrc} Garis</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block font-medium">Kecepatan Pemrosesan:</span>
                    <span className="font-bold text-indigo-700 text-sm">{tfrc.speedRating}</span>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 leading-relaxed text-slate-600">
                  {tfrc.analysis}
                </div>

                {/* Quotients Mini Distribution Cards with Progress */}
                <div>
                  <span className="text-slate-500 font-semibold block mb-1.5">Sebaran Kuadran Kecerdasan:</span>
                  <div className="grid grid-cols-4 gap-1.5 text-center">
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-400 block font-bold">IQ</span>
                      <strong className="text-xs text-indigo-700 block my-0.5">{quotients.iq}%</strong>
                      <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                        <div className="bg-indigo-600 h-full" style={{ width: `${quotients.iq * 2.5}%` }}></div>
                      </div>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-400 block font-bold">EQ</span>
                      <strong className="text-xs text-teal-700 block my-0.5">{quotients.eq}%</strong>
                      <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                        <div className="bg-teal-600 h-full" style={{ width: `${quotients.eq * 2.5}%` }}></div>
                      </div>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-400 block font-bold">AQ</span>
                      <strong className="text-xs text-amber-700 block my-0.5">{quotients.aq}%</strong>
                      <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                        <div className="bg-amber-600 h-full" style={{ width: `${quotients.aq * 2.5}%` }}></div>
                      </div>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-400 block font-bold">CQ</span>
                      <strong className="text-xs text-purple-700 block my-0.5">{quotients.cq}%</strong>
                      <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                        <div className="bg-purple-600 h-full" style={{ width: `${quotients.cq * 2.5}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Kotak Kesimpulan Bagian 5 */}
            <div className="p-3.5 bg-white border-l-4 border-teal-600 rounded-r-xl text-xs text-teal-950 mt-4 shadow-2xs">
              <span className="font-bold block mb-0.5 text-teal-900 flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-teal-600" />
                Kesimpulan Bagian: Stamina &amp; Kapasitas TFRC
              </span>
              <p className="leading-snug text-slate-600">
                {tfrc.sectionConclusion ||
                  'Jaga konsistensi belajar harian dalam blok waktu 25-30 menit dengan istirahat teratur untuk mempertahankan daya serap maksimal tanpa kejenuhan mental.'}
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
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Rekomendasi Penjurusan Studi &amp; Karier Masa Depan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Penjurusan SMA / SMK */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-200 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center mb-3">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-indigo-950 mb-1">Pilihan Sekolah (SMA/SMK)</h3>
                <p className="text-base font-extrabold text-indigo-700 mb-2">
                  {recs.highSchoolRecommendation?.recommendedTrack || 'SMA Jurusan IPA/MIPA'}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {recs.highSchoolRecommendation?.academicReasoning}
                </p>
                {(recs.highSchoolRecommendation?.smkSpecializations?.length ?? 0) > 0 && (
                  <div className="text-[11px] text-slate-500">
                    <span className="font-bold text-slate-700 block">Pilihan Spesialisasi Kejuruan:</span>
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
                <h3 className="font-bold text-sm text-teal-950 mb-1">Program Studi Kuliah Ideal</h3>
                <p className="text-xs text-slate-500 mb-3">3-5 Jurusan paling selaras dengan potensi bawaan:</p>
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
                <h3 className="font-bold text-sm text-slate-900 mb-1">Karier &amp; Profesi Masa Depan</h3>
                <p className="text-xs text-slate-500 mb-3">Bidang profesi yang berpotensi mencapai keunggulan:</p>
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
              Kesimpulan Bagian: Arah Penjurusan &amp; Karier Masa Depan
            </span>
            <p className="leading-relaxed">
              {recs.sectionConclusion ||
                `Rekomendasi penjurusan ${recs.highSchoolRecommendation?.recommendedTrack} memberikan keselarasan sempurna antara bakat alami bawaan dan tuntutan profesi masa depan.`}
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
                KESIMPULAN UMUM &amp; REKOMENDASI PENDAMPINGAN HOLISTIK
              </h2>
              <p className="text-xs text-slate-500">
                Sintesis menyeluruh dari seluruh dimensi psikometrik untuk masa depan anak.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-xl">
            {/* 1. Core Identity */}
            <div className="space-y-1.5 border-b border-white/10 pb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-300 flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                1. Profil Inti Anak Hebat (Core Identity)
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {executiveSummary.coreIdentity}
              </p>
            </div>

            {/* 2. Winning Formula */}
            <div className="space-y-1.5 border-b border-white/10 pb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 flex items-center">
                <Zap className="w-3.5 h-3.5 mr-1" />
                2. Formula Sukses Belajar (The Winning Strategy)
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {executiveSummary.winningFormula}
              </p>
            </div>

            {/* 3. Action Plan */}
            <div className="space-y-2 border-b border-white/10 pb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center">
                <Target className="w-3.5 h-3.5 mr-1" />
                3. Rencana Aksi Sinergis Orang Tua &amp; Sekolah (Action Plan)
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
                4. Catatan Motivasi Konselor GenZi Academy
              </span>
              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                &ldquo;{executiveSummary.counselorNote}&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* OFFICIAL SIGNATURE AND VALIDATION STAMP */}
        <div className="pt-8 border-t-2 border-slate-200 grid grid-cols-2 gap-8 text-xs text-center">
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
