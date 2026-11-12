import dayjs, { type Dayjs } from 'dayjs';
import type { Quarter } from '../types';
import { API_DATE_FORMAT } from './dateFormat';

const toQuarter = (date: Dayjs): Quarter => {
  const quarterIndex = Math.floor(date.month() / 3);
  const start = date.month(quarterIndex * 3).startOf('month');
  const end = start.add(2, 'month').endOf('month');
  const number = quarterIndex + 1;

  return {
    key: `${start.year()}-Q${number}`,
    label: `${number} кв. ${start.year()}`,
    startDate: start.format(API_DATE_FORMAT),
    endDate: end.format(API_DATE_FORMAT),
  };
};

export const getPreviousQuarters = (count: number, now: Dayjs = dayjs()): Quarter[] =>
  Array.from({ length: count }, (_, i) =>
    toQuarter(now.startOf('month').subtract((i + 1) * 3, 'month')),
  );
