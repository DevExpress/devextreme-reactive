import { PureComputed } from '@devexpress/dx-core';
import { RowId, Row, IsSpecificRowFn, GetRowIdFn } from './grid-core.types';

export type RowsWithSelection = { rows: Row[], availableToSelect: RowId[] };

export type RowsWithAvailableToSelectFn = PureComputed<
  [Row[], GetRowIdFn, IsSpecificRowFn],
  RowsWithSelection
>;
