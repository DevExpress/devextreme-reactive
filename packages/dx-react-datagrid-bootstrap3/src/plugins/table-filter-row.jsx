import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableFilterRow as TableFilterRowBase } from '@devexpress/dx-react-datagrid';
import { TableFilterCell } from '../templates/table-filter-cell';

export const TableFilterRow = ({ filterCellTemplate, ...restProps }) => (
  <TableFilterRowBase
    filterCellTemplate={combineTemplates(filterCellTemplate, TableFilterCell)}
    {...restProps}
  />
);

TableFilterRow.propTypes = {
  filterCellTemplate: PropTypes.func,
};
TableFilterRow.defaultProps = {
  filterCellTemplate: undefined,
};
