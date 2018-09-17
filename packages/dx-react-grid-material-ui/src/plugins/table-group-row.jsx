import * as React from 'react';
import { TableGroupRow as TableGroupRowBase, withComponents } from '@devexpress/dx-react-grid';
import { TableGroupCell as Cell } from '../templates/table-group-row-cell';
import { TableRow as Row } from '../templates/table-row';

const TableGroupRowWithIndent = props => <TableGroupRowBase indentColumnWidth={48} {...props} />;
TableGroupRowWithIndent.components = TableGroupRowBase.components;

export const TableGroupRow = withComponents({ Row, Cell })(TableGroupRowWithIndent);
