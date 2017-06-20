import React from 'react';
import PropTypes from 'prop-types';

export const TableEmptyCell = ({ style }) => (
  <td style={style} />
);

TableEmptyCell.propTypes = {
  style: PropTypes.shape(),
};

TableEmptyCell.defaultProps = {
  style: null,
};
