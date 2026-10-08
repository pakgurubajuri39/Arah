import { FingerKey, FingerInfo, FingerprintsRecord, CalculatedMetrics, ClientIdentity } from '../types/dmit';

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
