import { TableRow, TableLayoutProps } from '../index';

type rowsBlockSharedProps = 'rowComponent' | 'cellComponent' | 'getCellColSpan' | 'columns';
type RowLayoutCommonProps = Pick<TableLayoutProps, rowsBlockSharedProps>;

/** @internal */
export type RowsBlockLayoutProps = RowLayoutCommonProps & {
  rows: TableRow[],
  blockComponent: React.ComponentType,
};

/** @internal */
export type RowLayoutProps = RowLayoutCommonProps & {
  row: any,
};
