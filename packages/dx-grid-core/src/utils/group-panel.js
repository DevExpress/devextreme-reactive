import { getTargetColumnGeometries } from './column-geometries';

const isOnTheSameLine = (geometry, y) => y >= geometry.top && y <= geometry.bottom;

export const getGroupCellTargetIndex = (geometries, sourceIndex, { x, y }) => {
  if (geometries.length === 0) return 0;

  const targetGeometries = sourceIndex !== -1
    ? getTargetColumnGeometries(geometries, sourceIndex)
    : geometries;

  const targetIndex = targetGeometries.findIndex((geometry, index) => {
    const inVerticalBounds = isOnTheSameLine(geometry, y);
    const inHorizontalBounds = x >= geometry.left && x <= geometry.right;
    const shouldGoFirst = index === 0 && x < geometry.left;
    const shouldGoOnLineBreak = !inVerticalBounds &&
      !!geometries[index - 1] &&
      isOnTheSameLine(geometries[index - 1], y);

    return (inVerticalBounds && inHorizontalBounds) ||
      shouldGoFirst ||
      shouldGoOnLineBreak;
  });

  return targetIndex === -1 ? geometries.length : targetIndex;
};
