export interface TrialStudyData {
  totalCount?: number;
  nextPageToken: string;
  studies: TrialStudyItem[];
}

export interface TrialStudyItem {
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

export interface TrialStudiesParams {
  pageSize: string;
  pageToken?: string;
}
