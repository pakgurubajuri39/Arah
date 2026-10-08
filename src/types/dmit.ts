export type FingerprintPattern =
  | 'Whorl'
  | 'Ulnar Loop'
  | 'Radial Loop'
  | 'Arch'
  | 'Double Loop'
  | 'Missing/Tidak Lengkap';

export type FingerKey = 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'R1' | 'R2' | 'R3' | 'R4' | 'R5';

export interface FingerprintItem {
  pattern: FingerprintPattern;
  ridgeCount: number;
}

export type FingerprintsRecord = Record<FingerKey, FingerprintItem>;

export interface ClientIdentity {
  fullName: string;
  birthPlace: string;
  birthDate: string;
  ageYears: number;
  ageMonths: number;
  gender: 'Laki-laki' | 'Perempuan';
  phone: string;
  email: string;
  address: string;
  schoolOrClass?: string;
  nisn?: string;
}

export interface CalculatedMetrics {
  tfrc: number;
  missingCount: number;
  leftHandRidgeSum: number;
  rightHandRidgeSum: number;
  preliminaryDominance: 'Otak Kiri' | 'Otak Kanan' | 'Seimbang';
}

export interface IntelligenceItem {
  id: string;
  name: string;
  score: number;
  rank: number;
  strengthLevel: 'Sangat Kuat' | 'Kuat' | 'Sedang' | 'Perlu Stimulasi' | string;
  explanation: string;
  practicalTips?: string;
}

export interface DMITAnalysisResult {
  brainDominance: {
    leftPercentage: number;
    rightPercentage: number;
    summary: string;
    detail: string;
    sectionConclusion?: string;
  };
  multipleIntelligences: IntelligenceItem[];
  multipleIntelligencesConclusion?: string;
  learningStyleVAK: {
    visual: number;
    auditory: number;
    kinesthetic: number;
    dominantStyle: string;
    explanation: string;
    teacherStrategies: string[];
    studentStrategies: string[];
    sectionConclusion?: string;
  };
  personalityAndThinking: {
    primaryType: string;
    coreCharacteristics: string[];
    decisionMakingStyle: string;
    stressResponse: string;
    communicationStyle?: string;
    sectionConclusion?: string;
  };
  learningCapacityTFRC: {
    tfrcValue: number;
    speedRating: string;
    analysis: string;
    capacityCategory: string;
    sectionConclusion?: string;
  };
  quotientOrientation: {
    iq: number;
    eq: number;
    aq: number;
    cq: number;
    explanation: string;
  };
  educationalCareerRecommendations: {
    highSchoolRecommendation: {
      recommendedTrack: string;
      smkSpecializations?: string[];
      academicReasoning: string;
    };
    universityMajors: string[];
    careerProfessions: string[];
    developmentAdvice: string;
    sectionConclusion?: string;
  };
  overallExecutiveSummary?: {
    coreIdentity: string;
    winningFormula: string;
    parentTeacherActionPlan: string[];
    counselorNote: string;
  };
  comprehensiveMarkdownReport: string;
}

export interface SavedReport {
  id: string;
  clientIdentity: ClientIdentity;
  fingerprints: FingerprintsRecord;
  calculatedMetrics: CalculatedMetrics;
  analysis: DMITAnalysisResult;
  institutionName: string;
  examinerName: string;
  createdAt: string;
}

export interface FingerInfo {
  key: FingerKey;
  hand: 'left' | 'right';
  fingerNameIndo: string;
  fingerNameEn: string;
  brainLobe: string;
  brainFunction: string;
  psychometricZone: string;
}
