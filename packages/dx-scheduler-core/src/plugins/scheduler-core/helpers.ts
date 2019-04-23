export const dateTimeFormatInstance: any = (
  locale: string | string[], formatOptions: Intl.DateTimeFormatOptions,
) => new Intl.DateTimeFormat(locale, formatOptions);
