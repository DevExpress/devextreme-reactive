import { PureComputed } from '@devexpress/dx-core';
import { RowId, Row, IsSpecificRowFn, GetRowIdFn } from './grid-core.types';

/** @internal */
export type RowsWithSelection = { rows: Row[], availableToSelect: RowId[] };

/** @internal */
export type RowsWithAvailableToSelectFn = PureComputed<
  [Row[], GetRowIdFn, IsSpecificRowFn],
  RowsWithSelection
>;
