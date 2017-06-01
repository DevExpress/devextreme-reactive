import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from 'material-ui';

export const TableDetailCell = ({ colspan, style, template }) =>
  <TableCell style={style} colSpan={colspan}>{template()}</TableCell>;

TableDetailCell.propTypes = {
  style: PropTypes.shape(),
  colspan: PropTypes.number,
  template: PropTypes.func.isRequired,
};

TableDetailCell.defaultProps = {
  style: null,
  colspan: 1,
};
