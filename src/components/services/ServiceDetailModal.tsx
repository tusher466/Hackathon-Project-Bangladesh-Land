import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LandService } from '../../types';
import { X, ExternalLink, FileText, CheckCircle2, Clock, AlertCircle, ArrowRight } from 'lucide-react';

interface ServiceDetailModalProps {
  service: LandService | null;
  onClose: () => void;
  onApply: (service: LandService) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose, onApply }) => {
  const { language } = useAuth();

  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col border border-slate-200">
        {/* Header */}
        <div className="p-5 md:p-6 border-b border-slate-200 flex items-start justify-between gap-4 bg-slate-50 rounded-t-2xl">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-semibold px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                {language === 'bn' ? service.categoryNameBn : service.categoryName}
              </span>
              <span className="text-[10px] font-medium px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                {service.integrationMode === 'MODE_1_LIVE'
                  ? (language === 'bn' ? 'সরাসরি ডিজিটাল সেবা' : 'Direct Digital Service')
                  : service.integrationMode === 'MODE_2_OFFICIAL_EXTERNAL'
                  ? (language === 'bn' ? 'যাচাইকৃত সরকারি গেটওয়ে' : 'Official Verified Gateway')
                  : (language === 'bn' ? 'স্যান্ডবক্স পরীক্ষামূলক' : 'Sandbox Integration')}
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-slate-900">
              {language === 'bn' ? service.titleBn : service.title}
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              {language === 'bn' ? service.shortDescBn : service.shortDesc}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 md:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700">
          {/* Key Facts Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
            <div>
              <span className="text-slate-500 text-xs block font-medium">
                {language === 'bn' ? 'দায়িত্বপ্রাপ্ত কর্তৃপক্ষ:' : 'Statutory Authority:'}
              </span>
              <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                {language === 'bn' ? service.authorityBn : service.authority}
              </span>
            </div>
            <div>
              <span className="text-slate-500 text-xs block font-medium">
                {language === 'bn' ? 'সরকারি অনুমোদিত ফি:' : 'Regulated Official Fee:'}
              </span>
              <span className="font-semibold text-emerald-800 text-xs sm:text-sm">
                {language === 'bn' ? service.officialFeeBn : service.officialFee}
              </span>
            </div>
            <div>
              <span className="text-slate-500 text-xs block font-medium">
                {language === 'bn' ? 'নাগরিক সনদ অনুযায়ী নিষ্পত্তির সময়:' : 'Citizen Charter Timeline:'}
              </span>
              <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                {language === 'bn' ? service.estimatedTimelineBn : service.estimatedTimeline}
              </span>
            </div>
            <div>
              <span className="text-slate-500 text-xs block font-medium">
                {language === 'bn' ? 'আইনগত ভিত্তি:' : 'Legal Statutory Basis:'}
              </span>
              <span className="font-medium text-slate-700 text-xs">
                {language === 'bn' ? service.legalBasisBn : service.legalBasis}
              </span>
            </div>
          </div>

          {/* Procedural Steps */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>{language === 'bn' ? 'সেবা প্রাপ্তির ধারাবাহিক প্রক্রিয়া:' : 'Procedural Workflow Steps:'}</span>
            </h3>
            <div className="space-y-2.5">
              {service.steps.map(s => (
                <div key={s.step} className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 bg-white">
                  <div className="w-6 h-6 rounded-full bg-emerald-800 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {s.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-xs sm:text-sm">
                      {language === 'bn' ? s.titleBn : s.title}
                    </h4>
                    <p className="text-slate-600 text-xs mt-0.5">
                      {language === 'bn' ? s.descBn : s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents Checklist */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>{language === 'bn' ? 'প্রয়োজনীয় কাগজপত্রের চেকলিস্ট:' : 'Mandatory Document Checklist:'}</span>
            </h3>
            <ul className="space-y-2">
              {(language === 'bn' ? service.requirements.bn : service.requirements.en).map((req, idx) => (
                <li key={idx} className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-xs leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Notice about statutory legal distinction */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              {language === 'bn'
                ? 'অনলাইন আবেদন করার পূর্বে দাতার নামে হাল নামজারি ও কর পরিশোধের রশিদ নিশ্চিত করুন। ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩ অনুযায়ী অসত্য তথ্য প্রদান আইনত দণ্ডনীয়।'
                : 'Ensure seller possesses updated mutation and paid tax receipts. Submitting falsified particulars constitutes an offense under the Land Crime Prevention and Redress Act 2023.'}
            </p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 md:p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex flex-wrap items-center justify-between gap-3">
          {service.officialExternalUrl ? (
            <a
              href={service.officialExternalUrl}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-800 hover:text-emerald-950 font-medium text-xs flex items-center gap-1.5"
            >
              <span>{language === 'bn' ? 'অফিসিয়াল পোর্টাল পরিদর্শন করুন' : 'Visit Official Portal'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-[11px] text-slate-500">
              {language === 'bn' ? 'পোর্টাল নিয়ন্ত্রিত ডিজিটাল সার্ভিস' : 'Portal Integrated Workflow'}
            </span>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
            </button>
            <button
              onClick={() => {
                onClose();
                onApply(service);
              }}
              className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <span>{language === 'bn' ? 'আবেদন শুরু করুন' : 'Apply Online'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
