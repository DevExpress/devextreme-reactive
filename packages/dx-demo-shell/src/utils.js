export const findOccurrence = (
  source, strings,
) => strings.find(string => source.indexOf(string) > -1) !== undefined;
