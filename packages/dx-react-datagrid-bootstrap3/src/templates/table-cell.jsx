import React from 'react';

export const TableCell = ({ style, row, column }) => (
  <td style={style}>{row[column.name]}</td>
);

TableCell.propTypes = {
  style: React.PropTypes.shape(),
  row: React.PropTypes.shape(),
  column: React.PropTypes.shape(),
};

TableCell.defaultProps = {
  style: null,
  row: {},
  column: {},
};
