import { PureComputed } from '@devexpress/dx-core';
import { ViewCell } from './scheduler-core.types';
import { ValidResource } from './resources.types';

/** Configures a single grouping item the appointments may belong to. */
export type Group = {
  /** The ID of the corresponding resource the appointments are grouped by. */
  id: number | string;
  /** The grouping item text. */
  text: string;
  /** The corresponding resource's filedName. */
  fieldName: string;
};

/** @internal */
export type ExpandGroupingPanelCellFn = PureComputed<
  [ViewCell[][], Group[][], ValidResource[]], ViewCell[][]
>;
