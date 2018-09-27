import * as React from 'react';
import { withComponents } from '@devexpress/dx-react-core';
import { TableRowDetail as TableRowDetailBase } from '@devexpress/dx-react-grid';
import { TableDetailToggleCell as ToggleCell } from '../templates/table-detail-toggle-cell';
import { TableDetailCell as Cell } from '../templates/table-detail-cell';
import { TableRow as Row } from '../templates/table-row';

const TableRowDetailWithWidth = props => <TableRowDetailBase toggleColumnWidth={48} {...props} />;
TableRowDetailWithWidth.components = TableRowDetailBase.components;

export const TableRowDetail = withComponents({ Row, Cell, ToggleCell })(TableRowDetailWithWidth);

TableRowDetail.COLUMN_TYPE = TableRowDetailBase.COLUMN_TYPE;
TableRowDetail.ROW_TYPE = TableRowDetailBase.ROW_TYPE;
