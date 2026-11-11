export type ReportIdent =
  'arbitrage_activity' | 'client_revenue_rssbu_acc_total' | 'user_upload_metrics';

export type PeriodType = 'DATE' | 'PERIOD';

export interface Report {
  reportIdent: ReportIdent;
  reportName: string;
  periodType: PeriodType;
  ord: number;
}

export interface ReportListResponse {
  reports: Report[];
}

export interface ReportPeriod {
  startDate: string;
  endDate: string;
}

export interface ExportReportRequest {
  reportIdent: ReportIdent;
  periods?: ReportPeriod[];
  onDate?: string;
}

export interface FileRef {
  id: string;
  fileName: string;
  params: { source: string };
}

export interface ExportReportResponse {
  fileRef: FileRef;
}

export interface Quarter extends ReportPeriod {
  key: string;
  label: string;
}
