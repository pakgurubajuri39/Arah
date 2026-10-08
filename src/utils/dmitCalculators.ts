import { FingerKey, FingerInfo, FingerprintsRecord, CalculatedMetrics, ClientIdentity, DMITAnalysisResult } from '../types/dmit';

export const FINGER_METADATA: Record<FingerKey, FingerInfo> = {
  L1: {
    key: 'L1',
    hand: 'left',
    fingerNameIndo: 'Jempol Kiri',
    fingerNameEn: 'Left Thumb',
    brainLobe: 'Prefrontal Cortex Kanan',
    brainFunction: 'Kepemimpinan Intuitif, Visi Global, Kesadaran Diri (Intrapersonal)',
    psychometricZone: 'Karakter Pemimpin & Motivasi Diri',
  },
  L2: {
    key: 'L2',
    hand: 'left',
    fingerNameIndo: 'Telunjuk Kiri',
    fingerNameEn: 'Left Index',
    brainLobe: 'Frontal Cortex Kanan',
    brainFunction: 'Imajinasi, Konseptualisasi, Kreativitas Ide, Pemikiran Spasial 3D',
    psychometricZone: 'Kreativitas & Daya Cipta',
  },
  L3: {
    key: 'L3',
    hand: 'left',
    fingerNameIndo: 'Jari Tengah Kiri',
    fingerNameEn: 'Left Middle',
    brainLobe: 'Parietal Cortex Kanan',
    brainFunction: 'Kinestetik Kasar, Ritme Tubuh, Kelenturan & Orientasi Ruang',
    psychometricZone: 'Koordinasi Gerak Fisik',
  },
  L4: {
    key: 'L4',
    hand: 'left',
    fingerNameIndo: 'Jari Manis Kiri',
    fingerNameEn: 'Left Ring',
    brainLobe: 'Temporal Cortex Kanan',
    brainFunction: 'Persepsi Musik, Nada, Suasana Hati, Apresiasi Suara Emosional',
    psychometricZone: 'Kecerdasan Musikal & Sensitivitas Bunyi',
  },
  L5: {
    key: 'L5',
    hand: 'left',
    fingerNameIndo: 'Kelingking Kiri',
    fingerNameEn: 'Left Little',
    brainLobe: 'Occipital Cortex Kanan',
    brainFunction: 'Apresiasi Seni Visual, Estetika Warna, Desain Gambar & Citra',
    psychometricZone: 'Apresiasi Visual & Seni',
  },
  R1: {
    key: 'R1',
    hand: 'right',
    fingerNameIndo: 'Jempol Kanan',
    fingerNameEn: 'Right Thumb',
    brainLobe: 'Prefrontal Cortex Kiri',
    brainFunction: 'Manajemen, Perencanaan Proyek, Komunikasi Antar-Pribadi (Interpersonal)',
    psychometricZone: 'Kemampuan Eksekusi & Interpersonal',
  },
  R2: {
    key: 'R2',
    hand: 'right',
    fingerNameIndo: 'Telunjuk Kanan',
    fingerNameEn: 'Right Index',
    brainLobe: 'Frontal Cortex Kiri',
    brainFunction: 'Logika Deduktif, Analisis Matematika, Tata Bahasa & Struktur Sistematis',
    psychometricZone: 'Penalaran Logis & Bahasa',
  },
  R3: {
    key: 'R3',
    hand: 'right',
    fingerNameIndo: 'Jari Tengah Kanan',
    fingerNameEn: 'Right Middle',
    brainLobe: 'Parietal Cortex Kiri',
    brainFunction: 'Motorik Halus, Presisi Jari, Manipulasi Alat & Kontrol Ketepatan',
    psychometricZone: 'Presisi & Keterampilan Teknis',
  },
  R4: {
    key: 'R4',
    hand: 'right',
    fingerNameIndo: 'Jari Manis Kanan',
    fingerNameEn: 'Right Ring',
    brainLobe: 'Temporal Cortex Kiri',
    brainFunction: 'Pengenalan Bahasa Lisan, Pemahaman Tata Bunyi, Memori Auditori Teks',
    psychometricZone: 'Kecerdasan Linguistik Auditori',
  },
  R5: {
    key: 'R5',
    hand: 'right',
    fingerNameIndo: 'Kelingking Kanan',
    fingerNameEn: 'Right Little',
    brainLobe: 'Occipital Cortex Kiri',
    brainFunction: 'Identifikasi Simbol Visual, Teks Bacaan, Kode, Angka & Pengamatan Teliti',
    psychometricZone: 'Observasi Visual Simbolis',
  },
};

/**
 * Calculates current age in years and months precisely from date of birth string (YYYY-MM-DD)
 */
export function calculateAge(birthDateString: string): { years: number; months: number; text: string } {
  if (!birthDateString) {
    return { years: 0, months: 0, text: '-' };
  }

  const birthDate = new Date(birthDateString);
  if (isNaN(birthDate.getTime())) {
    return { years: 0, months: 0, text: '-' };
  }

  const today = new Date();
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();

  if (today.getDate() < birthDate.getDate()) {
    months--;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  if (years < 0) {
    return { years: 0, months: 0, text: '0 Tahun 0 Bulan' };
  }

  return {
    years,
    months,
    text: `${years} Tahun ${months} Bulan`,
  };
}

/**
 * Calculates TFRC and hand sums, excluding missing fingers from the count.
 */
export function calculateMetrics(fingerprints: FingerprintsRecord): CalculatedMetrics {
  let tfrc = 0;
  let missingCount = 0;
  let leftHandRidgeSum = 0;
  let rightHandRidgeSum = 0;

  const leftKeys: FingerKey[] = ['L1', 'L2', 'L3', 'L4', 'L5'];
  const rightKeys: FingerKey[] = ['R1', 'R2', 'R3', 'R4', 'R5'];

  for (const key of leftKeys) {
    const item = fingerprints[key];
    if (item.pattern === 'Missing/Tidak Lengkap') {
      missingCount++;
    } else {
      const val = Number(item.ridgeCount) || 0;
      leftHandRidgeSum += val;
      tfrc += val;
    }
  }

  for (const key of rightKeys) {
    const item = fingerprints[key];
    if (item.pattern === 'Missing/Tidak Lengkap') {
      missingCount++;
    } else {
      const val = Number(item.ridgeCount) || 0;
      rightHandRidgeSum += val;
      tfrc += val;
    }
  }

  let preliminaryDominance: 'Otak Kiri' | 'Otak Kanan' | 'Seimbang' = 'Seimbang';
  // Remember contralateral control: Left hand stimulates Right Brain, Right hand stimulates Left Brain
  // But also patterns affect dominance. As a preliminary index:
  const diff = Math.abs(leftHandRidgeSum - rightHandRidgeSum);
  const total = leftHandRidgeSum + rightHandRidgeSum;

  if (total > 0 && diff / total > 0.08) {
    if (rightHandRidgeSum > leftHandRidgeSum) {
      preliminaryDominance = 'Otak Kiri';
    } else {
      preliminaryDominance = 'Otak Kanan';
    }
  }

  return {
    tfrc,
    missingCount,
    leftHandRidgeSum,
    rightHandRidgeSum,
    preliminaryDominance,
  };
}

export const INITIAL_FINGERPRINTS: FingerprintsRecord = {
  L1: { pattern: 'Whorl', ridgeCount: 16 },
  L2: { pattern: 'Ulnar Loop', ridgeCount: 14 },
  L3: { pattern: 'Ulnar Loop', ridgeCount: 15 },
  L4: { pattern: 'Whorl', ridgeCount: 17 },
  L5: { pattern: 'Ulnar Loop', ridgeCount: 13 },
  R1: { pattern: 'Whorl', ridgeCount: 18 },
  R2: { pattern: 'Whorl', ridgeCount: 19 },
  R3: { pattern: 'Ulnar Loop', ridgeCount: 14 },
  R4: { pattern: 'Ulnar Loop', ridgeCount: 16 },
  R5: { pattern: 'Ulnar Loop', ridgeCount: 15 },
};

export const INITIAL_CLIENT: ClientIdentity = {
  fullName: 'Ahmad Fauzan Pratama',
  birthPlace: 'Depok',
  birthDate: '2008-04-15',
  ageYears: 18,
  ageMonths: 5,
  gender: 'Laki-laki',
  phone: '081298765432',
  email: 'ahmad.fauzan@student.sch.id',
  address: 'Jl. Margonda Raya No. 45, Beji, Kota Depok',
  schoolOrClass: 'Kelas 11 MIPA 1 - GenZi Academy',
  nisn: '0081234567',
};

export interface SamplePreset {
  id: string;
  label: string;
  description: string;
  client: Partial<ClientIdentity>;
  fingerprints: FingerprintsRecord;
}

export const SAMPLE_PRESETS: SamplePreset[] = [
  {
    id: 'scientist',
    label: 'Profil 1: Calon Saintis & Teknologi (Logis-Spasial Kuat)',
    description: 'Pola Whorl dominan pada jari telunjuk (L2, R2) dan jempol, TFRC tinggi (168 garis).',
    client: {
      fullName: 'Muhammad Raihan Daniswara',
      birthPlace: 'Bandung',
      birthDate: '2009-08-20',
      gender: 'Laki-laki',
      phone: '081321456789',
      email: 'raihan.danis@gmail.com',
      address: 'Komplek Permata Hijau No. 12, Bandung',
      schoolOrClass: 'Kelas 10 - GenZi Academy',
      nisn: '0098765432',
    },
    fingerprints: {
      L1: { pattern: 'Whorl', ridgeCount: 18 },
      L2: { pattern: 'Whorl', ridgeCount: 19 },
      L3: { pattern: 'Ulnar Loop', ridgeCount: 15 },
      L4: { pattern: 'Ulnar Loop', ridgeCount: 16 },
      L5: { pattern: 'Ulnar Loop', ridgeCount: 14 },
      R1: { pattern: 'Whorl', ridgeCount: 18 },
      R2: { pattern: 'Whorl', ridgeCount: 21 },
      R3: { pattern: 'Ulnar Loop', ridgeCount: 16 },
      R4: { pattern: 'Ulnar Loop', ridgeCount: 15 },
      R5: { pattern: 'Whorl', ridgeCount: 16 },
    },
  },
  {
    id: 'diplomat',
    label: 'Profil 2: Calon Diplomat & Komunikator (Interpersonal-Linguistik Kuat)',
    description: 'Pola Loop & Double Loop pada jempol dan jari manis, karakter fleksibel, empati tinggi.',
    client: {
      fullName: 'Aisyah Putri Maharani',
      birthPlace: 'Surabaya',
      birthDate: '2008-11-12',
      gender: 'Perempuan',
      phone: '085712349876',
      email: 'aisyah.putri@gmail.com',
      address: 'Jl. Raya Darmo Indah No. 88, Surabaya',
      schoolOrClass: 'Kelas 11 IPS 2 - GenZi Academy',
      nisn: '0087654321',
    },
    fingerprints: {
      L1: { pattern: 'Double Loop', ridgeCount: 16 },
      L2: { pattern: 'Ulnar Loop', ridgeCount: 14 },
      L3: { pattern: 'Ulnar Loop', ridgeCount: 13 },
      L4: { pattern: 'Whorl', ridgeCount: 17 },
      L5: { pattern: 'Ulnar Loop', ridgeCount: 14 },
      R1: { pattern: 'Double Loop', ridgeCount: 17 },
      R2: { pattern: 'Ulnar Loop', ridgeCount: 15 },
      R3: { pattern: 'Ulnar Loop', ridgeCount: 14 },
      R4: { pattern: 'Whorl', ridgeCount: 18 },
      R5: { pattern: 'Ulnar Loop', ridgeCount: 15 },
    },
  },
  {
    id: 'artist_architect',
    label: 'Profil 3: Calon Arsitek & Desainer Kreatif (Spasial-Kinestetik-Visual)',
    description: 'Pola Radial Loop & Whorl pada L2 & L5, imajinasi visual tiga dimensi dan estetika seni tinggi.',
    client: {
      fullName: 'Nathanael Jonathan Surya',
      birthPlace: 'Yogyakarta',
      birthDate: '2009-02-18',
      gender: 'Laki-laki',
      phone: '081234567890',
      email: 'nathan.surya@gmail.com',
      address: 'Jl. Kaliurang KM 7.5, Sleman, Yogyakarta',
      schoolOrClass: 'Kelas 10 Desain - GenZi Academy',
      nisn: '0091238899',
    },
    fingerprints: {
      L1: { pattern: 'Whorl', ridgeCount: 17 },
      L2: { pattern: 'Radial Loop', ridgeCount: 18 },
      L3: { pattern: 'Whorl', ridgeCount: 16 },
      L4: { pattern: 'Ulnar Loop', ridgeCount: 14 },
      L5: { pattern: 'Whorl', ridgeCount: 19 },
      R1: { pattern: 'Ulnar Loop', ridgeCount: 15 },
      R2: { pattern: 'Whorl', ridgeCount: 17 },
      R3: { pattern: 'Whorl', ridgeCount: 18 },
      R4: { pattern: 'Ulnar Loop', ridgeCount: 13 },
      R5: { pattern: 'Ulnar Loop', ridgeCount: 15 },
    },
  },
];

export function generateClientFallbackPsychometricReport(
  clientIdentity: ClientIdentity,
  fingerprints: FingerprintsRecord,
  calculatedMetrics: CalculatedMetrics,
  institutionName: string = 'GenZi Academy'
): DMITAnalysisResult {
  const tfrc = calculatedMetrics?.tfrc || 150;
  const leftRidge = calculatedMetrics?.leftHandRidgeSum || 75;
  const rightRidge = calculatedMetrics?.rightHandRidgeSum || 75;
  const total = Math.max(1, leftRidge + rightRidge);

  const leftBrainPct = Math.round((rightRidge / total) * 100);
  const rightBrainPct = 100 - leftBrainPct;

  const getFingerScore = (key: FingerKey, baseMultiplier: number = 4) => {
    const f = fingerprints?.[key];
    if (!f || f.pattern === 'Missing/Tidak Lengkap') return 60;
    const count = Number(f.ridgeCount) || 15;
    const patternBonus = f.pattern === 'Whorl' ? 15 : f.pattern === 'Radial Loop' ? 18 : f.pattern === 'Double Loop' ? 14 : 10;
    return Math.min(98, Math.max(45, Math.round(count * baseMultiplier + patternBonus)));
  };

  const intelligencesRaw = [
    {
      id: 'logical_mathematical',
      name: 'Kecerdasan Logis-Matematis',
      score: getFingerScore('R2', 3.8),
      explanation: 'Memiliki kemampuan analisis deduktif yang terstruktur, cepat menangkap pola numerik, dan memecahkan masalah logis secara sistematis.',
    },
    {
      id: 'spatial',
      name: 'Kecerdasan Spasial-Visual',
      score: getFingerScore('L2', 3.7),
      explanation: 'Daya imajinasi konseptual tiga dimensi yang tinggi, mahir memvisualisasikan ide abstrak, rancangan desain, dan pemetaan ruang.',
    },
    {
      id: 'interpersonal',
      name: 'Kecerdasan Interpersonal',
      score: getFingerScore('R1', 3.6),
      explanation: 'Mahir membaca dinamika sosial, berdiplomasi, memotivasi rekan sebaya, dan membangun jejaring kerja sama kolaboratif.',
    },
    {
      id: 'intrapersonal',
      name: 'Kecerdasan Intrapersonal',
      score: getFingerScore('L1', 3.7),
      explanation: 'Kesadaran diri (self-awareness) yang sangat matang, berprinsip kokoh, mandiri, dan memiliki visi tujuan hidup yang jelas.',
    },
    {
      id: 'linguistic',
      name: 'Kecerdasan Linguistik-Verbal',
      score: getFingerScore('R4', 3.5),
      explanation: 'Sensitivitas tinggi terhadap struktur kalimat, artikulasi lisan, kosa kata kaya, serta daya tangkap argumentasi lisan.',
    },
    {
      id: 'bodily_kinesthetic',
      name: 'Kecerdasan Kinestetik-Jasmani',
      score: Math.round((getFingerScore('L3', 3.2) + getFingerScore('R3', 3.2)) / 2),
      explanation: 'Koordinasi motorik dan presisi tangan yang cekatan, responsif dalam aktivitas fisik, manipulasi alat, dan eksperimen langsung.',
    },
    {
      id: 'musical',
      name: 'Kecerdasan Musikal',
      score: getFingerScore('L4', 3.3),
      explanation: 'Peka terhadap modulasi nada, intonasi suara, harmoni ritmis, dan mudah belajar dengan bantuan irama/audio.',
    },
    {
      id: 'naturalist',
      name: 'Kecerdasan Naturalis',
      score: Math.round((getFingerScore('L5', 3.1) + getFingerScore('R5', 3.1)) / 2),
      explanation: 'Peka terhadap pola lingkungan alami, klasifikasi objek sains, ekosistem, dan adaptif terhadap fenomena alam.',
    },
  ];

  intelligencesRaw.sort((a, b) => b.score - a.score);
  const multipleIntelligences = intelligencesRaw.map((item, index) => ({
    ...item,
    rank: index + 1,
    strengthLevel: (index < 2 ? 'Sangat Kuat' : index < 4 ? 'Kuat' : index < 6 ? 'Sedang' : 'Perlu Stimulasi') as 'Sangat Kuat' | 'Kuat' | 'Sedang' | 'Perlu Stimulasi',
  }));

  const visualBase = Number(fingerprints?.L5?.ridgeCount || 15) + Number(fingerprints?.R5?.ridgeCount || 15);
  const auditoryBase = Number(fingerprints?.L4?.ridgeCount || 15) + Number(fingerprints?.R4?.ridgeCount || 15);
  const kinestheticBase = Number(fingerprints?.L3?.ridgeCount || 15) + Number(fingerprints?.R3?.ridgeCount || 15);
  const totalVAK = Math.max(1, visualBase + auditoryBase + kinestheticBase);

  const visualPct = Math.round((visualBase / totalVAK) * 100);
  const auditoryPct = Math.round((auditoryBase / totalVAK) * 100);
  const kinestheticPct = Math.max(0, 100 - visualPct - auditoryPct);

  let dominantStyle = 'Visual';
  if (auditoryPct > visualPct && auditoryPct >= kinestheticPct) dominantStyle = 'Auditori';
  else if (kinestheticPct > visualPct && kinestheticPct > auditoryPct) dominantStyle = 'Kinestetik';
  else if (Math.abs(visualPct - auditoryPct) < 5) dominantStyle = 'Visual-Auditori';

  const speedRating = tfrc > 170 ? 'Sangat Cepat' : tfrc > 130 ? 'Cepat & Adaptif' : tfrc > 100 ? 'Moderat & Stabil' : 'Metodis & Reflektif';

  const top1 = multipleIntelligences[0].id;
  const isScience = top1 === 'logical_mathematical' || top1 === 'spatial' || top1 === 'naturalist';

  const highSchoolRecommendation = {
    recommendedTrack: isScience ? 'SMA Jurusan MIPA / Sains Terapan' : 'SMA Jurusan IPS / Humaniora Terapan',
    smkSpecializations: isScience
      ? ['Rekayasa Perangkat Lunak & AI', 'Mekatronika & Robotika', 'Teknik Desain Pemodelan']
      : ['Manajemen Bisnis Digital', 'Komunikasi & Periklanan Kreatif', 'Perbankan & Akuntansi'],
    academicReasoning: `Profil neokorteks menunjukkan kekuatan dominan pada ${multipleIntelligences[0].name} dan ${multipleIntelligences[1].name}, sangat cocok dengan model berpikir analitis berbasis proyek.`,
  };

  const universityMajors = isScience
    ? ['Teknik Informatika / Ilmu Komputer', 'Data Science & Artificial Intelligence', 'Arsitektur & Perencanaan Spasial', 'Teknik Biomedis', 'Fisika Terapan']
    : ['Ilmu Hubungan Internasional', 'Manajemen & Kewirausahaan Digital', 'Ilmu Komunikasi & Media Baru', 'Psikologi Terapan', 'Hukum Bisnis'];

  const careerProfessions = isScience
    ? ['AI Engineer / Solution Architect', 'Data Scientist', 'Desainer Produk Digital / Arsitek', 'Konsultan Teknologi', 'Peneliti R&D']
    : ['Diplomat / Konsultan Strategi Publik', 'Manajer Operasi Bisnis', 'Creative Director', 'Spesialis Negosiasi & Kemitraan', 'Analis Kebijakan'];

  const institution = institutionName || 'GenZi Academy';

  return {
    brainDominance: {
      leftPercentage: leftBrainPct,
      rightPercentage: rightBrainPct,
      summary: leftBrainPct >= rightBrainPct ? 'Dominan Otak Kiri (Analitis & Terstruktur)' : 'Dominan Otak Kanan (Kreatif & Holistik)',
      detail: `Siswa memiliki kecenderungan ${leftBrainPct >= rightBrainPct ? 'pemikiran logis-sekuensial dan analitis' : 'kreativitas visual, pemikiran lateral, dan intuisi yang tajam'}.`,
      sectionConclusion: `Siswa beroperasi paling efektif ketika ide kreatif (${rightBrainPct}%) diwadahi dalam target dan jadwal aksi terstruktur (${leftBrainPct}%).`,
    },
    multipleIntelligences,
    multipleIntelligencesConclusion: `Kombinasi dua kecerdasan teratas (${multipleIntelligences[0].name} dan ${multipleIntelligences[1].name}) merupakan aset bawaan terbesar siswa yang harus menjadi poros utama dalam memilih mata pelajaran dan kegiatan ekstrakurikuler.`,
    learningStyleVAK: {
      visual: visualPct,
      auditory: auditoryPct,
      kinesthetic: kinestheticPct,
      dominantStyle,
      explanation: `Modalitas penerimaan informasi dominan adalah ${dominantStyle}. Daya serap belajar meningkat signifikan saat materi disajikan dengan stimulasi ${dominantStyle}.`,
      teacherStrategies: [
        'Sajikan materi pembelajaran berbasis studi kasus terstruktur.',
        'Gunakan diagram alur dan infografis untuk memvisualisasikan konsep abstrak.',
        'Beri kesempatan berdiskusi atau mempresentasikan pemahaman secara lisan.',
        'Kaitkan teori pembelajaran dengan simulasi atau pemecahan masalah nyata.',
      ],
      studentStrategies: [
        'Gunakan stabilo warna berbeda untuk menandai poin-poin penting.',
        'Buat rangkuman materi dalam bentuk mind map atau bagan konsep mandiri.',
        'Ulangi materi penting dengan membaca bersuara atau merekam suara sendiri.',
        'Terapkan metode Pomodoro (25 menit belajar fokus, 5 menit jeda istirahat).',
      ],
      sectionConclusion: `Retensi belajar melonjak drastis saat materi disajikan melalui rangsangan sensorik ${dominantStyle} dan strategi belajar yang terpersonalisasi.`,
    },
    personalityAndThinking: {
      primaryType: leftBrainPct >= rightBrainPct ? 'Visioner Analitis & Terencana' : 'Inovator Adaptif & Dinamis',
      coreCharacteristics: [
        'Memiliki rasa ingin tahu tinggi terhadap hubungan sebab-akibat.',
        'Tekun dan berorientasi pada penyelesaian tugas secara sistematis.',
        'Menyukai lingkungan belajar yang tertib, apresiatif, dan memiliki target jelas.',
        'Mandiri dalam mencari referensi tambahan ketika topik materi diminati.',
      ],
      decisionMakingStyle: leftBrainPct >= rightBrainPct ? 'Berbasis data, fakta, dan pertimbangan logis matang.' : 'Berbasis intuisi kreatif, nilai kemanusiaan, dan eksplorasi alternatif.',
      stressResponse: 'Membutuhkan ruang jeda reflektif dan pemetaan ulang skala prioritas saat menghadapi beban tugas tinggi.',
      communicationStyle: 'Lugas, terstruktur, menghargai fakta objektif, dan terbuka terhadap diskusi argumentatif yang konstruktif.',
      sectionConclusion: 'Komunikasi yang hangat, apresiatif, serta kejelasan ekspektasi tugas akan memaksimalkan stabilitas emosi dan daya juang siswa.',
    },
    learningCapacityTFRC: {
      tfrcValue: tfrc,
      speedRating,
      capacityCategory: speedRating,
      analysis: `Total Ridge Count (TFRC) bernilai ${tfrc} garis mencerminkan kepadatan neokorteks dengan kecepatan penyerapan materi kategori ${speedRating}.`,
      sectionConclusion: `Dengan TFRC ${tfrc} garis (${speedRating}), kapasitas pemrosesan otak anak sangat mumpuni. Kunci keberhasilan adalah konsistensi belajar harian 30-45 menit yang berkualitas tinggi.`,
    },
    quotientOrientation: {
      iq: Math.min(35, Math.max(20, Math.round((leftBrainPct / 100) * 32 + 10))),
      eq: Math.min(35, Math.max(20, Math.round((rightBrainPct / 100) * 30 + 12))),
      aq: 25,
      cq: Math.min(35, Math.max(18, Math.round((rightBrainPct / 100) * 28 + 10))),
      explanation: 'Distribusi kuadran kecerdasan menunjukkan potensi seimbang antara IQ (intelektual) dan EQ (kecerdasan emosional).',
    },
    educationalCareerRecommendations: {
      highSchoolRecommendation,
      universityMajors,
      careerProfessions,
      developmentAdvice: 'Kembangkan portofolio karya nyata sejak dini, ikuti kompetisi minat bakat, dan dampingi dengan komunikasi keluarga yang terbuka.',
      sectionConclusion: `Rekomendasi penjurusan ${highSchoolRecommendation.recommendedTrack} dan jalur perguruan tinggi ${universityMajors.slice(0, 2).join(', ')} memberikan keselarasan optimal antara potensi genetik dan masa depan.`,
    },
    overallExecutiveSummary: {
      coreIdentity: `Anak memiliki profil keunggulan genetik berbasis ${multipleIntelligences[0].name} dengan dominasi ${leftBrainPct >= rightBrainPct ? 'Otak Kiri' : 'Otak Kanan'} dan modalitas gaya belajar ${dominantStyle}. Karakter alaminya mandiri, cepat menangkap konsep baru, dan berorientasi pada pencapaian hasil nyata.`,
      winningFormula: `Gunakan metode belajar ${dominantStyle} terstruktur, fokuskan eksplorasi pada bidang ${isScience ? 'Sains & Teknologi' : 'Komunikasi & Humaniora'}, serta berikan ruang otonomi terkontrol dalam pengerjaan tugas sekolah.`,
      parentTeacherActionPlan: [
        `Dampingi anak belajar dengan media ${dominantStyle} (diagram visual, mind-map, atau diskusi tanya-jawab terarah).`,
        `Dukung partisipasi dalam klub atau olimpiade yang mengasah ${multipleIntelligences[0].name} dan ${multipleIntelligences[1].name}.`,
        `Jaga ritme belajar dengan jeda istirahat aktif untuk mencegah kelelahan mental sesuai kapasitas TFRC (${tfrc} garis).`,
        `Arahkan pemilihan mata pelajaran peminatan SMA/SMK sesuai rekomendasi (${highSchoolRecommendation.recommendedTrack}).`,
      ],
      counselorNote: `Potensi bawaan adalah benih unggul; lingkungan belajar yang positif dan dukungan keluarga yang penuh apresiasi adalah tanah subur yang akan membuatnya bertumbuh menjadi prestasi gemilang di masa depan.`,
    },
    comprehensiveMarkdownReport: `# ${institution.toUpperCase()}
MODUL MATERI PEMBELAJARAN & LAPORAN ANALISIS DMIT (ARAH)
"Beri ARAH Pasti untuk Masa Depannya."
---
- Nama Klien / Siswa: ${clientIdentity?.fullName || 'Siswa'}
- Tempat, Tanggal Lahir: ${clientIdentity?.birthPlace || 'Depok'}, ${clientIdentity?.birthDate || '-'}
- Usia Saat Asesmen: ${clientIdentity?.ageYears || 0} Tahun ${clientIdentity?.ageMonths || 0} Bulan
- Total Ridge Count (TFRC): ${tfrc} Garis (${speedRating})
- Lembaga Pelaksana: ${institution}

## A. Dominasi Belahan Otak (Brain Dominance)
- Otak Kiri: ${leftBrainPct}%
- Otak Kanan: ${rightBrainPct}%

## B. 8 Kecerdasan Majemuk (Multiple Intelligences)
${multipleIntelligences.map((item) => `${item.rank}. **${item.name}** (${item.score}%) - *${item.strengthLevel}*: ${item.explanation}`).join('\n')}

## C. Gaya Belajar Alami (VAK Profil)
- Visual: ${visualPct}% | Auditori: ${auditoryPct}% | Kinestetik: ${kinestheticPct}%
- Gaya Belajar Dominan: **${dominantStyle}**

## D. Rekomendasi Pendidikan & Karier
1. **Rekomendasi Penjurusan**: ${highSchoolRecommendation.recommendedTrack}
2. **Program Studi Kuliah Ideal**: ${universityMajors.join(', ')}
3. **Karier Masa Depan**: ${careerProfessions.join(', ')}

---
Diverifikasi & Ditetapkan di Depok,
Konselor GenZi Academy
${institution} by. Pak GuruAI`,
  };
}
