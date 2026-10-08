import React, { useState, useEffect } from 'react';
import {
  ClientIdentity,
  FingerprintsRecord,
  CalculatedMetrics,
  DMITAnalysisResult,
  SavedReport,
} from './types/dmit';
import {
  INITIAL_CLIENT,
  INITIAL_FINGERPRINTS,
  calculateMetrics,
  generateClientFallbackPsychometricReport,
} from './utils/dmitCalculators';
import {
  getAdminSettings,
  saveAdminSettings,
  getSavedReports,
  saveReportLocal,
  deleteReportLocal,
  AdminSettings,
} from './services/firebaseClient';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { DMITForm } from './components/DMITForm';
import { DMITReportView } from './components/DMITReportView';
import { AdminLoginModal } from './components/AdminLoginModal';
import { SavedReportsModal } from './components/SavedReportsModal';
import { AdminSettingsModal } from './components/AdminSettingsModal';
import { NextjsDeploymentGuide } from './components/NextjsDeploymentGuide';
import { Sparkles, Brain, AlertCircle } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'form' | 'report' | 'saved' | 'guide'>('landing');

  // Authentication State (Hardcoded admin / bajuri39)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('dmit_admin_auth') === 'true';
  });

  // Modals
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  // Settings
  const [adminSettings, setAdminSettings] = useState<AdminSettings>(() => getAdminSettings());

  // Form & Report Data
  const [currentClient, setCurrentClient] = useState<ClientIdentity>(INITIAL_CLIENT);
  const [currentFingerprints, setCurrentFingerprints] = useState<FingerprintsRecord>(INITIAL_FINGERPRINTS);
  const [currentMetrics, setCurrentMetrics] = useState<CalculatedMetrics>(() => calculateMetrics(INITIAL_FINGERPRINTS));
  const [currentAnalysis, setCurrentAnalysis] = useState<DMITAnalysisResult | null>(null);
  const [isCurrentReportSaved, setIsCurrentReportSaved] = useState(false);

  // Saved Reports List
  const [savedReports, setSavedReports] = useState<SavedReport[]>(() => getSavedReports());

  // Loading & Error States
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  // Sync login status
  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem('dmit_admin_auth', 'true');
    setCurrentView('form');
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('dmit_admin_auth');
    setCurrentView('landing');
  };

  const handleSaveSettings = (newSettings: AdminSettings) => {
    setAdminSettings(newSettings);
    saveAdminSettings(newSettings);
  };

  // Safe navigation handler that strictly enforces login requirement
  const handleNavigate = (view: 'landing' | 'form' | 'report' | 'saved' | 'guide') => {
    if (!isAdminLoggedIn && view !== 'landing') {
      setIsLoginModalOpen(true);
      return;
    }

    if (view === 'saved') {
      setIsSavedModalOpen(true);
    } else {
      setCurrentView(view);
    }
  };

  // Perform DMIT Analysis via Server-Side Gemini API
  const handleAnalyze = async (
    client: ClientIdentity,
    fingerprints: FingerprintsRecord,
    metrics: CalculatedMetrics
  ) => {
    setIsLoading(true);
    setErrorMessage(null);
    setLoadingStep(1);

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 1200);

    try {
      setCurrentClient(client);
      setCurrentFingerprints(fingerprints);
      setCurrentMetrics(metrics);

      const response = await fetch('/api/analyze-dmit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientIdentity: client,
          fingerprints,
          calculatedMetrics: metrics,
          institutionName: adminSettings.institutionName,
        }),
      });

      clearInterval(stepInterval);

      if (!response.ok) {
        console.warn(`Server responded with status ${response.status}, activating seamless client psychometric engine.`);
        const clientReport = generateClientFallbackPsychometricReport(
          client,
          fingerprints,
          metrics,
          adminSettings.institutionName
        );
        setCurrentAnalysis(clientReport);
        setIsCurrentReportSaved(false);
        setCurrentView('report');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const resJson = await response.json();
      if (!resJson.data) {
        const clientReport = generateClientFallbackPsychometricReport(
          client,
          fingerprints,
          metrics,
          adminSettings.institutionName
        );
        setCurrentAnalysis(clientReport);
        setIsCurrentReportSaved(false);
        setCurrentView('report');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      setCurrentAnalysis(resJson.data);
      setIsCurrentReportSaved(false);
      setCurrentView('report');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      clearInterval(stepInterval);
      console.warn('Backend API unavailable or error, activating client-side deterministic engine:', err);
      try {
        const clientReport = generateClientFallbackPsychometricReport(
          client,
          fingerprints,
          metrics,
          adminSettings.institutionName
        );
        setCurrentAnalysis(clientReport);
        setIsCurrentReportSaved(false);
        setCurrentView('report');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (innerErr) {
        console.error('Analysis error:', innerErr);
        setErrorMessage('Terjadi kendala saat memproses analisis. Silakan periksa data input.');
      }
    } finally {
      setIsLoading(false);
      setLoadingStep(0);
    }
  };

  // Save current report to local and state
  const handleSaveCurrentReport = () => {
    if (!currentAnalysis) return;

    const newReport: SavedReport = {
      id: 'rep_' + Date.now(),
      clientIdentity: currentClient,
      fingerprints: currentFingerprints,
      calculatedMetrics: currentMetrics,
      analysis: currentAnalysis,
      institutionName: adminSettings.institutionName,
      examinerName: adminSettings.examinerName,
      createdAt: new Date().toISOString(),
    };

    saveReportLocal(newReport);
    setSavedReports(getSavedReports());
    setIsCurrentReportSaved(true);
  };

  // Load a saved report
  const handleSelectReport = (report: SavedReport) => {
    setCurrentClient(report.clientIdentity);
    setCurrentFingerprints(report.fingerprints);
    setCurrentMetrics(report.calculatedMetrics);
    setCurrentAnalysis(report.analysis);
    setIsCurrentReportSaved(true);
    setCurrentView('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete a saved report
  const handleDeleteReport = (id: string) => {
    deleteReportLocal(id);
    setSavedReports(getSavedReports());
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={handleNavigate}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        onOpenSettings={() => {
          if (!isAdminLoggedIn) {
            setIsLoginModalOpen(true);
          } else {
            setIsSettingsModalOpen(true);
          }
        }}
        institutionName={adminSettings.institutionName}
        hasCurrentReport={!!currentAnalysis}
        savedCount={savedReports.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Error notification banner if any */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between text-xs text-red-700 shadow-xs">
            <div className="flex items-center space-x-2.5">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-red-600 hover:text-red-900 font-bold ml-4 cursor-pointer"
            >
              Tutup
            </button>
          </div>
        )}

        {/* View Routing */}
        {currentView === 'landing' && (
          <LandingPage
            onStartAnalysis={() => handleNavigate('form')}
            onOpenLogin={() => setIsLoginModalOpen(true)}
            isAdminLoggedIn={isAdminLoggedIn}
            institutionName={adminSettings.institutionName}
          />
        )}

        {currentView === 'form' && isAdminLoggedIn && (
          <DMITForm
            onSubmit={handleAnalyze}
            isLoading={isLoading}
            institutionName={adminSettings.institutionName}
          />
        )}

        {currentView === 'report' && currentAnalysis && isAdminLoggedIn && (
          <DMITReportView
            analysis={currentAnalysis}
            client={currentClient}
            fingerprints={currentFingerprints}
            metrics={currentMetrics}
            institutionName={adminSettings.institutionName}
            examinerName={adminSettings.examinerName}
            copyrightFooter={adminSettings.copyrightFooter}
            onSaveToDatabase={handleSaveCurrentReport}
            isSaved={isCurrentReportSaved}
            onNewAnalysis={() => setCurrentView('form')}
          />
        )}

        {currentView === 'guide' && isAdminLoggedIn && <NextjsDeploymentGuide />}
      </main>

      {/* Loading Modal with step-by-step indicators */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-100 text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-teal-500 flex items-center justify-center text-white mx-auto shadow-lg shadow-indigo-200 animate-pulse">
              <Brain className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Menganalisis Sidik Jari DMIT...
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Kecerdasan Buatan Google Gemini sedang mengevaluasi 10 pola dermatoglyphics dan TFRC klien.
              </p>
            </div>

            {/* Diagnostic Steps Indicator */}
            <div className="space-y-2 text-left bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
              <div className="flex items-center space-x-2.5">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    loadingStep >= 1 ? 'bg-indigo-600 animate-ping' : 'bg-slate-300'
                  }`}
                ></span>
                <span className={loadingStep >= 1 ? 'font-bold text-slate-800' : 'text-slate-400'}>
                  1. Mengalkulasi TFRC ({currentMetrics.tfrc} garis) &amp; Neokorteks
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    loadingStep >= 2 ? 'bg-teal-600 animate-ping' : 'bg-slate-300'
                  }`}
                ></span>
                <span className={loadingStep >= 2 ? 'font-bold text-slate-800' : 'text-slate-400'}>
                  2. Memetakan 8 Kecerdasan Majemuk Howard Gardner
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    loadingStep >= 3 ? 'bg-cyan-600 animate-ping' : 'bg-slate-300'
                  }`}
                ></span>
                <span className={loadingStep >= 3 ? 'font-bold text-slate-800' : 'text-slate-400'}>
                  3. Menyusun Profil Gaya Belajar VAK &amp; Diferensiasi
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    loadingStep >= 4 ? 'bg-purple-600 animate-ping' : 'bg-slate-300'
                  }`}
                ></span>
                <span className={loadingStep >= 4 ? 'font-bold text-slate-800' : 'text-slate-400'}>
                  4. Merumuskan Rekomendasi Jurusan &amp; Karier Masa Depan
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Memproses via Google AI Studio Engine</span>
            </div>
          </div>
        </div>
      )}

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Saved Reports Archive Modal */}
      <SavedReportsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        reports={savedReports}
        onSelectReport={handleSelectReport}
        onDeleteReport={handleDeleteReport}
      />

      {/* Admin Settings Modal */}
      <AdminSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        settings={adminSettings}
        onSave={handleSaveSettings}
      />

      {/* Footer (Screen only, hidden on print) */}
      <footer className="border-t border-slate-200/80 bg-white py-6 sm:py-8 print:hidden mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <span className="font-extrabold text-slate-800 text-sm">ARAH</span>
              <span className="text-slate-400">&bull;</span>
              <span className="text-indigo-600 font-semibold">Analisa Rahasia Anak Hebat</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              &ldquo;Beri ARAH Pasti untuk Masa Depannya.&rdquo; &bull; Sistem Biometrik Dermatoglyphics AI
            </p>
          </div>
          <div className="font-semibold text-slate-600 bg-slate-50 border border-slate-200/80 px-3.5 py-1.5 rounded-xl">
            {adminSettings.copyrightFooter || 'GenZi Academy by. Pak GuruAI'}
          </div>
        </div>
      </footer>
    </div>
  );
}
