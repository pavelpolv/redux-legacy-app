import { useMemo } from 'react';
import { Table, type TableColumnsType } from 'antd';
import { useReportParams } from '../hooks';
import type { Report } from '../types';
import { buildExportRequest, getLastQuarters } from '../utils';
import { ReportDownloadButton } from './ReportDownloadButton';
import { ReportParamsCell } from './ReportParamsCell';

const QUARTERS_COUNT = 6;

interface Props {
  reports: Report[];
  loading: boolean;
}

export const ReportTable = ({ reports, loading }: Props) => {
  const quarters = useMemo(() => getLastQuarters(QUARTERS_COUNT), []);
  const { getParams, updateParams } = useReportParams();

  const columns: TableColumnsType<Report> = [
    { title: 'Название', dataIndex: 'reportName', key: 'reportName' },
    {
      title: 'Параметры',
      key: 'params',
      width: 320,
      render: (_, report) => (
        <ReportParamsCell
          report={report}
          params={getParams(report.reportIdent)}
          quarters={quarters}
          onChange={(patch) => updateParams(report.reportIdent, patch)}
        />
      ),
    },
    {
      title: '',
      key: 'download',
      width: 140,
      align: 'center',
      render: (_, report) => (
        <ReportDownloadButton
          report={report}
          request={buildExportRequest(report, getParams(report.reportIdent), quarters)}
        />
      ),
    },
  ];

  return (
    <Table
      rowKey="reportIdent"
      columns={columns}
      dataSource={reports}
      loading={loading}
      pagination={false}
    />
  );
};
