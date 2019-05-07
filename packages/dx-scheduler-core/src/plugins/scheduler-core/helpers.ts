import { DateTimeFormatInstanceFn } from '../../types';

export const dateTimeFormatInstance: DateTimeFormatInstanceFn = (
  locale, formatOptions,
) => new Intl.DateTimeFormat(locale, formatOptions);
