export const findOccurrence = (source, strings) => {
  for (let index = 0; index < strings.length; index += 1) {
    if (source.indexOf(strings[index]) > -1) return true;
  }
  return false;
};
