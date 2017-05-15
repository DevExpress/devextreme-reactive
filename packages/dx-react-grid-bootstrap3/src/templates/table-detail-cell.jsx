import React from 'react';
import PropTypes from 'prop-types';

export const TableDetailCell = ({ colspan, style, template }) =>
  <td style={style} colSpan={colspan} className="active">{template()}</td>;

TableDetailCell.propTypes = {
  style: PropTypes.shape(),
  colspan: PropTypes.number,
  template: PropTypes.func.isRequired,
};

TableDetailCell.defaultProps = {
  style: null,
  colspan: 1,
};
