import { withComponents } from '@devexpress/dx-react-core';
import { Table as TableBase } from '@devexpress/dx-react-grid';
import { Head, Body, Footer } from '../templates/table-parts';
import { Table as TableComponent } from '../templates/table';
import { TableRow as Row } from '../templates/table-row';
import { TableLayout as Layout } from '../templates/table-layout';
import { TableCell as Cell } from '../templates/table-cell';
import { TableStubCell as StubCell } from '../templates/table-stub-cell';
import { TableNoDataCell as NoDataCell } from '../templates/table-no-data-cell';
import { TableContainer as Container } from '../templates/table-container';
import { TableStubRow as StubRow } from '../templates/table-stub-row';

export const Table = withComponents({
  Table: TableComponent,
  TableHead: Head,
  TableBody: Body,
  TableFooter: Footer,
  Container,
  Layout,
  Row,
  Cell,
  NoDataRow: Row,
  NoDataCell,
  StubRow,
  StubCell,
  StubHeaderCell: StubCell,
})(TableBase);

Table.components = TableBase.components;

Table.COLUMN_TYPE = TableBase.COLUMN_TYPE;
Table.ROW_TYPE = TableBase.ROW_TYPE;
Table.NODATA_ROW_TYPE = TableBase.NODATA_ROW_TYPE;
