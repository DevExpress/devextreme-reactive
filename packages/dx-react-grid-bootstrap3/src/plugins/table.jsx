import { withComponents } from '@devexpress/dx-react-core';
import { Table as TableBase } from '@devexpress/dx-react-grid';
import { TableHead, TableBody, TableFooter } from '../templates/table-parts';
import { TableLayout as Layout } from '../templates/table-layout';
import { TableCell as Cell } from '../templates/table-cell';
import { TableStubCell as StubCell } from '../templates/table-stub-cell';
import { TableStubHeaderCell as StubHeaderCell } from '../templates/table-stub-header-cell';
import { TableNoDataCell as NoDataCell } from '../templates/table-no-data-cell';
import { TableRow as Row } from '../templates/table-row';
import { Table as TableComponent } from '../templates/table';
import { TableContainer as Container } from '../templates/table-container';
import { TableStubRow as StubRow } from '../templates/table-stub-row';

export const Table = withComponents({
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
  StubHeaderCell,
})(TableBase);

Table.COLUMN_TYPE = TableBase.COLUMN_TYPE;
Table.ROW_TYPE = TableBase.ROW_TYPE;
Table.NODATA_ROW_TYPE = TableBase.NODATA_ROW_TYPE;
