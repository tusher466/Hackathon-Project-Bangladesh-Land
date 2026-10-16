import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { 
  PhoneCall, 
  Globe, 
  Eye, 
  User as UserIcon, 
  ShieldAlert, 
  Menu, 
  X, 
  ChevronDown,
  Compass,
  FileText,
  Building2,
  MapPin,
  HelpCircle,
  Activity,
  Layers
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { user, language, setLanguage, t, switchRole, fontSize, setFontSize, highContrast, setHighContrast } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [accessMenuOpen, setAccessMenuOpen] = useState(false);

  const roles: { role: UserRole; titleBn: string; titleEn: string; icon: string }[] = [
    { role: 'CITIZEN', titleBn: 'নাগরিক আবেদনকারী (তুষার হোসেন)', titleEn: 'Citizen (Tusher Hossen)', icon: '👤' },
    { role: 'OFFICE_CLERK', titleBn: 'ইউনিয়ন ভূমি সহকারী (বেগম নাসরীন)', titleEn: 'Office Clerk (Nasreen Sultana)', icon: '📑' },
    { role: 'REVIEWING_OFFICER', titleBn: 'সহকারী কমিশনার - ভূমি (মোঃ রফিকুল)', titleEn: 'AC Land / Reviewing Officer', icon: '⚖️' },
    { role: 'SYSTEM_ADMIN', titleBn: 'সিস্টেম অ্যাডমিনিস্ট্রেটর', titleEn: 'System Administrator', icon: '🛠️' },
    { role: 'SECURITY_AUDITOR', titleBn: 'নিরাপত্তা ও অডিট কর্মকর্তা', titleEn: 'Security & Audit Officer', icon: '🔍' }
  ];

  const handleRoleSelect = async (r: UserRole) => {
    await switchRole(r);
    setRoleDropdownOpen(false);
    if (r === 'CITIZEN') {
      setActiveTab('citizen');
    } else {
      setActiveTab('admin');
    }
  };

  const navItems = [
    { id: 'home', label: t.navHome, icon: Compass },
    { id: 'services', label: t.navServices, icon: Layers },
    { id: 'mouza-map', label: t.navMouzaMap, icon: MapPin },
    { id: 'offices', label: t.navOffices, icon: Building2 },
    { id: 'khas-land', label: t.navKhasLand, icon: FileText },
    { id: 'knowledge', label: t.navKnowledge, icon: HelpCircle },
    { id: 'notices', label: t.navNotices, icon: FileText },
    { id: 'complaints', label: t.navComplaints, icon: ShieldAlert },
    { id: 'status', label: t.navStatus, icon: Activity }
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Government Identity */}
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            <span className="text-slate-300 font-medium hidden sm:inline">
              {language === 'bn' ? 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার | ভূমি প্রশাসন' : "People's Republic of Bangladesh | Land Administration"}
            </span>
            <span className="text-slate-400 sm:hidden">BILSP Bangladesh</span>
          </div>

          {/* Quick Actions: Hotline + Accessibility + Lang */}
          <div className="flex items-center gap-3">
            {/* Toll-Free Hotline */}
            <a 
              href="tel:16122" 
              className="flex items-center gap-1.5 bg-emerald-700/80 hover:bg-emerald-700 text-emerald-100 px-2.5 py-0.5 rounded-full transition-colors font-medium text-xs"
            >
              <PhoneCall className="w-3 h-3 text-emerald-300" />
              <span>{language === 'bn' ? 'হেল্পলাইন: ১৬১২২' : 'Hotline: 16122'}</span>
            </a>

            {/* Accessibility Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setAccessMenuOpen(!accessMenuOpen)}
                className="flex items-center gap-1 text-slate-300 hover:text-white px-1.5 py-0.5 rounded"
                title="Accessibility Tools"
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{language === 'bn' ? 'পাঠযোগ্যতা' : 'Access'}</span>
              </button>
              {accessMenuOpen && (
                <div className="absolute right-0 mt-1 w-44 bg-slate-800 text-white rounded-md shadow-xl p-2 z-50 border border-slate-700 text-xs space-y-2">
                  <div className="text-[11px] font-semibold text-slate-400">
                    {language === 'bn' ? 'ফন্ট সাইজ' : 'Text Size'}
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => setFontSize('normal')} 
                      className={`flex-1 py-1 rounded text-center ${fontSize === 'normal' ? 'bg-emerald-700' : 'bg-slate-700'}`}
                    >
                      A
                    </button>
                    <button 
                      onClick={() => setFontSize('large')} 
                      className={`flex-1 py-1 rounded text-center text-sm ${fontSize === 'large' ? 'bg-emerald-700' : 'bg-slate-700'}`}
                    >
                      A+
                    </button>
                    <button 
                      onClick={() => setFontSize('larger')} 
                      className={`flex-1 py-1 rounded text-center text-base ${fontSize === 'larger' ? 'bg-emerald-700' : 'bg-slate-700'}`}
                    >
                      A++
                    </button>
                  </div>
                  <div className="border-t border-slate-700 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={highContrast} 
                        onChange={e => setHighContrast(e.target.checked)}
                        className="rounded text-emerald-600"
                      />
                      <span>{language === 'bn' ? 'উচ্চ বৈসাদৃশ্য' : 'High Contrast'}</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-800 rounded-sm p-0.5 border border-slate-700">
              <Globe className="w-3 h-3 text-slate-400 mx-1" />
              <button
                onClick={() => setLanguage('bn')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  language === 'bn' ? 'bg-emerald-700 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                বাংলা
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  language === 'en' ? 'bg-emerald-700 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          {/* Emblem representation */}
          <div className="w-11 h-11 rounded-full bg-linear-to-br from-emerald-800 to-emerald-950 flex items-center justify-center border-2 border-emerald-600 shadow-sm shrink-0">
            <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xs shadow-inner">
              <span className="text-[10px] tracking-tighter">ভূমি</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-tight">
                {language === 'bn' ? 'বাংলাদেশ সমন্বিত ভূমি সেবা পোর্টাল' : 'Bangladesh Integrated Land Services Portal'}
              </h1>
              <span className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-800 rounded">
                BILSP
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {language === 'bn' ? 'এক প্ল্যাটফর্মে সকল ভূমি সেবা, স্বচ্ছ ভূমি ব্যবস্থাপনা' : 'One Platform. All Land Services. Transparent Land Administration.'}
            </p>
          </div>
        </div>

        {/* User Identity / Role Switcher */}
        <div className="hidden md:flex items-center gap-3">
          {/* Role switcher for testing real officer and citizen workflows */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <div className="text-left">
                <div className="text-[10px] text-slate-500 font-normal">
                  {language === 'bn' ? 'বর্তমান ভূমিকা:' : 'Active Role:'}
                </div>
                <div className="font-semibold truncate max-w-[140px]">
                  {language === 'bn' ? user.nameBn : user.name}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-1 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50">
                <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  {language === 'bn' ? 'ডেমো ভূমিকা পরিবর্তন করুন:' : 'Switch Role to Test Workflows:'}
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {roles.map(r => (
                    <button
                      key={r.role}
                      onClick={() => handleRoleSelect(r.role)}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 transition-colors ${
                        user.role === r.role ? 'bg-emerald-50 text-emerald-900 font-semibold' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{r.icon}</span>
                        <span>{language === 'bn' ? r.titleBn : r.titleEn}</span>
                      </div>
                      {user.role === r.role && (
                        <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded-full">
                          {language === 'bn' ? 'সক্রিয়' : 'Active'}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Dashboard Action Button */}
          {user.role === 'CITIZEN' ? (
            <button
              onClick={() => setActiveTab('citizen')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'citizen'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>{t.navCitizenDashboard}</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'admin'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.navAdminPortal}</span>
            </button>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setActiveTab(user.role === 'CITIZEN' ? 'citizen' : 'admin')}
            className="p-2 text-emerald-800 bg-emerald-50 rounded-lg text-xs font-semibold"
          >
            {user.role === 'CITIZEN' ? 'ড্যাশবোর্ড' : 'অ্যাডমিন'}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-emerald-850 bg-emerald-900 text-white hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center overflow-x-auto no-scrollbar">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-medium whitespace-nowrap transition-colors border-b-2 ${
                  isActive
                    ? 'border-emerald-400 text-emerald-200 bg-emerald-950/60 font-semibold'
                    : 'border-transparent text-slate-200 hover:text-white hover:bg-emerald-800/70'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0 opacity-80" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 text-white px-4 py-4 space-y-2 border-t border-slate-800">
          <div className="pb-2 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">{language === 'bn' ? 'ব্যবহারকারী ভূমিকা:' : 'Active Role:'}</span>
            <select
              value={user.role}
              onChange={e => handleRoleSelect(e.target.value as UserRole)}
              className="bg-slate-800 text-emerald-300 text-xs px-2 py-1 rounded border border-slate-700"
            >
              {roles.map(r => (
                <option key={r.role} value={r.role}>
                  {language === 'bn' ? r.titleBn : r.titleEn}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-left ${
                    activeTab === item.id ? 'bg-emerald-800 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
