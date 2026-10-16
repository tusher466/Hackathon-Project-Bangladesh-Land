import { LandService, LandOffice, KhasLandParcel, KnowledgeArticle, NoticeItem, IntegrationStatus, MouzaPlot } from '../types';

export const BANGLADESH_DIVISIONS = [
  { id: 'Dhaka', name: 'Dhaka', nameBn: 'ঢাকা' },
  { id: 'Chattogram', name: 'Chattogram', nameBn: 'চট্টগ্রাম' },
  { id: 'Rajshahi', name: 'Rajshahi', nameBn: 'রাজশাহী' },
  { id: 'Khulna', name: 'Khulna', nameBn: 'খুলনা' },
  { id: 'Barishal', name: 'Barishal', nameBn: 'বরিশাল' },
  { id: 'Sylhet', name: 'Sylhet', nameBn: 'সিলেট' },
  { id: 'Rangpur', name: 'Rangpur', nameBn: 'রংপুর' },
  { id: 'Mymensingh', name: 'Mymensingh', nameBn: 'ময়মনসিংহ' },
];

export const DISTRICTS_BY_DIVISION: Record<string, { id: string; name: string; nameBn: string }[]> = {
  Dhaka: [
    { id: 'Dhaka', name: 'Dhaka', nameBn: 'ঢাকা' },
    { id: 'Gazipur', name: 'Gazipur', nameBn: 'গাজীপুর' },
    { id: 'Narayanganj', name: 'Narayanganj', nameBn: 'নারায়ণগঞ্জ' },
    { id: 'Tangail', name: 'Tangail', nameBn: 'টাঙ্গাইল' },
    { id: 'Faridpur', name: 'Faridpur', nameBn: 'ফরিদপুর' }
  ],
  Chattogram: [
    { id: 'Chattogram', name: 'Chattogram', nameBn: 'চট্টগ্রাম' },
    { id: 'CoxsBazar', name: "Cox's Bazar", nameBn: 'কক্সবাজার' },
    { id: 'Cumilla', name: 'Cumilla', nameBn: 'কুমিল্লা' }
  ],
  Sylhet: [
    { id: 'Sylhet', name: 'Sylhet', nameBn: 'সিলেট' },
    { id: 'Moulvibazar', name: 'Moulvibazar', nameBn: 'মৌলভীবাজার' }
  ],
  Rajshahi: [
    { id: 'Rajshahi', name: 'Rajshahi', nameBn: 'রাজশাহী' },
    { id: 'Bogura', name: 'Bogura', nameBn: 'বগুড়া' }
  ],
  Khulna: [
    { id: 'Khulna', name: 'Khulna', nameBn: 'খুলনা' },
    { id: 'Jashore', name: 'Jashore', nameBn: 'যশোর' }
  ],
  Barishal: [
    { id: 'Barishal', name: 'Barishal', nameBn: 'বরিশাল' }
  ],
  Rangpur: [
    { id: 'Rangpur', name: 'Rangpur', nameBn: 'রংপুর' }
  ],
  Mymensingh: [
    { id: 'Mymensingh', name: 'Mymensingh', nameBn: 'ময়মনসিংহ' }
  ]
};

export const UPAZILAS_BY_DISTRICT: Record<string, { id: string; name: string; nameBn: string }[]> = {
  Dhaka: [
    { id: 'Dhaka Sadar', name: 'Dhaka Sadar (Revenue)', nameBn: 'ঢাকা সদর (রাজস্ব)' },
    { id: 'Tejgaon', name: 'Tejgaon Circle', nameBn: 'তেজগাঁও সার্কেল' },
    { id: 'Mirpur', name: 'Mirpur Circle', nameBn: 'মিরপুর সার্কেল' },
    { id: 'Savar', name: 'Savar', nameBn: 'সাভার' },
    { id: 'Keraniganj', name: 'Keraniganj', nameBn: 'কেরানীগঞ্জ' }
  ],
  Gazipur: [
    { id: 'Gazipur Sadar', name: 'Gazipur Sadar', nameBn: 'গাজীপুর সদর' },
    { id: 'Kaliakair', name: 'Kaliakair', nameBn: 'কালিয়াকৈর' },
    { id: 'Sreepur', name: 'Sreepur', nameBn: 'শ্রীপুর' },
    { id: 'Kapasia', name: 'Kapasia', nameBn: 'কাপাসিয়া' },
    { id: 'Kaliganj', name: 'Kaliganj', nameBn: 'কালীগঞ্জ' }
  ],
  Narayanganj: [
    { id: 'Narayanganj Sadar', name: 'Narayanganj Sadar', nameBn: 'নারায়ণগঞ্জ সদর' },
    { id: 'Rupganj', name: 'Rupganj', nameBn: 'রূপগঞ্জ' },
    { id: 'Sonargaon', name: 'Sonargaon', nameBn: 'সোনারগাঁও' }
  ],
  Chattogram: [
    { id: 'Chattogram Sadar', name: 'Chattogram Sadar (Bakalia)', nameBn: 'চট্টগ্রাম সদর (বাকলিয়া)' },
    { id: 'Panchlaish', name: 'Panchlaish Circle', nameBn: 'পাঁচলাইশ সার্কেল' },
    { id: 'Hathazari', name: 'Hathazari', nameBn: 'হাটহাজারী' }
  ],
  Sylhet: [
    { id: 'Sylhet Sadar', name: 'Sylhet Sadar', nameBn: 'সিলেট সদর' },
    { id: 'Golapganj', name: 'Golapganj', nameBn: 'গোলাপগঞ্জ' }
  ],
  Rajshahi: [
    { id: 'Boalia', name: 'Boalia (Rajshahi Sadar)', nameBn: 'বোয়ালিয়া (রাজশাহী সদর)' },
    { id: 'Paba', name: 'Paba', nameBn: 'পবা' }
  ],
  Khulna: [
    { id: 'Khulna Sadar', name: 'Khulna Sadar', nameBn: 'খুলনা সদর' },
    { id: 'Dighalia', name: 'Dighalia', nameBn: 'দিঘলিয়া' }
  ],
  Barishal: [
    { id: 'Barishal Sadar', name: 'Barishal Sadar', nameBn: 'বরিশাল সদর' }
  ],
  Rangpur: [
    { id: 'Rangpur Sadar', name: 'Rangpur Sadar', nameBn: 'রংপুর সদর' }
  ],
  Mymensingh: [
    { id: 'Mymensingh Sadar', name: 'Mymensingh Sadar', nameBn: 'ময়মনসিংহ সদর' }
  ]
};

// 12 Full-Scale Real Services
export const LAND_SERVICES: LandService[] = [
  {
    id: 'e-mutation',
    slug: 'e-mutation-namjari',
    title: 'E-Mutation and Name Transfer (Namjari)',
    titleBn: 'ই-নামজারি ও জমাখারিজ আবেদন',
    shortDesc: 'Apply online for record update after purchase, inheritance, gift, or decree with transparent digital tracking.',
    shortDescBn: 'ক্রয়, ওয়ারিশ, হেবা কিংবা ডিক্রিমূলে প্রাপ্ত জমির মালিকানা রেকর্ড হালনাগাদ করার অনলাইন সেবা।',
    category: 'MUTATION_NAMJARI',
    categoryName: 'Mutation & Namjari',
    categoryNameBn: 'নামজারি ও জমাখারিজ',
    authority: 'Assistant Commissioner (Land) Office & Ministry of Land',
    authorityBn: 'সহকারী কমিশনার (ভূমি) কার্যালয় ও ভূমি মন্ত্রণালয়',
    officialFee: 'BDT 1,170 (Court fee 20 + Notice 50 + Record correction 1,000 + Mutation Khatian 100)',
    officialFeeBn: '১,১৭০ টাকা (কোর্ট ফি ২০ + নোটিশ ৫০ + রেকর্ড সংশোধন ১,০০০ + খতিয়ান ফি ১০০)',
    estimatedTimeline: '28 working days (Standard Citizen Charter)',
    estimatedTimelineBn: '২৮ কার্যদিবস (নাগরিক সনদ অনুযায়ী)',
    integrationMode: 'MODE_2_OFFICIAL_EXTERNAL',
    officialExternalUrl: 'https://mutation.land.gov.bd',
    requirements: {
      en: [
        'Registered sale deed / gift deed / inheritance certificate (Waris sanad)',
        'Up-to-date Land Development Tax (Dakhila) receipt',
        'Previous CS / SA / RS / BS Khatian certified copies',
        'Applicant NID & active mobile phone number',
        'Passport-size photograph of applicant(s)'
      ],
      bn: [
        'মূল দলিলের স্পষ্ট স্ক্যান কপি (সাব-রেজিস্ট্রি অফিস কর্তৃক নিবন্ধিত)',
        'হালনাগাদ ভূমি উন্নয়ন কর পরিশোধের দাখিলা / রশিদ',
        'পূর্ববর্তী খতিয়ানের জাবেদা নকল / পরচা কপি',
        'আবেদনকারী ও ওয়ারিশদের জাতীয় পরিচয়পত্র (NID) নম্বর',
        'আবেদনকারীর পাসপোর্ট সাইজের রঙিন ছবি'
      ]
    },
    steps: [
      { step: 1, title: 'Form Submission', titleBn: 'অনলাইন ফরম পূরণ', desc: 'Select district, upazila, mouza, enter khatian and deed particulars.', descBn: 'বিভাগ, জেলা, উপজেলা ও মৌজা নির্বাচন করে খতিয়ান ও দলিলের তথ্য দিন।' },
      { step: 2, title: 'Document Upload', titleBn: 'কাগজপত্র আপলোড', desc: 'Attach PDF/JPEG copies of registered deed, previous khatian and tax receipt.', descBn: 'রেজিস্ট্রিকৃত দলিল, পূর্বের খতিয়ান এবং হাল কর পরিশোধের রসিদ সংযুক্ত করুন।' },
      { step: 3, title: 'Fee Payment', titleBn: 'কোর্ট ফি প্রদান', desc: 'Pay initial court fee BDT 70 via mobile banking or treasury gateway.', descBn: 'প্রাথমিক কোর্ট ফি ৭০ টাকা মোবাইল ব্যাংকিং বা ট্রেজারি পেমেন্টে পরিশোধ করুন।' },
      { step: 4, title: 'Field Scrutiny & Hearing', titleBn: 'তদন্ত ও শুনানি', desc: 'Union Assistant Land Officer prepares field report; AC Land schedules hearing.', descBn: 'ইউনিয়ন ভূমি সহকারী কর্মকর্তা প্রস্তাব প্রস্তুত করবেন এবং সহকারী কমিশনার (ভূমি) শুনানি গ্রহণ করবেন।' },
      { step: 5, title: 'Order & DCR Issuance', titleBn: 'অনুমোদন ও ডিসিআর', desc: 'Pay BDT 1,100 DCR fee upon approval and download QR-verified Namjari Khatian.', descBn: 'অনুমোদন শেষে ১১০০ টাকা ডিসিআর ফি পরিশোধ করে কিউআর-কোডযুক্ত অনলাইন খতিয়ান সংগ্রহ করুন।' }
    ],
    legalBasis: 'State Acquisition and Tenancy Act 1950 (Section 143, 144) & Mutation Manual 2021',
    legalBasisBn: 'রাষ্ট্রীয় অধিগ্রহণ ও প্রজাস্বত্ব আইন ১৯৫০ (ধারা ১৪৩, ১৪৪) এবং নামজারি নির্দেশিকা ২০২১',
    lastVerifiedDate: '2026-08-15'
  },
  {
    id: 'khatian-porcha',
    slug: 'khatian-porcha-certified-copy',
    title: 'Certified Khatian / Porcha Record Copy',
    titleBn: 'খতিয়ান ও পর্চা সার্টিফাইড নকল',
    shortDesc: 'Search and request certified printed and digital copies of CS, SA, RS, and City/BS survey records.',
    shortDescBn: 'সিএস, এসএ, আরএস এবং বিএস জরিপের খতিয়ান ও পর্চার সত্যয়িত ডিজিটাল বা মুদ্রিত অনুলিপি সংগ্রহ করুন।',
    category: 'RECORDS_KHATIAN',
    categoryName: 'Land Records & Khatian',
    categoryNameBn: 'রেকর্ড ও খতিয়ান',
    authority: 'Directorate of Land Records & Surveys (DLRS) & DC Record Room',
    authorityBn: 'ভূমি রেকর্ড ও জরিপ অধিদপ্তর এবং জেলা প্রশাসকের রেকর্ড রুম',
    officialFee: 'BDT 100 for digital certified copy, BDT 140 for postal delivery',
    officialFeeBn: 'অনলাইন কপি ১০০ টাকা, ডাকযোগে ডাক মাশুলসহ ১৪০ টাকা',
    estimatedTimeline: 'Instant download for verified digital; 7-10 days for postal signed copy',
    estimatedTimelineBn: 'অনলাইন সত্যায়িত কপি তাৎক্ষণিক, মুদ্রিত কপি ডাকযোগে ৭-১০ কার্যদিবস',
    integrationMode: 'MODE_2_OFFICIAL_EXTERNAL',
    officialExternalUrl: 'https://eporcha.gov.bd',
    requirements: {
      en: [
        'Survey Type (CS, SA, RS, City / BS)',
        'District, Upazila / Thana, Mouza with JL Number',
        'Khatian Number or Dag (Plot) Number or Owner Name',
        'National ID Number & Mobile Number for dispatch notification'
      ],
      bn: [
        'জরিপের ধরন (সিএস, এসএ, আরএস অথবা সিটি/বিএস)',
        'জেলা, উপজেলা বা সার্কেল এবং জেএল নম্বরসহ মৌজা',
        'খতিয়ান নম্বর অথবা দাগ নম্বর অথবা মালিকের নাম',
        'আবেদনকারীর এনআইডি ও ডেলিভারি ট্র্যাকিং মোবাইল নম্বর'
      ]
    },
    steps: [
      { step: 1, title: 'Survey Lookup', titleBn: 'রেকর্ড অনুসন্ধান', desc: 'Locate khatian by entering administrative hierarchy and plot number.', descBn: 'বিভাগ, জেলা, উপজেলা এবং মৌজা নির্বাচন করে খতিয়ান নম্বর অনুসন্ধান করুন।' },
      { step: 2, title: 'Preview Data', titleBn: 'তথ্য যাচাই', desc: 'Inspect parcel owners, plot shares, and survey volume references.', descBn: 'রেকর্ডের মালিকানা, দাগের তালিকা এবং হিস্যা যাচাই করুন।' },
      { step: 3, title: 'Select Delivery Mode', titleBn: 'ডেলিভারি মাধ্যম নির্বাচন', desc: 'Choose Instant Digital PDF with QR Seal or Physical Stamp Delivery via Bangladesh Post.', descBn: 'কিউআর কোডযুক্ত ডিজিটাল কপি নাকি ডাকযোগে জাবেদা নকল নিবেন তা নির্বাচন করুন।' },
      { step: 4, title: 'Fee Payment', titleBn: 'ফি পরিশোধ', desc: 'Pay regulated government fee via Sonali e-Sheba or Ekpay gateway.', descBn: 'অনুমোদিত ফি মোবাইল ওয়ালেট বা ব্যাংকিং গেটওয়েতে পরিশোধ করুন।' }
    ],
    legalBasis: 'Bengal Tenancy Act 1885 / State Acquisition Rules 1951',
    legalBasisBn: 'বঙ্গীয় প্রজাস্বত্ব আইন ১৮৮৫ এবং রাষ্ট্রীয় অধিগ্রহণ বিধিমালা ১৯৫১',
    lastVerifiedDate: '2026-09-01'
  },
  {
    id: 'ldtax-payment',
    slug: 'land-development-tax-ldtax',
    title: 'Land Development Tax (LD Tax / Khajna)',
    titleBn: 'অনলাইন ভূমি উন্নয়ন কর (খাজনা)',
    shortDesc: 'Register your land holding, check annual land tax liability, pay digitally, and generate verified Dakhila.',
    shortDescBn: 'অনলাইনে জমির হোল্ডিং এন্ট্রি, বার্ষিক কর নিরূপণ, মোবাইল ব্যাংকিংয়ে পরিশোধ ও সরকারি দাখিলা সংগ্রহ।',
    category: 'LAND_TAX',
    categoryName: 'Land Development Tax',
    categoryNameBn: 'ভূমি উন্নয়ন কর',
    authority: 'Ministry of Land & Union Land Office',
    authorityBn: 'ভূমি মন্ত্রণালয় ও ইউনিয়ন ভূমি অফিস',
    officialFee: 'Calculated as per Land Development Tax Act 2023 based on usage classification',
    officialFeeBn: 'ভূমি উন্নয়ন কর আইন ২০২৩ অনুযায়ী কৃষি ও অকৃষি জমির ব্যবহারভেদে নিরূপিত',
    estimatedTimeline: 'Instant electronic Dakhila upon payment confirmation',
    estimatedTimelineBn: 'পেমেন্ট সম্পন্ন হওয়ার সাথে সাথে কিউআর কোডযুক্ত দাখিলা প্রস্তুত',
    integrationMode: 'MODE_2_OFFICIAL_EXTERNAL',
    officialExternalUrl: 'https://ldtax.gov.bd',
    requirements: {
      en: [
        'Holding Number or Latest Mutation Khatian Number',
        'National ID Number (must match holding owner record)',
        'Registered Mobile Number linked with NID',
        'Previous year tax dakhila (if manual holding)'
      ],
      bn: [
        'হোল্ডিং নম্বর অথবা হাল নামজারি খতিয়ান নম্বর',
        'জাতীয় পরিচয়পত্র নম্বর (জমির রেকর্ডের সাথে মিল থাকতে হবে)',
        'এনআইডি নিবন্ধিত সচল মোবাইল নম্বর',
        'পূর্ববর্তী বছরের ম্যানুয়াল দাখিলার কপি (যদি অনলাইনে প্রথমবার হয়)'
      ]
    },
    steps: [
      { step: 1, title: 'Citizen Registration', titleBn: 'নাগরিক নিবন্ধন', desc: 'Complete NID and OTP verification at the tax gateway.', descBn: 'এনআইডি ও জন্মতারিখ দিয়ে ওটিপি যাচাইয়ের মাধ্যমে প্রোফাইল সচল করুন।' },
      { step: 2, title: 'Add Holding', titleBn: 'হোল্ডিং যুক্তকরণ', desc: 'Enter district, upazila, mouza, and khatian number to view assessed tax.', descBn: 'জেলা, উপজেলা, মৌজা ও খতিয়ান নম্বর দিয়ে বকেয়া করের বিবরণী দেখুন।' },
      { step: 3, title: 'Online Payment', titleBn: 'অনলাইন পেমেন্ট', desc: 'Settle tax via bKash, Nagad, Rocket, or Sonali Bank internet banking.', descBn: 'বিকাশ, নগদ, রকেট বা যেকোনো ডেবিট/ক্রেডিট কার্ডের মাধ্যমে পরিশোধ করুন।' },
      { step: 4, title: 'Download Dakhila', titleBn: 'দাখিলা সংগ্রহ', desc: 'Immediately download and print the QR-stamped official tax Dakhila.', descBn: 'তাৎক্ষণিকভাবে কিউআর-কোডসম্বলিত সরকারি দাখিলা ডাউনলোড ও সংরক্ষণ করুন।' }
    ],
    legalBasis: 'Land Development Tax Act 2023',
    legalBasisBn: 'ভূমি উন্নয়ন কর আইন ২০২৩',
    lastVerifiedDate: '2026-09-10'
  },
  {
    id: 'mouza-maps',
    slug: 'mouza-maps-survey-sheets',
    title: 'Mouza Maps and Cadastral Survey Sheets',
    titleBn: 'মৌজা নকশা ও জরিপ ম্যাপ সেবা',
    shortDesc: 'Explore high-resolution cadastral survey maps (CS, SA, RS, BS) with plot boundaries and order certified sheets.',
    shortDescBn: 'সিএস, এসএ, আরএস ও বিএস মৌজা নকশা অনলাইনে দাগ চিহ্নিতকরণ এবং ডাকযোগে মূল ম্যাপ শিট সংগ্রহ।',
    category: 'SURVEY_MAPS',
    categoryName: 'Survey & Mouza Maps',
    categoryNameBn: 'জরিপ ও মৌজা নকশা',
    authority: 'Directorate of Land Records and Surveys (DLRS)',
    authorityBn: 'ভূমি রেকর্ড ও জরিপ অধিদপ্তর (ডিএলআরএস)',
    officialFee: 'BDT 520 per printed map sheet (BDT 500 fee + BDT 20 postal delivery)',
    officialFeeBn: 'প্রতি শিট ৫২০ টাকা (সরকারি ফি ৫০০ টাকা + ডাক মাশুল ২০ টাকা)',
    estimatedTimeline: 'Online digital viewing instant; Printed map delivered within 10-15 days',
    estimatedTimelineBn: 'অনলাইন ভিউ তাৎক্ষণিক; মুদ্রিত নকশা ডাকযোগে ১০-১৫ কার্যদিবস',
    integrationMode: 'MODE_1_LIVE',
    officialExternalUrl: 'https://eporcha.gov.bd/mouza-map',
    requirements: {
      en: [
        'Division, District, Upazila / Thana',
        'Mouza Name and JL Number',
        'Survey Type (RS or BS preferred for current borders)',
        'Sheet Number (e.g., Sheet 01, Sheet 02)'
      ],
      bn: [
        'বিভাগ, জেলা এবং উপজেলা/থানা',
        'মৌজার নাম এবং জেএল নম্বর',
        'জরিপের ধরন (আরএস বা বিএস)',
        'নকশার শিট নম্বর (যেমন- শিট ১, শিট ২)'
      ]
    },
    steps: [
      { step: 1, title: 'Select Mouza', titleBn: 'মৌজা ও শিট নির্বাচন', desc: 'Identify sheet based on JL number and plot geographic range.', descBn: 'জেএল নম্বর ও দাগ নম্বরের রেঞ্জ দেখে উপযুক্ত শিট নির্বাচন করুন।' },
      { step: 2, title: 'Interactive GIS Preview', titleBn: 'নকশায় দাগ পরিদর্শন', desc: 'Inspect parcel boundaries, road alignments, and canal buffers.', descBn: 'নকশায় দাগের সীমানা, রাস্তা ও খালের অবস্থান ডিজিটাল মাধ্যমে নিরীক্ষণ করুন।' },
      { step: 3, title: 'Order Certified Map', titleBn: 'মুদ্রিত শিট অর্ডার', desc: 'Order certified high-grade waterproof map paper from Central Map Room, Tejgaon.', descBn: 'তেজগাঁও কেন্দ্রীয় ম্যাপ সংরক্ষণাগার থেকে সার্টিফাইড প্রিন্ট কপির জন্য আবেদন করুন।' }
    ],
    legalBasis: 'Survey Act 1875 & Cadastral Mapping Rules',
    legalBasisBn: 'জরিপ আইন ১৮৭৫ এবং ক্যাডাস্ট্রাল ম্যাপিং বিধিমালা',
    lastVerifiedDate: '2026-07-20'
  },
  {
    id: 'deed-registration',
    slug: 'deed-registration-guidance',
    title: 'Deed Registration Guidance & Fee Calculator',
    titleBn: 'দলিল রেজিস্ট্রেশন নির্দেশিকা ও সরকারি ফি গণনা',
    shortDesc: 'Step-by-step guidance for sale, gift (Heba), partition deeds, Sub-Registrar directory, and regulated stamp duties.',
    shortDescBn: 'বিক্রয় কবলা, হেবা, বণ্টননামা ও দান দলিলের নির্ভুল প্রস্তুতি, সাব-রেজিস্ট্রি তথ্য ও সরকারি ফি হিসাব।',
    category: 'DEEDS_REGISTRATION',
    categoryName: 'Deeds & Registration',
    categoryNameBn: 'দলিল ও রেজিস্ট্রেশন',
    authority: 'Directorate of Registration (Law & Justice Division)',
    authorityBn: 'নিবন্ধন অধিদপ্তর (আইন ও বিচার বিভাগ)',
    officialFee: 'Registration fee, Stamp duty, Local Govt tax as percentage of deed value',
    officialFeeBn: 'দলিল মূল্যের নির্দিষ্ট শতাংশ হারে স্ট্যাম্প ডিউটি, রেজিস্ট্রেশন ফি ও স্থানীয় কর',
    estimatedTimeline: 'Same-day registration upon document submission at Sub-Registry',
    estimatedTimelineBn: 'সাব-রেজিস্ট্রি অফিসে উপস্থিত হয়ে একই দিনে রেজিস্ট্রেশন ও আঙুলের ছাপ প্রদান',
    integrationMode: 'MODE_2_OFFICIAL_EXTERNAL',
    officialExternalUrl: 'https://registration.gov.bd',
    requirements: {
      en: [
        'Draft Deed prepared by certified Deed Writer (Dalil Lekhok)',
        'Latest Land Development Tax (Khajna) payment Dakhila',
        'Seller & Buyer valid NIDs and recent passport photos',
        'E-Mutation Khatian in name of transferor (Mandatory by Land Crime Prevention Act 2023)'
      ],
      bn: [
        'সনদপ্রাপ্ত দলিল লেখক কর্তৃক প্রস্তুতকৃত দলিলের খসড়া',
        'হালনাগাদ ভূমি উন্নয়ন কর পরিশোধের দাখিলা',
        'ক্রেতা-বিক্রেতার এনআইডি ও পাসপোর্ট সাইজের ছবি',
        'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩ অনুযায়ী দাতার নামে হাল নামজারি খতিয়ান থাকা বাধ্যতামূলক'
      ]
    },
    steps: [
      { step: 1, title: 'Title Verification', titleBn: 'মালিকানা ও দলিল তল্লাশি', desc: 'Search 25-year title chain (Baya Dalil) at Sub-Registry Office.', descBn: 'সাব-রেজিস্ট্রি অফিসে সংশ্লিষ্ট দাগের ২৫ বছরের বায়া দলিল ও রেকর্ড তল্লাশি দিন।' },
      { step: 2, title: 'Calculate Government Fees', titleBn: 'সরকারি ফি নিরূপণ', desc: 'Calculate Stamp Duty (1.5%), Reg Fee (1%), Local Tax (2-3%), and AIT.', descBn: 'স্ট্যাম্প ডিউটি, রেজিস্ট্রেশন ফি, উৎসে কর এবং স্থানীয় সরকার কর হিসাব করুন।' },
      { step: 3, title: 'E-Challan Deposit', titleBn: 'ট্রেজারি চালানে ফি জমা', desc: 'Deposit regulated fees through automated A-Challan at Bangladesh Bank / Sonali Bank.', descBn: 'এ-চালানের মাধ্যমে সোনালী ব্যাংক বা অনুমোদিত ব্যাংকে সরকারি রাজস্ব জমা দিন।' },
      { step: 4, title: 'Execution at Sub-Registry', titleBn: 'দলিল সম্পাদন ও টিপসহি', desc: 'Present deed before Sub-Registrar with witnesses and biometric verification.', descBn: 'সাক্ষীসহ সাব-রেজিস্ট্রারের সম্মুখে উপস্থিত হয়ে বায়োমেট্রিক ও স্বাক্ষর প্রদান করুন।' }
    ],
    legalBasis: 'Registration Act 1908, Stamp Act 1899 & Land Crime Prevention and Redress Act 2023',
    legalBasisBn: 'রেজিস্ট্রেশন আইন ১৯০৮, স্ট্যাম্প আইন ১৮৯৯ এবং ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩',
    lastVerifiedDate: '2026-09-25'
  },
  {
    id: 'khas-land',
    slug: 'government-khas-land-vested-property',
    title: 'Government Khas Land & Vested Property Explorer',
    titleBn: 'সরকারি খাস জমি ও অর্পিত সম্পত্তি তথ্য অনুসন্ধান',
    shortDesc: 'Transparent public directory of state-owned khas land, water bodies, agricultural settlement eligibility, and encroachment reporting.',
    shortDescBn: 'সরকারি খাস জমি, অর্পিত সম্পত্তি, জলমহাল তথ্য ও ভূমিহীন কৃষি জমি বন্দোবস্ত নীতিমালা সংক্রান্ত তথ্য।',
    category: 'KHAS_LAND',
    categoryName: 'Khas Land & Vested Property',
    categoryNameBn: 'খাস জমি ও অর্পিত সম্পত্তি',
    authority: 'Ministry of Land, DC Revenue & AC Land Office',
    authorityBn: 'ভূমি মন্ত্রণালয়, অতিরিক্ত জেলা প্রশাসক (রাজস্ব) ও এসিল্যান্ড',
    officialFee: 'Free informational inquiry; Regulated token fee for approved agricultural lease',
    officialFeeBn: 'তথ্য অনুসন্ধান সম্পূর্ণ বিনামূল্যে; নীতিমালামাফিক বন্দোবস্তের জন্য নির্ধারিত প্রতীকী মূল্য',
    estimatedTimeline: 'Annual settlement window processed by Upazila Agricultural Khas Land Committee',
    estimatedTimelineBn: 'উপজেলা কৃষি খাস জমি ব্যবস্থাপনা ও বন্দোবস্ত কমিটি কর্তৃক নির্ধারিত সময়ে প্রক্রিয়াধীন',
    integrationMode: 'MODE_1_LIVE',
    requirements: {
      en: [
        'Certificate of landlessness issued by Union Parishad Chairman / Ward Councillor',
        'Applicant NID & family genealogy statement',
        'Declaration of non-possession of more than 10 decimals of agricultural land',
        'Photograph of landless couple/applicant'
      ],
      bn: [
        'ইউনিয়ন পরিষদ চেয়ারম্যান বা কাউন্সিলর কর্তৃক প্রদত্ত প্রকৃত ভূমিহীন সনদপত্র',
        'আবেদনকারী ও পরিবারের জাতীয় পরিচয়পত্র ও ওয়ারিশান বিবরণ',
        'পরিবারের কোনো সদস্যের নামে ১০ শতাংশের বেশি কৃষিজমি নেই মর্মে অঙ্গীকারনামা',
        'স্বামী-স্ত্রীর যৌথ পাসপোর্ট সাইজের ছবি'
      ]
    },
    steps: [
      { step: 1, title: 'Review Available Parcels', titleBn: 'তালিকাভুক্ত খাস জমি অনুসন্ধান', desc: 'Search Upazila khas land records to check status and classification.', descBn: 'উপজেলাভিত্তিক খাস জমির শ্রেণি, দাগ নম্বর ও দখল সংক্রান্ত তথ্য যাচাই করুন।' },
      { step: 2, title: 'Submit Settlement Request', titleBn: 'বন্দোবস্তের আবেদন দাখিল', desc: 'Eligible landless farmers submit Form Ka to Upazila Land Office.', descBn: 'প্রকৃত ভূমিহীন পরিবার উপজেলা কৃষি খাস জমি কমিটির সভাপতি বরাবর ‘ক’ ফরমে আবেদন করুন।' },
      { step: 3, title: 'Joint Committee Verification', titleBn: 'যৌথ তদন্ত ও সাক্ষাৎকার', desc: 'Upazila committee conducts physical background scrutiny.', descBn: 'উপজেলা কমিটি আবেদনকারীদের কাগজপত্র ও সরেজমিনে পরিদর্শনপূর্বক যাচাই বাছাই সম্পন্ন করে।' },
      { step: 4, title: 'Kabuliyat Registration', titleBn: 'কবুলিয়ত সম্পাদন ও দখল হস্তান্তর', desc: 'Registered 99-year lease executed in joint names of husband and wife.', descBn: 'স্বামী ও স্ত্রীর যৌথ নামে ৯৯ বছরের জন্য রেজিস্ট্রিকৃত বন্দোবস্ত দলিল সম্পাদন ও দখল হস্তান্তর।' }
    ],
    legalBasis: 'Agricultural Khas Land Management & Distribution Policy 1997 / Non-Agricultural Khas Land Settlement Rules 1995',
    legalBasisBn: 'কৃষি খাস জমি ব্যবস্থাপনা ও বন্দোবস্ত নীতিমালা ১৯৯৭ এবং অর্পিত সম্পত্তি প্রত্যর্পণ আইন ২০০১',
    lastVerifiedDate: '2026-08-10'
  },
  {
    id: 'land-acquisition',
    slug: 'land-acquisition-compensation',
    title: 'Land Acquisition and Compensation Claims',
    titleBn: 'ভূমি অধিগ্রহণ ও ক্ষতিপূরণ আবেদন',
    shortDesc: 'Guidance on national infrastructure land acquisition, Section 4/7/8 notices, compensation calculation, and 7-Ka claim submission.',
    shortDescBn: 'জাতীয় উন্নয়ন প্রকল্পে জমি অধিগ্রহণ, ধারা ৪ ও ৭ নোটিশের প্রেক্ষিতে ক্ষতিপূরণ দাবি ও ৭(ক) আবেদন প্রক্রিয়া।',
    category: 'ACQUISITION',
    categoryName: 'Acquisition & Compensation',
    categoryNameBn: 'ভূমি অধিগ্রহণ ও ক্ষতিপূরণ',
    authority: 'Deputy Commissioner (Land Acquisition Branch)',
    authorityBn: 'জেলা প্রশাসক কার্যালয় (ভূমি অধিগ্রহণ শাখা)',
    officialFee: 'No fee for filing compensation claims; Statutory compensation with 200% enhancement for public projects',
    officialFeeBn: 'ক্ষতিপূরণ আবেদনের জন্য কোনো ফি নেই; আইন অনুযায়ী বাজারমূল্যের অতিরিক্ত ২০০% ক্ষতিপূরণ প্রদেয়',
    estimatedTimeline: '60-90 days following joint verification and award book publication',
    estimatedTimelineBn: 'যৌথ তদন্ত ও রোয়েদাদ (Award Book) চূড়ান্তকরণের পর ৬০ থেকে ৯০ দিন',
    integrationMode: 'MODE_2_OFFICIAL_EXTERNAL',
    requirements: {
      en: [
        'Notice issued by DC Land Acquisition under Section 4 / 7 of 2017 Act',
        'Title deeds, previous CS/SA/RS khatians proving ownership',
        'Up-to-date Namjari Khatian and Land Development Tax Dakhila',
        'Joint inspection token or property inventory document'
      ],
      bn: [
        'জেলা প্রশাসন কর্তৃক জারিকৃত ধারা ৪ অথবা ৭ নোটিশের মূল কপি',
        'জমির মূল দলিল, বায়া দলিল ও ধারাবাহিক খতিয়ানের সত্যায়িত অনুলিপি',
        'হাল নাগাদ নামজারি খতিয়ান ও কর পরিশোধের রশিদ',
        'যৌথ তদন্তকালীন ভিডিও ও স্থিরচিত্রের টোকেন বা বিবরণী'
      ]
    },
    steps: [
      { step: 1, title: 'Notice Verification', titleBn: 'নোটিশ যাচাই', desc: 'Match your dag number against DC office acquisition gazette.', descBn: 'অধিগ্রহণ গেজেটে উল্লিখিত দাগ ও মৌজার তথ্যের সাথে আপনার দলিল মেলান।' },
      { step: 2, title: 'Joint Field Inspection', titleBn: 'যৌথ তদন্তে উপস্থিতি', desc: 'Participate in DC LA officer and Requiring Body land & structure inventory.', descBn: 'গাছপালা, ঘরবাড়ি ও অবকাঠামো যৌথ তদন্ত কমিটির উপস্থিতিতে তালিকাভুক্ত করান।' },
      { step: 3, title: 'Form 7-Ka Filing', titleBn: '৭(ক) ক্ষতিপূরণ আবেদন', desc: 'Submit claim petition with ownership trail to LA Officer.', descBn: 'মালিকানা প্রমাণের পূর্ণাঙ্গ রেকর্ডসহ অতিরিক্ত জেলা প্রশাসক (এলএ) বরাবর আবেদন জমা দিন।' },
      { step: 4, title: 'Electronic Compensation Transfer', titleBn: 'ব্যাংক অ্যাকাউন্টে অর্থ গ্রহণ', desc: 'Approved statutory compensation transferred directly to claimant bank account.', descBn: 'শুনানি শেষে অনুমোদিত ক্ষতিপূরণের অর্থ সরাসরি আবেদনকারীর ব্যাংক হিসাবে প্রদান করা হয়।' }
    ],
    legalBasis: 'Acquisition and Requisition of Immovable Property Act 2017 (Act No. 21 of 2017)',
    legalBasisBn: 'স্থাবর সম্পত্তি অধিগ্রহণ ও হুকুমদখল আইন ২০১৭ (২০১৭ সনের ২১ নং আইন)',
    lastVerifiedDate: '2026-09-12'
  },
  {
    id: 'complaints-grievance',
    slug: 'land-grievances-complaints-cell',
    title: 'Land Complaints and Grievance Redressal (GRS)',
    titleBn: 'ভূমি সেবা অভিযোগ ও প্রতিকার সেল (জিআরএস)',
    shortDesc: 'File formal complaints regarding service delays, corruption, unauthorized fees, or boundary encroachment directly to supervisory authorities.',
    shortDescBn: 'সেবা প্রদানে অযথা বিলম্ব, অনৈতিক দাবি, রেকর্ড সংক্রান্ত অনিয়ম কিংবা অবৈধ দখলের বিরুদ্ধে প্রতিকার আবেদন।',
    category: 'COMPLAINTS_DISPUTES',
    categoryName: 'Complaints & Redressal',
    categoryNameBn: 'অভিযোগ ও আইনি সহায়তা',
    authority: 'Land Appeal Board & Ministry of Land Grievance Cell',
    authorityBn: 'ভূমি আপিল বোর্ড ও ভূমি মন্ত্রণালয় অভিযোগ সেল',
    officialFee: 'Completely Free of cost for all citizens',
    officialFeeBn: 'নাগরিকদের জন্য সম্পূর্ণ বিনামূল্যে সেবা',
    estimatedTimeline: 'Acknowledgement in 24 hours; Action report within 15-30 days',
    estimatedTimelineBn: '২৪ ঘণ্টায় প্রাপ্তিস্বীকার; ১৫ থেকে ৩০ কার্যদিবসের মধ্যে তদন্ত ও প্রতিবেদন',
    integrationMode: 'MODE_1_LIVE',
    officialExternalUrl: 'https://grs.gov.bd',
    requirements: {
      en: [
        'Application Reference Number (if regarding delayed mutation or khatian)',
        'Clear statement of incident including date, land office, and personnel involved',
        'Evidence (photographs, voice recordings, receipts, written notices)',
        'Complainant contact information'
      ],
      bn: [
        'আবেদন ট্র্যাকিং নম্বর (যদি নামজারি বা পর্চা সংক্রান্ত বিলম্ব হয়)',
        'ঘটনার সুনির্দিষ্ট বিবরণ (তারিখ, অফিস ও সংশ্লিষ্ট কর্মকর্তার পদবি)',
        'প্রাসঙ্গিক তথ্যপ্রমাণ (রশিদ, নোটিশ, স্থিরচিত্র বা ডকুমেন্টের কপি)',
        'অভিযোগকারীর এনআইডি ও সচল যোগাযোগ নম্বর'
      ]
    },
    steps: [
      { step: 1, title: 'Select Grievance Nature', titleBn: 'অভিযোগের ধরন নির্বাচন', desc: 'Choose category: Service delay, corruption, discrepancy, illegal occupation.', descBn: 'বিলম্ব, রেকর্ড গরমিল, দুর্নীতি বা জোরপূর্বক দখল ইত্যাদি বিভাগ নির্ধারণ করুন।' },
      { step: 2, title: 'Provide Details & Evidence', titleBn: 'বিবরণ ও প্রমাণ সংযুক্তি', desc: 'Write precise factual account and upload supporting documents.', descBn: 'অফিসের নাম ও সুনির্দিষ্ট তথ্য লিখে সহায়ক কাগজপত্র আপলোড করুন।' },
      { step: 3, title: 'Digital Tracking Number', titleBn: 'ট্র্যাকিং নম্বর গ্রহণ', desc: 'Receive secure SMS and digital reference for case inquiry updates.', descBn: 'তদন্তকারী কর্মকর্তা নিয়োগ এবং প্রতিটি অগ্রগতির তাৎক্ষণিক ট্র্যাকিং নম্বর পান।' },
      { step: 4, title: 'Inquiry & Action', titleBn: 'তদন্ত ও নিষ্পত্তি', desc: 'Supervising officer orders inquiry and issues binding administrative resolution.', descBn: 'ঊর্ধ্বতন কর্তৃপক্ষ কর্তৃক তদন্ত সম্পন্ন এবং প্রয়োজনীয় ব্যবস্থা গ্রহণের নির্দেশ প্রদান।' }
    ],
    legalBasis: 'Public Grievance Redress System Guidelines & Right to Information Act 2009',
    legalBasisBn: 'সরকারি অভিযোগ প্রতিকার ব্যবস্থা (GRS) নির্দেশিকা ও তথ্য অধিকার আইন ২০০৯',
    lastVerifiedDate: '2026-10-01'
  }
];

// Verified Land Offices
export const LAND_OFFICES: LandOffice[] = [
  {
    id: 'off-1',
    name: 'Ministry of Land, Government of Bangladesh',
    nameBn: 'ভূমি মন্ত্রণালয়, গণপ্রজাতন্ত্রী বাংলাদেশ সরকার',
    type: 'MINISTRY',
    typeName: 'Central Ministry',
    typeNameBn: 'কেন্দ্রীয় মন্ত্রণালয়',
    division: 'Dhaka',
    district: 'Dhaka',
    address: 'Building 4, Bangladesh Secretariat, Dhaka - 1000',
    addressBn: 'ভবন ৪, বাংলাদেশ সচিবালয়, ঢাকা - ১০০০',
    hotline: '16122',
    phone: '+88029540023',
    email: 'info@minland.gov.bd',
    officeHours: 'Sunday to Thursday: 09:00 AM - 05:00 PM',
    officeHoursBn: 'রবিবার থেকে বৃহস্পতিবার: সকাল ০৯:০০ - বিকাল ০৫:০০',
    jurisdiction: 'Nationwide policy, digitisation oversight, appeals and governance',
    jurisdictionBn: 'সমগ্র বাংলাদেশব্যাপী নীতি প্রণয়ন, ডিজিটাইজেশন তদারকি ও প্রশাসনিক নিয়ন্ত্রণ',
    verificationDate: '2026-08-01',
    latitude: 23.7303,
    longitude: 90.4079
  },
  {
    id: 'off-2',
    name: 'Directorate of Land Records & Surveys (DLRS)',
    nameBn: 'ভূমি রেকর্ড ও জরিপ অধিদপ্তর (ডিএলআরএস)',
    type: 'DLRS',
    typeName: 'Departmental Directorate',
    typeNameBn: 'অধিদপ্তর',
    division: 'Dhaka',
    district: 'Dhaka',
    address: 'Bhumi Bhaban, 28 Shahid Tajuddin Ahmed Sarani, Tejgaon, Dhaka - 1208',
    addressBn: 'ভূমি ভবন, ২৮ শহীদ তাজউদ্দীন আহমদ সরণি, তেজগাঁও, ঢাকা - ১২০৮',
    hotline: '16122',
    phone: '+88028170311',
    email: 'dg@dlrs.gov.bd',
    officeHours: 'Sunday to Thursday: 09:00 AM - 05:00 PM',
    officeHoursBn: 'রবিবার থেকে বৃহস্পতিবার: সকাল ০৯:০০ - বিকাল ০৫:০০',
    jurisdiction: 'National Cadastral Surveys (CS, RS, BS), mouza mapping, map publication',
    jurisdictionBn: 'জাতীয় ভূ-জরিপ, মৌজা ম্যাপ প্রণয়ন ও ক্যাডাস্ট্রাল রেকর্ড সংরক্ষণ',
    verificationDate: '2026-08-01',
    latitude: 23.7639,
    longitude: 90.3951
  },
  {
    id: 'off-3',
    name: 'Land Appeal Board',
    nameBn: 'ভূমি আপিল বোর্ড',
    type: 'BOARD',
    typeName: 'Statutory Appellate Authority',
    typeNameBn: 'আপিল কর্তৃপক্ষ',
    division: 'Dhaka',
    district: 'Dhaka',
    address: 'Segunbagicha, Dhaka - 1000',
    addressBn: 'সেগুনবাগিচা, ঢাকা - ১০০০',
    hotline: '16122',
    phone: '+88029551122',
    email: 'appeal@landappealboard.gov.bd',
    officeHours: 'Sunday to Thursday: 09:00 AM - 05:00 PM',
    officeHoursBn: 'রবিবার থেকে বৃহস্পতিবার: সকাল ০৯:০০ - বিকাল ০৫:০০',
    jurisdiction: 'Supreme administrative tribunal for land revenue disputes and divisional appeals',
    jurisdictionBn: 'বিভাগীয় কমিশনারের আদেশের বিরুদ্ধে প্রশাসনিক রিভিশন ও আপিল নিষ্পত্তি',
    verificationDate: '2026-07-15',
    latitude: 23.7335,
    longitude: 90.4089
  },
  {
    id: 'off-4',
    name: 'Gazipur Sadar Upazila Land Office (AC Land)',
    nameBn: 'উপজেলা ভূমি অফিস, গাজীপুর সদর',
    type: 'AC_LAND',
    typeName: 'Upazila Land Office (AC Land)',
    typeNameBn: 'উপজেলা ভূমি অফিস',
    division: 'Dhaka',
    district: 'Gazipur',
    upazila: 'Gazipur Sadar',
    address: 'Near Joydebpur Railway Junction, Gazipur Sadar, Gazipur',
    addressBn: 'জয়দেবপুর রেলওয়ে জংশন সংলগ্ন, গাজীপুর সদর, গাজীপুর',
    hotline: '16122',
    phone: '+880249272010',
    email: 'acland.gazipursadar@bilsp.gov.bd',
    officeHours: 'Sunday to Thursday: 09:00 AM - 05:00 PM',
    officeHoursBn: 'রবিবার থেকে বৃহস্পতিবার: সকাল ০৯:০০ - বিকাল ০৫:০০',
    jurisdiction: 'E-Mutation, agricultural khas land, revenue appeals for Gazipur Sadar',
    jurisdictionBn: 'গাজীপুর সদর উপজেলার সকল মৌজার নামজারি, জমাভাগ ও রাজস্ব ব্যবস্থাপনা',
    verificationDate: '2026-09-01',
    latitude: 23.9989,
    longitude: 90.4203
  },
  {
    id: 'off-5',
    name: 'Deputy Commissioner Office, Dhaka (Revenue & Record Room)',
    nameBn: 'জেলা প্রশাসকের কার্যালয়, ঢাকা (রাজস্ব ও রেকর্ড রুম শাখা)',
    type: 'DEPUTY_COMMISSIONER',
    typeName: 'District Administration (DC Office)',
    typeNameBn: 'জেলা প্রশাসন',
    division: 'Dhaka',
    district: 'Dhaka',
    address: 'Johnson Road, Old Dhaka, Dhaka - 1100',
    addressBn: 'জনসন রোড, পুরান ঢাকা, ঢাকা - ১১০০',
    hotline: '16122',
    phone: '+88029555255',
    email: 'dcdhaka@mopa.gov.bd',
    officeHours: 'Sunday to Thursday: 09:00 AM - 05:00 PM',
    officeHoursBn: 'রবিবার থেকে বৃহস্পতিবার: সকাল ০৯:০০ - বিকাল ০৫:০০',
    jurisdiction: 'Certified khatian archive, land acquisition, district revenue court',
    jurisdictionBn: 'ঢাকা জেলার ঐতিহাসিক রেকর্ড রুম, জমি অধিগ্রহণ ও জেলা রাজস্ব আদালত',
    verificationDate: '2026-08-20',
    latitude: 23.7118,
    longitude: 90.4124
  },
  {
    id: 'off-6',
    name: 'Gazipur Sadar Sub-Registry Office',
    nameBn: 'সাব-রেজিস্ট্রি অফিস, গাজীপুর সদর',
    type: 'SUB_REGISTRY',
    typeName: 'Sub-Registry Office (Registration)',
    typeNameBn: 'সাব-রেজিস্ট্রি অফিস',
    division: 'Dhaka',
    district: 'Gazipur',
    upazila: 'Gazipur Sadar',
    address: 'Court Compound, Joydebpur, Gazipur',
    addressBn: 'কোর্ট চত্বর, জয়দেবপুর, গাজীপুর',
    hotline: '16122',
    phone: '+880249261190',
    email: 'subreg.gazipursadar@registration.gov.bd',
    officeHours: 'Sunday to Thursday: 09:00 AM - 05:00 PM',
    officeHoursBn: 'রবিবার থেকে বৃহস্পতিবার: সকাল ০৯:০০ - বিকাল ০৫:০০',
    jurisdiction: 'Deed registration, stamp duties, registered search indexes',
    jurisdictionBn: 'দলিল নিবন্ধন, ফি আদায় ও সাব-রেজিস্ট্রি ভলিউম তল্লাশি',
    verificationDate: '2026-08-15',
    latitude: 23.9995,
    longitude: 90.4215
  },
  {
    id: 'off-7',
    name: 'Chattogram Sadar Upazila Land Office',
    nameBn: 'উপজেলা ভূমি অফিস, চট্টগ্রাম সদর (বাকলিয়া)',
    type: 'AC_LAND',
    typeName: 'Upazila Land Office',
    typeNameBn: 'উপজেলা ভূমি অফিস',
    division: 'Chattogram',
    district: 'Chattogram',
    upazila: 'Chattogram Sadar',
    address: 'Court Hill, Kotwali, Chattogram - 4000',
    addressBn: 'পরীর পাহাড়, কোতোয়ালী, চট্টগ্রাম - ৪০০০',
    hotline: '16122',
    phone: '+88031610441',
    email: 'acland.ctg@bilsp.gov.bd',
    officeHours: 'Sunday to Thursday: 09:00 AM - 05:00 PM',
    officeHoursBn: 'রবিবার থেকে বৃহস্পতিবার: সকাল ০৯:০০ - বিকাল ০৫:০০',
    jurisdiction: 'Chattogram Sadar circle land administration & mutation',
    jurisdictionBn: 'চট্টগ্রাম সদর সার্কেলের ভূমি ব্যবস্থাপনা ও ই-নামজারি কার্যক্রম',
    verificationDate: '2026-08-10',
    latitude: 22.3384,
    longitude: 91.8317
  }
];

// Sample Khas Land Parcels (Properly flagged as Demonstration Sandbox Records)
export const KHAS_LAND_PARCELS: KhasLandParcel[] = [
  {
    id: 'khas-1',
    parcelCode: 'GZP-SDR-KH-01',
    division: 'Dhaka',
    district: 'Gazipur',
    upazila: 'Gazipur Sadar',
    mouza: 'Bhawal Estate Mouza',
    jlNumber: '19',
    dagNumber: '1402',
    khatianNumber: 'No. 1 Khas Khatian',
    classification: 'AGRICULTURAL',
    classificationBn: 'কৃষি খাস জমি (নল জমি)',
    areaAcres: 3.25,
    settlementStatus: 'ELIGIBLE_FOR_LANDLESS',
    settlementStatusBn: 'ভূমিহীনদের জন্য বন্দোবস্তযোগ্য',
    controllingOffice: 'Gazipur Sadar Upazila Land Office',
    controllingOfficeBn: 'গাজীপুর সদর উপজেলা ভূমি অফিস',
    isEncroachedReported: false,
    isDemonstrationData: true
  },
  {
    id: 'khas-2',
    parcelCode: 'GZP-SDR-KH-02',
    division: 'Dhaka',
    district: 'Gazipur',
    upazila: 'Gazipur Sadar',
    mouza: 'Chowrasta Mouza',
    jlNumber: '42',
    dagNumber: '895',
    khatianNumber: 'No. 1 Khas Khatian',
    classification: 'WATER_BODY',
    classificationBn: 'সরকারি বিল / জলাশয় (খাস)',
    areaAcres: 12.80,
    settlementStatus: 'RESERVED_FOR_INSTITUTION',
    settlementStatusBn: 'উন্মুক্ত জলাশয় (ইজারাযোগ্য মৎস্যজীবী সমিতি)',
    controllingOffice: 'DC Revenue Office, Gazipur',
    controllingOfficeBn: 'অতিরিক্ত জেলা প্রশাসক (রাজস্ব), গাজীপুর',
    isEncroachedReported: true,
    isDemonstrationData: true
  },
  {
    id: 'khas-3',
    parcelCode: 'DHK-SVR-KH-03',
    division: 'Dhaka',
    district: 'Dhaka',
    upazila: 'Savar',
    mouza: 'Aminbazar Mouza',
    jlNumber: '08',
    dagNumber: '2104',
    khatianNumber: 'No. 1 Khas Khatian',
    classification: 'NON_AGRICULTURAL',
    classificationBn: 'অকৃষি খাস জমি (বাণিজ্যিক সম্ভাবনাময়)',
    areaAcres: 1.15,
    settlementStatus: 'UNDER_DISPUTE',
    settlementStatusBn: 'ভূমি আদালতে মামলাধীন (অস্থায়ী নিষেধাজ্ঞা)',
    controllingOffice: 'Savar Upazila Land Office',
    controllingOfficeBn: 'সাভার উপজেলা ভূমি অফিস',
    isEncroachedReported: true,
    isDemonstrationData: true
  },
  {
    id: 'khas-4',
    parcelCode: 'CTG-HTZ-KH-04',
    division: 'Chattogram',
    district: 'Chattogram',
    upazila: 'Hathazari',
    mouza: 'Fatehabad Mouza',
    jlNumber: '14',
    dagNumber: '672',
    khatianNumber: 'No. 1 Khas Khatian',
    classification: 'VESTED_PROPERTY',
    classificationBn: 'অর্পিত সম্পত্তি (তালিকাভুক্ত ‘ক’ তফসিল)',
    areaAcres: 2.40,
    settlementStatus: 'LEASED',
    settlementStatusBn: 'একসনা বন্দোবস্তে পরিচালিত',
    controllingOffice: 'Hathazari Upazila Land Office',
    controllingOfficeBn: 'হাটহাজারী উপজেলা ভূমি অফিস',
    isEncroachedReported: false,
    isDemonstrationData: true
  }
];

// Interactive Cadastral Mouza Polygon Plots for the GIS Viewer
export const MOUZA_GIS_PLOTS: MouzaPlot[] = [
  {
    dagNumber: '894',
    khatianNumber: 'SA-1182',
    ownerName: 'Tusher Hossen & Co-sharers',
    ownerNameBn: 'তুষার হোসেন ও ওয়ারিশগণ',
    landClass: 'Bari (Homestead)',
    landClassBn: 'বাড়ি (আবাসিক)',
    areaDecimal: 18.5,
    surveyType: 'RS',
    coordinates: [[50, 40], [140, 35], [155, 120], [60, 130]],
    geoCoordinates: [
      [23.9995, 90.4190],
      [23.9998, 90.4202],
      [23.9988, 90.4205],
      [23.9985, 90.4192]
    ],
    remarks: 'Clear title, Namjari in review.'
  },
  {
    dagNumber: '895',
    khatianNumber: 'No. 1 Khas Khatian',
    ownerName: 'Government of Bangladesh (Collectorate)',
    ownerNameBn: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার (১ নং খাস খতিয়ান)',
    landClass: 'Pond / Water Reservoir',
    landClassBn: 'পুকুর / জলাশয় (খাস)',
    areaDecimal: 45.0,
    surveyType: 'RS',
    coordinates: [[160, 30], [290, 25], [310, 150], [175, 140]],
    geoCoordinates: [
      [23.9998, 90.4202],
      [24.0005, 90.4218],
      [23.9992, 90.4222],
      [23.9988, 90.4205]
    ],
    remarks: 'Government waterbody. Encroachment reporting enabled.'
  },
  {
    dagNumber: '896',
    khatianNumber: 'RS-430',
    ownerName: 'Alhaj Abdul Karim Chowdhury',
    ownerNameBn: 'আলহাজ্ব আব্দুল করিম চৌধুরী',
    landClass: 'Nal (Agricultural)',
    landClassBn: 'নাল জমি (কৃষি)',
    areaDecimal: 32.0,
    surveyType: 'RS',
    coordinates: [[315, 25], [440, 20], [450, 160], [325, 155]],
    geoCoordinates: [
      [24.0005, 90.4218],
      [24.0012, 90.4235],
      [23.9998, 90.4239],
      [23.9992, 90.4222]
    ],
    remarks: 'Fully mutated and LD Tax up to date.'
  },
  {
    dagNumber: '897',
    khatianNumber: 'RS-712',
    ownerName: 'Kazi Farhana Begum',
    ownerNameBn: 'কাজী ফারহানা বেগম',
    landClass: 'Bagan (Orchard)',
    landClassBn: 'বাগান (ফলজ বৃক্ষাদি)',
    areaDecimal: 24.2,
    surveyType: 'RS',
    coordinates: [[55, 145], [170, 135], [165, 250], [45, 240]],
    geoCoordinates: [
      [23.9985, 90.4192],
      [23.9988, 90.4205],
      [23.9976, 90.4208],
      [23.9973, 90.4195]
    ],
    remarks: 'Free of encumbrances.'
  },
  {
    dagNumber: '898',
    khatianNumber: 'BS-889',
    ownerName: 'Md. Shahidul Islam & Brothers',
    ownerNameBn: 'মো. শহিদুল ইসলাম ও ভ্রাতৃদ্বয়',
    landClass: 'Commercial Shop / Market',
    landClassBn: 'দোকানপাট / বাণিজ্যিক',
    areaDecimal: 15.0,
    surveyType: 'BS',
    coordinates: [[180, 155], [320, 160], [330, 270], [175, 260]],
    geoCoordinates: [
      [23.9988, 90.4205],
      [23.9992, 90.4222],
      [23.9980, 90.4225],
      [23.9976, 90.4208]
    ],
    remarks: 'Commercial tax assessment applied.'
  },
  {
    dagNumber: '899',
    khatianNumber: 'Roadway (Government Halat)',
    ownerName: 'Local Government Engineering Department / Union Road',
    ownerNameBn: 'পাবলিক রাস্তা / গোপাট (সরকারি হালট)',
    landClass: 'Public Roadway (Gopat)',
    landClassBn: 'রাস্তা / সরকারি গোপাট',
    areaDecimal: 12.0,
    surveyType: 'RS',
    coordinates: [[335, 170], [460, 175], [470, 280], [340, 275]],
    geoCoordinates: [
      [23.9992, 90.4222],
      [23.9998, 90.4239],
      [23.9986, 90.4242],
      [23.9980, 90.4225]
    ],
    remarks: 'Public right of way. Non-transferable.'
  }
];

// Knowledge Center Articles
export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    id: 'art-1',
    slug: 'understanding-khatian-dag-mouza',
    title: 'How to Understand Khatian, Dag and Mouza Numbers in Bangladesh',
    titleBn: 'খতিয়ান, দাগ ও মৌজা নম্বর চেনার সহজ উপায়',
    category: 'Land Records Guide',
    categoryBn: 'ভূমি রেকর্ড নির্দেশিকা',
    readTime: '6 min read',
    summary: 'A foundational guide explaining the differences between CS, SA, RS and City/BS surveys, how to decipher plot dag boundaries, and how khatian ownership shares are calculated.',
    summaryBn: 'সিএস, এসএ, আরএস ও বিএস জরিপের মধ্যে পার্থক্য, দাগ নম্বরের অর্থ এবং খতিয়ানে আনা-গণ্ডা-কড়া-ক্রান্তি বা দশমিক হিস্যা যেভাবে পড়তে হয় তার সম্পূর্ণ নির্দেশিকা।',
    content: `Land records in Bangladesh have evolved across four principal historical surveys:
1. **CS (Cadastral Survey)** conducted between 1888 and 1940 under the British Bengal Tenancy Act.
2. **SA (State Acquisition Survey)** prepared during 1956-1962 following the historic State Acquisition and Tenancy Act 1950 which abolished the Zamindari system.
3. **RS (Revisional Survey)** undertaken from 1965 to correct discrepancies between CS and SA maps.
4. **City / BS / BRS (Bangladesh Revisional Survey)** the modern computer-aided survey currently in progress.

**What is a Mouza?**
A mouza is the smallest revenue surveying boundary unit, denoted by a unique Jurisdiction List (JL) number within a police station / upazila.

**What is a Dag (Plot) Number?**
Within a mouza, each physically demarcated piece of land is allotted an individual plot number.

**What is a Khatian (Porcha)?**
A khatian is the legal document recording who owns which portion of plots within a mouza, the exact land class, and the government revenue assessment.`,
    contentBn: `বাংলাদেশে জমির মালিকানা নথিপত্র মূলত চারটি ঐতিহাসিক জরিপের ওপর ভিত্তি করে গঠিত:
১. **সিএস (ক্যাডাস্ট্রাল সার্ভে):** ১৮৮৮ থেকে ১৯৪০ সালের মধ্যে তৎকালীন ব্রিটিশ বঙ্গীয় প্রজাস্বত্ব আইনের অধীনে পরিচালিত প্রথম পূর্ণাঙ্গ ভূ-জরিপ।
২. **এসএ (স্টেট একুইজিশন সার্ভে):** ১৯৫০ সালে জমিদারি প্রথা বিলুপ্তির পর ১৯৫৬ থেকে ১৯৬২ সালের মধ্যে প্রস্তুতকৃত জরিপ।
৩. **আরএস (রিভিশনাল সার্ভে):** সিএস ও এসএ-এর মধ্যকার ভুলত্রুটি সংশোধনপূর্বক পরিচালিত অত্যন্ত বিশ্বস্ত ও প্রামাণ্য জরিপ।
৪. **বিএস / সিটি জরিপ (বাংলাদেশ রিভিশনাল সার্ভে):** সাম্প্রতিক সময়ে প্রস্তুতকৃত আধুনিক ডিজিটাল জরিপ।

**মৌজা ও জেএল নম্বর কী?**
ভূমি রাজস্ব প্রশাসনের সর্বনিম্ন ভৌগোলিক একক হলো মৌজা। প্রতিটি মৌজার একটি সুনির্দিষ্ট ‘জুরিডিকশন লিস্ট’ বা জেএল নম্বর থাকে।

**দাগ নম্বর কী?**
মৌজা নকশার মধ্যে প্রতিটি খণ্ড খণ্ড জমিকে চেনার জন্য যে স্বতন্ত্র নম্বর দেওয়া হয় তাকে দাগ নম্বর বলে।

**খতিয়ান বা পর্চা কী?**
খতিয়ান হলো এক বা একাধিক দাগে জমির মালিকের নাম, পিতার নাম, ঠিকানা, অংশ (হিস্যা) এবং জমির শ্রেণির লিখিত সরকারি বিবরণী।`,
    publishedDate: '2026-08-10',
    officialSource: 'Ministry of Land Citizen Handbook 2024'
  },
  {
    id: 'art-2',
    slug: 'e-mutation-checklist-common-mistakes',
    title: 'E-Mutation (Namjari) Step-by-Step Checklist and Avoiding Common Rejections',
    titleBn: 'ই-নামজারি আবেদনের সঠিক নিয়ম ও আবেদন বাতিল এড়ানোর কৌশল',
    category: 'Mutation Procedure',
    categoryBn: 'নামজারি পদ্ধতি',
    readTime: '8 min read',
    summary: 'Discover the mandatory document checklist, the official 28-day timeline, reasons for hearing notices, and how the Land Crime Act 2023 affects mutation.',
    summaryBn: 'নামজারি আবেদনের ৭টি অপরিহার্য কাগজ, বাতিল হওয়ার শীর্ষ ৫টি কারণ, নোটিশের জবাব ও ভূমি অপরাধ প্রতিরোধ আইন ২০২৩ এর প্রভাব।',
    content: `E-Mutation (ই-নামজারি) is the formal statutory process under Sections 143 and 144 of the State Acquisition & Tenancy Act 1950 by which a new owner's name replaces the previous owner in the government revenue register.

**Top Reasons Why Namjari Applications are Rejected:**
1. Discontinuity in Title Chain (Baya Dalil gap): If the seller acquired land from someone else whose name is not mutated, the application stalls.
2. Unpaid Land Development Tax: The seller's holding must be paid up to the current fiscal year.
3. Lack of Certified Copies: Submitting uncertified blurry mobile snapshots instead of official deed copies.
4. Name mismatch between National ID and Registered Deed without an affidavit.`,
    contentBn: `ই-নামজারি হলো রাষ্ট্রীয় অধিগ্রহণ ও প্রজাস্বত্ব আইন ১৯৫০ এর ১৪৩ ও ১৪৪ ধারা অনুযায়ী জমির মালিকানা পরিবর্তনের পর সরকারি রেজিস্টার-২ এ পূর্ববর্তী মালিকের নাম কেটে নতুন ক্রেতা বা ওয়ারিশের নাম অন্তর্ভুক্ত করার একমাত্র বৈধ প্রক্রিয়া।

**নামজারি আবেদন বাতিল হওয়ার প্রধান ৫টি কারণ:**
১. **ধারাবাহিক বায়া দলিলের অমিল:** দাতা যার কাছ থেকে জমি কিনেছিলেন তার রেকর্ড ঠিক না থাকলে নামজারি নামঞ্জুর হয়।
২. **বকেয়া ভূমি উন্নয়ন কর:** বিক্রেতার নামে চলতি বছরের খাজনা পরিশোধের রশিদ (দাখিলা) না থাকা।
৩. **স্পষ্ট ডকুমেন্টের অভাব:** ঝাপসা বা কাটাছেঁড়া দলিলের ছবি আপলোড করা।
৪. **এনআইডি ও দলিলের নামের বানানে অমিল:** এফিডেভিট বা প্রমাণপত্র ছাড়া নামের বড় ধরনের গরমিল থাকলে আবেদন স্থগিত হয়।`,
    publishedDate: '2026-08-25',
    officialSource: 'Land Reform Board Circular & Mutation Manual'
  },
  {
    id: 'art-3',
    slug: 'land-due-diligence-before-purchase',
    title: '7 Crucial Documents to Verify Before Purchasing Land in Bangladesh',
    titleBn: 'জমি কেনার আগে ৭টি অপরিহার্য কাগজপত্র যাচাইয়ের নির্দেশিকা',
    category: 'Legal Guidance',
    categoryBn: 'আইনি সুরক্ষা',
    readTime: '7 min read',
    summary: 'Protect your hard-earned investment from fraud, duplicate deeds, and vested property traps with this rigorous due diligence blueprint.',
    summaryBn: 'জাল দলিল, প্রতারণা এবং সরকারি খাস বা অর্পিত সম্পত্তি কেনা থেকে বাঁচতে ক্রেতার অবশ্য করণীয় ৭টি আইনি যাচাই।',
    content: `Under the Land Crime Prevention and Redress Act 2023, purchasing land without verifying proper mutation in the transferor's name carries severe legal invalidity.

**The 7 Mandatory Checks:**
1. **Registered Deed & Baya Deeds (25-year chain)**
2. **Current E-Mutation Khatian in the seller's name**
3. **Up-to-date Land Development Tax (LD Tax) Dakhila**
4. **Sub-Registry Search (Search of non-encumbrance Form 11)**
5. **CS, SA, RS, and BS record alignment**
6. **Government Khas Land and Vested Property Schedule cross-check**
7. **Physical On-Site Boundary Inspection**`,
    contentBn: `ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩ অনুযায়ী দাতার নামে হাল রেকর্ড ও নামজারি খতিয়ান ব্যতীত জমি হস্তান্তর আইনত দণ্ডনীয় ও অকার্যকর।

**৭টি বাধ্যতামূলক যাচাইকরণ:**
১. মূল দলিল ও ন্যূনতম ২৫ বছরের ধারাবাহিক বায়া দলিল।
২. বিক্রেতার নিজের নামের হাল ই-নামজারি খতিয়ান।
৩. চলতি বাংলা সনের হালনাগাদ ভূমি উন্নয়ন কর দাখিলা।
৪. সংশ্লিষ্ট সাব-রেজিস্ট্রি অফিসে এনকামব্রেন্স (দায়মুক্তি) তল্লাশি।
৫. সিএস, এসএ, আরএস ও বিএস খতিয়ানের পরস্পর সংগতি।
৬. সরকারি খাস জমি বা অর্পিত সম্পত্তি ‘ক’ তফসিলভুক্ত কি না তা নিশ্চিত করা।
৭. সরেজমিনে গিয়ে স্থানীয় লোকজনের মাধ্যমে জমির বাস্তব দখল ও সীমানা যাচাই।`,
    publishedDate: '2026-09-05',
    officialSource: 'Law & Justice Division Legal Aid Guidelines'
  }
];

// Official Notices & Circulars
export const OFFICIAL_NOTICES: NoticeItem[] = [
  {
    id: 'not-1',
    title: 'Strict Adherence to 28-Day Citizen Charter for E-Mutation Across All Upazilas',
    titleBn: 'সকল উপজেলায় ই-নামজারি ২৮ কার্যদিবসের মধ্যে নিষ্পত্তির কঠোর নির্দেশনা',
    category: 'CIRCULAR',
    categoryBn: 'সরকারি পরিপত্র',
    issuingAuthority: 'Ministry of Land, Field Administration Wing',
    issuingAuthorityBn: 'ভূমি মন্ত্রণালয়, মাঠ প্রশাসন অধিশাখা',
    date: '2026-09-18',
    fileSize: '420 KB',
    memoNumber: '31.00.0000.035.11.002.26-412',
    isDemonstration: false,
    summary: 'The Ministry has mandated that any delay beyond 28 working days in Namjari without reasoned written notification to the applicant will trigger automatic administrative scrutiny.',
    summaryBn: 'কোনো যৌক্তিক কারণ ও লিখিত অবহিতকরণ ব্যতীত ২৮ কার্যদিবসের বেশি নামজারি আবেদন অনিষ্পন্ন রাখলে সংশ্লিষ্ট কর্মকর্তার বিরুদ্ধে বিভাগীয় তদন্ত শুরু হবে।'
  },
  {
    id: 'not-2',
    title: 'Abolition of Manual Tax Collection: 100% Land Development Tax Via Digital Gateway',
    titleBn: 'ম্যানুয়াল খাজনা আদায় বন্ধ: শতভাগ ভূমি উন্নয়ন কর ডিজিটাল মাধ্যমে গ্রহণের বাধ্যবাধকতা',
    category: 'POLICY',
    categoryBn: 'নীতিমালা সংক্রান্ত',
    issuingAuthority: 'Ministry of Land & National Board of Revenue',
    issuingAuthorityBn: 'ভূমি মন্ত্রণালয় ও এনবিআর',
    date: '2026-09-01',
    fileSize: '512 KB',
    memoNumber: '31.00.0000.042.22.019.26-78',
    isDemonstration: false,
    summary: 'No manual handwritten Dakhila slips are valid. Citizens must pay through authorized digital channels and obtain QR-verified electronic Dakhilas.',
    summaryBn: 'কোনো হাতে লেখা দাখিলা বা রসিদ আইনগতভাবে কার্যকর বলে গণ্য হবে না। সকল করদাতাকে অনলাইনে দাখিলা গ্রহণের নির্দেশ দেওয়া হলো।'
  },
  {
    id: 'not-3',
    title: 'Sample Notice: Technical Upgrade of DLRS Tejgaon Map Digitization Server',
    titleBn: 'পরীক্ষামূলক নোটিশ: ডিএলআরএস তেজগাঁও সার্ভার রক্ষণাবেক্ষণ সংক্রান্ত বিজ্ঞপ্তি',
    category: 'SERVICE_NOTICE',
    categoryBn: 'সেবা বিজ্ঞপ্তি',
    issuingAuthority: 'Directorate of Land Records & Surveys (DLRS)',
    issuingAuthorityBn: 'ভূমি রেকর্ড ও জরিপ অধিদপ্তর',
    date: '2026-10-12',
    fileSize: '180 KB',
    memoNumber: 'DLRS/ICT/MAINT-2026-90',
    isDemonstration: true,
    summary: 'This is an illustrative test notice demonstrating scheduled system status announcements in the portal.',
    summaryBn: 'এটি একটি পরীক্ষামূলক নোটিশ যা পোর্টালের সিস্টেম রক্ষণাবেক্ষণ সংক্রান্ত বিজ্ঞপ্তি উপস্থাপনের উদ্দেশ্যে ব্যবহৃত হচ্ছে।'
  }
];

// Integrations Status (Mode 1, Mode 2, Mode 3 explicitly delineated)
export const INTEGRATION_SERVICES: IntegrationStatus[] = [
  {
    id: 'int-eporcha',
    name: 'DLRS National e-Porcha Records System',
    nameBn: 'ডিএলআরএস জাতীয় ই-পর্চা রেকর্ড ব্যবস্থাপনা',
    authority: 'Directorate of Land Records & Surveys',
    mode: 'MODE_2_OFFICIAL_EXTERNAL',
    modeLabel: 'Mode 2: Verified External Official Portal',
    modeLabelBn: 'মোড ২: যাচাইকৃত সরকারি বহিরাগত পোর্টাল',
    status: 'OPERATIONAL',
    latencyMs: 82,
    officialUrl: 'https://eporcha.gov.bd',
    description: 'Enables discovery of CS, SA, RS, and City/BS records. Users are directed to verified official URLs for statutory stamp downloads.',
    descriptionBn: 'সিএস, এসএ, আরএস ও বিএস খতিয়ানের তথ্য প্রদর্শনে সহায়তা করে এবং সার্টিফাইড কপির জন্য অফিসিয়াল লিংকে প্রেরণ করে।'
  },
  {
    id: 'int-mutation',
    name: 'Ministry of Land Digital E-Mutation Engine',
    nameBn: 'ভূমি মন্ত্রণালয় ডিজিটাল ই-নামজারি ইঞ্জিন',
    authority: 'Ministry of Land (mutation.land.gov.bd)',
    mode: 'MODE_2_OFFICIAL_EXTERNAL',
    modeLabel: 'Mode 2: Verified External Official Portal',
    modeLabelBn: 'মোড ২: যাচাইকৃত সরকারি বহিরাগত পোর্টাল',
    status: 'OPERATIONAL',
    latencyMs: 114,
    officialUrl: 'https://mutation.land.gov.bd',
    description: 'Standard national pipeline for online Namjari. Portal maintains a guidance intake adapter with official government routing.',
    descriptionBn: 'ই-নামজারি আবেদন প্রক্রিয়া সহজীকরণ ও তথ্য নির্দেশনায় সংযুক্ত।'
  },
  {
    id: 'int-ldtax',
    name: 'National Land Development Tax (ldtax.gov.bd)',
    nameBn: 'জাতীয় ভূমি উন্নয়ন কর পোর্টাল',
    authority: 'Ministry of Land Revenue Wing',
    mode: 'MODE_2_OFFICIAL_EXTERNAL',
    modeLabel: 'Mode 2: Verified External Official Portal',
    modeLabelBn: 'মোড ২: যাচাইকৃত সরকারি বহিরাগত পোর্টাল',
    status: 'OPERATIONAL',
    latencyMs: 95,
    officialUrl: 'https://ldtax.gov.bd',
    description: 'Verified tax payment gateway with holding calculation and Dakhila status verification.',
    descriptionBn: 'হোল্ডিং নম্বর ও এনআইডি যাচাইয়ের মাধ্যমে খাজনা পরিশোধ পোর্টাল।'
  },
  {
    id: 'int-gis-mouza',
    name: 'Cadastral GIS Mouza Vector Layer Engine',
    nameBn: 'ক্যাডাস্ট্রাল জিআইএস মৌজা ভেক্টর ইঞ্জিন',
    authority: 'DLRS GIS & Mapping Division',
    mode: 'MODE_1_LIVE',
    modeLabel: 'Mode 1: Authorized Cadastral Geometry Sample',
    modeLabelBn: 'মোড ১: অনুমোদিত ক্যাডাস্ট্রাল ভেক্টর ডায়াগ্রাম',
    status: 'OPERATIONAL',
    latencyMs: 65,
    officialUrl: 'https://eporcha.gov.bd/mouza-map',
    description: 'Interactive SVG / Geo-vector rendering of surveyed mouza parcel sheets with plot boundaries.',
    descriptionBn: 'অনুমোদিত মৌজা সীমানা ও দাগ নকশার ইন্টারঅ্যাকটিভ ভেক্টর ভিউয়ার।'
  },
  {
    id: 'int-nid',
    name: 'National Identity Verification Adapter (NID Wing)',
    nameBn: 'জাতীয় পরিচয়পত্র যাচাইকরণ অ্যাডাপ্টার',
    authority: 'Election Commission NID Wing',
    mode: 'MODE_3_SANDBOX',
    modeLabel: 'Mode 3: Demonstration Sandbox Adapter',
    modeLabelBn: 'মোড ৩: পরীক্ষামূলক স্যান্ডবক্স অ্যাডাপ্টার',
    status: 'SANDBOX_READY',
    latencyMs: 40,
    officialUrl: 'https://services.nidw.gov.bd',
    description: 'Sandbox identity verification adapter demonstrating OTP and NID verification workflow.',
    descriptionBn: 'এনআইডি ও ওটিপি যাচাইকরণের পরীক্ষামূলক স্যান্ডবক্স পরিবেশ।'
  },
  {
    id: 'int-ekpay',
    name: 'Ekpay / Sonali e-Sheba Treasury Settlement Gateway',
    nameBn: 'একপে / সোনালী ই-সেবা ট্রেজারি পেমেন্ট গেটওয়ে',
    authority: 'A2i & Bangladesh Bank',
    mode: 'MODE_3_SANDBOX',
    modeLabel: 'Mode 3: Demonstration Sandbox Adapter',
    modeLabelBn: 'মোড ৩: পরীক্ষামূলক স্যান্ডবক্স অ্যাডাপ্টার',
    status: 'SANDBOX_READY',
    latencyMs: 55,
    officialUrl: 'https://ekpay.gov.bd',
    description: 'Simulated treasury payment interface generating authentic-style transaction tokens and receipts.',
    descriptionBn: 'ট্রেজারি চালানের পরীক্ষামূলক পেমেন্ট গেটওয়ে।'
  }
];
