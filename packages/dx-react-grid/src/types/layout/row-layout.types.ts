import { TableRow, TableLayoutProps } from '../index';
import { CollapsedCell } from '@devexpress/dx-grid-core';

type rowsBlockSharedProps = 'rowComponent' | 'cellComponent' | 'getCellColSpan' | 'columns';
type virtualRowsBlockSharedProps = 'rowComponent' | 'cellComponent';
type RowLayoutCommonProps = Pick<TableLayoutProps, rowsBlockSharedProps>;
type VirtualRowLayoutCommonProps = Pick<TableLayoutProps, virtualRowsBlockSharedProps>;

/** @internal */
export type RowsBlockLayoutProps = RowLayoutCommonProps & {
  rows: TableRow[],
  blockComponent: React.ComponentType,
};

/** @internal */
export type RowLayoutProps = RowLayoutCommonProps & {
  row: any,
};

/** @internal */
export type VirtualRowLayoutProps = VirtualRowLayoutCommonProps & {
  row: any,
  cells: CollapsedCell[],
  forwardedRef?: React.Ref<React.ReactInstance>;
};
