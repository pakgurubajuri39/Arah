import { SavedReport } from '../types/dmit';

const STORAGE_KEY = 'dmit_saved_reports_v1';
const SETTINGS_KEY = 'dmit_admin_settings_v1';

export interface AdminSettings {
  institutionName: string;
  examinerName: string;
  copyrightFooter: string;
  firebaseConfig?: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
}

export const DEFAULT_ADMIN_SETTINGS: AdminSettings = {
  institutionName: 'GenZi Academy',
  examinerName: 'Konselor GenZi Academy',
  copyrightFooter: 'GenZi Academy by. Pak GuruAI',
};

export function getAdminSettings(): AdminSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.institutionName === 'SMA Genesis Medicare' || !parsed.institutionName) {
        parsed.institutionName = 'GenZi Academy';
      }
      if (parsed.examinerName === 'Waka Kurikulum / Konselor BK' || !parsed.examinerName) {
        parsed.examinerName = 'Konselor GenZi Academy';
      }
      if (parsed.copyrightFooter === '@Copyright by. Pak GuruAI' || !parsed.copyrightFooter) {
        parsed.copyrightFooter = 'GenZi Academy by. Pak GuruAI';
      }
      return { ...DEFAULT_ADMIN_SETTINGS, ...parsed };
    }
  } catch (e) {
    console.error('Failed to load admin settings', e);
  }
  return DEFAULT_ADMIN_SETTINGS;
}

export function saveAdminSettings(settings: AdminSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save admin settings', e);
  }
}

export function getSavedReports(): SavedReport[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to parse saved reports', e);
  }
  return [];
}

export function saveReportLocal(report: SavedReport): void {
  const existing = getSavedReports();
  const index = existing.findIndex((r) => r.id === report.id);
  if (index >= 0) {
    existing[index] = report;
  } else {
    existing.unshift(report);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function deleteReportLocal(id: string): void {
  const existing = getSavedReports();
  const filtered = existing.filter((r) => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

/**
 * Next.js & Firebase Integration Snippet Generator
 * Returns the exact code needed for their Next.js project
 */
export function getFirebaseConfigCode(projectId: string = 'dmit-analyzer-app'): string {
  return `// lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSy...",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "${projectId}.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "${projectId}",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "${projectId}.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1234567890:web:abcdef"
};

// Initialize Firebase (prevent multiple initializations in Next.js SSR)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
`;
}
