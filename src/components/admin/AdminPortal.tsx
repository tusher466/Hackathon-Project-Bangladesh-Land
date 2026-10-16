import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Application, Complaint, AuditLog, ApplicationStatus } from '../../types';
import { apiClient } from '../../api/client';
import { 
  ShieldAlert, 
  FileText, 
  Users, 
  Activity, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  XCircle, 
  ArrowRight, 
  Layers, 
  Search, 
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const { user, language, t } = useAuth();

  const [activeTab, setActiveTab] = useState<'applications' | 'complaints' | 'audit' | 'stats'>('applications');
  const [applications, setApplications] = useState<Application[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Status progression modal state
  const [targetApp, setTargetApp] = useState<Application | null>(null);
  const [newStatus, setNewStatus] = useState<ApplicationStatus>('UNDER_REVIEW');
  const [statusNote, setStatusNote] = useState('');
  const [hearingDate, setHearingDate] = useState('');
  const [statusSubmitting, setStatusSubmitting] = useState(false);

  // Complaint resolution modal
  const [targetComplaint, setTargetComplaint] = useState<Complaint | null>(null);
  const [complaintStatus, setComplaintStatus] = useState<string>('INVESTIGATING');
  const [resolutionNote, setResolutionNote] = useState('');

  const refreshAll = async () => {
    setLoading(true);
    try {
      const [appRes, cmpRes, statRes] = await Promise.all([
        apiClient.getApplications({ role: user.role }),
        apiClient.getComplaints({ role: user.role }),
        apiClient.getStats()
      ]);
      setApplications(appRes.applications || []);
      setComplaints(cmpRes.complaints || []);
      setStats(statRes);

      if (['SYSTEM_ADMIN', 'SECURITY_AUDITOR'].includes(user.role)) {
        const audRes = await apiClient.getAuditLogs(user.role);
        setAuditLogs(audRes.auditLogs || []);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAll();
  }, [user.role]);

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetApp) return;

    setStatusSubmitting(true);
    try {
      await apiClient.updateApplicationStatus(targetApp.id, {
        status: newStatus,
        note: statusNote || `Status updated by ${user.name}`,
        actorId: user.id,
        actorName: user.name,
        actorRole: user.role,
        hearingDate: newStatus === 'HEARING_SCHEDULED' ? hearingDate : undefined
      });

      setTargetApp(null);
      setStatusNote('');
      setHearingDate('');
      await refreshAll();
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    } finally {
      setStatusSubmitting(false);
    }
  };

  const handleUpdateComplaint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetComplaint) return;

    try {
      await apiClient.updateComplaintStatus(targetComplaint.id, {
        status: complaintStatus,
        resolutionNote,
        actorName: user.name,
        actorRole: user.role
      });
      setTargetComplaint(null);
      setResolutionNote('');
      await refreshAll();
    } catch (err: any) {
      alert('Failed to update complaint');
    }
  };

  const isAuditorOrAdmin = ['SYSTEM_ADMIN', 'SECURITY_AUDITOR'].includes(user.role);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Officer Identification Bar */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-semibold border border-amber-500/30">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>{language === 'bn' ? 'ভূমি প্রশাসন ও রাজস্ব কর্মকর্তা পোর্টাল' : 'Land Revenue Administration Portal'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold">
            {language === 'bn' ? user.nameBn : user.name}
          </h1>
          <p className="text-xs text-slate-400">
            {language === 'bn' ? 'সক্রিয় এখতিয়ার:' : 'Active Jurisdiction:'}{' '}
            <strong className="text-slate-200">{user.upazila || 'Upazila Land Office'}, {user.district || 'Gazipur'}</strong>
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center bg-slate-800 p-1.5 rounded-2xl border border-slate-700 text-xs font-semibold gap-1">
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              activeTab === 'applications' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            {language === 'bn' ? 'আবেদন ডকেট' : 'Application Queue'} ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab('complaints')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              activeTab === 'complaints' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            {language === 'bn' ? 'অভিযোগ নিষ্পন্ন' : 'Grievance Redress'} ({complaints.length})
          </button>
          {isAuditorOrAdmin && (
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3 py-1.5 rounded-xl transition-colors ${
                activeTab === 'audit' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              {language === 'bn' ? 'নিরাপত্তা অডিট লগ' : 'Security Audit Trail'}
            </button>
          )}
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              activeTab === 'stats' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            {language === 'bn' ? 'পরিসংখ্যান' : 'Analytics'}
          </button>
        </div>
      </div>

      {/* Main Tab Content */}

      {/* 1. APPLICATIONS QUEUE */}
      {activeTab === 'applications' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {language === 'bn' ? 'বিবেচনাধীন আবেদন তালিকা' : 'Active Land Service Docket'}
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'bn'
                  ? 'কাগজপত্র যাচাই, সরেজমিন তদন্ত প্রতিবেদন দাখিল ও শুনানির আদেশ প্রদান করুন।'
                  : 'Review citizen submissions, schedule hearings, or issue legal determinations.'}
              </p>
            </div>
            <button
              onClick={refreshAll}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              title="Refresh Queue"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="space-y-3">
            {applications.map(app => (
              <div
                key={app.id}
                className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-500/50 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-emerald-950 text-sm">
                      {app.referenceNumber}
                    </span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-semibold rounded text-[11px]">
                      {app.status}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Fee: BDT {app.feeAmount} ({app.paymentStatus})
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {app.serviceNameBn} • <span className="font-normal text-slate-600">{app.applicantName} ({app.applicantPhone})</span>
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                    <span><strong>{language === 'bn' ? 'মৌজা:' : 'Mouza:'}</strong> {app.mouza} (JL #{app.jlNumber})</span>
                    <span><strong>{language === 'bn' ? 'খতিয়ান ও দাগ:' : 'Khatian & Dag:'}</strong> {app.khatianNumber}, Dag #{app.dagNumber}</span>
                    <span><strong>{language === 'bn' ? 'সংযুক্ত দলিল:' : 'Attachments:'}</strong> {app.documents.length} files</span>
                  </div>

                  {app.hearingDate && (
                    <div className="text-xs text-purple-900 bg-purple-50 px-2.5 py-1 rounded-md inline-block font-semibold">
                      {language === 'bn' ? `নির্ধারিত শুনানি: ${app.hearingDate}` : `Scheduled Hearing: ${app.hearingDate}`}
                    </div>
                  )}
                </div>

                {/* Workflow Actions */}
                <div className="flex items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <button
                    onClick={() => {
                      setTargetApp(app);
                      setNewStatus(app.status);
                    }}
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5"
                  >
                    <span>{language === 'bn' ? 'স্ট্যাটাস পরিবর্তন ও আদেশ' : 'Process Workflow'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. COMPLAINTS QUEUE */}
      {activeTab === 'complaints' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 shadow-xs">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 pb-2 border-b border-slate-100">
            {language === 'bn' ? 'নাগরিক অভিযোগ ও প্রতিকার ব্যবস্থাপনা' : 'Public Grievance Adjudication'}
          </h2>

          <div className="space-y-3">
            {complaints.map(cmp => (
              <div key={cmp.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-900">{cmp.trackingNumber}</span>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded-full font-semibold">
                    {cmp.status}
                  </span>
                </div>
                <div><strong>{language === 'bn' ? 'অভিযোগকারী:' : 'Complainant:'}</strong> {cmp.complainantName} ({cmp.complainantPhone})</div>
                <div><strong>{language === 'bn' ? 'বিবরণ:' : 'Allegation:'}</strong> {cmp.description}</div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      setTargetComplaint(cmp);
                      setComplaintStatus(cmp.status);
                    }}
                    className="px-3 py-1.5 bg-emerald-800 text-white rounded-lg font-semibold"
                  >
                    {language === 'bn' ? 'তদন্ত আদেশ ও নিষ্পত্তি' : 'Resolve Grievance'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. AUDIT LOGS (Only for Admin & Auditor) */}
      {activeTab === 'audit' && isAuditorOrAdmin && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {language === 'bn' ? 'অডিট ও নিরাপত্তা ট্রেইল লগ' : 'Tamper-Evident Security Audit Logs'}
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'bn' ? 'সকল কর্মকর্তা ও কর্মচারীর কার্যক্রমের অপরিবর্তনীয় অডিট লগ' : 'Immutable audit trail of privileged and legal actions'}
              </p>
            </div>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {auditLogs.map(log => (
              <div key={log.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50 font-mono text-[11px] space-y-1">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-emerald-800 font-bold">{log.action}</span>
                  <span>{new Date(log.timestamp).toLocaleString()}</span>
                </div>
                <div className="text-slate-800">
                  Actor: <strong>{log.actorName}</strong> ({log.actorRole}) • IP: {log.ipAddress}
                </div>
                <div className="text-slate-600 text-[10px]">
                  Resource: {log.resourceType} ({log.resourceId}) • Details: {log.details}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. OPERATIONAL STATISTICS */}
      {activeTab === 'stats' && stats && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-6 shadow-xs">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {language === 'bn' ? 'বাস্তব অপারেশনাল পরিসংখ্যান' : 'Live Operational Analytics'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {language === 'bn' ? stats.disclaimerBn : stats.disclaimer}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
              <span className="text-[11px] font-semibold text-emerald-800">{language === 'bn' ? 'মোট আবেদন' : 'Total Applications'}</span>
              <div className="text-2xl font-bold font-mono text-emerald-950 mt-1">{stats.metrics.totalApplications}</div>
            </div>
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
              <span className="text-[11px] font-semibold text-amber-800">{language === 'bn' ? 'পর্যালোচনাধীন' : 'Pending Review'}</span>
              <div className="text-2xl font-bold font-mono text-amber-950 mt-1">{stats.metrics.pendingReview}</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <span className="text-[11px] font-semibold text-blue-800">{language === 'bn' ? 'নিষ্পত্তিকৃত অভিযোগ' : 'Resolved Grievances'}</span>
              <div className="text-2xl font-bold font-mono text-blue-950 mt-1">{stats.metrics.resolvedGrievances}</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-600">{language === 'bn' ? 'সক্রিয় ইন্টিগ্রেশন' : 'Integrations'}</span>
              <div className="text-2xl font-bold font-mono text-slate-900 mt-1">{stats.metrics.activeIntegrations}</div>
            </div>
          </div>
        </div>
      )}

      {/* Application Status Transition Modal */}
      {targetApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-mono text-slate-400 block">{targetApp.referenceNumber}</span>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  {language === 'bn' ? 'ওয়ার্কফ্লো স্ট্যাটাস ও শুনানি আদেশ' : 'Adjudication Workflow Action'}
                </h3>
              </div>
              <button onClick={() => setTargetApp(null)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={handleUpdateStatus} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  {language === 'bn' ? 'পরবর্তী স্ট্যাটাস নির্বাচন করুন' : 'Select Next Legal Status'}
                </label>
                <select
                  value={newStatus}
                  onChange={e => setNewStatus(e.target.value as ApplicationStatus)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg bg-white font-semibold"
                >
                  <option value="UNDER_REVIEW">UNDER_REVIEW (তদন্ত ও পর্যালোচনাধীন)</option>
                  <option value="ADDITIONAL_INFO_REQUIRED">ADDITIONAL_INFO_REQUIRED (অতিরিক্ত দলিল প্রয়োজন)</option>
                  <option value="HEARING_SCHEDULED">HEARING_SCHEDULED (শুনানির তারিখ নির্ধারণ)</option>
                  <option value="APPROVED">APPROVED (অনুমোদিত / নামজারি মঞ্জুর)</option>
                  <option value="REJECTED">REJECTED (নামঞ্জুর)</option>
                  <option value="COMPLETED">COMPLETED (ডিসিআর ও খতিয়ান প্রস্তুত)</option>
                </select>
              </div>

              {newStatus === 'HEARING_SCHEDULED' && (
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    {language === 'bn' ? 'শুনানির তারিখ (সহকারী কমিশনার ভূমি আদালত)' : 'Hearing Date at AC Land Court'}
                  </label>
                  <input
                    type="date"
                    value={hearingDate}
                    onChange={e => setHearingDate(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  {language === 'bn' ? 'আদেশের বিবরণ ও মন্তব্য (নাগরিকের ট্র্যাকিংয়ে দৃশ্যমান)' : 'Official Determination Note'}
                </label>
                <textarea
                  rows={3}
                  value={statusNote}
                  onChange={e => setStatusNote(e.target.value)}
                  placeholder={language === 'bn' ? 'যেমন- ইউনিয়ন ভূমি কর্মকর্তার প্রতিবেদন পর্যালোচনান্তে শুনানির আদেশ দেওয়া হলো...' : 'Enter statutory notes...'}
                  className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-emerald-600"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setTargetApp(null)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-semibold"
                >
                  {language === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={statusSubmitting}
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-bold disabled:opacity-70"
                >
                  {statusSubmitting ? (language === 'bn' ? 'সংরক্ষণ হচ্ছে...' : 'Saving...') : (language === 'bn' ? 'আদেশ জারি করুন' : 'Confirm Order')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Complaint Resolution Modal */}
      {targetComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-base">
                {language === 'bn' ? 'অভিযোগ তদন্ত আদেশ' : 'Grievance Resolution Action'}
              </h3>
              <button onClick={() => setTargetComplaint(null)} className="text-slate-400">✕</button>
            </div>

            <form onSubmit={handleUpdateComplaint} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  {language === 'bn' ? 'স্ট্যাটাস' : 'Status'}
                </label>
                <select
                  value={complaintStatus}
                  onChange={e => setComplaintStatus(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                >
                  <option value="INVESTIGATING">INVESTIGATING (তদন্ত চলমান)</option>
                  <option value="HEARING_CALLED">HEARING_CALLED (উভয়পক্ষকে তলব)</option>
                  <option value="RESOLVED">RESOLVED (প্রতিকার প্রদান ও নিষ্পত্তি)</option>
                  <option value="REJECTED">REJECTED (ভিত্তিহীন মর্মে খারিজ)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  {language === 'bn' ? 'তদন্ত রিপোর্ট ও গৃহীত ব্যবস্থা' : 'Inquiry Findings & Redress Action'}
                </label>
                <textarea
                  rows={3}
                  value={resolutionNote}
                  onChange={e => setResolutionNote(e.target.value)}
                  placeholder={language === 'bn' ? 'তদন্ত কর্মকর্তার মন্তব্য ও সিদ্ধান্ত লিখুন...' : 'Enter resolution details...'}
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setTargetComplaint(null)}
                  className="px-4 py-2 border border-slate-300 rounded-lg"
                >
                  {language === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 text-white rounded-lg font-bold"
                >
                  {language === 'bn' ? 'সংরক্ষণ' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
