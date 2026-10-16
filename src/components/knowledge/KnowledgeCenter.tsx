import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { KNOWLEDGE_ARTICLES } from '../../data/seedData';
import { KnowledgeArticle } from '../../types';
import { 
  HelpCircle, 
  BookOpen, 
  Calculator, 
  Clock, 
  ArrowRight, 
  FileCheck2, 
  ShieldCheck, 
  ChevronRight,
  UserCheck
} from 'lucide-react';

export const KnowledgeCenter: React.FC = () => {
  const { language, t } = useAuth();

  const [activeArticle, setActiveArticle] = useState<KnowledgeArticle>(KNOWLEDGE_ARTICLES[0]);
  const [activeTab, setActiveTab] = useState<'articles' | 'faraizi'>('articles');

  // Faraizi Land Calculator State
  const [totalLandDecimal, setTotalLandDecimal] = useState<number>(100);
  const [deceasedGender, setDeceasedGender] = useState<'MALE' | 'FEMALE'>('MALE');
  const [hasSpouse, setHasSpouse] = useState<boolean>(true);
  const [numSons, setNumSons] = useState<number>(2);
  const [numDaughters, setNumDaughters] = useState<number>(2);

  // Faraizi Calculation (Islamic Land Succession rules recognized under Muslim Personal Law Application Act)
  // Deceased Male: Wife gets 1/8 (if children exist) = 12.5%
  // Remaining 87.5% divided among sons and daughters where 1 son = 2 daughters' share.
  // Deceased Female: Husband gets 1/4 (if children exist) = 25%
  // Remaining 75% divided among sons and daughters.
  // Precise Statutory Faraizi Calculation (Recognized under Muslim Personal Law (Shariat) Application Act 1937)
  const calculateInheritance = () => {
    const total = Math.max(0, totalLandDecimal || 0);
    const hasChildren = numSons > 0 || numDaughters > 0;
    
    let spouseShareDecimal = 0;
    let spouseFraction = '';

    if (hasSpouse) {
      if (deceasedGender === 'MALE') {
        // Wife: 1/8 if children exist, 1/4 if no children
        const fraction = hasChildren ? 1 / 8 : 1 / 4;
        spouseShareDecimal = total * fraction;
        spouseFraction = hasChildren ? '1/8 (১২.৫%)' : '1/4 (২৫%)';
      } else {
        // Husband: 1/4 if children exist, 1/2 if no children
        const fraction = hasChildren ? 1 / 4 : 1 / 2;
        spouseShareDecimal = total * fraction;
        spouseFraction = hasChildren ? '1/4 (২৫%)' : '1/2 (৫০%)';
      }
    }

    const remainingForChildren = Math.max(0, total - spouseShareDecimal);

    let sonShareEach = 0;
    let daughterShareEach = 0;
    let totalSonsShare = 0;
    let totalDaughtersShare = 0;

    if (numSons > 0 && numDaughters > 0) {
      // Residuary (Asaba): 1 son gets 2 parts, 1 daughter gets 1 part
      const totalParts = (numSons * 2) + numDaughters;
      const partValue = remainingForChildren / totalParts;
      sonShareEach = partValue * 2;
      daughterShareEach = partValue;
      totalSonsShare = sonShareEach * numSons;
      totalDaughtersShare = daughterShareEach * numDaughters;
    } else if (numSons > 0 && numDaughters === 0) {
      // Only sons: Equal share of residue
      sonShareEach = remainingForChildren / numSons;
      totalSonsShare = remainingForChildren;
    } else if (numSons === 0 && numDaughters === 1) {
      // Exactly 1 daughter: 1/2 of remaining / primary share + Radd
      daughterShareEach = remainingForChildren;
      totalDaughtersShare = remainingForChildren;
    } else if (numSons === 0 && numDaughters > 1) {
      // 2 or more daughters: 2/3 share + Radd
      daughterShareEach = remainingForChildren / numDaughters;
      totalDaughtersShare = remainingForChildren;
    }

    return {
      spouseShareDecimal: spouseShareDecimal.toFixed(2),
      spouseFraction,
      sonShareEach: sonShareEach.toFixed(2),
      totalSonsShare: totalSonsShare.toFixed(2),
      daughterShareEach: daughterShareEach.toFixed(2),
      totalDaughtersShare: totalDaughtersShare.toFixed(2),
      remainingTotal: total.toFixed(2)
    };
  };

  const results = calculateInheritance();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>{language === 'bn' ? 'ভূমি জ্ঞান কোষ ও উত্তরাধিকার নির্দেশিকা' : 'Land Knowledge Center & Succession Guide'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            {t.navKnowledge}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            {language === 'bn'
              ? 'খতিয়ান চেনার উপায়, নামজারি ভুল এড়ানোর নির্দেশিকা এবং ওয়ারিশান সম্পত্তি বণ্টন (ফারায়েজ) ক্যালকুলেটর।'
              : 'Legal guides, khatian deciphering, deed due diligence, and statutory inheritance share calculator.'}
          </p>
        </div>

        {/* Tab switch between Articles and Faraizi Calculator */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'articles' ? 'bg-emerald-800 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'bn' ? 'ভূমি আইন ও নির্দেশিকা' : 'Land Legal Guides'}
          </button>
          <button
            onClick={() => setActiveTab('faraizi')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'faraizi' ? 'bg-emerald-800 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'ফারায়েজ ক্যালকুলেটর' : 'Inheritance Calculator'}</span>
          </button>
        </div>
      </div>

      {activeTab === 'articles' ? (
        /* Articles Viewer */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Article List / Navigation */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-800 text-sm">
              {language === 'bn' ? 'বিষয়ভিত্তিক নির্দেশিকাসমূহ:' : 'Selected Land Guides:'}
            </h3>
            <div className="space-y-2">
              {KNOWLEDGE_ARTICLES.map(art => (
                <div
                  key={art.id}
                  onClick={() => setActiveArticle(art)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    activeArticle.id === art.id
                      ? 'bg-emerald-50/60 border-emerald-500 shadow-xs'
                      : 'bg-white border-slate-200/80 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                    <span className="font-semibold text-emerald-700">
                      {language === 'bn' ? art.categoryBn : art.category}
                    </span>
                    <span>{art.readTime}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                    {language === 'bn' ? art.titleBn : art.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {language === 'bn' ? art.summaryBn : art.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Article Content Display */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 space-y-5 shadow-xs">
            <div>
              <div className="flex items-center gap-2 text-[11px] text-emerald-800 font-semibold mb-2">
                <span className="px-2 py-0.5 bg-emerald-100 rounded-full">
                  {language === 'bn' ? activeArticle.categoryBn : activeArticle.category}
                </span>
                <span>• {activeArticle.readTime}</span>
                <span>• {activeArticle.publishedDate}</span>
              </div>
              <h1 className="text-lg md:text-2xl font-bold text-slate-900 leading-tight">
                {language === 'bn' ? activeArticle.titleBn : activeArticle.title}
              </h1>
              <p className="text-xs text-slate-500 mt-2 italic bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                {language === 'bn' ? activeArticle.summaryBn : activeArticle.summary}
              </p>
            </div>

            <div className="border-t border-slate-100 pt-4 text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-4 font-normal">
              {language === 'bn' ? activeArticle.contentBn : activeArticle.content}
            </div>

            <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-500">
              <span>{language === 'bn' ? 'তথ্যসূত্র:' : 'Source:'} {activeArticle.officialSource}</span>
              <span className="text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                {language === 'bn' ? 'যাচাইকৃত সংস্করণ' : 'Verified Content'}
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Faraizi Land Calculator */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
          <div className="max-w-2xl">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-600" />
              <span>{language === 'bn' ? 'ডিজিটাল ফারায়েজ ও ওয়ারিশান জমি বণ্টন ক্যালকুলেটর' : 'Statutory Land Inheritance & Faraizi Calculator'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {language === 'bn'
                ? 'মুসলিম ও সংবিধিবদ্ধ পারিবারিক আইন অনুযায়ী ওয়ারিশদের মাঝে জমির অংশ (হিস্যা) ও শতক বণ্টন হিসাব করুন।'
                : 'Compute exact land shares in decimals for surviving spouses, sons, and daughters under recognized succession principles.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Input Controls */}
            <div className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  {language === 'bn' ? 'মোট সম্পত্তির পরিমাণ (শতক বা ডেসিমেল)' : 'Total Land Area (Decimals)'}
                </label>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={totalLandDecimal}
                  onChange={e => setTotalLandDecimal(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg font-mono text-base font-bold text-emerald-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  {language === 'bn' ? 'মৃত ব্যক্তির লিঙ্গ' : 'Deceased Person'}
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setDeceasedGender('MALE')}
                    className={`flex-1 py-2 rounded-lg font-medium border ${
                      deceasedGender === 'MALE' ? 'bg-emerald-800 text-white border-emerald-800' : 'bg-slate-50 text-slate-700 border-slate-300'
                    }`}
                  >
                    {language === 'bn' ? 'পুরুষ (স্বামী / পিতা)' : 'Male (Father/Husband)'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeceasedGender('FEMALE')}
                    className={`flex-1 py-2 rounded-lg font-medium border ${
                      deceasedGender === 'FEMALE' ? 'bg-emerald-800 text-white border-emerald-800' : 'bg-slate-50 text-slate-700 border-slate-300'
                    }`}
                  >
                    {language === 'bn' ? 'নারী (স্ত্রী / মাতা)' : 'Female (Mother/Wife)'}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="spouseCheck"
                  checked={hasSpouse}
                  onChange={e => setHasSpouse(e.target.checked)}
                  className="rounded text-emerald-600 w-4 h-4"
                />
                <label htmlFor="spouseCheck" className="text-slate-800 font-medium">
                  {deceasedGender === 'MALE' 
                    ? (language === 'bn' ? 'স্ত্রী জীবিত আছেন (হিস্যা: ১/৮ অংশ)' : 'Surviving Wife exists (Share: 1/8)')
                    : (language === 'bn' ? 'স্বামী জীবিত আছেন (হিস্যা: ১/৪ অংশ)' : 'Surviving Husband exists (Share: 1/4)')}
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    {language === 'bn' ? 'পুত্রের সংখ্যা' : 'Number of Sons'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={numSons}
                    onChange={e => setNumSons(parseInt(e.target.value) || 0)}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono text-center"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    {language === 'bn' ? 'কন্যার সংখ্যা' : 'Number of Daughters'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={numDaughters}
                    onChange={e => setNumDaughters(parseInt(e.target.value) || 0)}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono text-center"
                  />
                </div>
              </div>

              <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
                {language === 'bn' 
                  ? '* আইনের মূলনীতি: পুত্রের অংশ কন্যার অংশের দ্বিগুণ। জীবিত স্ত্রীর অংশ সন্তানাদি থাকলে ১/৮ অংশ।'
                  : '* Legal rule: Sons receive double a daughter’s share. Wife receives 1/8 if children survive.'}
              </div>
            </div>

            {/* Calculated Breakdown Display */}
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-6 flex flex-col justify-between space-y-4">
              <div>
                <h4 className="font-bold text-slate-900 text-sm pb-2 border-b border-emerald-200 flex items-center justify-between">
                  <span>{language === 'bn' ? 'উত্তরাধিকারীদের প্রাপ্ত হিস্যা বিবরণী:' : 'Computed Inheritance Distribution:'}</span>
                  <span className="font-mono text-xs text-emerald-800">Total: {results.remainingTotal} dec</span>
                </h4>

                <div className="mt-4 space-y-3 text-xs">
                  {hasSpouse && (
                    <div className="bg-white p-3 rounded-xl border border-emerald-200 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-slate-800">
                          {deceasedGender === 'MALE' ? (language === 'bn' ? 'স্ত্রী' : 'Wife') : (language === 'bn' ? 'স্বামী' : 'Husband')}
                        </div>
                        <div className="text-[11px] text-slate-500">{results.spouseFraction}</div>
                      </div>
                      <div className="font-mono font-bold text-emerald-900 text-sm">
                        {results.spouseShareDecimal} <span className="text-[11px] font-normal text-slate-500">শতক</span>
                      </div>
                    </div>
                  )}

                  {numSons > 0 && (
                    <div className="bg-white p-3 rounded-xl border border-emerald-200 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-slate-800">
                          {numSons} {language === 'bn' ? 'জন পুত্র (প্রত্যেকে)' : 'Sons (Each)'}
                        </div>
                        <div className="text-[11px] text-slate-500">মোট পুত্রদের হিস্যা: {results.totalSonsShare} শতক</div>
                      </div>
                      <div className="font-mono font-bold text-emerald-900 text-sm">
                        {results.sonShareEach} <span className="text-[11px] font-normal text-slate-500">শতক</span>
                      </div>
                    </div>
                  )}

                  {numDaughters > 0 && (
                    <div className="bg-white p-3 rounded-xl border border-emerald-200 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-slate-800">
                          {numDaughters} {language === 'bn' ? 'জন কন্যা (প্রত্যেকে)' : 'Daughters (Each)'}
                        </div>
                        <div className="text-[11px] text-slate-500">মোট কন্যাদের হিস্যা: {results.totalDaughtersShare} শতক</div>
                      </div>
                      <div className="font-mono font-bold text-emerald-900 text-sm">
                        {results.daughterShareEach} <span className="text-[11px] font-normal text-slate-500">শতক</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-[10px] text-slate-500 leading-tight pt-2 border-t border-emerald-200">
                {language === 'bn'
                  ? 'উত্তরাধিকার সনদ (ওয়ারিশান সার্টিফিকেট) ইউনিয়ন পরিষদ বা সিটি কর্পোরেশন কর্তৃক অনুমোদিত হতে হবে এবং নামজারি আবেদনের ক্ষেত্রে এটি প্রামাণ্য নথি।'
                  : 'Statutory heirship certificates must be authenticated by the respective City Corporation or Union Parishad for mutation docketing.'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
