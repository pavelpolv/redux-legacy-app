import { DownloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useReportDownload } from '../hooks';
import type { ExportReportRequest, Report } from '../types';

interface Props {
  report: Report;
  request: ExportReportRequest | null;
}

const EMPTY_PARAMS_HINT: Record<Report['periodType'], string> = {
  DATE: 'Выберите дату',
  PERIOD: 'Выберите хотя бы один квартал',
};

export const ReportDownloadButton = ({ report, request }: Props) => {
  const { download, isLoading, errorMessage } = useReportDownload(report.reportIdent, request);

  const tooltip = errorMessage ?? (request ? null : EMPTY_PARAMS_HINT[report.periodType]);

  return (
    <Tooltip title={tooltip} color={errorMessage ? 'red' : undefined}>
      <Button
        variant="outlined"
        color={errorMessage ? 'danger' : 'primary'}
        icon={errorMessage ? <ExclamationCircleOutlined /> : <DownloadOutlined />}
        loading={isLoading}
        disabled={!request}
        onClick={download}
      >
        Скачать
      </Button>
    </Tooltip>
  );
};
