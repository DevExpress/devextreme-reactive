import { Group } from './integrated-grouping.types';

/** @internal */
export type GroupingCellData = {
  group: Group[];
  colSpan: number;
  key: any;
  left: number;
  hasBrightBorder: boolean;
};
