import { DatePicker } from 'antd';
import dayjs, { type Dayjs } from 'dayjs';
import { DISPLAY_DATE_FORMAT } from '../utils';

interface Props {
  disabled?: boolean;
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
}

const disableFuture = (date: Dayjs) => date.isAfter(dayjs(), 'day');

export const ReportDateParam = ({ value, onChange, disabled }: Props) => (
  <DatePicker
    value={value}
    disabled={disabled}
    onChange={onChange}
    format={DISPLAY_DATE_FORMAT}
    disabledDate={disableFuture}
    placeholder="Выберите дату"
    style={{ width: 280 }}
  />
);
