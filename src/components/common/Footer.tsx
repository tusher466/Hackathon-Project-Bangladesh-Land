import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { PhoneCall, ShieldCheck, ExternalLink, HelpCircle, FileText, Building2, MapPin } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const { language, t } = useAuth();

  const officialLinks = [
    { title: 'Ministry of Land (ভূমি মন্ত্রণালয়)', url: 'https://minland.gov.bd' },
    { title: 'DLRS - Land Records & Surveys (ভূমি রেকর্ড ও জরিপ)', url: 'https://dlrs.gov.bd' },
    { title: 'National e-Porcha System (ই-পর্চা)', url: 'https://eporcha.gov.bd' },
    { title: 'E-Mutation Portal (ই-নামজারি)', url: 'https://mutation.land.gov.bd' },
    { title: 'Land Development Tax Portal (ভূমি উন্নয়ন কর)', url: 'https://ldtax.gov.bd' },
    { title: 'Directorate of Registration (নিবন্ধন অধিদপ্তর)', url: 'https://registration.gov.bd' },
    { title: 'Central Grievance Redress System (জিআরএস)', url: 'https://grs.gov.bd' }
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-xs mt-16">
      {/* Top Hotline & Support Banner */}
      <div className="bg-emerald-900/90 text-white py-4 px-4 border-b border-emerald-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center shrink-0 shadow-xs">
              <PhoneCall className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base">
                {language === 'bn' ? 'ভূমি সেবা কল সেন্টার: ১৬১২২' : 'Land Service Citizen Hotline: 16122'}
              </div>
              <div className="text-emerald-200 text-xs">
                {language === 'bn' 
                  ? 'ভূমি সংক্রান্ত যেকোনো পরামর্শ, তথ্য বা অভিযোগের জন্য দিনরাত ২৪ ঘণ্টা ফোন করুন (টোল ফ্রি)'
                  : 'Call 24/7 toll-free for land queries, guidance, or grievance submission.'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-800/80 px-2.5 py-1 rounded-md border border-emerald-700">
              {language === 'bn' ? 'সরকারি তথ্য সেবা: ৩৩৩' : 'Govt Info: 333'}
            </span>
            <span className="text-xs bg-emerald-800/80 px-2.5 py-1 rounded-md border border-emerald-700">
              {language === 'bn' ? 'জাতীয় জরুরি সেবা: ৯৯৯' : 'Emergency: 999'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: About BILSP */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>BILSP Bangladesh</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-xs">
            {t.footerAboutDesc}
          </p>
          <div className="pt-2 text-[11px] text-slate-500">
            {language === 'bn' 
              ? 'উদ্যোগ: গণপ্রজাতন্ত্রী বাংলাদেশ সরকার | সমন্বিত ভূমি প্রশাসন ও ডিজিটাইজেশন' 
              : 'Initiative of the People’s Republic of Bangladesh | Integrated Land Digitisation'}
          </div>
        </div>

        {/* Col 2: Portal Navigation */}
        <div className="space-y-2">
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider">
            {t.footerQuickLinks}
          </h4>
          <ul className="space-y-1.5 text-slate-400">
            <li>
              <button onClick={() => setActiveTab('services')} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>{t.navServices}</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('mouza-map')} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{t.navMouzaMap}</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('offices')} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>{t.navOffices}</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('knowledge')} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{t.navKnowledge}</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('status')} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t.navStatus}</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Verified Official Portals */}
        <div className="space-y-2 md:col-span-2">
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider">
            {t.footerOfficialLinks}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400">
            {officialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 transition-colors flex items-center justify-between p-1.5 rounded bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50"
              >
                <span className="truncate pr-1">{link.title}</span>
                <ExternalLink className="w-3 h-3 shrink-0 opacity-70" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Statutory Legal Disclaimer */}
      <div className="bg-slate-950 py-4 px-4 border-t border-slate-800/80 text-[11px] text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <p className="max-w-4xl">
            {t.footerLegalDisclaimer}
          </p>
          <div className="shrink-0 text-slate-500">
            © 2026 BILSP. {t.allRightsReserved}
          </div>
        </div>
      </div>
    </footer>
  );
};
