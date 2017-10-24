import React from 'react';
import PropTypes from 'prop-types';
import { TableColumnResizing as TableColumnResizingBase } from '@devexpress/dx-react-grid';

export const TableColumnResizing = ({ columnWidths, onColumnWidthsChange, ...restProps }) => (
  <TableColumnResizingBase
    columnWidths={columnWidths}
    onColumnWidthsChange={onColumnWidthsChange}
    {...restProps}
  />
);

TableColumnResizing.propTypes = {
  columnWidths: PropTypes.objectOf(PropTypes.number),
  onColumnWidthsChange: PropTypes.func,
};

TableColumnResizing.defaultProps = {
  columnWidths: undefined,
  onColumnWidthsChange: undefined,
};
