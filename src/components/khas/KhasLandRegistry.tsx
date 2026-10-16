import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { KHAS_LAND_PARCELS } from '../../data/seedData';
import { KhasLandParcel } from '../../types';
import { 
  ShieldAlert, 
  Search, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Send, 
  MapPin, 
  Users, 
  Building 
} from 'lucide-react';

export const KhasLandRegistry: React.FC = () => {
  const { language, t } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');

  // Encroachment report modal/form state
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [targetParcel, setTargetParcel] = useState<KhasLandParcel | null>(null);
  const [reporterName, setReporterName] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');
  const [reportDesc, setReportDesc] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);

  const filteredParcels = KHAS_LAND_PARCELS.filter(p => {
    const matchesClass = selectedClass === 'ALL' || p.classification === selectedClass;
    const term = searchQuery.toLowerCase();
    const matchesSearch = 
      p.parcelCode.toLowerCase().includes(term) ||
      p.mouza.toLowerCase().includes(term) ||
      p.upazila.toLowerCase().includes(term) ||
      p.dagNumber.includes(term);

    return matchesClass && matchesSearch;
  });

  const handleOpenReport = (parcel: KhasLandParcel) => {
    setTargetParcel(parcel);
    setReportModalOpen(true);
    setReportSuccess(false);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSuccess(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          <span>{language === 'bn' ? 'রাষ্ট্রীয় সম্পদ ও বন্দোবস্ত ব্যবস্থাপনা' : 'State Assets & Settlement Governance'}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
          {t.navKhasLand}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          {language === 'bn'
            ? 'সরকারি কৃষি ও অকৃষি খাস জমি, জলমহাল এবং অর্পিত সম্পত্তি সংক্রান্ত তথ্য অনুসন্ধান ও ভূমিহীন পরিবারের বন্দোবস্ত নির্দেশিকা।'
            : 'Public registry of state-owned khas land, vested properties, water bodies, and transparent landless settlement procedures.'}
        </p>
      </div>

      {/* Prominent Demonstration & Confidentiality Notice */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-xs text-amber-950 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-amber-900">
            {language === 'bn' ? 'আইনি নোটিশ ও পরীক্ষামূলক ডাটা ঘোষণা:' : 'Statutory Integrity Notice:'}
          </div>
          <p className="text-slate-700 leading-relaxed">
            {language === 'bn'
              ? 'এখানে প্রদর্শিত রেকর্ডসমূহ পোর্টালের স্যান্ডবক্স ডেমোনস্ট্রেশন ডাটা। জাতীয় স্বার্থে এবং আইনি গোপনীয়তা রক্ষায় সংবেদনশীল প্রতিরক্ষা বা সরকারি অবকাঠামোর খাস জমি জনসাধারণের জন্য উন্মুক্ত নয়। জমি বন্দোবস্ত সংক্রান্ত সকল সিদ্ধান্ত উপজেলা কৃষি খাস জমি কমিটির এখতিয়ারভুক্ত।'
              : 'Records shown are illustrative demonstration parcels. Pursuant to statutory regulations, classified defense reserves and protected inventories are strictly segregated. Official settlements are exclusively adjudicated by Upazila Khas Land Committees.'}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between text-xs">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-slate-500 font-semibold shrink-0">{language === 'bn' ? 'জমির শ্রেণি:' : 'Classification:'}</label>
          <select
            value={selectedClass}
            onChange={e => setSelectedClass(e.target.value)}
            className="p-2 border border-slate-300 rounded-lg bg-white"
          >
            <option value="ALL">{language === 'bn' ? 'সকল শ্রেণি' : 'All Classes'}</option>
            <option value="AGRICULTURAL">{language === 'bn' ? 'কৃষি খাস জমি' : 'Agricultural Khas'}</option>
            <option value="NON_AGRICULTURAL">{language === 'bn' ? 'অকৃষি খাস জমি' : 'Non-Agricultural Khas'}</option>
            <option value="WATER_BODY">{language === 'bn' ? 'সরকারি জলমহাল / বিল' : 'Waterbody / Jalmahal'}</option>
            <option value="VESTED_PROPERTY">{language === 'bn' ? 'অর্পিত সম্পত্তি (ক তফসিল)' : 'Vested Property'}</option>
          </select>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={language === 'bn' ? 'দাগ নম্বর, মৌজা বা উপজেলা...' : 'Search by Dag, Mouza, Upazila...'}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg outline-none focus:border-emerald-600"
          />
        </div>
      </div>

      {/* Parcels List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredParcels.map(parcel => (
          <div
            key={parcel.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">
                  {parcel.parcelCode}
                </span>
                <span className="text-[10px] font-semibold px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-full">
                  {parcel.classificationBn}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-base">
                {parcel.mouza} (JL #{parcel.jlNumber}), Dag #{parcel.dagNumber}
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                {parcel.khatianNumber} • {parcel.upazila}, {parcel.district}
              </p>

              <div className="grid grid-cols-2 gap-2 mt-4 bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">{language === 'bn' ? 'জমির পরিমাণ:' : 'Area:'}</span>
                  <span className="font-bold text-emerald-800 font-mono">{parcel.areaAcres} Acres</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">{language === 'bn' ? 'নিয়ন্ত্রণকারী অফিস:' : 'Controlling Office:'}</span>
                  <span className="font-semibold text-slate-800">{parcel.controllingOfficeBn}</span>
                </div>
                <div className="col-span-2 pt-1 border-t border-slate-200">
                  <span className="text-slate-500 block text-[11px]">{language === 'bn' ? 'বন্দোবস্ত অবস্থা:' : 'Settlement Status:'}</span>
                  <span className="font-semibold text-slate-900">{parcel.settlementStatusBn}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-[10px] text-slate-400">
                {language === 'bn' ? 'পরীক্ষামূলক ডেমো রেকর্ড' : 'Sandbox Demo Record'}
              </span>
              <button
                onClick={() => handleOpenReport(parcel)}
                className="text-xs font-semibold px-3 py-1.5 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                <span>{language === 'bn' ? 'দখল বা গরমিল রিপোর্ট' : 'Report Discrepancy'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Encroachment Report Modal */}
      {reportModalOpen && targetParcel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2 text-red-700">
                <ShieldAlert className="w-5 h-5" />
                <h3 className="font-bold text-base text-slate-900">
                  {language === 'bn' ? 'খাস জমি অবৈধ দখল বা গরমিল রিপোর্ট' : 'Report Encroachment or Discrepancy'}
                </h3>
              </div>
              <button onClick={() => setReportModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>

            {reportSuccess ? (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900 text-sm">
                  {language === 'bn' ? 'রিপোর্টটি সহকারী কমিশনার (ভূমি) কার্যালয়ে প্রেরিত হয়েছে' : 'Report Dispatched to AC Land Office'}
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {language === 'bn'
                    ? 'তথ্যটি সরকারি খাস জমি তদারকি সেলে সংরক্ষিত হয়েছে। রাজস্ব কর্মকর্তা সরেজমিনে পরিদর্শনপূর্বক ব্যবস্থা গ্রহণ করবেন।'
                    : 'The incident has been logged for field inspection by the Upazila Revenue Enforcement Wing.'}
                </p>
                <button
                  onClick={() => setReportModalOpen(false)}
                  className="mt-3 px-5 py-2 bg-emerald-800 text-white rounded-lg text-xs font-semibold"
                >
                  {language === 'bn' ? 'সম্পন্ন' : 'Done'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitReport} className="mt-4 space-y-3 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-slate-600">
                  <strong>{targetParcel.mouza}</strong>, Dag #{targetParcel.dagNumber} ({targetParcel.upazila})
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    {language === 'bn' ? 'তথ্য প্রদানকারীর নাম (গোপন রাখা হবে)' : 'Reporter Name (Confidential)'}
                  </label>
                  <input
                    type="text"
                    value={reporterName}
                    onChange={e => setReporterName(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-red-600"
                    placeholder={language === 'bn' ? 'নাম লিখুন (ঐচ্ছিক)' : 'Optional name'}
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    {language === 'bn' ? 'যোগাযোগ নম্বর' : 'Contact Phone'}
                  </label>
                  <input
                    type="tel"
                    value={reporterPhone}
                    onChange={e => setReporterPhone(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-red-600"
                    placeholder="01XXXXXXXXX"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    {language === 'bn' ? 'দখল বা গরমিলের বিবরণ' : 'Incident Details'}
                  </label>
                  <textarea
                    rows={3}
                    value={reportDesc}
                    onChange={e => setReportDesc(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-red-600"
                    placeholder={language === 'bn' ? 'অবৈধ স্থাপনা, বাঁধ নির্মাণ বা ভরাট সংক্রান্ত বিবরণ দিন...' : 'Describe suspected encroachment, illegal structures, or discrepancies...'}
                    required
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setReportModalOpen(false)}
                    className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-semibold"
                  >
                    {language === 'bn' ? 'বাতিল' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg font-bold flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? 'রিপোর্ট দাখিল করুন' : 'Submit Report'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
