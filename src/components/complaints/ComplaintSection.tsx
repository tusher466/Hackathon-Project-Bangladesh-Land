import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ComplaintCategory } from '../../types';
import { apiClient } from '../../api/client';
import { 
  ShieldAlert, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Clock, 
  UserCheck 
} from 'lucide-react';

export const ComplaintSection: React.FC = () => {
  const { user, language, t } = useAuth();

  const [category, setCategory] = useState<ComplaintCategory>('SERVICE_DELAY');
  const [officeName, setOfficeName] = useState('Gazipur Sadar Upazila Land Office');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [generatedRef, setGeneratedRef] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const categories: { id: ComplaintCategory; nameEn: string; nameBn: string }[] = [
    { id: 'SERVICE_DELAY', nameEn: 'Service Delay beyond Citizen Charter (28 days)', nameBn: 'নাগরিক সনদের বাইরে সেবায় অযথা বিলম্ব (২৮ দিন অতিক্রান্ত)' },
    { id: 'RECORD_DISCREPANCY', nameEn: 'Clerical Error / Record Discrepancy in Porcha', nameBn: 'খতিয়ান বা পর্চায় করণিক ভুল বা নামের গরমিল' },
    { id: 'CORRUPTION_ALLEGATION', nameEn: 'Demand for Unauthorized Fees / Harassment', nameBn: 'অতিরিক্ত ফি দাবি / হয়রানি বা অনিয়মের অভিযোগ' },
    { id: 'UNAUTHORIZED_OCCUPATION', nameEn: 'Encroachment of Inherited or Private Land', nameBn: 'ব্যক্তিগত বা ওয়ারিশান জমি জবরদখল সংক্রান্ত' },
    { id: 'STAFF_BEHAVIOR', nameEn: 'Staff Conduct & Office Inaccessibility', nameBn: 'মাঠ পর্যায়ের কর্মচারীদের অসৌজন্যমূলক আচরণ' },
    { id: 'OTHER', nameEn: 'Other Land Administrative Grievance', nameBn: 'অন্যান্য ভূমি সংক্রান্ত অভিযোগ' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await apiClient.createComplaint({
        complainantId: user.id,
        complainantName: user.name,
        complainantPhone: user.phone,
        category,
        officeName,
        division: user.division || 'Dhaka',
        district: user.district || 'Gazipur',
        upazila: user.upazila || 'Gazipur Sadar',
        description
      });

      if (res?.success && res?.trackingNumber) {
        setGeneratedRef(res.trackingNumber);
        setDescription('');
      } else {
        throw new Error('Complaint submission failed');
      }
    } catch {
      setError(language === 'bn' ? 'অভিযোগ দাখিলে সমস্যা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।' : 'Failed to submit grievance. Please retry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-red-700 text-xs font-semibold uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4" />
          <span>{language === 'bn' ? 'ভূমি সেবা নাগরিক অভিযোগ প্রতিকার সেল (GRS)' : 'Public Grievance Redress System (GRS)'}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
          {language === 'bn' ? 'অভিযোগ ও প্রতিকার দাখিল' : 'Lodge a Complaint or Grievance'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {language === 'bn'
            ? 'ই-নামজারি নিষ্পত্তিতে দীর্ঘসূত্রিতা, ঘুষ দাবি, রেকর্ড কারচুপি বা হয়রানির বিষয়ে সরাসরি ঊর্ধ্বতন কর্তৃপক্ষের কাছে অভিযোগ দাখিল করুন।'
            : 'Submit official grievances regarding procedural delays, corruption, fraudulent entries, or administrative harassment.'}
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 md:p-8">
        {generatedRef ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {language === 'bn' ? 'অভিযোগটি সফলভাবে নথিভুক্ত হয়েছে' : 'Grievance Registered Successfully'}
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              {language === 'bn'
                ? 'আপনার অভিযোগটি ভূমি মন্ত্রণালয় ও জেলা প্রশাসনের অভিযোগ প্রতিকার সেলে (GRS) তালিকাভুক্ত হয়েছে এবং একজন তদন্ত কর্মকর্তা দায়িত্ব পেয়েছেন।'
                : 'Your complaint has been assigned to the Grievance Redress Cell. An inquiry officer has been tasked with reporting within statutory timelines.'}
            </p>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl inline-block">
              <span className="text-[11px] text-slate-500 block">
                {language === 'bn' ? 'অভিযোগ ট্র্যাকিং নম্বর:' : 'Tracking Reference:'}
              </span>
              <span className="font-mono font-bold text-lg text-emerald-900 block mt-1">
                {generatedRef}
              </span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setGeneratedRef(null)}
                className="px-5 py-2 bg-emerald-800 text-white rounded-lg text-xs font-semibold"
              >
                {language === 'bn' ? 'আরেকটি অভিযোগ দাখিল করুন' : 'Lodge Another Complaint'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {language === 'bn' ? 'অভিযোগের শ্রেণি' : 'Grievance Category'}
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as ComplaintCategory)}
                className="w-full p-2.5 border border-slate-300 rounded-lg bg-white"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>
                    {language === 'bn' ? c.nameBn : c.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {language === 'bn' ? 'অভিযুক্ত অফিস বা কর্মকর্তার কার্যালয়' : 'Target Office / Branch'}
              </label>
              <input
                type="text"
                value={officeName}
                onChange={e => setOfficeName(e.target.value)}
                placeholder={language === 'bn' ? 'যেমন- সাভার উপজেলা ভূমি অফিস' : 'e.g. Savar Upazila Land Office'}
                className="w-full p-2.5 border border-slate-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {language === 'bn' ? 'অভিযোগের বিস্তারিত বিবরণ ও ঘটনা' : 'Detailed Factual Statement'}
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder={language === 'bn' ? 'ঘটনার তারিখ, আবেদনের পূর্ববর্তী রেফারেন্স নম্বর (যদি থাকে), এবং সুনির্দিষ্ট অভিযোগের তথ্য লিখুন...' : 'Provide dates, application reference number, specific personnel involved, and chronology...'}
                className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-red-600"
                required
              />
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 text-xs">
              <strong>{language === 'bn' ? 'নাগরিক সুরক্ষা অঙ্গীকার:' : 'Whistleblower Safeguards:'}</strong>{' '}
              {language === 'bn'
                ? 'জনস্বার্থে করা অভিযোগের ক্ষেত্রে আবেদনকারীর পরিচয় সুরক্ষা নিশ্চিত করা হয়।'
                : 'Grievance inquiries are conducted impartially with statutory identity protections.'}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-2.5 px-6 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-colors disabled:opacity-70"
              >
                {submitting ? (
                  <span>{language === 'bn' ? 'দাখিল হচ্ছে...' : 'Submitting...'}</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{language === 'bn' ? 'অভিযোগ জমা দিন' : 'Submit Grievance'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
