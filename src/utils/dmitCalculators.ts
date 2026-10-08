import { FingerKey, FingerInfo, FingerprintsRecord, CalculatedMetrics, ClientIdentity, DMITAnalysisResult } from '../types/dmit';

export const FINGER_METADATA: Record<FingerKey, FingerInfo> = {
  L1: {
    key: 'L1',
    hand: 'left',
    fingerNameIndo: 'Jempol Kiri',
    fingerNameEn: 'Left Thumb',
    brainLobe: 'Belahan Otak Kanan Depan',
    brainFunction: 'Kepemimpinan alami, visi ke depan, dan kemampuan memotivasi diri sendiri',
    psychometricZone: 'Kepemimpinan & Motivasi Diri',
  },
  L2: {
    key: 'L2',
    hand: 'left',
    fingerNameIndo: 'Telunjuk Kiri',
    fingerNameEn: 'Left Index',
    brainLobe: 'Belahan Otak Kanan Tengah',
    brainFunction: 'Daya imajinasi kreatif, ide-ide segar, dan kemampuan membayangkan bentuk/ruang',
    psychometricZone: 'Kreativitas & Imajinasi Ide',
  },
  L3: {
    key: 'L3',
    hand: 'left',
    fingerNameIndo: 'Jari Tengah Kiri',
    fingerNameEn: 'Left Middle',
    brainLobe: 'Belahan Otak Kanan Atas',
    brainFunction: 'Gerak tubuh, kelincahan fisik, ritme, dan rasa percaya diri saat beraktivitas gerak',
    psychometricZone: 'Kelincahan Gerak Fisik',
  },
  L4: {
    key: 'L4',
    hand: 'left',
    fingerNameIndo: 'Jari Manis Kiri',
    fingerNameEn: 'Left Ring',
    brainLobe: 'Belahan Otak Kanan Samping',
    brainFunction: 'Kepekaan terhadap musik, nada, intonasi suara, dan perasaan orang lain',
    psychometricZone: 'Kepekaan Nada & Suara',
  },
  L5: {
    key: 'L5',
    hand: 'left',
    fingerNameIndo: 'Kelingking Kiri',
    fingerNameEn: 'Left Little',
    brainLobe: 'Belahan Otak Kanan Belakang',
    brainFunction: 'Kepekaan rasa seni, keindahan visual, perpaduan warna, dan keindahan gambar',
    psychometricZone: 'Kepekaan Seni & Gambar',
  },
  R1: {
    key: 'R1',
    hand: 'right',
    fingerNameIndo: 'Jempol Kanan',
    fingerNameEn: 'Right Thumb',
    brainLobe: 'Belahan Otak Kiri Depan',
    brainFunction: 'Kemampuan bergaul, merencanakan kegiatan, kerja sama tim, dan komunikasi sosial',
    psychometricZone: 'Kemampuan Bergaul & Bekerja Sama',
  },
  R2: {
    key: 'R2',
    hand: 'right',
    fingerNameIndo: 'Telunjuk Kanan',
    fingerNameEn: 'Right Index',
    brainLobe: 'Belahan Otak Kiri Tengah',
    brainFunction: 'Kemampuan logika, ketelitian berhitung, penalaran sebab-akibat, dan berpikir runtut',
    psychometricZone: 'Penalaran Logis & Berhitung',
  },
  R3: {
    key: 'R3',
    hand: 'right',
    fingerNameIndo: 'Jari Tengah Kanan',
    fingerNameEn: 'Right Middle',
    brainLobe: 'Belahan Otak Kiri Atas',
    brainFunction: 'Keterampilan tangan halus, kerapian menulis, ketepatan jari, dan keahlian menggunakan alat',
    psychometricZone: 'Keterampilan Tangan & Ketelitian Fisik',
  },
  R4: {
    key: 'R4',
    hand: 'right',
    fingerNameIndo: 'Jari Manis Kanan',
    fingerNameEn: 'Right Ring',
    brainLobe: 'Belahan Otak Kiri Samping',
    brainFunction: 'Daya tangkap bahasa lisan, pemahaman kata, daya ingat pendengaran, dan belajar lewat mendengar',
    psychometricZone: 'Daya Tangkap Bahasa & Pendengaran',
  },
  R5: {
    key: 'R5',
    hand: 'right',
    fingerNameIndo: 'Kelingking Kanan',
    fingerNameEn: 'Right Little',
    brainLobe: 'Belahan Otak Kiri Belakang',
    brainFunction: 'Ketelitian membaca teks, pengamatan simbol, grafik angka, dan kecermatan melihat detail',
    psychometricZone: 'Ketelitian Pengamatan & Membaca',
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
      name: 'Kecerdasan Logika & Hitungan (Logis-Matematis)',
      score: getFingerScore('R2', 3.8),
      explanation: 'Anak sangat jago berpikir runtut, suka berhitung, gemar mencari tahu sebab-akibat, dan senang memecahkan teka-teki atau soal logika.',
    },
    {
      id: 'spatial',
      name: 'Kecerdasan Gambar & Ruang (Spasial-Visual)',
      score: getFingerScore('L2', 3.7),
      explanation: 'Anak memiliki imajinasi hidup, pandai membayangkan bentuk 3D, suka menggambar/desain, dan cepat paham denah, peta, atau diagram visual.',
    },
    {
      id: 'interpersonal',
      name: 'Kecerdasan Bergaul & Memimpin (Interpersonal)',
      score: getFingerScore('R1', 3.6),
      explanation: 'Anak mudah berteman, peka terhadap perasaan sesama, senang bekerja sama dalam kelompok, dan punya bakat alami memimpin.',
    },
    {
      id: 'intrapersonal',
      name: 'Kecerdasan Mengenal Diri Sendiri (Intrapersonal)',
      score: getFingerScore('L1', 3.7),
      explanation: 'Anak sangat mandiri, paham kelebihan serta kekurangan dirinya, berpendirian kokoh, dan tahu cita-cita yang ingin diraih.',
    },
    {
      id: 'linguistic',
      name: 'Kecerdasan Bahasa & Kata (Linguistik-Verbal)',
      score: getFingerScore('R4', 3.5),
      explanation: 'Anak pandai memilih kata, senang bercerita atau menulis, cepat menangkap isi buku bacaan, dan luwes menyampaikan pendapat.',
    },
    {
      id: 'bodily_kinesthetic',
      name: 'Kecerdasan Gerak & Keterampilan Fisik (Kinestetik)',
      score: Math.round((getFingerScore('L3', 3.2) + getFingerScore('R3', 3.2)) / 2),
      explanation: 'Anak lincah bergerak, koordinasi tubuhnya bagus, terampil otak-atik barang atau berolahraga, dan paling cepat paham lewat praktik langsung.',
    },
    {
      id: 'musical',
      name: 'Kecerdasan Nada & Irama (Musikal)',
      score: getFingerScore('L4', 3.3),
      explanation: 'Anak peka terhadap ketukan nada dan musik, mudah mengingat lirik lagu, serta belajar lebih rileks dan fokus saat ditemani irama.',
    },
    {
      id: 'naturalist',
      name: 'Kecerdasan Alam & Lingkungan (Naturalis)',
      score: Math.round((getFingerScore('L5', 3.1) + getFingerScore('R5', 3.1)) / 2),
      explanation: 'Anak menyayangi binatang dan tanaman, tertarik mengamati fenomena alam, dan sangat menikmati proses belajar di luar ruangan.',
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

  let dominantStyle = 'Visual (Mata)';
  if (auditoryPct > visualPct && auditoryPct >= kinestheticPct) dominantStyle = 'Auditori (Telinga)';
  else if (kinestheticPct > visualPct && kinestheticPct > auditoryPct) dominantStyle = 'Kinestetik (Gerak & Praktik)';
  else if (Math.abs(visualPct - auditoryPct) < 5) dominantStyle = 'Visual-Auditori (Mata & Telinga)';

  const speedRating = tfrc > 170 ? 'Sangat Cepat Menangkap' : tfrc > 130 ? 'Cepat & Lincah Adaptif' : tfrc > 100 ? 'Mantap & Stabil' : 'Cermat & Mendalam';

  const top1 = multipleIntelligences[0].id;
  const isScience = top1 === 'logical_mathematical' || top1 === 'spatial' || top1 === 'naturalist';

  const highSchoolRecommendation = {
    recommendedTrack: isScience ? 'SMA Jurusan MIPA / Sains Terapan' : 'SMA Jurusan IPS / Humaniora Terapan',
    smkSpecializations: isScience
      ? ['Rekayasa Perangkat Lunak & AI', 'Mekatronika & Robotika', 'Teknik Desain Pemodelan']
      : ['Manajemen Bisnis Digital', 'Komunikasi & Periklanan Kreatif', 'Perbankan & Akuntansi'],
    academicReasoning: `Berdasarkan bakat alaminya yang unggul pada ${multipleIntelligences[0].name} dan ${multipleIntelligences[1].name}, anak akan sangat nyaman dan mudah berprestasi bila belajar di bidang yang banyak mengasah nalar, analisis nyata, dan pemecahan masalah praktis.`,
  };

  const universityMajors = isScience
    ? ['Teknik Informatika / Ilmu Komputer', 'Data Science & Artificial Intelligence', 'Arsitektur & Desain Perencanaan', 'Teknik Biomedis', 'Fisika / Matematika Terapan']
    : ['Ilmu Hubungan Internasional', 'Manajemen Bisnis & Kewirausahaan', 'Ilmu Komunikasi & Media Digital', 'Psikologi', 'Hukum Bisnis'];

  const careerProfessions = isScience
    ? ['Ahli Kecerdasan Buatan (AI) / Software Engineer', 'Data Scientist / Analis Data', 'Arsitek / Desainer Produk Kreatif', 'Konsultan Teknologi', 'Peneliti R&D']
    : ['Diplomat / Konsultan Hubungan Publik', 'Manajer Operasi Bisnis', 'Creative Director / Produser Media', 'Spesialis Negosiasi & Kemitraan', 'Analis Kebijakan Publik'];

  const institution = institutionName || 'GenZi Academy';

  return {
    brainDominance: {
      leftPercentage: leftBrainPct,
      rightPercentage: rightBrainPct,
      summary: leftBrainPct >= rightBrainPct ? 'Lebih Dominan Otak Kiri (Cenderung Teratur, Rapi, & Suka Fakta)' : 'Lebih Dominan Otak Kanan (Cenderung Kreatif, Penuh Ide, & Imajinatif)',
      detail: leftBrainPct >= rightBrainPct
        ? 'Dalam kehidupan sehari-hari, anak lebih menyukai aturan yang jelas, langkah-langkah yang rapi dan teratur, serta ingin tahu alasan yang masuk akal sebelum mengerjakan sesuatu.'
        : 'Dalam kehidupan sehari-hari, anak memiliki daya imajinasi tinggi, kaya akan ide-ide segar di luar kebiasaan, menyukai hal-hal visual atau seni, dan mudah memahami situasi secara menyeluruh.',
      sectionConclusion: `Cara terbaik membimbing anak adalah memadukan ide-ide kreatifnya (${rightBrainPct}%) dengan jadwal belajar harian yang teratur dan bertahap (${leftBrainPct}%).`,
    },
    multipleIntelligences,
    multipleIntelligencesConclusion: `Dua kecerdasan teratas (${multipleIntelligences[0].name} dan ${multipleIntelligences[1].name}) adalah bakat alami terkuat anak. Kembangkan dua bidang ini lewat pilihan pelajaran, hobi, dan ekstrakurikuler agar anak makin percaya diri dan berprestasi.`,
    learningStyleVAK: {
      visual: visualPct,
      auditory: auditoryPct,
      kinesthetic: kinestheticPct,
      dominantStyle,
      explanation: `Anak paling cepat dan mudah memahami pelajaran lewat gaya belajar ${dominantStyle}. Daya ingat dan semangat belajarnya akan meningkat drastis saat cara belajar disesuaikan dengan gaya ini.`,
      teacherStrategies: [
        'Jelaskan materi pelajaran dengan bahasa sederhana dan hubungkan langsung dengan contoh nyata sehari-hari.',
        'Gunakan gambar, bagan warna, atau video pendek agar konsep pelajaran langsung terbayang di pikiran anak.',
        'Ajak anak berdiskusi singkat atau minta ia menceritakan kembali pemahamannya dengan kata-katanya sendiri.',
        'Sediakan sesi latihan langsung atau eksperimen praktis agar anak tidak hanya sekadar menghafal rumus atau teori.',
      ],
      studentStrategies: [
        'Gunakan stabilo warna-warni untuk menandai bagian buku yang penting agar mata langsung fokus pada intinya.',
        'Buat catatan ringkas berupa peta pikiran (mind map) atau bagan pohon dengan tulisan tangan sendiri.',
        'Saat menghafal poin penting, cobalah membaca sambil bersuara pelan atau ceritakan kembali ke orang tua/teman.',
        'Terapkan waktu belajar yang nyaman: belajar fokus 25 menit, lalu istirahat santai 5 menit sebelum lanjut lagi.',
      ],
      sectionConclusion: `Setiap anak punya pintu masuk informasi yang berbeda. Dengan mendukung gaya belajar ${dominantStyle}, belajar tidak lagi menjadi beban, melainkan kegiatan yang seru dan mudah dipahami.`,
    },
    personalityAndThinking: {
      primaryType: leftBrainPct >= rightBrainPct ? 'Tipe Pemikir Rapi & Terencana (Suka Keteraturan & Bukti Nyata)' : 'Tipe Kreator Lincah & Dinamis (Kaya Ide Baru & Cepat Beradaptasi)',
      coreCharacteristics: [
        'Memiliki rasa ingin tahu yang besar dan senang bertanya "mengapa" serta "bagaimana".',
        'Tekun dan merasa puas bila bisa menyelesaikan tugas sampai tuntas dengan rapi.',
        'Paling bersemangat belajar di lingkungan yang tenang, saling menghargai, dan jelas tujuannya.',
        'Mampu belajar mandiri saat materi yang dipelajari menarik minat dan rasa penasarannya.',
      ],
      decisionMakingStyle: leftBrainPct >= rightBrainPct
        ? 'Mengambil keputusan dengan tenang, menimbang fakta nyata, dan memikirkan akibatnya secara matang.'
        : 'Mengambil keputusan berdasarkan firasat baik, rasa empati, dan keberanian mencoba cara baru.',
      stressResponse: 'Bila tugas terasa menumpuk atau lelah, anak butuh waktu jeda santai sejenak, lalu dibantu memilah tugas mana yang perlu diselesaikan satu per satu.',
      communicationStyle: 'Suka diajak bicara secara jujur, ramah, tidak digurui, dan diberi ruang untuk menyampaikan pendapatnya secara leluasa.',
      sectionConclusion: 'Kunci utama membangkitkan semangat anak adalah komunikasi yang hangat, pujian atas usahanya (bukan hanya hasil akhir), dan arahan yang jelas serta tidak berbelit-belit.',
    },
    learningCapacityTFRC: {
      tfrcValue: tfrc,
      speedRating,
      capacityCategory: speedRating,
      analysis: `Nilai TFRC (${tfrc} garis) menggambarkan daya tampung memori alami dan kecepatan otak anak dalam menyerap pelajaran baru. Pada kategori "${speedRating}", anak memiliki kapasitas otak yang sangat baik untuk belajar berbagai materi sekolah.`,
      sectionConclusion: `Dengan daya tangkap otak sebesar ${tfrc} garis (${speedRating}), anak tidak perlu dipaksa belajar berjam-jam tanpa henti. Cukup belajar rutin 30–45 menit setiap hari dengan suasana nyaman, hasilnya akan jauh lebih maksimal.`,
    },
    quotientOrientation: {
      iq: Math.min(35, Math.max(20, Math.round((leftBrainPct / 100) * 32 + 10))),
      eq: Math.min(35, Math.max(20, Math.round((rightBrainPct / 100) * 30 + 12))),
      aq: 25,
      cq: Math.min(35, Math.max(18, Math.round((rightBrainPct / 100) * 28 + 10))),
      explanation: 'Potensi kecerdasan anak terbagi seimbang antara IQ (daya nalar & logika), EQ (kepekaan emosi & empati), AQ (ketahanan mental saat menghadapi kesulitan), dan CQ (kreativitas ide baru).',
    },
    educationalCareerRecommendations: {
      highSchoolRecommendation,
      universityMajors,
      careerProfessions,
      developmentAdvice: 'Beri anak kesempatan mengikuti kegiatan atau ekstrakurikuler yang disukainya, fasilitasi bacaan pendukung, dan jalin komunikasi santai setiap hari mengenai hal-hal seru yang ia pelajari di sekolah.',
      sectionConclusion: `Pilihan jalur pendidikan ${highSchoolRecommendation.recommendedTrack} dan jurusan kuliah ${universityMajors.slice(0, 2).join(', ')} sangat cocok dengan bakat bawaan anak, sehingga masa depan belajarnya menjadi lebih terarah, ringan dijalani, dan membanggakan.`,
    },
    overallExecutiveSummary: {
      coreIdentity: `Anak memiliki bakat alami istimewa pada ${multipleIntelligences[0].name}, didukung cara berpikir yang ${leftBrainPct >= rightBrainPct ? 'teratur dan logis' : 'kreatif dan banyak ide'}, serta gaya belajar yang mengandalkan ${dominantStyle}. Pada dasarnya, anak adalah sosok yang cerdas, punya rasa ingin tahu tinggi, dan ingin memberikan hasil terbaik bila diarahkan dengan tepat.`,
      winningFormula: `Gunakan cara belajar berbasis ${dominantStyle}, berikan arahan tugas yang jelas tanpa terlalu banyak tekanan, fokuskan pada minat di bidang ${isScience ? 'Sains, Teknologi, dan Eksplorasi Nyata' : 'Komunikasi, Sosial, dan Kreativitas'}, serta berikan apresiasi yang tulus setiap kali ia berusaha keras.`,
      parentTeacherActionPlan: [
        `Dampingi anak belajar dengan cara yang ia sukai (${dominantStyle}), misalnya menggunakan gambar warna, video edukatif, atau mengajak berdiskusi santai.`,
        `Dukung minat dan bakat anak pada ${multipleIntelligences[0].name} dengan memberinya wadah seperti buku menarik, klub sekolah, atau lomba yang menyenangkan.`,
        `Atur jadwal istirahat yang cukup di sela-sela belajar (setiap 25–30 menit belajar fokus, beri jeda santai 5 menit) agar otak tidak cepat lelah.`,
        `Ketika nilai atau hasil tugasnya belum sempurna, beri semangat dan bantu cari letak kesalahannya bersama-sama, tanpa membanding-bandingkannya dengan orang lain.`,
        `Arahkan pemilihan jurusan sekolah (SMA/SMK) dan cita-cita masa depan sesuai rekomendasi bakat alaminya (${highSchoolRecommendation.recommendedTrack}) agar belajarnya selalu terasa menyenangkan.`,
      ],
      counselorNote: `Setiap anak terlahir dengan benih kehebatan masing-masing. Bakat bawaan ini adalah kompas penunjuk jalan. Dengan kasih sayang orang tua dan bimbingan guru yang tepat, anak pasti akan tumbuh menjadi pribadi yang mandiri, percaya diri, dan meraih sukses gemilang.`,
    },
    comprehensiveMarkdownReport: `# ${institution.toUpperCase()}
MODUL MATERI PEMBELAJARAN & LAPORAN ANALISIS DMIT (ARAH)
"Beri ARAH Pasti untuk Masa Depannya."
---
- Nama Klien / Siswa: ${clientIdentity?.fullName || 'Siswa'}
- Tempat, Tanggal Lahir: ${clientIdentity?.birthPlace || 'Depok'}, ${clientIdentity?.birthDate || '-'}
- Usia Saat Asesmen: ${clientIdentity?.ageYears || 0} Tahun ${clientIdentity?.ageMonths || 0} Bulan
- Daya Tangkap Otak (TFRC): ${tfrc} Garis (${speedRating})
- Lembaga Pelaksana: ${institution}

## A. Cara Berpikir Alami: Belahan Otak Kiri vs Kanan
- Belahan Otak Kiri (Teratur, Logis, Fakta): ${leftBrainPct}%
- Belahan Otak Kanan (Kreatif, Penuh Ide, Imajinasi): ${rightBrainPct}%
- Kesimpulan: ${leftBrainPct >= rightBrainPct ? 'Lebih Dominan Otak Kiri (Cenderung Teratur, Rapi, & Suka Fakta)' : 'Lebih Dominan Otak Kanan (Cenderung Kreatif, Penuh Ide, & Imajinatif)'}

## B. 8 Bakat Kecerdasan Alami Anak (Multiple Intelligences)
${multipleIntelligences.map((item) => `${item.rank}. **${item.name}** (${item.score}%) - *Tingkat: ${item.strengthLevel}*\n   Arti Sederhana: ${item.explanation}`).join('\n')}

## C. Gaya Belajar Paling Nyaman (VAK)
- Visual (Lewat Mata/Gambar): ${visualPct}%
- Auditori (Lewat Telinga/Mendengar): ${auditoryPct}%
- Kinestetik (Lewat Gerak/Praktik Langsung): ${kinestheticPct}%
- Gaya Belajar Utama: **${dominantStyle}**

## D. Rekomendasi Pilihan Sekolah, Kuliah, & Cita-Cita Masa Depan
1. **Pilihan Sekolah (SMA/SMK)**: ${highSchoolRecommendation.recommendedTrack}
2. **Pilihan Jurusan Kuliah Ideal**: ${universityMajors.join(', ')}
3. **Pilihan Profesi Masa Depan**: ${careerProfessions.join(', ')}

---
Diverifikasi & Ditetapkan di Depok,
Konselor GenZi Academy
${institution} by. Pak GuruAI`,
  };
}
