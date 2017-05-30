import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableView as TableViewBase } from '@devexpress/dx-react-grid';
import { Table } from '../templates/table';
import { TableCell } from '../templates/table-cell';
import { TableNoDataCell } from '../templates/table-no-data-cell';

export const TableView = ({ tableCellTemplate, ...props }) => (
  <TableViewBase
    tableTemplate={Table}
    tableCellTemplate={combineTemplates(tableCellTemplate, TableCell)}
    tableNoDataCellTemplate={TableNoDataCell}
    {...props}
  />
);
TableView.propTypes = {
  tableCellTemplate: PropTypes.func,
};
TableView.defaultProps = {
  tableCellTemplate: undefined,
};
