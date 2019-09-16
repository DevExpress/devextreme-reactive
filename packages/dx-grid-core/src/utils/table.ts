import { easeOutCubic } from '@devexpress/dx-core';
import { getTargetColumnGeometries } from './column-geometries';
import {
  GetTableColumnGeometriesFn, GetTableTargetColumnIndexFn, ColumnAnimation,
  GetColumnAnimationsFn, ColumnGeometry, FilterActiveAnimationsFn, EvalAnimationsFn,
} from '../types';

export const getTableColumnGeometries: GetTableColumnGeometriesFn = (columns, tableWidth) => {
  const columnWidths = columns
    .map(column => column.width);

  const freeSpace = tableWidth;
  const restrictedSpace = columnWidths
    .reduce(
      (accum, width) => (accum as number)! + (typeof width === 'number' ? width : 0), 0) as number;
  const freeSpacePortions = columnWidths
    .reduce(
      (accum, width) => (accum as number)! + (typeof width !== 'number' ? 1 : 0), 0) as number;
  const freeSpacePortion = (freeSpace - restrictedSpace!) / freeSpacePortions!;

  let lastRightPosition = 0;
  return columnWidths
    .map(width => (typeof width !== 'number' ? freeSpacePortion : width))
    .map((width) => {
      lastRightPosition += width;
      return {
        left: lastRightPosition - width,
        right: lastRightPosition,
      };
    });
};

export const getTableTargetColumnIndex: GetTableTargetColumnIndexFn = (
  columnGeometries, sourceIndex, offset,
) => getTargetColumnGeometries(columnGeometries, sourceIndex)
  .findIndex(({ left, right }) => offset > left && offset < right);

const ANIMATION_DURATION = 200;

const getAnimationProgress = (animation: ColumnAnimation) => (
  new Date().getTime() - animation.startTime) / ANIMATION_DURATION;

export const getAnimations: GetColumnAnimationsFn = (
  prevColumns,
  nextColumns,
  tableWidth,
  prevAnimations,
) => {
  const resizing = prevColumns.map(column => column.key).join()
    === nextColumns.map(column => column.key).join();

  const prevColumnGeometries = new Map<string, ColumnGeometry>(
    getTableColumnGeometries(prevColumns, tableWidth)
      .map((geometry, index) => [prevColumns[index].key, geometry] as [string, ColumnGeometry])
      .map(([key, geometry]) => {
        const animation = prevAnimations.get(key);
        if (!animation) return [key, geometry];
        const progress = easeOutCubic(getAnimationProgress(animation));
        const { to, from } = animation.left!;
        const left = ((to - from) * progress) + from;
        return [key, {
          left,
          right: geometry.right - (geometry.left - left),
        }];
      // tslint:disable-next-line:array-type
      }) as [string, ColumnGeometry][],
    );

  const nextColumnGeometries = new Map(
    getTableColumnGeometries(nextColumns, tableWidth)
      // tslint:disable-next-line:array-type
      .map((geometry, index) => [nextColumns[index].key, geometry]) as [string, ColumnGeometry][],
  );

  return new Map([...nextColumnGeometries.keys()]
    .map((key) => {
      const prev: any = prevColumnGeometries.get(key);
      const next: any = nextColumnGeometries.get(key);

      const result: ColumnAnimation = { startTime: new Date().getTime(), style: {} };
      const takePrevColumnIntoAccount = !!prevAnimations.get(key) || (prev && !resizing);
      if (Math.abs((takePrevColumnIntoAccount ? prev!.left : next!.left) - next!.left) > 1) {
        result.left = { from: prev.left, to: next.left };
      }
      return [key, result] as [string, ColumnAnimation];
    })
    .filter((animation: [string, ColumnAnimation]) => animation[1].left));
};

export const filterActiveAnimations: FilterActiveAnimationsFn = animations => new Map(
  [...animations.entries()]
    .filter(([, animation]) => getAnimationProgress(animation) < 1),
);

export const evalAnimations: EvalAnimationsFn = animations => new Map([...animations.entries()]
  .map(([key, animation]): [string, object] => {
    const progress = easeOutCubic(getAnimationProgress(animation));
    const result = { ...animation.style };
    if (animation.left) {
      const offset = (animation.left.to - animation.left.from) * (progress - 1);
      (result as any).transform = `translateX(${offset}px)`;
    }
    return [key, result];
  }));
