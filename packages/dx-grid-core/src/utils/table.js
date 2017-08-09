import { easeOutCubic } from '@devexpress/dx-core';

import { querySelectorAll } from './dom-utils';
import { getTargetColumnGeometries } from './column-geometries';

export const getTableRowColumnsWithColSpan = (tableColumns, colSpanStart) => {
  if (colSpanStart === undefined) return tableColumns;

  let span = false;
  return tableColumns
    .reduce((acc, tableColumn, columnIndex) => {
      if (span) return acc;
      if (columnIndex === colSpanStart || tableColumn.key === colSpanStart) {
        span = true;
        return [...acc, { ...tableColumn, colSpan: tableColumns.length - columnIndex }];
      }
      return [...acc, tableColumn];
    }, []);
};

export const findTableCellTarget = (e) => {
  const { target, currentTarget } = e;

  const rowsEls = querySelectorAll(currentTarget, ':scope > tr, :scope > tr');
  const rowIndex = [...rowsEls].findIndex(rowEl => rowEl.contains(target));
  if (rowIndex === -1) return { rowIndex: -1, columnIndex: -1 };
  const cellEls = querySelectorAll(rowsEls[rowIndex], ':scope > th, :scope > td');
  const columnIndex = [...cellEls].findIndex(cellEl => cellEl.contains(target));
  if (columnIndex === -1) return { rowIndex: -1, columnIndex: -1 };

  return { rowIndex, columnIndex };
};

export const getTableColumnGeometries = (columns, tableWidth) => {
  const columnWidths = columns
    .map(column => column.width);

  const freeSpace = tableWidth;
  const restrictedSpace = columnWidths
    .reduce((accum, width) => accum + (width || 0), 0);
  const freeSpacePortions = columnWidths
    .reduce((accum, width) => accum + (width === undefined ? 1 : 0), 0);
  const freeSpacePortion = (freeSpace - restrictedSpace) / freeSpacePortions;

  let lastRightPosition = 0;
  return columnWidths
    .map(width => (width === undefined ? freeSpacePortion : width))
    .map((width) => {
      lastRightPosition += width;
      return {
        left: lastRightPosition - width,
        right: lastRightPosition,
      };
    });
};

export const getTableTargetColumnIndex = (columnGeometries, sourceIndex, offset) =>
  getTargetColumnGeometries(columnGeometries, sourceIndex)
    .findIndex(({ left, right }) => offset > left && offset < right);


const ANIMATION_DURATION = 200;

const getAnimationProgress = animation =>
  (new Date().getTime() - animation.startTime) / ANIMATION_DURATION;

export const getAnimations = (
  prevColumns, nextColumns, tableWidth, draggingColumnKey, prevAnimations,
) => {
  const prevColumnGeometries = new Map(getTableColumnGeometries(prevColumns, tableWidth)
    .map((geometry, index) => [prevColumns[index].key, geometry])
    .map(([key, geometry]) => {
      const animation = prevAnimations.get(key);
      if (!animation) return [key, geometry];
      const progress = easeOutCubic(getAnimationProgress(animation));
      const left = ((animation.left.to - animation.left.from) * progress) + animation.left.from;
      return [key, {
        left,
        right: geometry.right - (geometry.left - left),
      }];
    }));

  const nextColumnGeometries = new Map(getTableColumnGeometries(nextColumns, tableWidth)
    .map((geometry, index) => [nextColumns[index].key, geometry]));

  return new Map([...nextColumnGeometries.keys()]
    .map((key) => {
      const prev = prevColumnGeometries.get(key);
      const next = nextColumnGeometries.get(key);

      const result = { startTime: new Date().getTime(), style: {} };
      if (Math.abs(prev.left - next.left) > 1) {
        result.left = { from: prev.left, to: next.left };
      }
      if (draggingColumnKey === key) {
        result.style = {
          zIndex: 100,
          position: 'relative',
        };
      }
      return [key, result];
    })
    .filter(animation => animation[1].left));
};

export const filterActiveAnimations = animations => new Map([...animations.entries()]
  .filter(([, animation]) => getAnimationProgress(animation) < 1));

export const evalAnimations = animations => new Map([...animations.entries()]
  .map(([key, animation]) => {
    const progress = easeOutCubic(getAnimationProgress(animation));
    const result = { ...animation.style };
    if (animation.left) {
      const offset = (animation.left.to - animation.left.from) * (progress - 1);
      result.transform = `translateX(${offset}px)`;
    }
    return [key, result];
  }));
