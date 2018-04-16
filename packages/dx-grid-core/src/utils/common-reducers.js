export const toggle = (source, items, state) => {
  const itemsSet = new Set(items);

  let sourceState = state;
  if (sourceState === undefined) {
    const availableSelection = source.filter(item => itemsSet.has(item));
    sourceState = availableSelection.length !== itemsSet.size;
  }

  if (sourceState) {
    const sourceSet = new Set(source);
    return [
      ...source,
      ...items.filter(item => !sourceSet.has(item)),
    ];
  }

  return source.filter(item => !itemsSet.has(item));
};
