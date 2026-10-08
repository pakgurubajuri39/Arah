import React, { useState } from 'react';
import {
  Compass,
  School,
  LogIn,
  LogOut,
  FileText,
  Bookmark,
  Settings,
  Code,
  Sparkles,
  Lock,
  Menu,
  X,
  Fingerprint,
} from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'form' | 'report' | 'saved' | 'guide';
  setCurrentView: (view: 'landing' | 'form' | 'report' | 'saved' | 'guide') => void;
  isAdminLoggedIn: boolean;
  onOpenLogin: () => void;
  onLogout: () => void;
  onOpenSettings: () => void;
  institutionName: string;
  hasCurrentReport: boolean;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  isAdminLoggedIn,
  onOpenLogin,
  onLogout,
  onOpenSettings,
  institutionName,
  hasCurrentReport,
  savedCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: 'landing' | 'form' | 'report' | 'saved' | 'guide') => {
    setMobileMenuOpen(false);
    if (!isAdminLoggedIn && (view === 'form' || view === 'saved' || view === 'guide')) {
      onOpenLogin();
      return;
    }
    setCurrentView(view);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs print:hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand: ARAH (Analisa Rahasia Anak Hebat) */}
          <div
            className="flex items-center space-x-2.5 sm:space-x-3.5 cursor-pointer shrink-0"
            onClick={() => setCurrentView('landing')}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-teal-500 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Compass className="w-6 h-6 sm:w-7 sm:h-7 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base sm:text-xl text-slate-900 tracking-tight">
                  ARAH
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-bold bg-indigo-50 text-indigo-700 rounded-md border border-indigo-200">
                  <Sparkles className="w-3 h-3 mr-1 text-indigo-500" />
                  DMIT AI
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-indigo-600 font-semibold tracking-tight leading-none hidden xs:block">
                Analisa Rahasia Anak Hebat
              </p>
              <p className="text-[10px] sm:text-[11px] text-slate-500 flex items-center truncate max-w-[150px] sm:max-w-xs mt-0.5">
                <School className="w-3 h-3 mr-1 text-teal-600 inline-block shrink-0" />
                <span className="truncate">{institutionName || 'GenZi Academy'}</span>
              </p>
            </div>
          </div>

          {/* Desktop & Tablet Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <button
              onClick={() => handleNavClick('landing')}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                currentView === 'landing'
                  ? 'bg-slate-100 text-indigo-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Beranda
            </button>

            <button
              onClick={() => handleNavClick('form')}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-1.5 ${
                currentView === 'form'
                  ? 'bg-indigo-50 text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Fingerprint className="w-4 h-4 text-indigo-600" />
              <span>Input &amp; Scan Sidik Jari</span>
              {!isAdminLoggedIn && <Lock className="w-3 h-3 text-slate-400 ml-1" />}
            </button>

            {hasCurrentReport && isAdminLoggedIn && (
              <button
                onClick={() => handleNavClick('report')}
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  currentView === 'report'
                    ? 'bg-teal-50 text-teal-700 font-bold'
                    : 'text-slate-600 hover:text-teal-700 hover:bg-teal-50/50'
                }`}
              >
                <span className="inline-flex items-center">
                  <FileText className="w-3.5 h-3.5 mr-1" />
                  Hasil Analisis
                </span>
              </button>
            )}

            <button
              onClick={() => handleNavClick('saved')}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all relative flex items-center space-x-1 ${
                currentView === 'saved'
                  ? 'bg-slate-100 text-indigo-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-indigo-600" />
              <span>Arsip Klien</span>
              {!isAdminLoggedIn ? (
                <Lock className="w-3 h-3 text-slate-400 ml-1" />
              ) : (
                savedCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 bg-indigo-600 text-white rounded-full text-[10px] font-bold">
                    {savedCount}
                  </span>
                )
              )}
            </button>

            <button
              onClick={() => handleNavClick('guide')}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-1 ${
                currentView === 'guide'
                  ? 'bg-amber-50 text-amber-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
              title="Struktur Next.js, Firebase & Vercel Deploy"
            >
              <Code className="w-3.5 h-3.5 text-amber-600" />
              <span>Panduan</span>
              {!isAdminLoggedIn && <Lock className="w-3 h-3 text-slate-400 ml-1" />}
            </button>
          </nav>

          {/* Action buttons & Admin status */}
          <div className="flex items-center space-x-1.5 sm:space-x-3">
            {isAdminLoggedIn && (
              <button
                onClick={onOpenSettings}
                className="p-2 sm:p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
                title="Pengaturan Lembaga & Sistem"
                aria-label="Pengaturan"
              >
                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}

            {isAdminLoggedIn ? (
              <div className="flex items-center space-x-2">
                <span className="hidden md:inline-flex items-center text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                  Admin Aktif
                </span>
                <button
                  onClick={onLogout}
                  className="inline-flex items-center px-3 py-1.5 sm:py-2 text-xs font-semibold text-slate-700 hover:text-red-600 hover:bg-red-50 border border-slate-200 rounded-xl transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5 sm:mr-1" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="inline-flex items-center px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-xl shadow-md shadow-indigo-200 transition-all"
              >
                <LogIn className="w-3.5 h-3.5 mr-1.5" />
                <span>Login Admin</span>
              </button>
            )}

            {/* Mobile / Tablet Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu for Small Tablet and Phones */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-md px-4 pt-3 pb-5 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => handleNavClick('landing')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
              currentView === 'landing' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>Beranda</span>
          </button>

          <button
            onClick={() => handleNavClick('form')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
              currentView === 'form' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Fingerprint className="w-4 h-4 text-indigo-600" />
              <span>Input &amp; Scan Sidik Jari</span>
            </div>
            {!isAdminLoggedIn && <Lock className="w-3.5 h-3.5 text-slate-400" />}
          </button>

          {hasCurrentReport && isAdminLoggedIn && (
            <button
              onClick={() => handleNavClick('report')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                currentView === 'report' ? 'bg-teal-50 text-teal-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>Hasil Analisis DMIT</span>
            </button>
          )}

          <button
            onClick={() => handleNavClick('saved')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
              currentView === 'saved' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Bookmark className="w-4 h-4 text-indigo-600" />
              <span>Arsip Klien</span>
            </div>
            {!isAdminLoggedIn ? (
              <Lock className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              savedCount > 0 && (
                <span className="px-2 py-0.5 bg-indigo-600 text-white rounded-full text-xs font-bold">
                  {savedCount}
                </span>
              )
            )}
          </button>

          <button
            onClick={() => handleNavClick('guide')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
              currentView === 'guide' ? 'bg-amber-50 text-amber-800' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-amber-600" />
              <span>Panduan Next.js / Vercel</span>
            </div>
            {!isAdminLoggedIn && <Lock className="w-3.5 h-3.5 text-slate-400" />}
          </button>

          {isAdminLoggedIn && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSettings();
              }}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
            >
              <Settings className="w-4 h-4 text-slate-500" />
              <span>Pengaturan Lembaga</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
