import React from 'react';
import PropTypes from 'prop-types';

export const TableRow = ({
  children, style,
  tableRow, tableColumn,
  isExpanded, toggleGroupExpanded,
  ...restProps
}) => (
  <tr
    style={style}
    {...restProps}
  >
    {children}
  </tr>
);

TableRow.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  toggleGroupExpanded: PropTypes.func,
  isExpanded: PropTypes.bool,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
};

TableRow.defaultProps = {
  children: null,
  style: null,
  toggleGroupExpanded: undefined,
  isExpanded: undefined,
  tableColumn: undefined,
  tableRow: undefined,
};
