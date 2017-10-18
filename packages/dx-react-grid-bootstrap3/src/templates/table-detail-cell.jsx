import React from 'react';
import PropTypes from 'prop-types';

export const TableDetailCell = ({ colSpan, style, template }) =>
  <td style={style} colSpan={colSpan} className="active">{template()}</td>;

TableDetailCell.propTypes = {
  style: PropTypes.object,
  colSpan: PropTypes.number,
  template: PropTypes.func.isRequired,
};

TableDetailCell.defaultProps = {
  style: null,
  colSpan: 1,
};
