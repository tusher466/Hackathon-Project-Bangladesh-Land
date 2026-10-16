export type UserRole = 
  | 'CITIZEN' 
  | 'OFFICE_CLERK' 
  | 'REVIEWING_OFFICER' 
  | 'APPROVING_OFFICER' 
  | 'SYSTEM_ADMIN' 
  | 'SECURITY_AUDITOR';

export interface User {
  id: string;
  name: string;
  nameBn: string;
  email: string;
  phone: string;
  nid?: string;
  role: UserRole;
  division?: string;
  district?: string;
  upazila?: string;
  createdAt: string;
}

export type ApplicationStatus = 
  | 'DRAFT' 
  | 'SUBMITTED' 
  | 'UNDER_REVIEW' 
  | 'ADDITIONAL_INFO_REQUIRED' 
  | 'HEARING_SCHEDULED' 
  | 'APPROVED' 
  | 'REJECTED' 
  | 'COMPLETED';

export interface ApplicationDocument {
  id: string;
  title: string;
  fileName: string;
  fileSize: string;
  mimeType: string;
  uploadDate: string;
}

export interface ApplicationHistory {
  id: string;
  status: ApplicationStatus | string;
  changedBy: string;
  role: string;
  timestamp: string;
  note: string;
}

export interface Application {
  id: string;
  referenceNumber: string;
  serviceId: string;
  serviceName: string;
  serviceNameBn: string;
  applicantId: string;
  applicantName: string;
  applicantPhone: string;
  division: string;
  district: string;
  upazila: string;
  mouza: string;
  jlNumber: string;
  khatianNumber?: string;
  dagNumber?: string;
  status: ApplicationStatus;
  statusNote?: string;
  assignedOfficer?: string;
  hearingDate?: string;
  feeAmount: number;
  paymentStatus: 'UNPAID' | 'PAID' | 'EXEMPT';
  paymentTxnId?: string;
  documents: ApplicationDocument[];
  history: ApplicationHistory[];
  createdAt: string;
  updatedAt: string;
}

export type ComplaintCategory = 
  | 'SERVICE_DELAY' 
  | 'RECORD_DISCREPANCY' 
  | 'CORRUPTION_ALLEGATION' 
  | 'UNAUTHORIZED_OCCUPATION' 
  | 'STAFF_BEHAVIOR' 
  | 'OTHER';

export type ComplaintStatus = 
  | 'PENDING' 
  | 'INVESTIGATING' 
  | 'HEARING_CALLED' 
  | 'RESOLVED' 
  | 'REJECTED';

export interface Complaint {
  id: string;
  trackingNumber: string;
  complainantId: string;
  complainantName: string;
  complainantPhone: string;
  category: ComplaintCategory;
  division: string;
  district: string;
  upazila: string;
  officeName: string;
  description: string;
  status: ComplaintStatus;
  assignedTo?: string;
  resolutionNote?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  actorId: string;
  actorName: string;
  actorRole: string;
  action: string;
  resourceType: string;
  resourceId: string;
  ipAddress: string;
  details: string;
  timestamp: string;
}

export type ServiceCategory = 
  | 'RECORDS_KHATIAN'
  | 'MUTATION_NAMJARI'
  | 'LAND_TAX'
  | 'SURVEY_MAPS'
  | 'DEEDS_REGISTRATION'
  | 'KHAS_LAND'
  | 'ACQUISITION'
  | 'COMPLAINTS_DISPUTES';

export interface LandService {
  id: string;
  slug: string;
  title: string;
  titleBn: string;
  shortDesc: string;
  shortDescBn: string;
  category: ServiceCategory;
  categoryName: string;
  categoryNameBn: string;
  authority: string;
  authorityBn: string;
  officialFee: string;
  officialFeeBn: string;
  estimatedTimeline: string;
  estimatedTimelineBn: string;
  integrationMode: 'MODE_1_LIVE' | 'MODE_2_OFFICIAL_EXTERNAL' | 'MODE_3_SANDBOX';
  officialExternalUrl?: string;
  requirements: {
    en: string[];
    bn: string[];
  };
  steps: {
    step: number;
    title: string;
    titleBn: string;
    desc: string;
    descBn: string;
  }[];
  legalBasis: string;
  legalBasisBn: string;
  lastVerifiedDate: string;
}

export interface LandOffice {
  id: string;
  name: string;
  nameBn: string;
  type: 'MINISTRY' | 'BOARD' | 'DLRS' | 'DIVISIONAL_COMMISSIONER' | 'DEPUTY_COMMISSIONER' | 'AC_LAND' | 'UNION_LAND' | 'SUB_REGISTRY';
  typeName: string;
  typeNameBn: string;
  division: string;
  district: string;
  upazila?: string;
  address: string;
  addressBn: string;
  hotline: string;
  phone: string;
  email: string;
  officeHours: string;
  officeHoursBn: string;
  jurisdiction: string;
  jurisdictionBn: string;
  verificationDate: string;
  latitude?: number;
  longitude?: number;
}

export interface KhasLandParcel {
  id: string;
  parcelCode: string;
  division: string;
  district: string;
  upazila: string;
  mouza: string;
  jlNumber: string;
  dagNumber: string;
  khatianNumber: string;
  classification: 'AGRICULTURAL' | 'NON_AGRICULTURAL' | 'WATER_BODY' | 'VESTED_PROPERTY' | 'FOREST_OR_HILL';
  classificationBn: string;
  areaAcres: number;
  settlementStatus: 'ELIGIBLE_FOR_LANDLESS' | 'RESERVED_FOR_INSTITUTION' | 'UNDER_DISPUTE' | 'LEASED';
  settlementStatusBn: string;
  controllingOffice: string;
  controllingOfficeBn: string;
  isEncroachedReported: boolean;
  isDemonstrationData: boolean;
}

export interface MouzaPlot {
  dagNumber: string;
  khatianNumber: string;
  ownerName: string;
  ownerNameBn: string;
  landClass: string;
  landClassBn: string;
  areaDecimal: number;
  surveyType: 'CS' | 'SA' | 'RS' | 'BS';
  coordinates: [number, number][]; // Polygon points for SVG canvas rendering
  geoCoordinates?: [number, number][]; // Lat, Lng polygon vertices for OpenStreetMap
  remarks?: string;
}

export interface KnowledgeArticle {
  id: string;
  slug: string;
  title: string;
  titleBn: string;
  category: string;
  categoryBn: string;
  readTime: string;
  summary: string;
  summaryBn: string;
  content: string;
  contentBn: string;
  publishedDate: string;
  officialSource: string;
}

export interface NoticeItem {
  id: string;
  title: string;
  titleBn: string;
  category: 'CIRCULAR' | 'GAZETTE' | 'SERVICE_NOTICE' | 'POLICY';
  categoryBn: string;
  issuingAuthority: string;
  issuingAuthorityBn: string;
  date: string;
  fileSize: string;
  memoNumber: string;
  isDemonstration: boolean;
  summary: string;
  summaryBn: string;
}

export interface IntegrationStatus {
  id: string;
  name: string;
  nameBn: string;
  authority: string;
  mode: 'MODE_1_LIVE' | 'MODE_2_OFFICIAL_EXTERNAL' | 'MODE_3_SANDBOX';
  modeLabel: string;
  modeLabelBn: string;
  status: 'OPERATIONAL' | 'SANDBOX_READY' | 'MAINTENANCE';
  latencyMs: number;
  officialUrl: string;
  description: string;
  descriptionBn: string;
}
