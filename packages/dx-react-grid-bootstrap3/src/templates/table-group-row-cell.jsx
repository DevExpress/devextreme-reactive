import React from 'react';
import PropTypes from 'prop-types';

export const TableGroupCell = ({
  style, colSpan, rowData, column, isExpanded, toggleGroupExpanded, children,
}) => (
  <td
    colSpan={colSpan}
    style={{
      cursor: 'pointer',
      ...style,
    }}
    onClick={toggleGroupExpanded}
  >
    <i
      className={`glyphicon glyphicon-triangle-${isExpanded ? 'bottom' : 'right'}`}
      style={{
        fontSize: '9px',
        top: 0,
        marginRight: '10px',
      }}
    />
    <strong>{column.title || column.name}: </strong>
    {children || rowData.value}
  </td>
);

TableGroupCell.propTypes = {
  style: PropTypes.shape(),
  colSpan: PropTypes.number,
  rowData: PropTypes.shape(),
  column: PropTypes.shape(),
  isExpanded: PropTypes.bool,
  toggleGroupExpanded: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

TableGroupCell.defaultProps = {
  style: null,
  colSpan: 1,
  rowData: {},
  column: {},
  isExpanded: false,
  toggleGroupExpanded: () => {},
  children: undefined,
};
