import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { DisclaimerBanner } from './components/common/DisclaimerBanner';
import { HeroSection } from './components/home/HeroSection';
import { TrackingWidget } from './components/home/TrackingWidget';
import { ServiceDirectory } from './components/services/ServiceDirectory';
import { ServiceDetailModal } from './components/services/ServiceDetailModal';
import { ApplicationModal } from './components/services/ApplicationModal';
import { OfficeDirectory } from './components/offices/OfficeDirectory';
import { MouzaMapViewer } from './components/gis/MouzaMapViewer';
import { KhasLandRegistry } from './components/khas/KhasLandRegistry';
import { ComplaintSection } from './components/complaints/ComplaintSection';
import { KnowledgeCenter } from './components/knowledge/KnowledgeCenter';
import { NoticeBoard } from './components/notices/NoticeBoard';
import { CitizenDashboard } from './components/citizen/CitizenDashboard';
import { AdminPortal } from './components/admin/AdminPortal';
import { SystemStatusView } from './components/status/SystemStatusView';
import { LandService } from './types';
import { LAND_SERVICES } from './data/seedData';
import { 
  ArrowRight, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  HelpCircle,
  Building2,
  PhoneCall
} from 'lucide-react';

const AppContent: React.FC = () => {
  const { user, language, t } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('home');

  // Modals
  const [selectedService, setSelectedService] = useState<LandService | null>(null);
  const [applyService, setApplyService] = useState<LandService | null>(null);

  const handleApplyFromModal = (service: LandService) => {
    setSelectedService(null);
    setApplyService(service);
  };

  const handleApplicationSuccess = (ref: string) => {
    // Optionally redirect to citizen tab to see the new application
    setActiveTab('citizen');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Disclaimer Banner */}
      <DisclaimerBanner />

      {/* Persistent Navigation Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-12">
            {/* Hero Section with Live Search */}
            <HeroSection
              setActiveTab={setActiveTab}
              onSelectService={service => setSelectedService(service)}
            />

            {/* Quick Docket / Grievance Tracker */}
            <TrackingWidget />

            {/* Core Services Grid Highlight */}
            <section className="max-w-7xl mx-auto px-4 pt-4">
              <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {t.frequentlyUsedServices}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    {language === 'bn'
                      ? 'অনলাইনে আবেদনের জন্য গুরুত্বপূর্ণ ভূমি সেবাসমূহ'
                      : 'Essential citizen land administration digital gateways'}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('services')}
                  className="text-emerald-800 hover:text-emerald-950 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span>{language === 'bn' ? 'সকল ১২টি সেবা দেখুন' : 'View All 12 Services'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
                {LAND_SERVICES.slice(0, 4).map(service => (
                  <div
                    key={service.id}
                    className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                        {language === 'bn' ? service.categoryNameBn : service.categoryName}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base mt-2.5 group-hover:text-emerald-800 transition-colors">
                        {language === 'bn' ? service.titleBn : service.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1.5 line-clamp-2">
                        {language === 'bn' ? service.shortDescBn : service.shortDesc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedService(service)}
                        className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                      >
                        {t.btnDetails}
                      </button>
                      <button
                        onClick={() => setApplyService(service)}
                        className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                      >
                        <span>{t.btnApply}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Mouza GIS Map Feature Teaser */}
            <section className="max-w-7xl mx-auto px-4">
              <div className="bg-linear-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-3 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-800/80 rounded-full text-xs font-semibold text-emerald-200">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{language === 'bn' ? 'ডিজিটাল ক্যাডাস্ট্রাল জরিপ' : 'Cadastral GIS Engine'}</span>
                  </div>
                  <h3 className="text-xl sm:text-3xl font-bold tracking-tight">
                    {language === 'bn' ? 'ইন্টারঅ্যাকটিভ মৌজা নকশা ও দাগ অনুসন্ধান' : 'Interactive Cadastral Mouza Maps'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {language === 'bn'
                      ? 'অনলাইনে মৌজা ম্যাপের দাগের সীমানা, আয়তন এবং সিএস, এসএ, আরএস ও বিএস রেকর্ডের তুলনা করুন।'
                      : 'Inspect parcel boundaries, measure plot decimals, and cross-reference historical survey volumes directly in your browser.'}
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('mouza-map')}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-2xl text-xs sm:text-sm transition-all flex items-center gap-2 shrink-0 shadow-lg"
                >
                  <span>{language === 'bn' ? 'জিআইএস ম্যাপ চালু করুন' : 'Launch GIS Viewer'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>

            {/* How It Works (4 Steps) */}
            <section className="max-w-7xl mx-auto px-4">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <h3 className="text-lg sm:text-2xl font-bold text-slate-900">
                  {language === 'bn' ? 'সমন্বিত পোর্টালে যেভাবে সেবা পাবেন' : 'How the Portal Streamlines Services'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {language === 'bn'
                    ? 'সরকারি অফিসে অপ্রয়োজনীয় যাতায়াত ছাড়াই স্বচ্ছ ডিজিটাল প্রক্রিয়া'
                    : 'A 4-step transparent journey reducing desk-to-desk delays'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center mx-auto">
                    1
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {language === 'bn' ? 'সেবা অনুসন্ধান' : 'Discover Service'}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {language === 'bn' ? 'প্রয়োজনীয় সেবা, সরকারি ফি ও দলিলের চেকলিস্ট জেনে নিন।' : 'Check eligibility, regulated fees, and mandatory documents.'}
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center mx-auto">
                    2
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {language === 'bn' ? 'অনলাইন আবেদন' : 'Digital Filing'}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {language === 'bn' ? 'জমির তফসিল পূরণ ও দলিলের স্ক্যান কপি আপলোড করুন।' : 'Fill land particulars and attach scanned title deeds securely.'}
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center mx-auto">
                    3
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {language === 'bn' ? 'তদন্ত ও শুনানি ট্র্যাকিং' : 'Track Inquiries'}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {language === 'bn' ? 'সহকারী কমিশনার (ভূমি) আদালতের শুনানির তারিখ ট্র্যাক করুন।' : 'Follow AC Land field inspections and court hearing dates live.'}
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center mx-auto">
                    4
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {language === 'bn' ? 'ডিজিটাল খতিয়ান সংগ্রহ' : 'Obtain Records'}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {language === 'bn' ? 'কিউআর কোডযুক্ত বৈধ খতিয়ান বা পর্চা ডাউনলোড করুন।' : 'Download verified QR-sealed e-Khatians or dispatch by post.'}
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 2. All Services Tab */}
        {activeTab === 'services' && (
          <ServiceDirectory
            onSelectService={service => setSelectedService(service)}
            onApplyService={service => setApplyService(service)}
          />
        )}

        {/* 3. GIS Mouza Map Viewer */}
        {activeTab === 'mouza-map' && (
          <MouzaMapViewer
            onApplyForPorcha={(khatian, dag) => {
              const porchaService = LAND_SERVICES.find(s => s.id === 'khatian-porcha') || LAND_SERVICES[0];
              setApplyService(porchaService);
            }}
            onReportDiscrepancy={dag => {
              setActiveTab('complaints');
            }}
          />
        )}

        {/* 4. Land Office Directory */}
        {activeTab === 'offices' && <OfficeDirectory />}

        {/* 5. Khas Land & Vested Property Explorer */}
        {activeTab === 'khas-land' && <KhasLandRegistry />}

        {/* 6. Knowledge Center & Faraizi Calculator */}
        {activeTab === 'knowledge' && <KnowledgeCenter />}

        {/* 7. Official Notices & Circulars */}
        {activeTab === 'notices' && <NoticeBoard />}

        {/* 8. Complaints & Grievance Cell (GRS) */}
        {activeTab === 'complaints' && <ComplaintSection />}

        {/* 9. Citizen Dashboard */}
        {activeTab === 'citizen' && (
          <CitizenDashboard
            onNewApplication={() => setActiveTab('services')}
            onNewComplaint={() => setActiveTab('complaints')}
          />
        )}

        {/* 10. Admin & Officer Portal */}
        {activeTab === 'admin' && <AdminPortal />}

        {/* 11. System Status & Government Integrations */}
        {activeTab === 'status' && <SystemStatusView />}
      </main>

      {/* Persistent Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onApply={handleApplyFromModal}
      />

      {/* Application Multi-Step Form Modal */}
      <ApplicationModal
        service={applyService}
        onClose={() => setApplyService(null)}
        onSuccess={handleApplicationSuccess}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
