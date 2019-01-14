export const isOccurrenceInSource = (
  source, strings,
) => strings.some(string => source.indexOf(string) > -1);
