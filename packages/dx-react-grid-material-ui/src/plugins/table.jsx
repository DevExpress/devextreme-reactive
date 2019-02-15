import { withComponents } from '@devexpress/dx-react-core';
import { Table as TableRaw } from '@devexpress/dx-react-grid';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import { Table as TableComponent } from '../templates/table';
import { TableRow as Row } from '../templates/table-row';
import { TableLayout as Layout } from '../templates/table-layout';
import { TableCell as Cell } from '../templates/table-cell';
import { TableStubCell as StubCell } from '../templates/table-stub-cell';
import { TableNoDataCell as NoDataCell } from '../templates/table-no-data-cell';
import { TableContainer as Container } from '../templates/table-container';
import { TableStubRow as StubRow } from '../templates/table-stub-row';
import { withPatchedProps } from '../utils/with-patched-props';

const TableBase = withComponents({
  Table: TableComponent,
  TableHead,
  TableBody,
  TableFooter,
  Container,
  Layout,
  Row,
  Cell,
  NoDataRow: Row,
  NoDataCell,
  StubRow,
  StubCell,
  StubHeaderCell: StubCell,
})(TableRaw);

export const Table = withPatchedProps(props => ({
  minColumnWidth: 120,
  ...props,
}))(TableBase);

Table.components = TableBase.components;

Table.COLUMN_TYPE = TableRaw.COLUMN_TYPE;
Table.ROW_TYPE = TableRaw.ROW_TYPE;
Table.NODATA_ROW_TYPE = TableRaw.NODATA_ROW_TYPE;
