import * as React from 'react';
import { withComponents } from '@devexpress/dx-react-core';
import { TableGroupRow as TableGroupRowBase } from '@devexpress/dx-react-grid';
import { Cell } from '../templates/table-group-cell/cell';
import { TableRow as Row } from '../templates/table-row';
import { Content } from '../templates/table-group-cell/content';
import { Container } from '../templates/table-group-cell/container';
import { IndentCell } from '../templates/table-group-cell/indent-cell';
import { ExpandButton as Icon } from '../templates/parts/expand-button';

const TableGroupRowWithIndent = props => (
  <TableGroupRowBase indentColumnWidth={33} contentCellPadding="8px" {...props} />
);
TableGroupRowWithIndent.components = TableGroupRowBase.components;

export const TableGroupRow = withComponents({
  Row, Cell, IndentCell, Container, Content, Icon,
})(TableGroupRowWithIndent);

TableGroupRow.COLUMN_TYPE = TableGroupRowBase.COLUMN_TYPE;
TableGroupRow.ROW_TYPE = TableGroupRowBase.ROW_TYPE;
