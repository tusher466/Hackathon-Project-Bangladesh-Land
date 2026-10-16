import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Search, Compass, ShieldCheck, ArrowRight, Layers, FileCheck, MapPin, Calculator } from 'lucide-react';
import { LAND_SERVICES } from '../../data/seedData';
import { LandService } from '../../types';

interface HeroSectionProps {
  setActiveTab: (tab: string) => void;
  onSelectService: (service: LandService) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setActiveTab, onSelectService }) => {
  const { language, t } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredServices = LAND_SERVICES.filter(s => {
    const term = searchTerm.toLowerCase();
    return (
      s.title.toLowerCase().includes(term) ||
      s.titleBn.includes(term) ||
      s.categoryName.toLowerCase().includes(term) ||
      s.categoryNameBn.includes(term)
    );
  });

  const popularSearches = [
    { label: language === 'bn' ? 'ই-নামজারি' : 'E-Mutation', id: 'e-mutation' },
    { label: language === 'bn' ? 'খতিয়ান ও পর্চা' : 'Khatian / Porcha', id: 'khatian-porcha' },
    { label: language === 'bn' ? 'ভূমি উন্নয়ন কর' : 'Land Tax (Khajna)', id: 'ldtax-payment' },
    { label: language === 'bn' ? 'মৌজা নকশা' : 'Mouza Maps', id: 'mouza-maps' },
    { label: language === 'bn' ? 'খাস জমি অনুসন্ধান' : 'Khas Land', id: 'khas-land' }
  ];

  const handleSelectService = (service: LandService) => {
    setShowSuggestions(false);
    onSelectService(service);
  };

  return (
    <div className="relative bg-linear-to-b from-emerald-900 via-emerald-850 to-slate-900 text-white overflow-hidden py-14 px-4">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10 text-center space-y-6">
        {/* National Initiative Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-800/80 border border-emerald-600/40 rounded-full text-xs text-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>
            {language === 'bn' 
              ? 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার | সমন্বিত ডিজিটাল ভূমি সেবা' 
              : 'People’s Republic of Bangladesh | Integrated Land Administration Gateway'}
          </span>
        </div>

        {/* Hero Headings */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {t.heroTitle}
        </h1>
        <p className="max-w-3xl mx-auto text-sm sm:text-base text-emerald-100/90 font-normal leading-relaxed">
          {t.heroSubtitle}
        </p>

        {/* Global Search Bar */}
        <div className="max-w-2xl mx-auto relative pt-2">
          <div className="relative flex items-center shadow-2xl rounded-2xl overflow-hidden bg-white text-slate-800 border-2 border-emerald-500/40 focus-within:border-emerald-500">
            <Search className="w-5 h-5 text-slate-400 ml-4 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder={t.searchPlaceholder}
              className="w-full py-3.5 px-3 text-xs sm:text-sm outline-none text-slate-800 placeholder-slate-400 font-medium"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="px-2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
            <button
              onClick={() => {
                if (searchTerm && filteredServices.length > 0) {
                  onSelectService(filteredServices[0]);
                } else {
                  setActiveTab('services');
                }
              }}
              className="bg-emerald-800 hover:bg-emerald-900 text-white px-5 py-3.5 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>{t.searchButton}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Autocomplete Dropdown */}
          {showSuggestions && searchTerm.trim().length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 text-left z-30 max-h-72 overflow-y-auto">
              <div className="p-2 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {language === 'bn' ? 'অনুসন্ধান ফলাফল:' : 'Matching Services:'}
              </div>
              {filteredServices.length > 0 ? (
                filteredServices.map(service => (
                  <button
                    key={service.id}
                    onClick={() => handleSelectService(service)}
                    className="w-full text-left p-3 hover:bg-emerald-50 border-b border-slate-100 last:border-0 flex items-start justify-between gap-3 transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-xs sm:text-sm text-slate-900">
                        {language === 'bn' ? service.titleBn : service.title}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                        {language === 'bn' ? service.shortDescBn : service.shortDesc}
                      </div>
                    </div>
                    <span className="shrink-0 text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-medium">
                      {language === 'bn' ? service.categoryNameBn : service.categoryName}
                    </span>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-slate-500">
                  {language === 'bn' ? 'কোনো সুনির্দিষ্ট সেবা পাওয়া যায়নি।' : 'No services found matching your query.'}
                </div>
              )}
            </div>
          )}

          {/* Popular Search Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-emerald-200/90">
            <span className="text-emerald-300 font-medium">
              {language === 'bn' ? 'জনপ্রিয় সেবা:' : 'Popular:'}
            </span>
            {popularSearches.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  const s = LAND_SERVICES.find(srv => srv.id === item.id);
                  if (s) onSelectService(s);
                }}
                className="bg-white/10 hover:bg-white/20 text-emerald-100 px-2.5 py-1 rounded-full text-[11px] transition-colors border border-white/10"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Portal Feature Badges */}
        <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
          <div 
            onClick={() => setActiveTab('services')}
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 cursor-pointer transition-all flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600/30 text-emerald-300 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-xs text-white">
                {language === 'bn' ? '১২টি মূল সেবা' : '12 Core Services'}
              </div>
              <div className="text-[10px] text-emerald-200/70">
                {language === 'bn' ? 'সম্পূর্ণ নির্দেশিকা' : 'Step-by-step guides'}
              </div>
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('mouza-map')}
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 cursor-pointer transition-all flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600/30 text-blue-300 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-xs text-white">
                {language === 'bn' ? 'জিআইএস মৌজা নকশা' : 'Cadastral GIS'}
              </div>
              <div className="text-[10px] text-emerald-200/70">
                {language === 'bn' ? 'দাগ ও সীমানা ভিউয়ার' : 'Plot boundary inspection'}
              </div>
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('offices')}
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 cursor-pointer transition-all flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-600/30 text-amber-300 flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-xs text-white">
                {language === 'bn' ? 'ভূমি অফিস ডিরেক্টরি' : 'Land Offices'}
              </div>
              <div className="text-[10px] text-emerald-200/70">
                {language === 'bn' ? 'উপজেলা ও এসি ল্যান্ড' : 'AC Land & Sub-Registry'}
              </div>
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('complaints')}
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 cursor-pointer transition-all flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-red-600/30 text-red-300 flex items-center justify-center shrink-0">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-xs text-white">
                {language === 'bn' ? 'অভিযোগ প্রতিকার (GRS)' : 'Grievance Cell'}
              </div>
              <div className="text-[10px] text-emerald-200/70">
                {language === 'bn' ? 'অনিয়ম ও বিলম্বের রিপোর্ট' : 'Direct complaint redress'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
