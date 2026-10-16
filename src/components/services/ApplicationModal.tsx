import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LandService } from '../../types';
import { BANGLADESH_DIVISIONS, DISTRICTS_BY_DIVISION, UPAZILAS_BY_DISTRICT } from '../../data/seedData';
import { apiClient } from '../../api/client';
import { 
  X, 
  Check, 
  Upload, 
  FileCheck2, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  CreditCard,
  CheckCircle,
  AlertCircle,
  Trash2
} from 'lucide-react';

interface ApplicationModalProps {
  service: LandService | null;
  onClose: () => void;
  onSuccess: (referenceNumber: string) => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({ service, onClose, onSuccess }) => {
  const { user, language } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [applicantName, setApplicantName] = useState(user.name);
  const [applicantPhone, setApplicantPhone] = useState(user.phone);
  const [applicantNid, setApplicantNid] = useState(user.nid || '19952691234567890');
  
  const [division, setDivision] = useState(user.division || 'Dhaka');
  const [district, setDistrict] = useState(user.district || 'Gazipur');
  const [upazila, setUpazila] = useState(user.upazila || 'Gazipur Sadar');

  const [mouza, setMouza] = useState('Chowrasta Mouza');
  const [jlNumber, setJlNumber] = useState('42');
  const [surveyType, setSurveyType] = useState('RS');
  const [khatianNumber, setKhatianNumber] = useState('RS-1182');
  const [dagNumber, setDagNumber] = useState('894');
  const [landAreaDecimal, setLandAreaDecimal] = useState('18.5');

  // Documents uploaded
  const [uploadedDocs, setUploadedDocs] = useState<{ id: string; title: string; fileName: string; fileSize: string; mimeType: string; uploadDate: string }[]>([
    {
      id: 'doc-1',
      title: language === 'bn' ? 'রেজিস্ট্রিকৃত বিক্রয়/হেবা দলিল' : 'Registered Sale/Gift Deed',
      fileName: 'registered_deed_scan.pdf',
      fileSize: '2.1 MB',
      mimeType: 'application/pdf',
      uploadDate: new Date().toISOString()
    },
    {
      id: 'doc-2',
      title: language === 'bn' ? 'হালনাগাদ ভূমি উন্নয়ন কর দাখিলা' : 'Updated Land Development Tax Receipt',
      fileName: 'ld_tax_dakhila_1431.pdf',
      fileSize: '950 KB',
      mimeType: 'application/pdf',
      uploadDate: new Date().toISOString()
    }
  ]);

  const [newDocTitle, setNewDocTitle] = useState('');

  if (!service) return null;

  const handleDivisionChange = (div: string) => {
    setDivision(div);
    const distList = DISTRICTS_BY_DIVISION[div] || [];
    const firstDist = distList[0]?.id || '';
    setDistrict(firstDist);
    const upazilaList = UPAZILAS_BY_DISTRICT[firstDist] || [];
    setUpazila(upazilaList[0]?.id || '');
  };

  const handleDistrictChange = (dist: string) => {
    setDistrict(dist);
    const upazilaList = UPAZILAS_BY_DISTRICT[dist] || [];
    setUpazila(upazilaList[0]?.id || '');
  };

  const handleAddDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const title = newDocTitle.trim() || file.name.split('.')[0];
    const newDoc = {
      id: `doc-${Date.now()}`,
      title,
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      mimeType: file.type || 'application/pdf',
      uploadDate: new Date().toISOString()
    };
    setUploadedDocs(prev => [...prev, newDoc]);
    setNewDocTitle('');
  };

  const handleNextStep = () => {
    setError(null);
    if (currentStep === 1) {
      if (!applicantName.trim()) {
        setError(language === 'bn' ? 'অনুগ্রহ করে আবেদনকারীর নাম প্রদান করুন।' : 'Please enter applicant name.');
        return;
      }
      if (!applicantPhone.trim()) {
        setError(language === 'bn' ? 'অনুগ্রহ করে সচল মোবাইল নম্বর প্রদান করুন।' : 'Please enter applicant mobile number.');
        return;
      }
    } else if (currentStep === 2) {
      if (!mouza.trim()) {
        setError(language === 'bn' ? 'মৌজার নাম প্রদান করা আবশ্যক।' : 'Mouza name is required.');
        return;
      }
      if (!khatianNumber.trim()) {
        setError(language === 'bn' ? 'খতিয়ান নম্বর প্রদান করা আবশ্যক।' : 'Khatian number is required.');
        return;
      }
      if (!dagNumber.trim()) {
        setError(language === 'bn' ? 'দাগ নম্বর প্রদান করা আবশ্যক।' : 'Dag number is required.');
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    const feeAmount = service.id === 'e-mutation' ? 1170 : service.id === 'khatian-porcha' ? 140 : 500;

    try {
      const res = await apiClient.createApplication({
        serviceId: service.id,
        serviceName: service.title,
        serviceNameBn: service.titleBn,
        applicantId: user.id,
        applicantName,
        applicantPhone,
        division,
        district,
        upazila,
        mouza,
        jlNumber,
        khatianNumber: `${surveyType}-${khatianNumber}`,
        dagNumber,
        feeAmount,
        paymentStatus: 'PAID',
        documents: uploadedDocs
      });

      if (res?.success && res?.referenceNumber) {
        setSubmittedRef(res.referenceNumber);
        onSuccess(res.referenceNumber);
      } else {
        throw new Error('Application could not be created');
      }
    } catch {
      setError(language === 'bn' ? 'আবেদন জমা দিতে সমস্যা হয়েছে। তথ্য যাচাই করে পুনরায় চেষ্টা করুন।' : 'Submission failed. Please check inputs and retry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col border border-slate-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-2xl">
          <div>
            <div className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
              {language === 'bn' ? 'ডিজিটাল ভূমি সেবা আবেদন' : 'Digital Land Service Application'}
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {language === 'bn' ? service.titleBn : service.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar (if not submitted) */}
        {!submittedRef && (
          <div className="bg-slate-100 px-6 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs font-semibold">
            <div className={`flex items-center gap-1.5 ${currentStep >= 1 ? 'text-emerald-800' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white ${currentStep >= 1 ? 'bg-emerald-800' : 'bg-slate-400'}`}>
                1
              </span>
              <span>{language === 'bn' ? 'আবেদনকারী' : 'Applicant'}</span>
            </div>
            <div className="w-6 h-0.5 bg-slate-300"></div>
            <div className={`flex items-center gap-1.5 ${currentStep >= 2 ? 'text-emerald-800' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white ${currentStep >= 2 ? 'bg-emerald-800' : 'bg-slate-400'}`}>
                2
              </span>
              <span>{language === 'bn' ? 'জমির তফসিল' : 'Land Details'}</span>
            </div>
            <div className="w-6 h-0.5 bg-slate-300"></div>
            <div className={`flex items-center gap-1.5 ${currentStep >= 3 ? 'text-emerald-800' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white ${currentStep >= 3 ? 'bg-emerald-800' : 'bg-slate-400'}`}>
                3
              </span>
              <span>{language === 'bn' ? 'কাগজপত্র' : 'Documents'}</span>
            </div>
            <div className="w-6 h-0.5 bg-slate-300"></div>
            <div className={`flex items-center gap-1.5 ${currentStep >= 4 ? 'text-emerald-800' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white ${currentStep >= 4 ? 'bg-emerald-800' : 'bg-slate-400'}`}>
                4
              </span>
              <span>{language === 'bn' ? 'ফি ও দাখিল' : 'Review & Pay'}</span>
            </div>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {submittedRef ? (
            /* Success Screen */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {language === 'bn' ? 'আবেদনটি সফলভাবে গৃহীত হয়েছে!' : 'Application Submitted Successfully!'}
              </h3>
              <p className="text-slate-600 text-xs max-w-md mx-auto">
                {language === 'bn'
                  ? 'আপনার আবেদনটি সহকারী কমিশনার (ভূমি) কার্যালয়ের ডিজিটাল ডকেটে তালিকাভুক্ত হয়েছে। তদন্তের অগ্রগতি এবং শুনানির তারিখ ট্র্যাকিং নম্বরের মাধ্যমে দেখতে পারবেন।'
                  : 'Your application has been registered in the digital docket. Track progress and hearing notices using this reference number.'}
              </p>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl inline-block max-w-sm w-full mx-auto">
                <span className="text-[11px] text-emerald-800 font-medium block">
                  {language === 'bn' ? 'আপনার ডিজিটাল ট্র্যাকিং নম্বর:' : 'Your Digital Reference Number:'}
                </span>
                <span className="font-mono font-bold text-lg text-emerald-950 block mt-1">
                  {submittedRef}
                </span>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-xl text-xs transition-colors"
                >
                  {language === 'bn' ? 'ড্যাশবোর্ডে ফিরে যান' : 'Go to Dashboard'}
                </button>
              </div>
            </div>
          ) : (
            <>
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* STEP 1: Applicant Details */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-600 text-xs">
                    {language === 'bn'
                      ? 'নাগরিকের জাতীয় পরিচয়পত্রের তথ্যানুযায়ী নাম ও মোবাইল নম্বর পূরণ করুন।'
                      : 'Provide identity credentials matching your National ID Card.'}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        {language === 'bn' ? 'আবেদনকারীর নাম' : 'Applicant Full Name'}
                      </label>
                      <input
                        type="text"
                        value={applicantName}
                        onChange={e => setApplicantName(e.target.value)}
                        className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-emerald-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        {language === 'bn' ? 'মোবাইল নম্বর (এসএমএস প্রাপ্তির জন্য)' : 'Mobile Phone (for SMS updates)'}
                      </label>
                      <input
                        type="tel"
                        value={applicantPhone}
                        onChange={e => setApplicantPhone(e.target.value)}
                        className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-emerald-600"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-slate-700 font-semibold mb-1">
                        {language === 'bn' ? 'জাতীয় পরিচয়পত্র নম্বর (NID)' : 'National ID Number'}
                      </label>
                      <input
                        type="text"
                        value={applicantNid}
                        onChange={e => setApplicantNid(e.target.value)}
                        className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-emerald-600 font-mono"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Land Particulars */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        {language === 'bn' ? 'বিভাগ' : 'Division'}
                      </label>
                      <select
                        value={division}
                        onChange={e => handleDivisionChange(e.target.value)}
                        className="w-full p-2.5 border border-slate-300 rounded-lg bg-white"
                      >
                        {BANGLADESH_DIVISIONS.map(d => (
                          <option key={d.id} value={d.id}>
                            {language === 'bn' ? d.nameBn : d.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        {language === 'bn' ? 'জেলা' : 'District'}
                      </label>
                      <select
                        value={district}
                        onChange={e => handleDistrictChange(e.target.value)}
                        className="w-full p-2.5 border border-slate-300 rounded-lg bg-white"
                      >
                        {(DISTRICTS_BY_DIVISION[division] || []).map(d => (
                          <option key={d.id} value={d.id}>
                            {language === 'bn' ? d.nameBn : d.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        {language === 'bn' ? 'উপজেলা / সার্কেল' : 'Upazila / Circle'}
                      </label>
                      <select
                        value={upazila}
                        onChange={e => setUpazila(e.target.value)}
                        className="w-full p-2.5 border border-slate-300 rounded-lg bg-white"
                      >
                        {(UPAZILAS_BY_DISTRICT[district] || []).map(u => (
                          <option key={u.id} value={u.id}>
                            {language === 'bn' ? u.nameBn : u.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        {language === 'bn' ? 'মৌজার নাম' : 'Mouza Name'}
                      </label>
                      <input
                        type="text"
                        value={mouza}
                        onChange={e => setMouza(e.target.value)}
                        className="w-full p-2.5 border border-slate-300 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        {language === 'bn' ? 'জেএল নম্বর' : 'JL Number'}
                      </label>
                      <input
                        type="text"
                        value={jlNumber}
                        onChange={e => setJlNumber(e.target.value)}
                        className="w-full p-2.5 border border-slate-300 rounded-lg font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        {language === 'bn' ? 'জরিপের ধরন' : 'Survey Type'}
                      </label>
                      <select
                        value={surveyType}
                        onChange={e => setSurveyType(e.target.value)}
                        className="w-full p-2.5 border border-slate-300 rounded-lg bg-white"
                      >
                        <option value="CS">CS (Cadastral Survey)</option>
                        <option value="SA">SA (State Acquisition)</option>
                        <option value="RS">RS (Revisional Survey)</option>
                        <option value="BS">BS / City Survey</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        {language === 'bn' ? 'খতিয়ান নম্বর' : 'Khatian Number'}
                      </label>
                      <input
                        type="text"
                        value={khatianNumber}
                        onChange={e => setKhatianNumber(e.target.value)}
                        className="w-full p-2.5 border border-slate-300 rounded-lg font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        {language === 'bn' ? 'দাগ নম্বর' : 'Dag (Plot) Number'}
                      </label>
                      <input
                        type="text"
                        value={dagNumber}
                        onChange={e => setDagNumber(e.target.value)}
                        className="w-full p-2.5 border border-slate-300 rounded-lg font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        {language === 'bn' ? 'জমির পরিমাণ (শতকে)' : 'Area (in Decimals)'}
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={landAreaDecimal}
                        onChange={e => setLandAreaDecimal(e.target.value)}
                        className="w-full p-2.5 border border-slate-300 rounded-lg font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Document Attachments */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    {language === 'bn'
                      ? 'পিডিএফ বা জেপিইজি ফরম্যাটে দলিলের স্ক্যান কপি এবং হালনাগাদ খাজনার দাখিলা সংযুক্ত করুন।'
                      : 'Attach scanned copies of registered deeds, previous porcha, and paid tax dakhila.'}
                  </div>

                  {/* Upload List */}
                  <div className="space-y-2">
                    {uploadedDocs.map(doc => (
                      <div key={doc.id} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl">
                        <div className="flex items-center gap-2.5">
                          <FileCheck2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          <div>
                            <div className="font-semibold text-slate-800 text-xs sm:text-sm">{doc.title}</div>
                            <div className="text-[11px] text-slate-500 font-mono">{doc.fileName} ({doc.fileSize})</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                            {language === 'bn' ? 'সংযুক্ত' : 'Attached'}
                          </span>
                          <button
                            type="button"
                            onClick={() => setUploadedDocs(prev => prev.filter(d => d.id !== doc.id))}
                            className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors"
                            title="Remove document"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Upload New Document Box */}
                  <div className="p-4 border-2 border-dashed border-slate-300 rounded-xl text-center space-y-2 bg-slate-50/50">
                    <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                    <div className="text-xs font-semibold text-slate-700">
                      {language === 'bn' ? 'আরও প্রয়োজনীয় দলিল বা কাগজপত্র যোগ করুন' : 'Add Additional Legal Document'}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-1">
                      <input
                        type="text"
                        placeholder={language === 'bn' ? 'ডকুমেন্টের বিবরণ (যেমন- বায়া দলিল)' : 'Document Title'}
                        value={newDocTitle}
                        onChange={e => setNewDocTitle(e.target.value)}
                        className="flex-1 p-2 text-xs border border-slate-300 rounded-lg bg-white"
                      />
                      <label className="cursor-pointer bg-emerald-800 hover:bg-emerald-900 text-white px-3 py-2 rounded-lg text-xs font-semibold shrink-0">
                        <span>{language === 'bn' ? 'ফাইল নির্বাচন' : 'Browse File'}</span>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleAddDocument}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Review Particulars & Fee Payment */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <h4 className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-2">
                      {language === 'bn' ? 'আবেদনের সারসংক্ষেপ' : 'Application Summary'}
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-slate-600">
                      <div><strong>{language === 'bn' ? 'আবেদনকারী:' : 'Applicant:'}</strong> {applicantName}</div>
                      <div><strong>{language === 'bn' ? 'মোবাইল:' : 'Phone:'}</strong> {applicantPhone}</div>
                      <div><strong>{language === 'bn' ? 'মৌজা ও জেএল:' : 'Mouza & JL:'}</strong> {mouza} (JL {jlNumber})</div>
                      <div><strong>{language === 'bn' ? 'খতিয়ান ও দাগ:' : 'Khatian & Dag:'}</strong> {surveyType}-{khatianNumber}, Dag {dagNumber}</div>
                      <div><strong>{language === 'bn' ? 'জমির পরিমাণ:' : 'Area:'}</strong> {landAreaDecimal} Decimal</div>
                      <div><strong>{language === 'bn' ? 'সংযুক্ত ডকুমেন্ট:' : 'Attachments:'}</strong> {uploadedDocs.length} files</div>
                    </div>
                  </div>

                  {/* Regulated Fee Breakdown */}
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                    <h4 className="font-bold text-emerald-950 text-xs sm:text-sm flex items-center justify-between">
                      <span>{language === 'bn' ? 'সরকারি নির্ধারিত ফি বিবরণী:' : 'Official Regulated Fee Breakdown:'}</span>
                      <CreditCard className="w-4 h-4 text-emerald-700" />
                    </h4>
                    <div className="text-xs space-y-1 text-emerald-900">
                      <div className="flex justify-between">
                        <span>{language === 'bn' ? 'কোর্ট ফি' : 'Court Fee'}</span>
                        <span className="font-mono">BDT 20</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{language === 'bn' ? 'নোটিশ জারি ফি' : 'Notice Issuance Fee'}</span>
                        <span className="font-mono">BDT 50</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{language === 'bn' ? 'রেকর্ড সংশোধন ও ডিসিআর ফি' : 'Record Correction / DCR Fee'}</span>
                        <span className="font-mono">BDT 1,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{language === 'bn' ? 'খতিয়ান প্রিন্ট / ডাক মাশুল' : 'Khatian Stamp & Postal Delivery'}</span>
                        <span className="font-mono">BDT 100</span>
                      </div>
                      <div className="border-t border-emerald-200 pt-1 flex justify-between font-bold text-sm text-emerald-950">
                        <span>{language === 'bn' ? 'মোট সরকারি প্রদেয় ফি' : 'Total Regulated Fee'}</span>
                        <span className="font-mono">BDT 1,170</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      {language === 'bn'
                        ? 'আবেদন দাখিলের সাথে সাথে আপনার নামে একটি স্বতন্ত্র ট্র্যাকিং নম্বর জেনারেট হবে এবং সহকারী কমিশনার (ভূমি) এর ডিজিটাল ডকেটে জমা হবে।'
                        : 'Upon submission, a unique digital tracking number will be issued directly to the Assistant Commissioner (Land) office queue.'}
                    </span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Controls */}
        {!submittedRef && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex items-center justify-between">
            <button
              onClick={() => {
                if (currentStep > 1) setCurrentStep(currentStep - 1);
                else onClose();
              }}
              className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{currentStep === 1 ? (language === 'bn' ? 'বাতিল' : 'Cancel') : (language === 'bn' ? 'পূর্ববর্তী' : 'Back')}</span>
            </button>

            {currentStep < 4 ? (
              <button
                onClick={handleNextStep}
                className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
              >
                <span>{language === 'bn' ? 'পরবর্তী ধাপ' : 'Next Step'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-6 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md disabled:opacity-70"
              >
                {submitting ? (
                  <span>{language === 'bn' ? 'জমা হচ্ছে...' : 'Submitting...'}</span>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{language === 'bn' ? 'ফি পরিশোধ ও আবেদন দাখিল' : 'Pay & Submit Application'}</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
