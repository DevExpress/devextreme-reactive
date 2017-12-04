import React from 'react';
import PropTypes from 'prop-types';

export const TableDetailCell = ({ colSpan, style, children }) =>
  <td style={style} colSpan={colSpan} className="active">{children}</td>;

TableDetailCell.propTypes = {
  style: PropTypes.object,
  colSpan: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

TableDetailCell.defaultProps = {
  style: null,
  colSpan: 1,
  children: undefined,
};
