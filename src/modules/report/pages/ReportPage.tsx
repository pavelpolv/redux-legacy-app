import { Alert, Button, Layout, Typography } from 'antd';
import { getErrorMessage } from '@core/api';
import { useGetReportListQuery } from '../api';
import { ReportTable } from '../components';

export const ReportPage = () => {
  const { data, isFetching, isError, error, refetch } = useGetReportListQuery();

  return (
    <Layout.Content style={{ padding: 24, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
      <Typography.Title level={3}>Отчеты</Typography.Title>

      {isError ? (
        <Alert
          type="error"
          showIcon
          title="Не удалось загрузить список отчетов"
          description={getErrorMessage(error)}
          action={<Button onClick={refetch}>Повторить</Button>}
        />
      ) : (
        <ReportTable reports={data?.reports ?? []} loading={isFetching} />
      )}
    </Layout.Content>
  );
};
