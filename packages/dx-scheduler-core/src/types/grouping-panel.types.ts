import { Group } from './integrated-grouping.types';

/** @internal */
export type HorizontalGroupingCellData = {
  group: Group;
  colSpan: number;
  key: any;
  left: number;
  endOfGroup: boolean;
};
/** @internal */
export type VerticalGroupingCellData = {
  group: Group;
  rowSpan: number;
  height: number;
};
