import React from 'react';
import PropTypes from 'prop-types';

export const TableGroupCell = ({
  style, colSpan, row, column, isExpanded, toggleGroupExpanded,
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
    <strong>{column.title || column.name}: {row.value}</strong>
  </td>
);

TableGroupCell.propTypes = {
  style: PropTypes.shape(),
  colSpan: PropTypes.number,
  row: PropTypes.shape(),
  column: PropTypes.shape(),
  isExpanded: PropTypes.bool,
  toggleGroupExpanded: PropTypes.func,
};

TableGroupCell.defaultProps = {
  style: null,
  colSpan: 1,
  row: {},
  column: {},
  isExpanded: false,
  toggleGroupExpanded: () => {},
};
