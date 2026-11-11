import { useCallback, useState } from 'react';
import { getErrorMessage } from '@core/api';
import { useExportReportMutation } from '../api';
import type { ExportReportRequest, ReportIdent } from '../types';

const DOWNLOAD_ERROR = 'Не удалось скачать отчет';

const useReportExportMutation = (reportIdent: ReportIdent) =>
  useExportReportMutation({ fixedCacheKey: reportIdent });

export const useIsReportDownloading = (reportIdent: ReportIdent) =>
  useReportExportMutation(reportIdent)[1].isLoading;

export const useReportDownload = (
  reportIdent: ReportIdent,
  request: ExportReportRequest | null,
) => {
  const [exportReport, { isLoading, isError, error }] = useReportExportMutation(reportIdent);
  const [lastRequestKey, setLastRequestKey] = useState<string | null>(null);
  const requestKey = JSON.stringify(request);

  const download = useCallback(() => {
    if (!request) return;
    setLastRequestKey(requestKey);
    exportReport(request);
  }, [exportReport, request, requestKey]);

  const isActualError = isError && lastRequestKey === requestKey;

  return {
    download,
    isLoading,
    errorMessage: isActualError ? getErrorMessage(error, DOWNLOAD_ERROR) : null,
  };
};
