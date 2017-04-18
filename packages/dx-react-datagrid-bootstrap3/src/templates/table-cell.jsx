import React from 'react';

export const TableCell = ({ style, row, column }) => (
  <td style={style}>{row[column.name]}</td>
);

TableCell.propTypes = {
  row: React.PropTypes.object.isRequired,
  column: React.PropTypes.object.isRequired,
};
