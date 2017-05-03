import React from 'react';
import PropTypes from 'prop-types';

export const TableGroupRowCell = ({ style, colspan, row, isExpanded, toggleGroupExpanded }) => (
  <td
    colSpan={colspan}
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
        top: '0',
        marginRight: '8px',
      }}
    />
    <strong>{row.column.title}: {row.value}</strong>
  </td>
);

TableGroupRowCell.propTypes = {
  style: PropTypes.shape(),
  colspan: PropTypes.number,
  row: PropTypes.shape(),
  isExpanded: PropTypes.bool,
  toggleGroupExpanded: PropTypes.func,
};

TableGroupRowCell.defaultProps = {
  style: null,
  colspan: 1,
  row: {},
  isExpanded: false,
  toggleGroupExpanded: () => {},
};
