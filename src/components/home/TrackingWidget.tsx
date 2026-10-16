import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Search, Clock, Calendar, AlertCircle, ArrowRight } from 'lucide-react';
import { apiClient } from '../../api/client';
import { Application, Complaint } from '../../types';

export const TrackingWidget: React.FC = () => {
  const { language, t } = useAuth();
  const [trackingInput, setTrackingInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [foundApp, setFoundApp] = useState<Application | null>(null);
  const [foundComplaint, setFoundComplaint] = useState<Complaint | null>(null);

  const handleTrack = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!trackingInput.trim()) return;

    setLoading(true);
    setError(null);
    setFoundApp(null);
    setFoundComplaint(null);

    const ref = trackingInput.trim();

    try {
      const lowerRef = ref.toLowerCase();
      // Try searching application first
      try {
        const res = await apiClient.getApplicationById(ref);
        if (res?.application) {
          setFoundApp(res.application);
          return;
        }
      } catch {
        // Continue to search complaints
      }

      // Check complaints
      const cmpRes = await apiClient.getComplaints();
      const matched = cmpRes.complaints?.find((c: Complaint) => 
        c.trackingNumber.toLowerCase() === lowerRef ||
        c.trackingNumber.toLowerCase().includes(lowerRef)
      );

      if (matched) {
        setFoundComplaint(matched);
      } else {
        setError(language === 'bn' ? 'কোনো আবেদন বা অভিযোগের রেকর্ড পাওয়া যায়নি। ট্র্যাকিং নম্বরটি পরীক্ষা করুন।' : 'No application or grievance found with this reference.');
      }
    } catch {
      setError(language === 'bn' ? 'রেকর্ড অনুসন্ধানে ত্রুটি হয়েছে বা নম্বরটি সঠিক নয়।' : 'Could not locate record. Please verify the reference number.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SUBMITTED':
        return <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold text-xs">{language === 'bn' ? 'দাখিলকৃত' : 'Submitted'}</span>;
      case 'UNDER_REVIEW':
        return <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full font-semibold text-xs">{language === 'bn' ? 'পর্যালোচনাধীন' : 'Under Review'}</span>;
      case 'HEARING_SCHEDULED':
        return <span className="px-2.5 py-1 bg-purple-100 text-purple-800 rounded-full font-semibold text-xs">{language === 'bn' ? 'শুনানি নির্ধারিত' : 'Hearing Scheduled'}</span>;
      case 'APPROVED':
      case 'COMPLETED':
      case 'RESOLVED':
        return <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-semibold text-xs">{language === 'bn' ? 'অনুমোদিত / সম্পন্ন' : 'Approved / Resolved'}</span>;
      default:
        return <span className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-full font-semibold text-xs">{status}</span>;
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 -mt-8 relative z-20">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-slate-900 flex items-center gap-2">
              <Search className="w-5 h-5 text-emerald-600" />
              <span>{t.trackApplicationTitle}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {language === 'bn'
                ? 'ই-নামজারি, খতিয়ান নকল আবেদন অথবা অভিযোগের সর্বশেষ অবস্থা এবং তদন্ত রিপোর্ট জানতে ট্র্যাকিং নম্বর দিন।'
                : 'Check real-time docket progression, hearing schedules, and authorized officer review notes.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-medium">{language === 'bn' ? 'নমুনা:' : 'Sample:'}</span>
            <button
              type="button"
              onClick={() => {
                setTrackingInput('BILSP-2026-MUT-84920');
              }}
              className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-mono transition-colors"
            >
              Namjari (84920)
            </button>
            <button
              type="button"
              onClick={() => {
                setTrackingInput('BILSP-2026-KHT-31902');
              }}
              className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-mono transition-colors"
            >
              Khatian (31902)
            </button>
            <button
              type="button"
              onClick={() => {
                setTrackingInput('BILSP-GRV-39102');
              }}
              className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-mono transition-colors"
            >
              GRS (39102)
            </button>
          </div>
        </div>

        <form onSubmit={handleTrack} className="mt-6 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={trackingInput}
            onChange={e => setTrackingInput(e.target.value)}
            placeholder={t.trackPlaceholder}
            className="flex-1 py-3 px-4 border border-slate-300 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-800 hover:bg-emerald-900 text-white font-semibold px-6 py-3 rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-70 shadow-sm"
          >
            {loading ? (
              <span>{language === 'bn' ? 'অনুসন্ধান চলছে...' : 'Searching...'}</span>
            ) : (
              <>
                <span>{t.trackButton}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {foundApp && (
          <div className="mt-6 p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
              <div>
                <span className="text-[11px] font-mono text-slate-500 block">
                  {language === 'bn' ? 'ট্র্যাকিং নম্বর' : 'Reference Number'}
                </span>
                <span className="font-mono font-bold text-emerald-900 text-sm sm:text-base">
                  {foundApp.referenceNumber}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(foundApp.status)}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block">{language === 'bn' ? 'সেবার নাম:' : 'Service:'}</span>
                <span className="font-semibold text-slate-800">
                  {language === 'bn' ? foundApp.serviceNameBn : foundApp.serviceName}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">{language === 'bn' ? 'আবেদনকারী:' : 'Applicant:'}</span>
                <span className="font-semibold text-slate-800">{foundApp.applicantName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">{language === 'bn' ? 'মৌজা ও জেএল:' : 'Mouza & JL:'}</span>
                <span className="font-semibold text-slate-800">{foundApp.mouza} (JL {foundApp.jlNumber})</span>
              </div>
              <div>
                <span className="text-slate-500 block">{language === 'bn' ? 'খতিয়ান ও দাগ:' : 'Khatian & Dag:'}</span>
                <span className="font-semibold text-slate-800">
                  {foundApp.khatianNumber || 'N/A'}, Dag: {foundApp.dagNumber || 'N/A'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">{language === 'bn' ? 'সরকারি ফি পরিশোধ:' : 'Fee Status:'}</span>
                <span className="font-semibold text-emerald-700">
                  BDT {foundApp.feeAmount} ({foundApp.paymentStatus})
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">{language === 'bn' ? 'দায়িত্বপ্রাপ্ত কর্মকর্তা:' : 'Assigned Officer:'}</span>
                <span className="font-semibold text-slate-800">{foundApp.assignedOfficer || 'Upazila Land Office'}</span>
              </div>
            </div>

            {foundApp.hearingDate && (
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg flex items-center gap-2 text-xs text-purple-900">
                <Calendar className="w-4 h-4 text-purple-600 shrink-0" />
                <span>
                  <strong>{language === 'bn' ? 'শুনানির তারিখ:' : 'Scheduled Hearing:'}</strong> {foundApp.hearingDate} at AC Land Office.
                </span>
              </div>
            )}

            <div className="pt-3 border-t border-slate-200">
              <h4 className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{language === 'bn' ? 'কার্যক্রম ইতিহাস ও নিরীক্ষা বিবরণী:' : 'Docket Progression & Audit Trail:'}</span>
              </h4>
              <div className="space-y-2">
                {foundApp.history.map(item => (
                  <div key={item.id} className="text-xs bg-white p-2.5 rounded-lg border border-slate-200/70 flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-slate-800 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                        <span>{item.status}</span>
                        <span className="text-[10px] text-slate-500 font-normal">by {item.changedBy}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] mt-0.5">{item.note}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {foundComplaint && (
          <div className="mt-6 p-5 bg-amber-50/50 border border-amber-200 rounded-xl space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-amber-200">
              <div>
                <span className="text-[11px] text-slate-500 block">
                  {language === 'bn' ? 'অভিযোগ ট্র্যাকিং নম্বর' : 'Grievance Tracking Number'}
                </span>
                <span className="font-mono font-bold text-amber-950 text-sm">
                  {foundComplaint.trackingNumber}
                </span>
              </div>
              <span className="px-2.5 py-1 bg-amber-100 text-amber-900 font-semibold rounded-full text-xs">
                {foundComplaint.status}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">{language === 'bn' ? 'সংশ্লিষ্ট অফিস:' : 'Target Office:'}</span>
              <span className="font-semibold text-slate-800">{foundComplaint.officeName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">{language === 'bn' ? 'অভিযোগের সারসংক্ষেপ:' : 'Description:'}</span>
              <p className="text-slate-700 mt-0.5 bg-white p-2.5 rounded border border-amber-100">{foundComplaint.description}</p>
            </div>
            {foundComplaint.resolutionNote && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded text-emerald-900">
                <strong>{language === 'bn' ? 'তদন্ত প্রতিবেদন / প্রতিকার ব্যবস্থা:' : 'Resolution Report:'}</strong> {foundComplaint.resolutionNote}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
