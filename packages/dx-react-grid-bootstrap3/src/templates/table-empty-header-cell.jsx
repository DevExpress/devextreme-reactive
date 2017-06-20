import React from 'react';
import PropTypes from 'prop-types';

export const TableEmptyHeaderCell = ({ style }) => (
  <th style={style} />
);

TableEmptyHeaderCell.propTypes = {
  style: PropTypes.shape(),
};

TableEmptyHeaderCell.defaultProps = {
  style: null,
};
