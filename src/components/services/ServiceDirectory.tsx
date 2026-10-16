import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LAND_SERVICES } from '../../data/seedData';
import { LandService, ServiceCategory } from '../../types';
import { 
  Search, 
  Layers, 
  ExternalLink, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Filter
} from 'lucide-react';

interface ServiceDirectoryProps {
  onSelectService: (service: LandService) => void;
  onApplyService: (service: LandService) => void;
}

export const ServiceDirectory: React.FC<ServiceDirectoryProps> = ({ onSelectService, onApplyService }) => {
  const { language, t } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: string; nameEn: string; nameBn: string }[] = [
    { id: 'ALL', nameEn: 'All Services', nameBn: 'সকল সেবা' },
    { id: 'MUTATION_NAMJARI', nameEn: 'Mutation & Namjari', nameBn: 'নামজারি ও জমাখারিজ' },
    { id: 'RECORDS_KHATIAN', nameEn: 'Records & Khatian', nameBn: 'রেকর্ড ও খতিয়ান' },
    { id: 'LAND_TAX', nameEn: 'Land Development Tax', nameBn: 'ভূমি উন্নয়ন কর' },
    { id: 'SURVEY_MAPS', nameEn: 'Survey & Mouza Maps', nameBn: 'জরিপ ও নকশা' },
    { id: 'DEEDS_REGISTRATION', nameEn: 'Deeds & Sub-Registry', nameBn: 'দলিল ও সাব-রেজিস্ট্রি' },
    { id: 'KHAS_LAND', nameEn: 'Khas Land & Property', nameBn: 'খাস জমি ও অর্পিত' },
    { id: 'ACQUISITION', nameEn: 'Land Acquisition', nameBn: 'ভূমি অধিগ্রহণ' },
    { id: 'COMPLAINTS_DISPUTES', nameEn: 'Complaints (GRS)', nameBn: 'অভিযোগ ও প্রতিকার' }
  ];

  const filteredServices = LAND_SERVICES.filter(service => {
    const matchesCategory = selectedCategory === 'ALL' || service.category === selectedCategory;
    const term = searchQuery.toLowerCase();
    const matchesSearch = 
      service.title.toLowerCase().includes(term) ||
      service.titleBn.includes(term) ||
      service.shortDesc.toLowerCase().includes(term) ||
      service.shortDescBn.includes(term) ||
      service.authority.toLowerCase().includes(term);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Title & Introduction */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>{language === 'bn' ? 'সমন্বিত নাগরিক সেবা ক্যাটালগ' : 'Integrated Citizen Service Directory'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            {t.frequentlyUsedServices}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            {language === 'bn'
              ? 'ভূমি মন্ত্রণালয়, ভূমি রেকর্ড ও জরিপ অধিদপ্তর এবং সংশ্লিষ্ট মাঠ প্রশাসনের অনুমোদিত ডিজিটাল সেবাসমূহের তালিকা।'
              : 'Official statutory land administration workflows, procedural guides, fee structures, and application portals.'}
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={language === 'bn' ? 'সেবার নাম দিয়ে খুঁজুন...' : 'Search services...'}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat.id
                ? 'bg-emerald-800 text-white shadow-xs font-semibold'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {language === 'bn' ? cat.nameBn : cat.nameEn}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredServices.map(service => (
          <div
            key={service.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow p-5 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-[10px] font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                  {language === 'bn' ? service.categoryNameBn : service.categoryName}
                </span>

                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  service.integrationMode === 'MODE_1_LIVE'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {service.integrationMode === 'MODE_1_LIVE'
                    ? (language === 'bn' ? 'সরাসরি পোর্টাল' : 'Direct Portal')
                    : (language === 'bn' ? 'অফিসিয়াল গেটওয়ে' : 'Official Gateway')}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-emerald-800 transition-colors leading-snug">
                {language === 'bn' ? service.titleBn : service.title}
              </h3>

              <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                {language === 'bn' ? service.shortDescBn : service.shortDesc}
              </p>

              {/* Service Metadata */}
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-500">
                <div className="flex items-center justify-between">
                  <span>{language === 'bn' ? 'সরকারি ফি:' : 'Official Fee:'}</span>
                  <span className="font-semibold text-slate-800 text-right">
                    {language === 'bn' ? service.officialFeeBn.split('(')[0] : service.officialFee.split('(')[0]}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{language === 'bn' ? 'সময়সীমা:' : 'Timeline:'}</span>
                  <span className="font-medium text-slate-700">
                    {language === 'bn' ? service.estimatedTimelineBn : service.estimatedTimeline}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => onSelectService(service)}
                className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 px-2.5 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                {t.btnDetails}
              </button>

              <button
                onClick={() => onApplyService(service)}
                className="bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1 shadow-xs transition-colors"
              >
                <span>{t.btnApply}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <p className="text-xs sm:text-sm text-slate-500">
            {language === 'bn' ? 'আপনার অনুসন্ধানের সাথে মেলে এমন কোনো সেবা পাওয়া যায়নি।' : 'No services match your active filter.'}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('ALL');
              setSearchQuery('');
            }}
            className="mt-3 text-xs text-emerald-800 font-semibold underline"
          >
            {t.btnReset}
          </button>
        </div>
      )}
    </div>
  );
};
