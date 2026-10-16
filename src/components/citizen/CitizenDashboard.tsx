import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Application, Complaint } from '../../types';
import { apiClient } from '../../api/client';
import { 
  User as UserIcon, 
  FileText, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowRight, 
  PlusCircle, 
  Layers,
  FileCheck2,
  RefreshCw
} from 'lucide-react';

interface CitizenDashboardProps {
  onNewApplication: () => void;
  onNewComplaint: () => void;
}

export const CitizenDashboard: React.FC<CitizenDashboardProps> = ({ onNewApplication, onNewComplaint }) => {
  const { user, language, t } = useAuth();

  const [applications, setApplications] = useState<Application[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [appRes, cmpRes] = await Promise.all([
        apiClient.getApplications({ userId: user.id }),
        apiClient.getComplaints({ userId: user.id })
      ]);
      setApplications(appRes.applications || []);
      setComplaints(cmpRes.complaints || []);
    } catch (err) {
      console.error('Failed to load citizen data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user.id]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SUBMITTED':
        return <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full font-semibold text-[11px]">{language === 'bn' ? 'দাখিলকৃত' : 'Submitted'}</span>;
      case 'UNDER_REVIEW':
        return <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-full font-semibold text-[11px]">{language === 'bn' ? 'তদন্ত ও পর্যালোচনা' : 'Under Review'}</span>;
      case 'HEARING_SCHEDULED':
        return <span className="px-2.5 py-0.5 bg-purple-100 text-purple-800 rounded-full font-semibold text-[11px]">{language === 'bn' ? 'শুনানি নির্ধারিত' : 'Hearing Scheduled'}</span>;
      case 'APPROVED':
      case 'COMPLETED':
        return <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-semibold text-[11px]">{language === 'bn' ? 'অনুমোদিত' : 'Approved'}</span>;
      default:
        return <span className="px-2.5 py-0.5 bg-slate-100 text-slate-800 rounded-full font-semibold text-[11px]">{status}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Citizen Welcome Banner */}
      <div className="bg-linear-to-r from-emerald-900 via-emerald-850 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-800/80 rounded-full text-xs text-emerald-200 border border-emerald-600/40">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>{language === 'bn' ? 'যাচাইকৃত নাগরিক ড্যাশবোর্ড' : 'Authenticated Citizen Docket'}</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            {language === 'bn' ? `স্বাগতম, ${user.nameBn}` : `Welcome, ${user.name}`}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl">
            {language === 'bn'
              ? 'আপনার সকল ই-নামজারি, খতিয়ান নকল আবেদন ও অভিযোগের লাইভ তথ্য ও শুনানির সূচি এখান থেকে পরিচালনা করুন।'
              : 'Manage your active land requests, review docket status, and monitor hearing notices.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={onNewApplication}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-1.5 shadow-md"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{language === 'bn' ? 'নতুন সেবা আবেদন' : 'New Application'}</span>
          </button>
          <button
            onClick={onNewComplaint}
            className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-1.5 border border-white/20"
          >
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>{language === 'bn' ? 'অভিযোগ দাখিল' : 'File Grievance'}</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">{language === 'bn' ? 'মোট আবেদন' : 'Total Applications'}</span>
          <div className="text-2xl font-bold text-slate-900 mt-1 font-mono">{applications.length}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-semibold text-amber-600 uppercase">{language === 'bn' ? 'পর্যালোচনাধীন' : 'In Progress'}</span>
          <div className="text-2xl font-bold text-amber-700 mt-1 font-mono">
            {applications.filter(a => ['SUBMITTED', 'UNDER_REVIEW', 'HEARING_SCHEDULED'].includes(a.status)).length}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-semibold text-emerald-600 uppercase">{language === 'bn' ? 'অনুমোদিত / সম্পন্ন' : 'Approved / Ready'}</span>
          <div className="text-2xl font-bold text-emerald-700 mt-1 font-mono">
            {applications.filter(a => ['APPROVED', 'COMPLETED'].includes(a.status)).length}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-semibold text-red-600 uppercase">{language === 'bn' ? 'দাখিলকৃত অভিযোগ' : 'Grievances'}</span>
          <div className="text-2xl font-bold text-red-700 mt-1 font-mono">{complaints.length}</div>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              <span>{t.myApplications}</span>
            </h2>
            <p className="text-xs text-slate-500">
              {language === 'bn' ? 'আপনার আবেদনের বর্তমান অগ্রগতি এবং শুনানির তারিখ' : 'Active land petitions registered in your citizen account'}
            </p>
          </div>

          <button
            onClick={fetchData}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {applications.length > 0 ? (
          <div className="space-y-3">
            {applications.map(app => (
              <div
                key={app.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500/50 hover:bg-emerald-50/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-xs sm:text-sm text-emerald-900">
                      {app.referenceNumber}
                    </span>
                    {getStatusBadge(app.status)}
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm">
                    {language === 'bn' ? app.serviceNameBn : app.serviceName}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                    <span><strong>{language === 'bn' ? 'মৌজা:' : 'Mouza:'}</strong> {app.mouza} (JL {app.jlNumber})</span>
                    <span><strong>{language === 'bn' ? 'খতিয়ান ও দাগ:' : 'Khatian & Dag:'}</strong> {app.khatianNumber}, {app.dagNumber}</span>
                    <span className="text-emerald-700 font-semibold font-mono">Fee: BDT {app.feeAmount} ({app.paymentStatus})</span>
                  </div>

                  {app.hearingDate && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 text-purple-900 rounded-lg text-xs font-semibold mt-1">
                      <Calendar className="w-3.5 h-3.5 text-purple-600" />
                      <span>{language === 'bn' ? `শুনানির তারিখ: ${app.hearingDate}` : `Hearing Scheduled: ${app.hearingDate}`}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setSelectedApp(app)}
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>{language === 'bn' ? 'পূর্ণাঙ্গ ট্রেইল' : 'View Docket'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500 text-xs">
            {language === 'bn' ? 'আপনার কোনো আবেদন নথিভুক্ত নেই।' : 'No active applications found in your docket.'}
          </div>
        )}
      </div>

      {/* Complaints List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
          <ShieldAlert className="w-5 h-5 text-red-600" />
          <span>{t.myComplaints}</span>
        </h2>

        {complaints.length > 0 ? (
          <div className="space-y-3">
            {complaints.map(cmp => (
              <div key={cmp.id} className="p-4 rounded-xl border border-slate-200 text-xs space-y-2 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-800">{cmp.trackingNumber}</span>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-semibold rounded-full text-[10px]">
                    {cmp.status}
                  </span>
                </div>
                <div><strong>{language === 'bn' ? 'অফিস:' : 'Office:'}</strong> {cmp.officeName}</div>
                <p className="text-slate-600 bg-white p-2.5 rounded border border-slate-200">{cmp.description}</p>
                {cmp.resolutionNote && (
                  <div className="p-2 bg-emerald-50 text-emerald-900 rounded border border-emerald-200">
                    <strong>{language === 'bn' ? 'তদন্ত রিপোর্ট:' : 'Inquiry Report:'}</strong> {cmp.resolutionNote}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-slate-500 text-xs">
            {language === 'bn' ? 'কোনো অভিযোগ নথিভুক্ত নেই।' : 'No filed complaints in record.'}
          </div>
        )}
      </div>

      {/* Application Detail / History Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-mono text-slate-400 block">{selectedApp.referenceNumber}</span>
                <h3 className="font-bold text-slate-900 text-base">{selectedApp.serviceNameBn}</h3>
              </div>
              <button onClick={() => setSelectedApp(null)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div><strong>{language === 'bn' ? 'মৌজা ও জেএল:' : 'Mouza:'}</strong> {selectedApp.mouza} (JL {selectedApp.jlNumber})</div>
                <div><strong>{language === 'bn' ? 'খতিয়ান ও দাগ:' : 'Khatian:'}</strong> {selectedApp.khatianNumber}, Dag {selectedApp.dagNumber}</div>
                <div><strong>{language === 'bn' ? 'দায়িত্বপ্রাপ্ত কর্মকর্তা:' : 'Assigned Officer:'}</strong> {selectedApp.assignedOfficer}</div>
              </div>

              {/* Document Attachments */}
              <div>
                <h4 className="font-bold text-slate-800 mb-1">{language === 'bn' ? 'সংযুক্ত কাগজপত্র:' : 'Attached Documents:'}</h4>
                <div className="space-y-1">
                  {selectedApp.documents.map(d => (
                    <div key={d.id} className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-200 text-[11px]">
                      <span>{d.title} ({d.fileName})</span>
                      <span className="text-emerald-700 font-semibold">{language === 'bn' ? 'যাচাইকৃত' : 'Attached'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress History */}
              <div className="pt-2 border-t border-slate-200">
                <h4 className="font-bold text-slate-800 mb-2">{language === 'bn' ? 'অগ্রগতি ইতিহাস ও লগ:' : 'Docket Trail:'}</h4>
                <div className="space-y-2">
                  {selectedApp.history.map(h => (
                    <div key={h.id} className="p-2.5 bg-white rounded-lg border border-slate-200 text-[11px]">
                      <div className="font-semibold text-slate-800 flex items-center justify-between">
                        <span>{h.status} ({h.changedBy})</span>
                        <span className="text-slate-400">{new Date(h.timestamp).toLocaleDateString()}</span>
                      </div>
                      <p className="text-slate-600 mt-0.5">{h.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-semibold"
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
