export interface StudyTrialData {
  totalCount?: number;
  nextPageToken: string;
  studies: StudyTrialItem[];
}

export interface StudyTrialItem {
  protocolSection: ProtocolSectionData;
}

export interface StatusModuleData {
  statusVerifiedDate: string;
  overallStatus: string;
}

export interface DescriptionModuleData {
  briefSummary: string;
}

export interface IdentificationModuleData {
  briefTitle?: string;
  officialTitle?: string;
  nctId: string;
}

export interface ProtocolSectionData {
  officialTitle: string;
  statusModule: StatusModuleData;
  descriptionModule: DescriptionModuleData;
  identificationModule: IdentificationModuleData;
}

export interface StudyTrialParams {
  pageSize: string;
  pageToken?: string;
}
