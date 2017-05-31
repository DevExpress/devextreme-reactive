import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableView as TableViewBase } from '@devexpress/dx-react-grid';
import { VirtualTable } from '../templates/virtual-table';
import { TableCell } from '../templates/table-cell';
import { TableNoDataCell } from '../templates/table-no-data-cell';

export const VirtualTableView = ({ tableCellTemplate, ...props }) => (
  <TableViewBase
    tableTemplate={VirtualTable}
    tableCellTemplate={combineTemplates(tableCellTemplate, TableCell)}
    tableNoDataCellTemplate={TableNoDataCell}
    {...props}
  />
);
VirtualTableView.propTypes = {
  tableCellTemplate: PropTypes.func,
};
VirtualTableView.defaultProps = {
  tableCellTemplate: undefined,
};
