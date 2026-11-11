import { useCallback, useState } from 'react';
import dayjs, { type Dayjs } from 'dayjs';
import type { ReportIdent } from '../types';

export interface ReportParams {
  onDate: Dayjs | null;
  quarterKeys: string[];
}

const createDefaultParams = (): ReportParams => ({ onDate: dayjs(), quarterKeys: [] });

export const useReportParams = () => {
  const [paramsByReport, setParamsByReport] = useState<Partial<Record<ReportIdent, ReportParams>>>(
    {},
  );

  const getParams = useCallback(
    (reportIdent: ReportIdent) => paramsByReport[reportIdent] ?? createDefaultParams(),
    [paramsByReport],
  );

  const updateParams = useCallback((reportIdent: ReportIdent, patch: Partial<ReportParams>) => {
    setParamsByReport((prev) => ({
      ...prev,
      [reportIdent]: { ...(prev[reportIdent] ?? createDefaultParams()), ...patch },
    }));
  }, []);

  return { getParams, updateParams };
};
