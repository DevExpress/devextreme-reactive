import { PureComputed } from '@devexpress/dx-core';
import { TableColumn } from './table.types';
import { HeaderColumnChainRows } from './header-row.types';

/** @internal */
export type FixedColumnName = string | symbol;
/** @internal */
export type FixedColumnSide = 'left' | 'right';

/** @internal */
export type ColumnDimensions = { [key: string]: number };

/** @internal */
export type GetFixedColumnKeysFn = PureComputed<[TableColumn[], FixedColumnName[]], string[]>;

/** @internal */
export type CalculatePositionFn = PureComputed<[string[], number, ColumnDimensions], number>;
/** @internal */
export type CalculateFixedColumnPropsFn = PureComputed<[
  { tableColumn: TableColumn },
  { leftColumns: FixedColumnName[], rightColumns: FixedColumnName[] },
  TableColumn[],
  ColumnDimensions,
  HeaderColumnChainRows
], {
  showRightDivider: boolean,
  showLeftDivider: boolean,
  position: number,
  side: FixedColumnSide,
}>;
