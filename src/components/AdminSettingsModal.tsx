import React, { useState } from 'react';
import { AdminSettings, DEFAULT_ADMIN_SETTINGS } from '../services/firebaseClient';
import { Settings, School, Shield, Database, Check, RotateCcw, X, Info } from 'lucide-react';

interface AdminSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AdminSettings;
  onSave: (settings: AdminSettings) => void;
}

export const AdminSettingsModal: React.FC<AdminSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
}) => {
  const [formData, setFormData] = useState<AdminSettings>(settings);
  const [activeTab, setActiveTab] = useState<'general' | 'firebase'>('general');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 700);
  };

  const handleReset = () => {
    setFormData(DEFAULT_ADMIN_SETTINGS);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">Pengaturan Lembaga &amp; Sistem</h3>
              <p className="text-xs text-slate-500">Konfigurasi kop surat resmi, konselor, dan sinkronisasi.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 px-6 pt-3 space-x-4 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`pb-3 transition border-b-2 ${
              activeTab === 'general'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Identitas Lembaga &amp; Kop Surat
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('firebase')}
            className={`pb-3 transition border-b-2 ${
              activeTab === 'firebase'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Konfigurasi Firebase Firestore
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {activeTab === 'general' ? (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1 flex items-center">
                  <School className="w-3.5 h-3.5 mr-1 text-teal-600" />
                  Nama Lembaga / Sekolah (Tampil di Header Laporan)
                </label>
                <input
                  type="text"
                  required
                  value={formData.institutionName}
                  onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                  placeholder="GenZi Academy"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Nilai default: <strong>GenZi Academy</strong>
                </span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 flex items-center">
                  <Shield className="w-3.5 h-3.5 mr-1 text-indigo-600" />
                  Nama Pemeriksa / Konselor Resmi
                </label>
                <input
                  type="text"
                  required
                  value={formData.examinerName}
                  onChange={(e) => setFormData({ ...formData, examinerName: e.target.value })}
                  placeholder="Konselor GenZi Academy"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Footer Copyright Dokumen
                </label>
                <input
                  type="text"
                  required
                  value={formData.copyrightFooter}
                  onChange={(e) => setFormData({ ...formData, copyrightFooter: e.target.value })}
                  placeholder="GenZi Academy by. Pak GuruAI"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition font-mono"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Standar wajib: <strong>GenZi Academy by. Pak GuruAI</strong>
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 flex items-start space-x-2 text-indigo-900">
                <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed">
                  Aplikasi ini otomatis menyimpan seluruh data secara lokal (Offline Ready). Untuk mengaktifkan sinkronisasi langsung ke Google Firebase Firestore proyek Anda, masukkan parameter Firebase di bawah.
                </span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Firebase Project ID</label>
                <input
                  type="text"
                  value={formData.firebaseConfig?.projectId || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      firebaseConfig: {
                        ...(formData.firebaseConfig || {
                          apiKey: '',
                          authDomain: '',
                          projectId: '',
                          storageBucket: '',
                          messagingSenderId: '',
                          appId: '',
                        }),
                        projectId: e.target.value,
                      },
                    })
                  }
                  placeholder="dmit-genesis-medicare"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Firebase Web API Key (Opsional)</label>
                <input
                  type="password"
                  value={formData.firebaseConfig?.apiKey || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      firebaseConfig: {
                        ...(formData.firebaseConfig || {
                          apiKey: '',
                          authDomain: '',
                          projectId: '',
                          storageBucket: '',
                          messagingSenderId: '',
                          appId: '',
                        }),
                        apiKey: e.target.value,
                      },
                    })
                  }
                  placeholder="AIzaSy..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-2 text-slate-500 hover:text-slate-800 text-xs font-semibold flex items-center transition"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              Kembalikan Default
            </button>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                Batal
              </button>

              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs transition flex items-center space-x-1"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Tersimpan!</span>
                  </>
                ) : (
                  <span>Simpan Perubahan</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
