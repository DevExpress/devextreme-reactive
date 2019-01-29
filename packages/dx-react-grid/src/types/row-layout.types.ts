import { TableRow } from '@devexpress/dx-grid-core';
import { TableLayoutProps } from './table-layout.types';

type rowsBlockSharedProps = 'rowComponent' | 'cellComponent' | 'getCellColSpan' | 'columns';
type RowLayoutCommonProps = Pick<TableLayoutProps, rowsBlockSharedProps>;

export type RowsBlockLayoutProps = RowLayoutCommonProps & {
  rows: TableRow[],
  blockComponent: React.ComponentType,
};

export type RowLayoutProps = RowLayoutCommonProps & {
  row: any,
};
