export type Language = 'bn' | 'en';

export const TRANSLATIONS = {
  en: {
    portalName: 'Bangladesh Integrated Land Services Portal (BILSP)',
    portalSubtitle: 'Ministry of Land & Land Administration Digital Gateway',
    portalTagline: 'One Platform. All Land Services. Transparent Land Administration.',
    demoNotice: 'This is demonstration data. It is not an official government land record or legal evidence.',
    
    // Navigation
    navHome: 'Home',
    navServices: 'All Services',
    navOffices: 'Land Offices',
    navMouzaMap: 'GIS Mouza Maps',
    navKhasLand: 'Khas Land & Property',
    navKnowledge: 'Knowledge Center',
    navNotices: 'Circulars & Notices',
    navComplaints: 'Grievance (GRS)',
    navStatus: 'System Status',
    navCitizenDashboard: 'Citizen Dashboard',
    navAdminPortal: 'Admin & Officer Portal',
    navLogin: 'Login',
    navRegister: 'Register',
    navLogout: 'Sign Out',

    // Hero
    heroTitle: 'All Your Land Services, in One Place.',
    heroSubtitle: 'Discover land services, understand procedures, submit digital requests, verify survey maps, and track proceedings with complete transparency.',
    searchPlaceholder: 'Search for Khatian, Namjari, Land Development Tax, Mouza maps...',
    searchButton: 'Search Services',
    hotlineBanner: 'Land Service National Hotline: 16122 (Toll-Free, 24/7)',

    // Sections
    frequentlyUsedServices: 'Frequently Used Citizen Services',
    frequentlyUsedSub: 'Direct digital gateways to core land administration functions',
    trackApplicationTitle: 'Track Application or Grievance',
    trackPlaceholder: 'Enter Reference Number (e.g. BILSP-2026-MUT-84920 or BILSP-GRV-39102)',
    trackButton: 'Track Status',

    // GIS Map
    gisTitle: 'Interactive Mouza Map & Cadastral GIS Viewer',
    gisSub: 'Preview parcel boundaries, identify dag numbers, and cross-reference CS, SA, RS, and BS survey records',
    selectDivision: 'Select Division',
    selectDistrict: 'Select District',
    selectUpazila: 'Select Upazila',
    selectMouza: 'Select Mouza',
    selectSurveyType: 'Survey Type',
    plotDetailsTitle: 'Selected Plot (Dag) Information',

    // Statuses
    statusDraft: 'Draft',
    statusSubmitted: 'Submitted',
    statusUnderReview: 'Under Review',
    statusAdditionalInfo: 'Additional Information Required',
    statusHearingScheduled: 'Hearing Scheduled',
    statusApproved: 'Approved',
    statusRejected: 'Rejected',
    statusCompleted: 'Completed',

    // Roles
    roleCitizen: 'Citizen Applicant',
    roleOfficeClerk: 'Union Land Officer (Clerk)',
    roleReviewingOfficer: 'Assistant Commissioner (Land) / Reviewing Officer',
    roleApprovingOfficer: 'Additional Deputy Commissioner (Revenue)',
    roleSystemAdmin: 'System Administrator (ICT Wing)',
    roleSecurityAuditor: 'Security & Compliance Auditor',

    // Buttons
    btnApply: 'Apply for Service',
    btnDetails: 'View Details',
    btnOfficialPortal: 'Visit Verified Government Portal',
    btnSubmit: 'Submit Application',
    btnCancel: 'Cancel',
    btnClose: 'Close',
    btnSaveDraft: 'Save as Draft',
    btnFilter: 'Filter',
    btnReset: 'Reset Filters',
    btnReportEncroachment: 'Report Suspected Encroachment',

    // Dashboard
    myApplications: 'My Applications',
    myComplaints: 'My Grievances',
    myDocuments: 'Saved Documents',
    notifications: 'Notifications',
    recentActivity: 'Recent Activity',
    accountProfile: 'Citizen Profile',
    switchRoleDemo: 'Demo Role Switcher',
    switchRoleDesc: 'Switch identity to test real officer review, clerk validation, and citizen workflows:',

    // Footer
    footerAboutTitle: 'About BILSP',
    footerAboutDesc: 'A unified digital platform facilitating citizen access to Bangladesh land services, records, cadastral surveys, and transparent public grievance redress.',
    footerQuickLinks: 'Quick Links',
    footerOfficialLinks: 'Verified Official Government Portals',
    footerEmergencySupport: 'Help & Emergency Support',
    footerLegalDisclaimer: 'Disclaimer: This platform provides unified public service workflows and verified links. Authoritative legal land decisions remain solely under the statutory jurisdiction of the relevant Assistant Commissioner (Land), Deputy Commissioner, and Ministry of Land.',
    allRightsReserved: 'All Rights Reserved. Digital Bangladesh Land Transformation Initiative.'
  },
  bn: {
    portalName: 'বাংলাদেশ সমন্বিত ভূমি সেবা পোর্টাল (BILSP)',
    portalSubtitle: 'ভূমি মন্ত্রণালয় ও ভূমি প্রশাসন সমন্বিত ডিজিটাল সেবা',
    portalTagline: 'এক প্ল্যাটফর্মে সকল ভূমি সেবা, স্বচ্ছ ভূমি ব্যবস্থাপনা।',
    demoNotice: 'এটি পরীক্ষামূলক তথ্য। এটি কোনো সরকারি ভূমি রেকর্ড বা আইনি প্রমাণ নয়।',

    // Navigation
    navHome: 'হোম',
    navServices: 'সকল সেবা',
    navOffices: 'ভূমি অফিসসমূহ',
    navMouzaMap: 'জিআইএস মৌজা নকশা',
    navKhasLand: 'খাস জমি ও সম্পদ',
    navKnowledge: 'জ্ঞান কেন্দ্র',
    navNotices: 'পরিপত্র ও বিজ্ঞপ্তি',
    navComplaints: 'অভিযোগ সেল (GRS)',
    navStatus: 'সিস্টেম স্ট্যাটাস',
    navCitizenDashboard: 'নাগরিক ড্যাশবোর্ড',
    navAdminPortal: 'কর্মকর্তা ও অ্যাডমিন পোর্টাল',
    navLogin: 'লগইন',
    navRegister: 'নিবন্ধন',
    navLogout: 'লগআউট',

    // Hero
    heroTitle: 'আপনার সকল ভূমি সেবা, এখন এক ঠিকানায়',
    heroSubtitle: 'ভূমি সেবা আবিষ্কার করুন, নিয়ম জানুন, অনলাইনে ডিজিটাল আবেদন করুন, মৌজা নকশা যাচাই করুন এবং আবেদনের প্রতিটি ধাপ স্বচ্ছতার সাথে ট্র্যাক করুন।',
    searchPlaceholder: 'খতিয়ান, নামজারি, ভূমি উন্নয়ন কর বা অন্য কোনো সেবা খুঁজুন...',
    searchButton: 'সেবা খুঁজুন',
    hotlineBanner: 'ভূমি সেবা জাতীয় কল সেন্টার: ১৬১২২ (টোল-ফ্রি, সার্বক্ষণিক)',

    // Sections
    frequentlyUsedServices: 'বহুল ব্যবহৃত নাগরিক সেবা',
    frequentlyUsedSub: 'মূল ভূমি প্রশাসন সেবাসমূহের সরাসরি ডিজিটাল প্রবেশদ্বার',
    trackApplicationTitle: 'আবেদন বা অভিযোগের অবস্থা যাচাই',
    trackPlaceholder: 'আবেদন বা অভিযোগের ট্র্যাকিং নম্বর লিখুন (যেমন- BILSP-2026-MUT-84920)',
    trackButton: 'অবস্থা দেখুন',

    // GIS Map
    gisTitle: 'ইন্টারঅ্যাকটিভ মৌজা নকশা ও ক্যাডাস্ট্রাল জিআইএস ম্যাপ',
    gisSub: 'মৌজার দাগ সীমানা নিরীক্ষণ করুন, দাগের তথ্য দেখুন এবং সিএস, এসএ, আরএস ও বিএস রেকর্ডের সমন্বয় যাচাই করুন',
    selectDivision: 'বিভাগ নির্বাচন করুন',
    selectDistrict: 'জেলা নির্বাচন করুন',
    selectUpazila: 'উপজেলা নির্বাচন করুন',
    selectMouza: 'মৌজা নির্বাচন করুন',
    selectSurveyType: 'জরিপের ধরন',
    plotDetailsTitle: 'নির্বাচিত দাগের বিস্তারিত তথ্য',

    // Statuses
    statusDraft: 'খসড়া',
    statusSubmitted: 'দাখিলকৃত',
    statusUnderReview: 'পর্যালোচনাধীন',
    statusAdditionalInfo: 'অতিরিক্ত তথ্য প্রয়োজন',
    statusHearingScheduled: 'শুনানি নির্ধারিত',
    statusApproved: 'অনুমোদিত',
    statusRejected: 'বাতিল',
    statusCompleted: 'সম্পন্ন',

    // Roles
    roleCitizen: 'নাগরিক আবেদনকারী',
    roleOfficeClerk: 'ইউনিয়ন ভূমি কর্মকর্তা (সহকারী)',
    roleReviewingOfficer: 'সহকারী কমিশনার (ভূমি) / পর্যালোচনাকারী',
    roleApprovingOfficer: 'অতিরিক্ত জেলা প্রশাসক (রাজস্ব)',
    roleSystemAdmin: 'সিস্টেম অ্যাডমিনিস্ট্রেটর (আইসিটি শাখা)',
    roleSecurityAuditor: 'নিরাপত্তা ও কমপ্লায়েন্স নিরীক্ষক',

    // Buttons
    btnApply: 'আবেদন করুন',
    btnDetails: 'বিস্তারিত দেখুন',
    btnOfficialPortal: 'অফিসিয়াল সরকারি পোর্টাল',
    btnSubmit: 'আবেদন জমা দিন',
    btnCancel: 'বাতিল',
    btnClose: 'বন্ধ করুন',
    btnSaveDraft: 'খসড়া সংরক্ষণ করুন',
    btnFilter: 'ফিল্টার করুন',
    btnReset: 'রিসেট',
    btnReportEncroachment: 'অবৈধ দখল বা গরমিল রিপোর্ট করুন',

    // Dashboard
    myApplications: 'আমার আবেদনসমূহ',
    myComplaints: 'আমার অভিযোগসমূহ',
    myDocuments: 'সংরক্ষিত কাগজপত্র',
    notifications: 'বিজ্ঞপ্তিসমূহ',
    recentActivity: 'সাম্প্রতিক কার্যক্রম',
    accountProfile: 'নাগরিক প্রোফাইল',
    switchRoleDemo: 'ভূমিকা পরিবর্তন (ডেমো)',
    switchRoleDesc: 'কর্মকর্তা অনুমোদন, এসিল্যান্ড শুনানি ও নাগরিক সেবা কার্যক্রম পরীক্ষা করতে ভূমিকা পরিবর্তন করুন:',

    // Footer
    footerAboutTitle: 'বিআইএলএসপি সম্পর্কিত',
    footerAboutDesc: 'বাংলাদেশের সকল ভূমি সেবা, রেকর্ড, ক্যাডাস্ট্রাল জরিপ এবং নাগরিক অভিযোগ প্রতিকার একীভূত করার জন্য তৈরি ডিজিটাল প্ল্যাটফর্ম।',
    footerQuickLinks: 'প্রয়োজনীয় লিংক',
    footerOfficialLinks: 'যাচাইকৃত সরকারি অফিসিয়াল পোর্টাল',
    footerEmergencySupport: 'জরুরি সহায়তা ও হেল্পলাইন',
    footerLegalDisclaimer: 'সতর্কবার্তা: এই পোর্টালটি নাগরিক সেবা সহজীকরণ এবং সমন্বিত নির্দেশিকা প্রদান করে। আইনি চূড়ান্ত সিদ্ধান্ত সহকারী কমিশনার (ভূমি), জেলা প্রশাসন ও ভূমি মন্ত্রণালয়ের এখতিয়ারভুক্ত।',
    allRightsReserved: 'সর্বস্বত্ব সংরক্ষিত। ডিজিটাল বাংলাদেশ স্মার্ট ভূমি রূপান্তর উদ্যোগ।'
  }
};
