import React from 'react';
import PropTypes from 'prop-types';

export const TableGroupCell = ({
  style, colSpan, column, isExpanded, toggleGroupExpanded, children, value,
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
    {children || value}
  </td>
);

TableGroupCell.propTypes = {
  style: PropTypes.shape(),
  colSpan: PropTypes.number,
  row: PropTypes.shape(), // eslint-disable-line react/no-unused-prop-types
  column: PropTypes.shape(),
  value: PropTypes.any,
  isExpanded: PropTypes.bool,
  toggleGroupExpanded: PropTypes.func,
  children: PropTypes.node,
};

TableGroupCell.defaultProps = {
  style: null,
  colSpan: 1,
  row: {},
  column: {},
  value: '',
  isExpanded: false,
  toggleGroupExpanded: () => {},
  children: undefined,
};
