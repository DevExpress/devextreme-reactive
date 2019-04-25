export const dateTimeFormatInstance = (
  locale: string | string[], formatOptions: Intl.DateTimeFormatOptions,
) => new Intl.DateTimeFormat(locale, formatOptions);
