import { GetTargetColumnGeometriesFn } from '../types';

export const getTargetColumnGeometries: GetTargetColumnGeometriesFn = (
  columnGeometries, sourceIndex,
) => {
  const sourceWidth = columnGeometries[sourceIndex].right - columnGeometries[sourceIndex].left;
  const getWidthDifference = (index: number) => columnGeometries[index].right
                                      - columnGeometries[index].left
                                      - sourceWidth;

  return columnGeometries
    .map(({
      top, right, bottom, left,
    }, targetIndex) => {
      let leftBorder = left;
      if (targetIndex > 0 && targetIndex <= sourceIndex) {
        leftBorder = Math.min(leftBorder, leftBorder - getWidthDifference(targetIndex - 1));
      }
      if (targetIndex > sourceIndex) {
        leftBorder = Math.max(leftBorder, leftBorder + getWidthDifference(targetIndex));
      }
      let rightBorder = right;
      if (targetIndex < columnGeometries.length - 1 && targetIndex >= sourceIndex) {
        rightBorder = Math.max(rightBorder, rightBorder + getWidthDifference(targetIndex + 1));
      }
      if (targetIndex < sourceIndex) {
        rightBorder = Math.min(rightBorder, rightBorder - getWidthDifference(targetIndex));
      }

      return {
        top,
        bottom,
        right: rightBorder,
        left: leftBorder,
      };
    });
};
