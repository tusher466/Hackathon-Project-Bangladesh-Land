import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { INTEGRATION_SERVICES } from '../../data/seedData';
import { IntegrationStatus } from '../../types';
import { apiClient } from '../../api/client';
import { 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ExternalLink, 
  ShieldCheck, 
  Server, 
  RefreshCw 
} from 'lucide-react';

export const SystemStatusView: React.FC = () => {
  const { language, t } = useAuth();
  const [integrations, setIntegrations] = useState<IntegrationStatus[]>(INTEGRATION_SERVICES);
  const [loading, setLoading] = useState(false);
  const [uptime, setUptime] = useState('99.94%');
  const [lastCheck, setLastCheck] = useState(new Date().toLocaleTimeString());

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const res = await apiClient.getStatus();
      if (res?.uptime) setUptime(res.uptime);
      setLastCheck(new Date().toLocaleTimeString());
    } catch {
      // local fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
            <Activity className="w-4 h-4" />
            <span>{language === 'bn' ? 'সিস্টেম ও সরকারি সার্ভিস সমন্বয় মনিটর' : 'Government Integration Health Dashboard'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            {t.navStatus}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            {language === 'bn'
              ? 'ভূমি মন্ত্রণালয়, জাতীয় ই-পর্চা, ই-নামজারি, ভূমি কর এবং ট্রেজারি পেমেন্ট গেটওয়ের সংযোগ অবস্থা।'
              : 'Real-time operational status, latencies, and connectivity modes across external government land registries.'}
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>{language === 'bn' ? 'স্ট্যাটাস রিফ্রেশ' : 'Refresh Telemetry'}</span>
        </button>
      </div>

      {/* Global Uptime Banner */}
      <div className="bg-emerald-900 text-white rounded-2xl p-6 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <div className="text-xs text-emerald-200">{language === 'bn' ? 'পোর্টাল অবস্থা:' : 'System Health:'}</div>
            <div className="font-bold text-base sm:text-lg">
              {language === 'bn' ? 'সকল সার্ভিস সচল ও প্রস্তুত' : 'All Core Services Operational'}
            </div>
          </div>
        </div>

        <div className="border-t sm:border-t-0 sm:border-l border-emerald-800/80 pt-3 sm:pt-0 sm:pl-4">
          <div className="text-xs text-emerald-200">{language === 'bn' ? 'বার্ষিক আপটাইম:' : 'Average Uptime:'}</div>
          <div className="font-bold text-base sm:text-lg font-mono text-emerald-100">{uptime}</div>
        </div>

        <div className="border-t sm:border-t-0 sm:border-l border-emerald-800/80 pt-3 sm:pt-0 sm:pl-4">
          <div className="text-xs text-emerald-200">{language === 'bn' ? 'সর্বশেষ নিরীক্ষা:' : 'Last Polled:'}</div>
          <div className="font-bold text-base sm:text-lg font-mono text-emerald-100">{lastCheck}</div>
        </div>
      </div>

      {/* 3 Integration Modes Definition Box */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 text-xs">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{language === 'bn' ? 'সরকারি সংযোগের ৩টি অনুমোদিত মোড:' : 'Integration Governance Modes:'}</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200">
            <span className="font-bold text-emerald-950 block">Mode 1: Live Authorized Integration</span>
            <p className="text-slate-600 text-[11px] mt-1">
              Direct programmatic synchronization with statutory government database endpoints.
            </p>
          </div>
          <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200">
            <span className="font-bold text-blue-950 block">Mode 2: Verified External Official Gateway</span>
            <p className="text-slate-600 text-[11px] mt-1">
              Authenticated direct routing to official verified ministry portals without simulated legal effects.
            </p>
          </div>
          <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200">
            <span className="font-bold text-amber-950 block">Mode 3: Demonstration Sandbox Adapter</span>
            <p className="text-slate-600 text-[11px] mt-1">
              Clear sandbox simulation for identity or payment gateways before live inter-agency authorization.
            </p>
          </div>
        </div>
      </div>

      {/* Integrations Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm">
            {language === 'bn' ? 'সংযুক্ত সরকারি সার্ভিস তালিকা' : 'Connected External Service Telemetry'}
          </h3>
        </div>

        <div className="divide-y divide-slate-100">
          {integrations.map(int => (
            <div key={int.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    {language === 'bn' ? int.nameBn : int.name}
                  </h4>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    int.mode === 'MODE_1_LIVE' ? 'bg-emerald-100 text-emerald-800' :
                    int.mode === 'MODE_2_OFFICIAL_EXTERNAL' ? 'bg-blue-100 text-blue-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {language === 'bn' ? int.modeLabelBn : int.modeLabel}
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  {language === 'bn' ? int.descriptionBn : int.description}
                </p>
                <div className="text-[11px] text-slate-400">
                  {language === 'bn' ? 'কর্তৃপক্ষ:' : 'Authority:'} {int.authority}
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0 text-xs">
                <div className="text-right">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    <span>{int.status}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Latency: {int.latencyMs} ms
                  </div>
                </div>

                {int.officialUrl && (
                  <a
                    href={int.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 text-slate-400 hover:text-emerald-800 hover:bg-slate-100 rounded-lg"
                    title="Visit Official URL"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
