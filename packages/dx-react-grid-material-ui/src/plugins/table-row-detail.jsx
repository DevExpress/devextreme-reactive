import * as React from 'react';
import { TableRowDetail as TableRowDetailBase, withComponents } from '@devexpress/dx-react-grid';
import { TableDetailToggleCell as ToggleCell } from '../templates/table-detail-toggle-cell';
import { TableDetailCell as Cell } from '../templates/table-detail-cell';
import { TableRow as Row } from '../templates/table-row';

const TableRowDetailWithWidth = props => <TableRowDetailBase toggleColumnWidth={48} {...props} />;
TableRowDetailWithWidth.components = TableRowDetailBase;

export const TableRowDetail = withComponents({ Row, Cell, ToggleCell })(TableRowDetailWithWidth);
