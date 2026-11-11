import { useIsReportDownloading, type ReportParams } from '../hooks';
import type { Quarter, Report } from '../types';
import { ReportDateParam } from './ReportDateParam';
import { ReportQuarterParam } from './ReportQuarterParam';

interface Props {
  report: Report;
  params: ReportParams;
  quarters: Quarter[];
  onChange: (patch: Partial<ReportParams>) => void;
}

export const ReportParamsCell = ({ report, params, quarters, onChange }: Props) => {
  const isDownloading = useIsReportDownloading(report.reportIdent);

  return report.periodType === 'DATE' ? (
    <ReportDateParam
      value={params.onDate}
      disabled={isDownloading}
      onChange={(onDate) => onChange({ onDate })}
    />
  ) : (
    <ReportQuarterParam
      quarters={quarters}
      value={params.quarterKeys}
      disabled={isDownloading}
      onChange={(quarterKeys) => onChange({ quarterKeys })}
    />
  );
};
