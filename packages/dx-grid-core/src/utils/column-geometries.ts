import { GetTargetColumnGeometriesFn, GetNodeGeometriesFn } from '../types';

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

export const getCellGeometries: GetNodeGeometriesFn = (node) => {
  const { left, right, width } = node.getBoundingClientRect();
  const styleLeft = parseInt(node.style.left?.toString().replace('px', ''), 10);
  const styleRight = parseInt(node.style.right?.toString().replace('px', ''), 10);

  if (!isNaN(styleLeft)) {
    const calculatedLeft = Math.max(styleLeft, left);
    return {
      left: calculatedLeft,
      right: calculatedLeft + width,
      isFixed: true,
    };
  }

  if (!isNaN(styleRight)) {
    // NOTE: get tableContainer (parent of first DIV element) to calculate 'right' value
    let tableContainer = node as HTMLElement | null;
    while (tableContainer && tableContainer.nodeName !== 'DIV') {
      tableContainer = tableContainer.parentNode as HTMLElement;
    }
    tableContainer = tableContainer?.parentNode as HTMLElement;

    if (tableContainer) {
      const { width: tableWidth } = tableContainer.getBoundingClientRect();
      const calculatedRight = Math.min(tableWidth - styleRight, right);
      return {
        left: calculatedRight - width,
        right: calculatedRight,
        isFixed: true,
      };
    }
  }

  return { left, right };
};
