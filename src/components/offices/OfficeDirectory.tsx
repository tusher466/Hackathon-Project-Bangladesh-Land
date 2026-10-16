import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LAND_OFFICES, BANGLADESH_DIVISIONS, DISTRICTS_BY_DIVISION } from '../../data/seedData';
import { LandOffice } from '../../types';
import { 
  Building2, 
  Search, 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Compass, 
  CheckCircle2,
  Filter
} from 'lucide-react';

export const OfficeDirectory: React.FC = () => {
  const { language, t } = useAuth();

  const [divisionFilter, setDivisionFilter] = useState('ALL');
  const [districtFilter, setDistrictFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const officeTypes = [
    { id: 'ALL', nameEn: 'All Office Types', nameBn: 'সকল ধরনের অফিস' },
    { id: 'MINISTRY', nameEn: 'Ministry & Boards', nameBn: 'মন্ত্রণালয় ও বোর্ড' },
    { id: 'DLRS', nameEn: 'Survey Directorate (DLRS)', nameBn: 'জরিপ অধিদপ্তর' },
    { id: 'DEPUTY_COMMISSIONER', nameEn: 'DC Offices (Revenue & Record Room)', nameBn: 'জেলা প্রশাসক (রাজস্ব ও রেকর্ড রুম)' },
    { id: 'AC_LAND', nameEn: 'Upazila Land Offices (AC Land)', nameBn: 'উপজেলা ভূমি অফিস (এসিল্যান্ড)' },
    { id: 'SUB_REGISTRY', nameEn: 'Sub-Registry Offices (Registration)', nameBn: 'সাব-রেজিস্ট্রি অফিস' }
  ];

  const filteredOffices = LAND_OFFICES.filter(office => {
    const matchesDiv = divisionFilter === 'ALL' || office.division === divisionFilter;
    const matchesDist = districtFilter === 'ALL' || office.district === districtFilter;
    const matchesType = typeFilter === 'ALL' || office.type === typeFilter;
    const term = searchQuery.toLowerCase();
    const matchesSearch = 
      office.name.toLowerCase().includes(term) ||
      office.nameBn.includes(term) ||
      office.address.toLowerCase().includes(term) ||
      office.jurisdiction.toLowerCase().includes(term) ||
      office.jurisdictionBn.includes(term);

    return matchesDiv && matchesDist && matchesType && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
          <Building2 className="w-4 h-4" />
          <span>{language === 'bn' ? 'প্রশাসনিক এখতিয়ার ও অফিস ডিরেক্টরি' : 'Jurisdictional Land Office Directory'}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
          {t.navOffices}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          {language === 'bn'
            ? 'মন্ত্রণালয়, রেকর্ড ও জরিপ অধিদপ্তর, জেলা প্রশাসন রেকর্ড রুম, এসি ল্যান্ড এবং সাব-রেজিস্ট্রি অফিসের যাচাইকৃত ঠিকানা ও হটলাইন।'
            : 'Find verified addresses, jurisdiction scopes, office hours, and contact lines across administrative land organs.'}
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div>
          <label className="block text-slate-500 font-semibold mb-1">{t.selectDivision}</label>
          <select
            value={divisionFilter}
            onChange={e => {
              setDivisionFilter(e.target.value);
              setDistrictFilter('ALL');
            }}
            className="w-full p-2.5 border border-slate-300 rounded-lg bg-white"
          >
            <option value="ALL">{language === 'bn' ? 'সকল বিভাগ' : 'All Divisions'}</option>
            {BANGLADESH_DIVISIONS.map(d => (
              <option key={d.id} value={d.id}>{language === 'bn' ? d.nameBn : d.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-slate-500 font-semibold mb-1">{t.selectDistrict}</label>
          <select
            value={districtFilter}
            onChange={e => setDistrictFilter(e.target.value)}
            className="w-full p-2.5 border border-slate-300 rounded-lg bg-white"
          >
            <option value="ALL">{language === 'bn' ? 'সকল জেলা' : 'All Districts'}</option>
            {(divisionFilter === 'ALL' 
              ? Object.values(DISTRICTS_BY_DIVISION).flat() 
              : DISTRICTS_BY_DIVISION[divisionFilter] || []
            ).map(dist => (
              <option key={dist.id} value={dist.id}>{language === 'bn' ? dist.nameBn : dist.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-slate-500 font-semibold mb-1">{language === 'bn' ? 'অফিসের ধরন' : 'Office Category'}</label>
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="w-full p-2.5 border border-slate-300 rounded-lg bg-white"
          >
            {officeTypes.map(ot => (
              <option key={ot.id} value={ot.id}>{language === 'bn' ? ot.nameBn : ot.nameEn}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-slate-500 font-semibold mb-1">{language === 'bn' ? 'অফিস বা এলাকার নাম দিয়ে খুঁজুন' : 'Search by Name or Jurisdiction'}</label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === 'bn' ? 'যেমন- তেজগাঁও, গাজীপুর সদর, সচিবালয়...' : 'e.g. Tejgaon, Gazipur Sadar, Secretariat...'}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg outline-none focus:border-emerald-600"
            />
          </div>
        </div>
      </div>

      {/* Office Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredOffices.map(office => (
          <div
            key={office.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-semibold px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                  {language === 'bn' ? office.typeNameBn : office.typeName}
                </span>
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>{language === 'bn' ? 'যাচাইকৃত' : 'Verified'}</span>
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                {language === 'bn' ? office.nameBn : office.name}
              </h3>

              <div className="mt-3 space-y-2 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{language === 'bn' ? office.addressBn : office.address}</span>
                </div>

                <div className="flex items-start gap-2">
                  <Compass className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-700">{language === 'bn' ? 'এখতিয়ার:' : 'Jurisdiction:'}</strong>{' '}
                    {language === 'bn' ? office.jurisdictionBn : office.jurisdiction}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{language === 'bn' ? office.officeHoursBn : office.officeHours}</span>
                </div>
              </div>
            </div>

            {/* Contact Footer */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-3">
                <a
                  href={`tel:${office.phone}`}
                  className="flex items-center gap-1.5 text-emerald-800 hover:text-emerald-950 font-semibold font-mono"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{office.phone}</span>
                </a>
                <a
                  href={`mailto:${office.email}`}
                  className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 font-mono text-[11px]"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{office.email}</span>
                </a>
              </div>

              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                Hotline: {office.hotline}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredOffices.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs sm:text-sm">
          {language === 'bn' ? 'কোনো ভূমি অফিস পাওয়া যায়নি।' : 'No land offices found matching criteria.'}
        </div>
      )}
    </div>
  );
};
