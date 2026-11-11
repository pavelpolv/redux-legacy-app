import dayjs from 'dayjs';
import type { MockHandler, MockRequest } from '@core/api/types';
import type { ExportReportRequest, ExportReportResponse, ReportListResponse } from '../../types';

const reportList: ReportListResponse = {
  reports: [
    {
      reportIdent: 'arbitrage_activity',
      reportName: 'Арбитражная активность',
      periodType: 'DATE',
      ord: 1,
    },
    {
      reportIdent: 'user_upload_metrics',
      reportName: 'Статистика в разрезе работников о загруженной отчетности на отчетную дату',
      periodType: 'PERIOD',
      ord: 2,
    },
    {
      reportIdent: 'client_revenue_rssbu_acc_total',
      reportName: 'Выручка клиентов (ЮЛ) накопительным итогом РСБУ',
      periodType: 'PERIOD',
      ord: 3,
    },
  ],
};

const FAIL_EVERY_NTH_EXPORT = 3;
let exportCounter = 0;

const files = new Map<string, { fileName: string; content: string }>();

const buildCsv = (request: ExportReportRequest) => {
  const rows = [['Отчет', request.reportIdent]];
  if (request.onDate) rows.push(['На дату', request.onDate]);
  request.periods?.forEach((p) => rows.push(['Период', `${p.startDate} — ${p.endDate}`]));
  rows.push(['Сформирован', dayjs().format('YYYY-MM-DD HH:mm:ss')]);
  return '﻿' + rows.map((row) => row.join(';')).join('\n');
};

export const reportMockHandlers: MockHandler[] = [
  {
    method: 'GET',
    path: '/report/list',
    handler: () => ({ data: reportList }),
  },
  {
    method: 'POST',
    path: '/report/export',
    handler: ({ body }: MockRequest<ExportReportRequest>) => {
      exportCounter += 1;
      if (exportCounter % FAIL_EVERY_NTH_EXPORT === 0) {
        return {
          error: { status: 500, data: { message: 'Не удалось сформировать отчет (mock-ошибка)' } },
        };
      }

      const id = crypto.randomUUID();
      const fileName = `${body.reportIdent}_${dayjs().format('YYYYMMDD_HHmmss')}.csv`;
      files.set(id, { fileName, content: buildCsv(body) });

      const response: ExportReportResponse = {
        fileRef: { id, fileName, params: { source: 'tmp' } },
      };
      return { data: response };
    },
  },
  {
    method: 'GET',
    path: '/files/:id/download',
    handler: ({ params }) => {
      const file = files.get(params.id);
      if (!file) return { error: { status: 404, data: { message: 'Файл не найден' } } };
      return { data: new Blob([file.content], { type: 'text/csv;charset=utf-8' }) };
    },
  },
];
