import {
  DMITAnalysisResult,
  ClientIdentity,
  FingerprintsRecord,
  CalculatedMetrics,
} from '../types/dmit';

interface GenerateReportOptions {
  analysis: DMITAnalysisResult;
  client: ClientIdentity;
  fingerprints: FingerprintsRecord;
  metrics: CalculatedMetrics;
  institutionName: string;
  examinerName: string;
  copyrightFooter: string;
}

export function generateA4HtmlReport(options: GenerateReportOptions): string {
  const {
    analysis,
    client,
    metrics,
    institutionName,
    examinerName,
    copyrightFooter,
  } = options;

  const resolvedInstitution = institutionName || 'GenZi Academy';
  const resolvedExaminer = examinerName || 'Konselor GenZi Academy';
  const resolvedFooter = copyrightFooter || 'GenZi Academy by. Pak GuruAI';
  const studentName = client.fullName || 'Siswa / Klien';
  const assessmentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

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

  // Pre-calculate Radar Polygon points for SVG
  const radarPoints = intelligences.slice(0, 8).map((item, idx) => {
    const angle = (idx * (360 / 8) - 90) * (Math.PI / 180);
    const radius = ((item.score || 50) / 100) * 80;
    const x = 100 + radius * Math.cos(angle);
    const y = 100 + radius * Math.sin(angle);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  // Intelligences table rows
  const intelligenceRows = intelligences.map((intel, idx) => {
    const barWidth = Math.min(100, Math.max(10, intel.score));
    const badgeColor =
      idx < 2 ? 'bg-indigo' : idx < 4 ? 'bg-teal' : 'bg-slate';
    return `
      <tr>
        <td class="col-rank">
          <span class="rank-badge ${badgeColor}">#${idx + 1}</span>
        </td>
        <td class="col-name">
          <strong>${escapeHtml(intel.name)}</strong>
          <div class="intel-sub">${escapeHtml(intel.explanation || '')}</div>
        </td>
        <td class="col-level">
          <span class="level-pill ${badgeColor}">${escapeHtml(intel.strengthLevel || 'Moderat')}</span>
        </td>
        <td class="col-score">
          <div class="score-num">${intel.score}%</div>
          <div class="score-bar-bg">
            <div class="score-bar-fill ${badgeColor}" style="width: ${barWidth}%;"></div>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  // Top 4 cards on Page 1
  const top4Cards = intelligences.slice(0, 4).map((intel, idx) => `
    <div class="top4-card">
      <div class="top4-badge">#${idx + 1}</div>
      <div class="top4-info">
        <div class="top4-name">${escapeHtml(intel.name)}</div>
        <div class="top4-level">${escapeHtml(intel.strengthLevel || 'Kuat')}</div>
      </div>
      <div class="top4-score">${intel.score}%</div>
    </div>
  `).join('');

  // Action plan items
  const actionPlanItems = (executiveSummary.parentTeacherActionPlan || []).map((item, i) => `
    <li class="action-item">
      <span class="action-num">${i + 1}</span>
      <span class="action-text">${escapeHtml(item)}</span>
    </li>
  `).join('');

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Laporan Hasil Analisis ARAH DMIT - ${escapeHtml(studentName)}</title>
  <style>
    /* =====================================================================
       STANDALONE PURE CSS - ZERO EXTERNAL CDN DEPENDENCY
       OPTIMIZED FOR STANDARD A4 PAPER (210mm x 297mm)
       ===================================================================== */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 10.5pt;
      line-height: 1.45;
      color: #0f172a;
      background-color: #f1f5f9;
      margin: 0;
      padding: 0;
    }

    /* Interactive Top Action Bar (Hidden in Print) */
    .top-action-bar {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: #0f172a;
      color: #ffffff;
      padding: 12px 20px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      box-shadow: 0 4px 14px rgba(0,0,0,0.25);
    }

    .top-action-bar .brand {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .top-action-bar .brand-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #10b981;
      display: inline-block;
    }

    .top-action-bar .brand-title {
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.3px;
    }

    .top-action-bar .brand-subtitle {
      font-size: 11px;
      color: #94a3b8;
    }

    .top-action-bar .actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 14px;
      font-size: 12px;
      font-weight: 700;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.15s ease;
    }

    .btn-primary {
      background: #4f46e5;
      color: #ffffff;
    }
    .btn-primary:hover {
      background: #4338ca;
    }

    .btn-secondary {
      background: #1e293b;
      color: #e2e8f0;
      border: 1px solid #334155;
    }
    .btn-secondary:hover {
      background: #334155;
    }

    .tip-box-banner {
      background: #eff6ff;
      border-bottom: 1px solid #bfdbfe;
      padding: 8px 20px;
      font-size: 11px;
      color: #1e3a8a;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    /* A4 Document Pages Container */
    .a4-container {
      max-width: 210mm;
      margin: 20px auto 40px auto;
    }

    .a4-page {
      background: #ffffff;
      width: 210mm;
      min-height: 297mm;
      padding: 14mm 16mm 14mm 16mm;
      margin-bottom: 24px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      border-radius: 2px;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
    }

    .page-content {
      flex: 1;
    }

    /* Running Page Headers and Footers */
    .running-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 6px;
      margin-bottom: 12px;
      border-bottom: 1px solid #e2e8f0;
      font-size: 8pt;
      color: #64748b;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .running-footer {
      margin-top: 14px;
      padding-top: 8px;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 8pt;
      color: #64748b;
    }

    .running-footer .copyright {
      font-weight: 700;
      color: #475569;
    }

    .running-footer .page-number {
      font-weight: 700;
      color: #4f46e5;
    }

    /* Kop Dokumen Resmi (Page 1) */
    .kop-header {
      text-align: center;
      padding-bottom: 10px;
      margin-bottom: 12px;
      border-bottom: 2.5px solid #0f172a;
      position: relative;
    }

    .kop-header .institution {
      font-size: 9.5pt;
      font-weight: 800;
      letter-spacing: 1.5px;
      color: #4338ca;
      text-transform: uppercase;
      margin-bottom: 2px;
    }

    .kop-header h1 {
      font-size: 16pt;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: -0.3px;
      text-transform: uppercase;
      margin: 2px 0;
    }

    .kop-header .motto {
      font-size: 9.5pt;
      color: #4f46e5;
      font-weight: 700;
      font-style: italic;
      margin-bottom: 2px;
    }

    .kop-header .sub-desc {
      font-size: 8pt;
      color: #64748b;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* Student Identity Box */
    .identity-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 14px;
      margin-bottom: 12px;
    }

    .identity-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px 12px;
      font-size: 8.5pt;
    }

    .id-field .label {
      color: #64748b;
      font-size: 7.5pt;
      font-weight: 600;
      display: block;
      margin-bottom: 1px;
    }

    .id-field .val {
      color: #0f172a;
      font-weight: 700;
      display: block;
    }

    .id-field .val-accent {
      color: #4338ca;
    }

    .id-field .val-success {
      color: #047857;
    }

    /* Section Headings */
    .section-title {
      display: flex;
      align-items: center;
      gap: 7px;
      border-bottom: 1.5px solid #cbd5e1;
      padding-bottom: 4px;
      margin: 10px 0 8px 0;
    }

    .section-letter {
      width: 20px;
      height: 20px;
      border-radius: 5px;
      background: #4f46e5;
      color: #ffffff;
      font-size: 8.5pt;
      font-weight: 800;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .section-letter.teal {
      background: #0d9488;
    }

    .section-title h2 {
      font-size: 10.5pt;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.2px;
    }

    /* Brain Hemisphere Visual */
    .brain-visual {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 8px 12px;
      margin-bottom: 8px;
    }

    .dual-bar-labels {
      display: flex;
      justify-content: space-between;
      font-size: 8pt;
      font-weight: 700;
      margin-bottom: 4px;
    }

    .dual-bar-labels .left-side {
      color: #4338ca;
    }

    .dual-bar-labels .right-side {
      color: #0f766e;
    }

    .dual-bar-track {
      height: 14px;
      width: 100%;
      background: #e2e8f0;
      border-radius: 999px;
      overflow: hidden;
      display: flex;
      margin-bottom: 8px;
    }

    .dual-bar-fill-left {
      background: #4f46e5;
      color: #ffffff;
      font-size: 7.5pt;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .dual-bar-fill-right {
      background: #0d9488;
      color: #ffffff;
      font-size: 7.5pt;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .two-cols {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      font-size: 8pt;
      margin-bottom: 6px;
    }

    .hemi-box {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 8px;
    }

    .hemi-box-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
    }

    .hemi-box-title {
      font-weight: 800;
      font-size: 8pt;
    }

    .hemi-box-title.left {
      color: #3730a3;
    }

    .hemi-box-title.right {
      color: #115e59;
    }

    .hemi-tag {
      font-size: 7pt;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 4px;
      background: #e0e7ff;
      color: #3730a3;
    }

    .hemi-tag.teal {
      background: #ccfbf1;
      color: #115e59;
    }

    .keywords {
      display: flex;
      flex-wrap: wrap;
      gap: 3px;
      margin: 3px 0;
    }

    .kw {
      font-size: 6.8pt;
      background: #f1f5f9;
      color: #334155;
      padding: 1px 4px;
      border-radius: 3px;
      font-weight: 600;
    }

    .hemi-desc {
      color: #475569;
      line-height: 1.35;
      font-size: 7.8pt;
    }

    .conclusion-box {
      background: #eef2ff;
      border-left: 3.5px solid #4f46e5;
      padding: 6px 10px;
      border-radius: 0 6px 6px 0;
      font-size: 7.8pt;
      color: #1e1b4b;
      margin-top: 6px;
    }

    .conclusion-box.teal {
      background: #f0fdfa;
      border-left-color: #0d9488;
      color: #134e4a;
    }

    .conclusion-box strong {
      display: block;
      font-size: 7.5pt;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      margin-bottom: 2px;
      color: #3730a3;
    }

    .conclusion-box.teal strong {
      color: #0f766e;
    }

    /* Page 1 Gardner Summary */
    .gardner-page1-layout {
      display: grid;
      grid-template-columns: 180px 1fr;
      gap: 12px;
      align-items: center;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 8px 12px;
    }

    .radar-box {
      text-align: center;
    }

    .radar-box svg {
      width: 140px;
      height: 140px;
      margin: 0 auto;
    }

    .radar-caption {
      font-size: 7pt;
      font-weight: 700;
      color: #64748b;
      margin-top: 3px;
      text-transform: uppercase;
    }

    .top4-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
    }

    .top4-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 6px 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
    }

    .top4-badge {
      width: 20px;
      height: 20px;
      border-radius: 5px;
      background: #4f46e5;
      color: #ffffff;
      font-size: 8pt;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .top4-info {
      flex: 1;
      min-width: 0;
    }

    .top4-name {
      font-size: 7.8pt;
      font-weight: 700;
      color: #0f172a;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .top4-level {
      font-size: 6.8pt;
      color: #4f46e5;
      font-weight: 600;
    }

    .top4-score {
      font-size: 9.5pt;
      font-weight: 800;
      color: #4338ca;
    }

    .summary-text-box {
      grid-column: 1 / -1;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 6px 10px;
      font-size: 7.8pt;
      color: #334155;
      line-height: 1.4;
      margin-top: 4px;
    }

    /* Page 2 Intelligences Table */
    .intel-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8pt;
      margin-bottom: 8px;
    }

    .intel-table th {
      background: #f1f5f9;
      color: #334155;
      font-weight: 700;
      padding: 5px 8px;
      border: 1px solid #cbd5e1;
      text-align: left;
      font-size: 7.5pt;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .intel-table td {
      padding: 5px 8px;
      border: 1px solid #e2e8f0;
      vertical-align: middle;
    }

    .col-rank {
      width: 38px;
      text-align: center;
    }

    .rank-badge {
      display: inline-block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      border-radius: 4px;
      font-size: 7.5pt;
      font-weight: 800;
      text-align: center;
      color: #ffffff;
    }

    .rank-badge.bg-indigo { background: #4f46e5; }
    .rank-badge.bg-teal { background: #0d9488; }
    .rank-badge.bg-slate { background: #64748b; }

    .col-name strong {
      font-size: 8.5pt;
      color: #0f172a;
      display: block;
    }

    .intel-sub {
      font-size: 7.2pt;
      color: #64748b;
      line-height: 1.3;
      margin-top: 1px;
    }

    .col-level {
      width: 100px;
      text-align: center;
    }

    .level-pill {
      font-size: 7pt;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 999px;
      display: inline-block;
    }

    .level-pill.bg-indigo { background: #e0e7ff; color: #3730a3; }
    .level-pill.bg-teal { background: #ccfbf1; color: #115e59; }
    .level-pill.bg-slate { background: #f1f5f9; color: #475569; }

    .col-score {
      width: 90px;
      text-align: right;
    }

    .score-num {
      font-size: 8.5pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 2px;
    }

    .score-bar-bg {
      width: 100%;
      height: 5px;
      background: #e2e8f0;
      border-radius: 999px;
      overflow: hidden;
    }

    .score-bar-fill {
      height: 100%;
      border-radius: 999px;
    }

    .score-bar-fill.bg-indigo { background: #4f46e5; }
    .score-bar-fill.bg-teal { background: #0d9488; }
    .score-bar-fill.bg-slate { background: #94a3b8; }

    /* Page 2 VAK Section */
    .vak-container {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 12px;
      margin-bottom: 8px;
    }

    .vak-cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin-bottom: 8px;
    }

    .vak-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 8px;
      text-align: center;
    }

    .vak-card.active-visual {
      border: 1.5px solid #6366f1;
      background: #f5f3ff;
    }

    .vak-card.active-auditory {
      border: 1.5px solid #0d9488;
      background: #f0fdfa;
    }

    .vak-card.active-kinesthetic {
      border: 1.5px solid #f59e0b;
      background: #fffbeb;
    }

    .vak-card .label {
      font-size: 7.5pt;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
    }

    .vak-card .score {
      font-size: 16pt;
      font-weight: 900;
      margin: 2px 0;
      display: block;
    }

    .vak-card .score.indigo { color: #4338ca; }
    .vak-card .score.teal { color: #0f766e; }
    .vak-card .score.amber { color: #b45309; }

    .vak-card .desc {
      font-size: 6.8pt;
      color: #64748b;
      line-height: 1.3;
    }

    .vak-bar-track {
      height: 12px;
      width: 100%;
      background: #e2e8f0;
      border-radius: 999px;
      overflow: hidden;
      display: flex;
      margin-bottom: 8px;
    }

    .vak-bar-v { background: #4f46e5; color: #ffffff; font-size: 7pt; font-weight: 800; display: flex; align-items: center; justify-content: center; }
    .vak-bar-a { background: #0d9488; color: #ffffff; font-size: 7pt; font-weight: 800; display: flex; align-items: center; justify-content: center; }
    .vak-bar-k { background: #d97706; color: #ffffff; font-size: 7pt; font-weight: 800; display: flex; align-items: center; justify-content: center; }

    .vak-strategies {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      font-size: 7.8pt;
      margin-top: 6px;
    }

    .strategy-box {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 8px;
    }

    .strategy-box h4 {
      font-size: 8pt;
      font-weight: 800;
      color: #1e1b4b;
      margin-bottom: 4px;
    }

    .strategy-box ul {
      margin-left: 14px;
      color: #475569;
      line-height: 1.35;
    }

    /* Page 3 Styles */
    .personality-tfrc-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 10px;
    }

    .card-boxed {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px;
      font-size: 8pt;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .card-boxed h3 {
      font-size: 9pt;
      font-weight: 800;
      color: #0f172a;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 4px;
      margin-bottom: 6px;
    }

    .tfrc-highlight {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 6px 10px;
      margin-bottom: 6px;
    }

    .tfrc-num {
      font-size: 14pt;
      font-weight: 900;
      color: #0d9488;
    }

    .quotient-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 4px;
      margin-top: 6px;
    }

    .quotient-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 5px;
      padding: 4px;
      text-align: center;
    }

    .quotient-card .q-name {
      font-size: 7pt;
      font-weight: 700;
      color: #64748b;
    }

    .quotient-card .q-val {
      font-size: 9pt;
      font-weight: 900;
      color: #4338ca;
    }

    /* Career Recommendations 3-Col Cards */
    .recs-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin-bottom: 8px;
    }

    .rec-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px;
      font-size: 7.8pt;
    }

    .rec-card h4 {
      font-size: 8.5pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 4px;
    }

    .rec-highlight {
      font-size: 9pt;
      font-weight: 800;
      color: #4338ca;
      margin-bottom: 4px;
    }

    .tag-cloud {
      display: flex;
      flex-wrap: wrap;
      gap: 3px;
      margin-top: 4px;
    }

    .tag-item {
      font-size: 7pt;
      font-weight: 600;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      padding: 2px 6px;
      border-radius: 4px;
      color: #1e293b;
    }

    /* Page 4 Executive Summary & Validation */
    .exec-summary-card {
      background: #f8fafc;
      border: 1.5px solid #4f46e5;
      border-radius: 10px;
      padding: 14px 16px;
      margin-bottom: 16px;
      font-size: 8.5pt;
    }

    .exec-block {
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 8px;
      margin-bottom: 8px;
    }

    .exec-block:last-child {
      border-bottom: none;
      padding-bottom: 0;
      margin-bottom: 0;
    }

    .exec-heading {
      font-size: 8.5pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      color: #3730a3;
      margin-bottom: 3px;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .exec-heading.cyan { color: #0e7490; }
    .exec-heading.amber { color: #b45309; }
    .exec-heading.indigo { color: #4338ca; }

    .exec-text {
      color: #1e293b;
      line-height: 1.45;
    }

    .action-list {
      list-style: none;
      margin: 4px 0 0 0;
    }

    .action-item {
      display: flex;
      align-items: flex-start;
      gap: 6px;
      margin-bottom: 4px;
      line-height: 1.35;
    }

    .action-num {
      width: 16px;
      height: 16px;
      border-radius: 4px;
      background: #4f46e5;
      color: #ffffff;
      font-size: 7pt;
      font-weight: 800;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 1px;
    }

    .counselor-quote {
      font-style: italic;
      color: #334155;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      padding: 8px 12px;
      border-radius: 6px;
      margin-top: 3px;
    }

    /* Validation & Signature Block */
    .signature-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      text-align: center;
      font-size: 8pt;
      margin: 20px 0 10px 0;
      padding-top: 10px;
      border-top: 1px solid #cbd5e1;
    }

    .sign-col .role {
      font-weight: 800;
      color: #0f172a;
      margin-top: 2px;
    }

    .sign-space {
      height: 70px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }

    .sign-line {
      width: 180px;
      border-bottom: 1.5px solid #334155;
      display: block;
    }

    .sign-seal-text {
      font-size: 7.2pt;
      font-weight: 700;
      text-transform: uppercase;
      color: #4338ca;
      padding-bottom: 2px;
    }

    .sign-meta {
      font-size: 7.2pt;
      color: #64748b;
      margin-top: 3px;
    }

    .authenticity-note {
      text-align: center;
      font-size: 7pt;
      color: #94a3b8;
      margin-top: 12px;
      border-top: 1px dashed #e2e8f0;
      padding-top: 6px;
    }

    /* =====================================================================
       MEDIA PRINT OVERRIDES (EXACT A4 OUTPUT)
       ===================================================================== */
    @page {
      size: A4 portrait;
      margin: 10mm 12mm 12mm 12mm;
    }

    @media print {
      body {
        background: #ffffff !important;
        color: #000000 !important;
      }

      .no-print {
        display: none !important;
      }

      .a4-container {
        margin: 0 !important;
        max-width: 100% !important;
      }

      .a4-page {
        width: 100% !important;
        min-height: auto !important;
        padding: 0 !important;
        margin: 0 !important;
        box-shadow: none !important;
        border: none !important;
        border-radius: 0 !important;
        page-break-after: always !important;
        break-after: page !important;
      }

      .a4-page:last-child {
        page-break-after: auto !important;
        break-after: auto !important;
      }

      /* Ink saver overrides: keep borders sharp, prevent washed-out text */
      .exec-summary-card {
        background: #ffffff !important;
        border: 1.5px solid #0f172a !important;
      }

      .kop-header {
        border-bottom: 2.5px solid #000000 !important;
      }
    }
  </style>
</head>
<body>

  <!-- INTERACTIVE TOP ACTION BAR (HIDDEN IN PRINT) -->
  <div class="top-action-bar no-print">
    <div class="brand">
      <span class="brand-dot"></span>
      <div>
        <div class="brand-title">Laporan Asesmen ARAH DMIT &bull; ${escapeHtml(studentName)}</div>
        <div class="brand-subtitle">${escapeHtml(resolvedInstitution)} &bull; Format Standar Cetak Kertas A4</div>
      </div>
    </div>
    <div class="actions">
      <button class="btn btn-primary" onclick="window.print()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 6 2 18 2 18 9"></polyline>
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
          <rect x="6" y="14" width="12" height="8"></rect>
        </svg>
        Cetak ke Kertas A4 / Simpan PDF
      </button>
      <button class="btn btn-secondary" onclick="alert('Panduan Simpan PDF A4:\\n\\n1. Klik tombol Cetak / tekan Ctrl+P.\\n2. Pada menu Destination / Tujuan, pilih \\'Save as PDF\\'.\\n3. Pilih Paper size: \\'A4\\'.\\n4. Centang opsi \\'Background graphics\\' agar warna dan grafik tampil sempurna.\\n5. Klik \\'Save\\'.')">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        Petunjuk PDF
      </button>
    </div>
  </div>

  <div class="tip-box-banner no-print">
    <span>💡 <strong>Tampilan Pratinjau Kertas A4:</strong> Dokumen di bawah siap dicetak langsung atau disimpan sebagai PDF rapi dan bersih.</span>
    <span>Ukuran: <strong>A4 (210 × 297 mm)</strong> &bull; 4 Halaman Standar</span>
  </div>

  <!-- A4 PAGES WRAPPER -->
  <div class="a4-container">

    <!-- =====================================================================
         HALAMAN 1: IDENTITAS & DOMINASI OTAK & 8 KECERDASAN TOP 4
         ===================================================================== -->
    <div class="a4-page">
      <div class="page-content">
        <!-- KOP DOKUMEN RESMI -->
        <div class="kop-header">
          <div class="institution">${escapeHtml(resolvedInstitution)}</div>
          <h1>ARAH (ANALISA RAHASIA ANAK HEBAT)</h1>
          <div class="motto">&ldquo;Beri ARAH Pasti untuk Masa Depannya.&rdquo;</div>
          <div class="sub-desc">Laporan Hasil Asesmen Dermatoglyphics Multiple Intelligence Test (DMIT)</div>
        </div>

        <!-- KOTAK DATA DIRI SISWA -->
        <div class="identity-card">
          <div class="identity-grid">
            <div class="id-field">
              <span class="label">Nama Lengkap Siswa:</span>
              <span class="val">${escapeHtml(studentName)}</span>
            </div>
            <div class="id-field">
              <span class="label">Tempat, Tgl Lahir:</span>
              <span class="val">${escapeHtml(client.birthPlace || 'Depok')}, ${escapeHtml(client.birthDate || '-')}</span>
            </div>
            <div class="id-field">
              <span class="label">Usia Saat Asesmen:</span>
              <span class="val val-accent">${client.ageYears} Thn ${client.ageMonths} Bln</span>
            </div>
            <div class="id-field">
              <span class="label">Gender &amp; Kelas:</span>
              <span class="val">${escapeHtml(client.gender)} &bull; ${escapeHtml(client.schoolOrClass || '-')}</span>
            </div>
            <div class="id-field">
              <span class="label">Total Ridge Count (TFRC):</span>
              <span class="val val-success">${metrics.tfrc} Garis (${escapeHtml(tfrc.speedRating || 'Normal')})</span>
            </div>
            <div class="id-field">
              <span class="label">Pemeriksa Resmi:</span>
              <span class="val">${escapeHtml(resolvedExaminer)}</span>
            </div>
            <div class="id-field">
              <span class="label">Tanggal Pengujian:</span>
              <span class="val">${escapeHtml(assessmentDate)}</span>
            </div>
            <div class="id-field">
              <span class="label">Status Sidik Jari:</span>
              <span class="val">${metrics.missingCount > 0 ? `${metrics.missingCount} Missing (Dinormalisasi)` : '10 Jari Lengkap'}</span>
            </div>
          </div>
        </div>

        <!-- BAGIAN A: DOMINASI BELAHAN OTAK -->
        <div class="section-title">
          <span class="section-letter">A</span>
          <h2>Cara Berpikir Alami: Belahan Otak Kiri vs Belahan Otak Kanan</h2>
        </div>

        <div class="brain-visual">
          <div class="dual-bar-labels">
            <span class="left-side">Belahan Otak Kiri: ${brain.leftPercentage}%</span>
            <span class="right-side">Belahan Otak Kanan: ${brain.rightPercentage}%</span>
          </div>
          <div class="dual-bar-track">
            <div class="dual-bar-fill-left" style="width: ${brain.leftPercentage}%;">
              ${brain.leftPercentage >= 15 ? `${brain.leftPercentage}% Kiri` : ''}
            </div>
            <div class="dual-bar-fill-right" style="width: ${brain.rightPercentage}%;">
              ${brain.rightPercentage >= 15 ? `${brain.rightPercentage}% Kanan` : ''}
            </div>
          </div>

          <div class="two-cols">
            <div class="hemi-box">
              <div class="hemi-box-header">
                <span class="hemi-box-title left">1. Otak Kiri (${brain.leftPercentage}%)</span>
                <span class="hemi-tag">${brain.leftPercentage >= brain.rightPercentage ? 'Dominan' : 'Pendukung'}</span>
              </div>
              <div class="keywords">
                <span class="kw">Berpikir Runtut</span>
                <span class="kw">Suka Fakta</span>
                <span class="kw">Teratur &amp; Rapi</span>
                <span class="kw">Langkah demi Langkah</span>
              </div>
              <p class="hemi-desc">
                Mengatur cara berpikir runtut, teratur, dan analitis. Anak menyukai aturan jelas, langkah-demi-langkah, dan bukti nyata sebelum bertindak.
              </p>
            </div>

            <div class="hemi-box">
              <div class="hemi-box-header">
                <span class="hemi-box-title right">2. Otak Kanan (${brain.rightPercentage}%)</span>
                <span class="hemi-tag teal">${brain.rightPercentage > brain.leftPercentage ? 'Dominan' : 'Pendukung'}</span>
              </div>
              <div class="keywords">
                <span class="kw">Kaya Ide Baru</span>
                <span class="kw">Imajinasi Tinggi</span>
                <span class="kw">Kepekaan Seni</span>
                <span class="kw">Melihat Gambaran Luas</span>
              </div>
              <p class="hemi-desc">
                Mengatur daya cipta ide baru, kepekaan seni, dan imajinasi. Anak cepat melihat gambaran besar, kreatif mencari solusi, dan suka kebebasan berekspresi.
              </p>
            </div>
          </div>

          <div class="conclusion-box">
            <strong>Kesimpulan Bagian A (Cara Berpikir Alami):</strong>
            ${escapeHtml(brain.sectionConclusion || brain.detail || brain.summary)}
          </div>
        </div>

        <!-- BAGIAN B: 8 KECERDASAN MAJEMUK (RINGKASAN & TOP 4) -->
        <div class="section-title">
          <span class="section-letter teal">B</span>
          <h2>Pemetaan 8 Bakat Kecerdasan Alami Anak (Howard Gardner) - Ringkasan</h2>
        </div>

        <div class="gardner-page1-layout">
          <div class="radar-box">
            <svg viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="80" fill="none" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="3 3"/>
              <circle cx="100" cy="100" r="55" fill="none" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="3 3"/>
              <circle cx="100" cy="100" r="30" fill="none" stroke="#cbd5e1" stroke-width="1"/>
              <!-- 8 Axis lines -->
              <line x1="100" y1="100" x2="100" y2="20" stroke="#cbd5e1" stroke-width="1"/>
              <line x1="100" y1="100" x2="156.6" y2="43.4" stroke="#cbd5e1" stroke-width="1"/>
              <line x1="100" y1="100" x2="180" y2="100" stroke="#cbd5e1" stroke-width="1"/>
              <line x1="100" y1="100" x2="156.6" y2="156.6" stroke="#cbd5e1" stroke-width="1"/>
              <line x1="100" y1="100" x2="100" y2="180" stroke="#cbd5e1" stroke-width="1"/>
              <line x1="100" y1="100" x2="43.4" y2="156.6" stroke="#cbd5e1" stroke-width="1"/>
              <line x1="100" y1="100" x2="20" y2="100" stroke="#cbd5e1" stroke-width="1"/>
              <line x1="100" y1="100" x2="43.4" y2="43.4" stroke="#cbd5e1" stroke-width="1"/>
              <!-- Polygon -->
              <polygon points="${radarPoints}" fill="rgba(79, 70, 229, 0.28)" stroke="#4338ca" stroke-width="2.5"/>
              <circle cx="100" cy="100" r="3" fill="#4338ca"/>
            </svg>
            <div class="radar-caption">Grafik Sebaran Bakat Anak</div>
          </div>

          <div class="top4-grid">
            ${top4Cards}
          </div>

          <div class="summary-text-box">
            Dua bakat alami paling menonjol pada anak adalah <strong>${escapeHtml(intelligences[0]?.name || '-')}</strong> (${intelligences[0]?.score || 0}%) dan <strong>${escapeHtml(intelligences[1]?.name || '-')}</strong> (${intelligences[1]?.score || 0}%). Merupakan bakat alami terbaik yang paling mudah dikembangkan menjadi prestasi gemilang.
          </div>
        </div>
      </div>

      <!-- FOOTER HALAMAN 1 -->
      <div class="running-footer">
        <span class="copyright">${escapeHtml(resolvedFooter)}</span>
        <span class="page-number">Halaman 1 dari 4</span>
      </div>
    </div>

    <!-- =====================================================================
         HALAMAN 2: MATRIKS DETAIL 8 KECERDASAN & GAYA BELAJAR VAK
         ===================================================================== -->
    <div class="a4-page">
      <div class="page-content">
        <div class="running-header">
          <span>${escapeHtml(resolvedInstitution)} &bull; Asesmen DMIT ARAH</span>
          <span>Halaman 2 dari 4</span>
        </div>

        <div class="section-title">
          <span class="section-letter teal">B</span>
          <h2>Matriks Detail 8 Bakat Kecerdasan Alami Anak (Lanjutan)</h2>
        </div>

        <table class="intel-table">
          <thead>
            <tr>
              <th class="col-rank">No</th>
              <th>Bakat Kecerdasan &amp; Karakteristik Alami</th>
              <th class="col-level">Tingkat Bakat</th>
              <th class="col-score">Skor Potensi</th>
            </tr>
          </thead>
          <tbody>
            ${intelligenceRows}
          </tbody>
        </table>

        <div class="conclusion-box teal" style="margin-bottom: 12px;">
          <strong>Kesimpulan Bagian B (Bakat Alami Anak):</strong>
          ${escapeHtml(intelligencesConclusion)}
        </div>

        <!-- BAGIAN C: GAYA BELAJAR VAK -->
        <div class="section-title">
          <span class="section-letter">C</span>
          <h2>Gaya Belajar Paling Nyaman (VAK: Visual, Auditori, Kinestetik)</h2>
        </div>

        <div class="vak-container">
          <div class="vak-cards">
            <div class="vak-card ${vak.dominantStyle.includes('Visual') ? 'active-visual' : ''}">
              <div class="label">Visual (Lewat Mata)</div>
              <span class="score indigo">${vak.visual}%</span>
              <p class="desc">Paham lewat gambar, bagan warna, diagram alur, video edukasi, dan tulisan berstabilo.</p>
            </div>
            <div class="vak-card ${vak.dominantStyle.includes('Auditori') ? 'active-auditory' : ''}">
              <div class="label">Auditori (Lewat Telinga)</div>
              <span class="score teal">${vak.auditory}%</span>
              <p class="desc">Paham lewat mendengarkan penjelasan guru, cerita, diskusi tanya-jawab, atau membaca bersuara.</p>
            </div>
            <div class="vak-card ${vak.dominantStyle.includes('Kinestetik') ? 'active-kinesthetic' : ''}">
              <div class="label">Kinestetik (Gerak &amp; Praktik)</div>
              <span class="score amber">${vak.kinesthetic}%</span>
              <p class="desc">Paham lewat praktik langsung, menyentuh alat praktik, eksperimen sains, atau simulasi gerak.</p>
            </div>
          </div>

          <div class="vak-bar-track">
            <div class="vak-bar-v" style="width: ${vak.visual}%;">V: ${vak.visual}%</div>
            <div class="vak-bar-a" style="width: ${vak.auditory}%;">A: ${vak.auditory}%</div>
            <div class="vak-bar-k" style="width: ${vak.kinesthetic}%;">K: ${vak.kinesthetic}%</div>
          </div>

          <div style="font-size: 8pt; color: #1e293b; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 6px 10px; margin-bottom: 6px;">
            <strong>Gaya Belajar Utama Anak:</strong> Anak paling nyaman belajar dengan gaya <strong style="color: #4338ca;">${escapeHtml(vak.dominantStyle)}</strong>. ${escapeHtml(vak.explanation)}
          </div>

          <div class="vak-strategies">
            <div class="strategy-box">
              <h4>Tips Mengajar di Kelas (Untuk Guru):</h4>
              <ul>
                ${(vak.teacherStrategies || []).map((s) => `<li>${escapeHtml(s)}</li>`).join('')}
              </ul>
            </div>
            <div class="strategy-box">
              <h4>Tips Belajar Menyenangkan di Rumah (Orang Tua &amp; Siswa):</h4>
              <ul>
                ${(vak.studentStrategies || []).map((s) => `<li>${escapeHtml(s)}</li>`).join('')}
              </ul>
            </div>
          </div>

          <div class="conclusion-box" style="margin-top: 8px;">
            <strong>Kesimpulan Bagian C (Cara Belajar Efektif):</strong>
            ${escapeHtml(vak.sectionConclusion || 'Sarana belajar yang sesuai gaya belajar anak membuat materi sulit jadi mudah dipahami dan diingat lebih lama.')}
          </div>
        </div>
      </div>

      <div class="running-footer">
        <span class="copyright">${escapeHtml(resolvedFooter)}</span>
        <span class="page-number">Halaman 2 dari 4</span>
      </div>
    </div>

    <!-- =====================================================================
         HALAMAN 3: KEPRIBADIAN, TFRC & REKOMENDASI PENDIDIKAN / KARIER
         ===================================================================== -->
    <div class="a4-page">
      <div class="page-content">
        <div class="running-header">
          <span>${escapeHtml(resolvedInstitution)} &bull; Asesmen DMIT ARAH</span>
          <span>Halaman 3 dari 4</span>
        </div>

        <div class="personality-tfrc-grid">
          <!-- BAGIAN D: GAYA BERPIKIR & KEPRIBADIAN -->
          <div class="card-boxed">
            <div>
              <h3>D. Karakter Alami &amp; Kebiasaan Sehari-Hari</h3>
              <div style="margin-bottom: 6px;">
                <span style="font-size: 7.2pt; color: #64748b; font-weight: 600;">Tipe Karakter Utama:</span>
                <div style="font-size: 11pt; font-weight: 900; color: #4338ca;">${escapeHtml(personality.primaryType)}</div>
              </div>
              <div style="margin-bottom: 6px;">
                <span style="font-size: 7.2pt; color: #64748b; font-weight: 600; display: block; margin-bottom: 2px;">Ciri Khas Sehari-Hari:</span>
                <div class="tag-cloud">
                  ${(personality.coreCharacteristics || []).map((c) => `<span class="tag-item">${escapeHtml(c)}</span>`).join('')}
                </div>
              </div>
              <div style="font-size: 7.8pt; line-height: 1.35; color: #475569; margin-bottom: 4px;">
                <strong>Cara Mengambil Keputusan:</strong> ${escapeHtml(personality.decisionMakingStyle)}
              </div>
              <div style="font-size: 7.8pt; line-height: 1.35; color: #475569;">
                <strong>Saat Lelah atau Menghadapi Tugas Sulit:</strong> ${escapeHtml(personality.stressResponse)}
              </div>
            </div>
            <div class="conclusion-box" style="margin-top: 6px;">
              <strong>Kesimpulan Karakter &amp; Emosi:</strong>
              ${escapeHtml(personality.sectionConclusion || 'Komunikasi yang hangat dan apresiasi tulus membuat anak makin bersemangat dan percaya diri.')}
            </div>
          </div>

          <!-- BAGIAN E: KAPASITAS TFRC & KUADRAN KECERDASAN -->
          <div class="card-boxed">
            <div>
              <h3>E. Daya Tangkap Otak (TFRC) &amp; Sebaran Potensi</h3>
              <div class="tfrc-highlight">
                <div>
                  <span style="font-size: 7.2pt; color: #64748b; font-weight: 600; display: block;">Daya Tangkap Otak (TFRC):</span>
                  <span class="tfrc-num">${metrics.tfrc} Garis</span>
                </div>
                <div style="text-align: right;">
                  <span style="font-size: 7.2pt; color: #64748b; font-weight: 600; display: block;">Kecepatan Menangkap:</span>
                  <span style="font-size: 8.5pt; font-weight: 800; color: #4338ca;">${escapeHtml(tfrc.speedRating)}</span>
                </div>
              </div>
              <div style="font-size: 7.6pt; line-height: 1.35; color: #475569; margin-bottom: 6px;">
                ${escapeHtml(tfrc.analysis)}
              </div>
              <div>
                <span style="font-size: 7.2pt; color: #64748b; font-weight: 600; display: block; margin-bottom: 2px;">Sebaran 4 Potensi Kecerdasan Anak:</span>
                <div class="quotient-grid">
                  <div class="quotient-card">
                    <span class="q-name">IQ</span>
                    <span class="q-val">${quotients.iq}%</span>
                  </div>
                  <div class="quotient-card">
                    <span class="q-name">EQ</span>
                    <span class="q-val">${quotients.eq}%</span>
                  </div>
                  <div class="quotient-card">
                    <span class="q-name">AQ</span>
                    <span class="q-val">${quotients.aq}%</span>
                  </div>
                  <div class="quotient-card">
                    <span class="q-name">CQ</span>
                    <span class="q-val">${quotients.cq}%</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="conclusion-box teal" style="margin-top: 6px;">
              <strong>Kesimpulan Kapasitas Belajar &amp; Ritme:</strong>
              ${escapeHtml(tfrc.sectionConclusion || 'Jaga ritme belajar teratur 25-30 menit dengan istirahat 5 menit untuk menjaga daya serap otak selalu segar.')}
            </div>
          </div>
        </div>

        <!-- BAGIAN F: REKOMENDASI PENDIDIKAN & KARIER -->
        <div class="section-title">
          <span class="section-letter">F</span>
          <h2>Rekomendasi Pilihan Sekolah, Kuliah, &amp; Cita-Cita Masa Depan</h2>
        </div>

        <div class="recs-grid">
          <div class="rec-card">
            <h4>1. Pilihan Jalur SMA / SMK</h4>
            <div class="rec-highlight">${escapeHtml(recs.highSchoolRecommendation?.recommendedTrack || 'SMA Peminatan MIPA')}</div>
            <p style="color: #475569; margin-bottom: 4px; line-height: 1.35;">${escapeHtml(recs.highSchoolRecommendation?.academicReasoning || '')}</p>
            ${(recs.highSchoolRecommendation?.smkSpecializations?.length ?? 0) > 0 ? `
              <div style="font-size: 7.2pt; color: #64748b;">
                <strong>Opsi Kejuruan (SMK) yang Cocok:</strong>
                <div class="tag-cloud">
                  ${recs.highSchoolRecommendation.smkSpecializations?.map((s) => `<span class="tag-item">${escapeHtml(s)}</span>`).join('')}
                </div>
              </div>
            ` : ''}
          </div>

          <div class="rec-card">
            <h4>2. Pilihan Jurusan Kuliah yang Pas</h4>
            <p style="color: #64748b; font-size: 7.2pt; margin-bottom: 3px;">Jurusan perguruan tinggi paling selaras:</p>
            <ul style="margin-left: 14px; color: #1e293b; font-weight: 700; line-height: 1.45;">
              ${(recs.universityMajors || []).map((m) => `<li>${escapeHtml(m)}</li>`).join('')}
            </ul>
          </div>

          <div class="rec-card">
            <h4>3. Peluang Karier Masa Depan</h4>
            <p style="color: #64748b; font-size: 7.2pt; margin-bottom: 3px;">Bidang profesi dengan prospek terbaik:</p>
            <div class="tag-cloud">
              ${(recs.careerProfessions || []).map((p) => `<span class="tag-item" style="font-weight: 700;">${escapeHtml(p)}</span>`).join('')}
            </div>
          </div>
        </div>

        <div class="conclusion-box">
          <strong>Kesimpulan Bagian F (Arah Masa Depan yang Pasti):</strong>
          ${escapeHtml(recs.sectionConclusion || 'Pilihan jalur akademik dan profesi ini memberikan keselarasan sempurna antara bakat alami anak dan cita-cita masa depannya.')}
        </div>
      </div>

      <div class="running-footer">
        <span class="copyright">${escapeHtml(resolvedFooter)}</span>
        <span class="page-number">Halaman 3 dari 4</span>
      </div>
    </div>

    <!-- =====================================================================
         HALAMAN 4: KESIMPULAN UMUM, PENGESAHAN & LEGALITAS
         ===================================================================== -->
    <div class="a4-page">
      <div class="page-content">
        <div class="running-header">
          <span>${escapeHtml(resolvedInstitution)} &bull; Asesmen DMIT ARAH</span>
          <span>Halaman 4 dari 4</span>
        </div>

        <div class="section-title">
          <span class="section-letter teal">★</span>
          <h2>Kesimpulan Umum &amp; Panduan Pendampingan Anak Hebat</h2>
        </div>

        <div class="exec-summary-card">
          <!-- 1. Core Identity -->
          <div class="exec-block">
            <div class="exec-heading indigo">
              <span>1. Siapakah Sosok Anak Anda Sebenarnya? (Profil Inti Anak)</span>
            </div>
            <p class="exec-text">${escapeHtml(executiveSummary.coreIdentity)}</p>
          </div>

          <!-- 2. Winning Formula -->
          <div class="exec-block">
            <div class="exec-heading cyan">
              <span>2. Resep Rahasia Sukses Belajar Anak (Winning Formula)</span>
            </div>
            <p class="exec-text">${escapeHtml(executiveSummary.winningFormula)}</p>
          </div>

          <!-- 3. Action Plan -->
          <div class="exec-block">
            <div class="exec-heading amber">
              <span>3. Rencana Aksi Nyata 5 Langkah untuk Orang Tua &amp; Guru</span>
            </div>
            <ul class="action-list">
              ${actionPlanItems}
            </ul>
          </div>

          <!-- 4. Counselor Note -->
          <div class="exec-block">
            <div class="exec-heading indigo">
              <span>4. Catatan Kasih Sayang &amp; Motivasi dari Konselor</span>
            </div>
            <p class="counselor-quote">&ldquo;${escapeHtml(executiveSummary.counselorNote)}&rdquo;</p>
          </div>
        </div>

        <!-- KOLOM TANDA TANGAN DAN LEGALITAS RESMI -->
        <div class="signature-grid">
          <div class="sign-col">
            <div style="color: #64748b;">Mengetahui,</div>
            <div class="role">Orang Tua / Wali Siswa</div>
            <div class="sign-space">
              <span class="sign-line"></span>
            </div>
            <div class="sign-meta">( Tanda Tangan &amp; Nama Terang )</div>
          </div>

          <div class="sign-col">
            <div style="color: #64748b;">Diverifikasi &amp; Ditetapkan di Depok,</div>
            <div class="role">${escapeHtml(resolvedExaminer)}</div>
            <div class="sign-space">
              <div>
                <div class="sign-seal-text">${escapeHtml(resolvedInstitution)}</div>
                <span class="sign-line"></span>
              </div>
            </div>
            <div class="sign-meta">NIP / Sertifikasi: ARAH-DMIT-DEPOK-2026</div>
          </div>
        </div>

        <div class="authenticity-note">
          Dokumen ini diterbitkan secara sah oleh ${escapeHtml(resolvedInstitution)} melalui Sistem Analisis Biometrik DMIT ARAH.<br/>
          Dicetak pada: ${escapeHtml(assessmentDate)} &bull; Keabsahan Terverifikasi Resmi.
        </div>
      </div>

      <div class="running-footer">
        <span class="copyright">${escapeHtml(resolvedFooter)}</span>
        <span class="page-number">Halaman 4 dari 4</span>
      </div>
    </div>

  </div>

</body>
</html>`;
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
