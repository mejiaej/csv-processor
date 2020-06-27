import { parse } from 'date-fns';

export const DATE_FORMAT: string = 'dd/MM/yyyy';

export const parseDate = (date: string): Date => {
  return parse(date, DATE_FORMAT, new Date());
};
