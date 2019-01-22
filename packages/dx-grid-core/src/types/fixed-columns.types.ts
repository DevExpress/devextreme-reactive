import { PureComputed } from '@devexpress/dx-core';
import { TableColumn } from './table.types';
import { HeaderColumnChainRows } from './header-row.types';

export type FixedColumnName = string | symbol;
export type FixedColumnSide = 'left' | 'right' | undefined;

export type ColumnDimensions = { [key: string]: number };

export type GetFixedColumnKeysFn = PureComputed<[TableColumn[], FixedColumnName[]], string[]>;

export type CalculatePositionFn = PureComputed<[string[], number, ColumnDimensions], number>;
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
