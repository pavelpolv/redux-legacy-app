import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { baseApi } from '@core/api';
import type {
  ExportReportRequest,
  ExportReportResponse,
  FileRef,
  ReportListResponse,
} from '../types';
import { saveFile } from '../utils';

const blobOrErrorHandler = async (response: Response) => {
  if (response.ok) return response.blob();
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

export const reportApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getReportList: build.query<ReportListResponse, void>({
      query: () => '/report/list',
    }),

    exportReport: build.mutation<FileRef, ExportReportRequest>({
      async queryFn(body, _api, _extraOptions, baseQuery) {
        const exportResult = await baseQuery({ url: '/report/export', method: 'POST', body });
        if (exportResult.error) return { error: exportResult.error as FetchBaseQueryError };

        const { fileRef } = exportResult.data as ExportReportResponse;

        const fileResult = await baseQuery({
          url: `/files/${encodeURIComponent(fileRef.id)}/download`,
          responseHandler: blobOrErrorHandler,
        });
        if (fileResult.error) return { error: fileResult.error as FetchBaseQueryError };

        saveFile(fileResult.data as Blob, fileRef.fileName);
        return { data: fileRef };
      },
    }),
  }),
});

export const { useGetReportListQuery, useExportReportMutation } = reportApi;
