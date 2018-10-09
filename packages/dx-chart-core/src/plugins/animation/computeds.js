export const getAnimation = userSettings => (startCoords, {
  name,
  options,
  styles = () => {},
}) => {
  const settings = userSettings || options;
  return (item, series) => ({ animation: `${name} ${settings(item, series)}`, ...styles(item ? item.x : 0, startCoords.y) });
};
