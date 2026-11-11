import type { ExportReportRequest, Quarter, Report } from '../types';
import type { ReportParams } from '../hooks/useReportParams';
import { API_DATE_FORMAT } from './dateFormat';

export const buildExportRequest = (
  report: Report,
  params: ReportParams,
  quarters: Quarter[],
): ExportReportRequest | null => {
  if (report.periodType === 'DATE') {
    if (!params.onDate) return null;
    return { reportIdent: report.reportIdent, onDate: params.onDate.format(API_DATE_FORMAT) };
  }

  const periods = quarters
    .filter((quarter) => params.quarterKeys.includes(quarter.key))
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .map(({ startDate, endDate }) => ({ startDate, endDate }));

  if (!periods.length) return null;
  return { reportIdent: report.reportIdent, periods };
};
