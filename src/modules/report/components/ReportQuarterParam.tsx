import { Select } from 'antd';
import type { Quarter } from '../types';

interface Props {
  disabled?: boolean;
  quarters: Quarter[];
  value: string[];
  onChange: (value: string[]) => void;
}

export const ReportQuarterParam = ({ quarters, value, onChange, disabled }: Props) => (
  <Select
    mode="multiple"
    allowClear
    value={value}
    disabled={disabled}
    onChange={onChange}
    options={quarters.map(({ key, label }) => ({ value: key, label }))}
    placeholder="Выберите кварталы"
    maxTagCount="responsive"
    style={{ width: 280 }}
  />
);
