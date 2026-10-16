import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AlertTriangle, Info, X, ShieldCheck } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  const { language, t } = useAuth();
  const [dismissed, setDismissed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  if (dismissed) return null;

  return (
    <>
      <div className="bg-amber-500/10 border-b border-amber-500/30 text-amber-950 px-4 py-2 text-xs sm:text-sm font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong className="font-semibold text-amber-900">
                {language === 'bn' ? 'সতর্কবার্তা:' : 'Notice:'}
              </strong>{' '}
              {t.demoNotice}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowModal(true)}
              className="text-amber-900 underline hover:text-amber-950 flex items-center gap-1 text-xs"
            >
              <Info className="w-3.5 h-3.5" />
              {language === 'bn' ? 'আইনি স্বীকৃতি নীতি' : 'Statutory Policy'}
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="text-amber-800 hover:text-amber-950 p-1 rounded hover:bg-amber-500/20"
              title={language === 'bn' ? 'বিজ্ঞপ্তি বন্ধ করুন' : 'Dismiss notice'}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
            <div className="flex items-center gap-3 text-emerald-800 mb-4">
              <ShieldCheck className="w-7 h-7 text-emerald-600" />
              <h3 className="text-lg font-bold">
                {language === 'bn' ? 'আইনি স্বীকৃতি ও ডাটা নীতি' : 'Statutory Validity & Data Governance Policy'}
              </h3>
            </div>
            
            <div className="text-xs sm:text-sm text-slate-700 space-y-3">
              <p>
                {language === 'bn'
                  ? 'এই প্ল্যাটফর্মটি বাংলাদেশের ভূমি সংক্রান্ত সেবা আবিষ্কার, পদ্ধতি ব্যাখ্যা, ডিজিটাল আবেদন এবং অফিসের ডিরেক্টরি সমন্বয় করতে তৈরি করা হয়েছে।'
                  : 'This portal is designed to unify discovery, procedure guidance, digital workflows, and jurisdictional office directories for Bangladesh land services.'}
              </p>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
                <strong>{language === 'bn' ? 'স্পষ্টীকরণ:' : 'Distinction:'}</strong>
                <ul className="list-disc list-inside mt-1 space-y-1 text-slate-600">
                  <li>
                    {language === 'bn'
                      ? 'পোর্টালের তথ্য পরীক্ষামূলক এবং দিকনির্দেশনামূলক।'
                      : 'Records presented for simulated workflows are demonstrative.'}
                  </li>
                  <li>
                    {language === 'bn'
                      ? 'চূড়ান্ত আইনগত মালিকানা নির্ধারণ একমাত্র সহকারী কমিশনার (ভূমি), অতিরিক্ত জেলা প্রশাসক (রাজস্ব) এবং ভূমি আদালতের এখতিয়ার।'
                      : 'Binding statutory land titles remain strictly under the jurisdiction of authorized Assistant Commissioners (Land) and Revenue Courts.'}
                  </li>
                  <li>
                    {language === 'bn'
                      ? 'অফিসিয়াল সেবা গ্রহণের জন্য যাচাইকৃত সরকারি পোর্টালে সরাসরি যাওয়ার ব্যবস্থা রাখা হয়েছে।'
                      : 'Verified official government gateways are directly linked for statutory compliance.'}
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-emerald-800 text-white rounded-lg text-sm font-medium hover:bg-emerald-900 transition-colors"
              >
                {language === 'bn' ? 'বুঝেছি' : 'Understood'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
