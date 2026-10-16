import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { OFFICIAL_NOTICES } from '../../data/seedData';
import { NoticeItem } from '../../types';
import { FileText, Download, Calendar, Building2, AlertTriangle, Search, CheckCircle2 } from 'lucide-react';

export const NoticeBoard: React.FC = () => {
  const { language, t } = useAuth();

  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNotice, setActiveNotice] = useState<NoticeItem | null>(null);

  const categories = [
    { id: 'ALL', nameEn: 'All Notices', nameBn: 'সকল বিজ্ঞপ্তি' },
    { id: 'CIRCULAR', nameEn: 'Government Circulars', nameBn: 'সরকারি পরিপত্র' },
    { id: 'POLICY', nameEn: 'Statutory Policy', nameBn: 'নীতিমালা সংক্রান্ত' },
    { id: 'SERVICE_NOTICE', nameEn: 'Service Interruptions / Updates', nameBn: 'সেবা বিজ্ঞপ্তি' }
  ];

  const filteredNotices = OFFICIAL_NOTICES.filter(notice => {
    const matchesCat = categoryFilter === 'ALL' || notice.category === categoryFilter;
    const term = searchQuery.toLowerCase();
    const matchesSearch = 
      notice.title.toLowerCase().includes(term) ||
      notice.titleBn.includes(term) ||
      notice.memoNumber.toLowerCase().includes(term) ||
      notice.summary.toLowerCase().includes(term) ||
      notice.summaryBn.includes(term);

    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          <span>{language === 'bn' ? 'অফিসিয়াল গেজেট ও পরিপত্র' : 'Official Gazettes & Land Circulars'}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
          {t.navNotices}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          {language === 'bn'
            ? 'ভূমি মন্ত্রণালয় এবং সংশ্লিষ্ট অধিদপ্তর কর্তৃক জারিকৃত সর্বশেষ পরিপত্র, নাগরিক সনদ সময়সীমা ও নির্দেশনাবলী।'
            : 'Verified circulars, administrative notifications, citizen charter directives, and official gazettes.'}
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setCategoryFilter(c.id)}
              className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors ${
                categoryFilter === c.id
                  ? 'bg-emerald-800 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {language === 'bn' ? c.nameBn : c.nameEn}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={language === 'bn' ? 'স্মারক নম্বর বা শিরোনাম...' : 'Search by Memo or Title...'}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg outline-none focus:border-emerald-600"
          />
        </div>
      </div>

      {/* Notices Table / Card List */}
      <div className="space-y-3">
        {filteredNotices.map(notice => (
          <div
            key={notice.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-semibold px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                  {language === 'bn' ? notice.categoryBn : notice.category}
                </span>

                <span className="text-[11px] font-mono text-slate-500">
                  স্মারক: {notice.memoNumber}
                </span>

                {notice.isDemonstration && (
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">
                    {language === 'bn' ? 'নমুনা নোটিশ' : 'Demonstration Notice'}
                  </span>
                )}
              </div>

              <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                {language === 'bn' ? notice.titleBn : notice.title}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-2">
                {language === 'bn' ? notice.summaryBn : notice.summary}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 pt-1">
                <span className="flex items-center gap-1 text-slate-600">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{language === 'bn' ? notice.issuingAuthorityBn : notice.issuingAuthority}</span>
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{notice.date}</span>
                </span>
              </div>
            </div>

            {/* Action Download / View */}
            <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
              <button
                onClick={() => setActiveNotice(notice)}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'পরিপত্র দেখুন' : 'View Circular'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Notice Detail Modal */}
      {activeNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 space-y-4">
            <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-mono text-slate-500 block">স্মারক: {activeNotice.memoNumber}</span>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 mt-1">
                  {language === 'bn' ? activeNotice.titleBn : activeNotice.title}
                </h3>
              </div>
              <button onClick={() => setActiveNotice(null)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div className="text-xs text-slate-700 space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 leading-relaxed">
              <p>
                <strong>{language === 'bn' ? 'বিষয় / সারসংক্ষেপ:' : 'Subject:'}</strong>{' '}
                {language === 'bn' ? activeNotice.summaryBn : activeNotice.summary}
              </p>
              <p>
                <strong>{language === 'bn' ? 'জারিকারী কর্তৃপক্ষ:' : 'Issuing Authority:'}</strong>{' '}
                {language === 'bn' ? activeNotice.issuingAuthorityBn : activeNotice.issuingAuthority}
              </p>
              <p>
                <strong>{language === 'bn' ? 'তারিখ:' : 'Date:'}</strong> {activeNotice.date}
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveNotice(null)}
                className="px-5 py-2 bg-emerald-800 text-white rounded-lg text-xs font-semibold"
              >
                {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
