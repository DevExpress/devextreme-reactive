import React from 'react';
import PropTypes from 'prop-types';

export const TableStubHeaderCell = ({ style }) => (
  <th style={style} />
);

TableStubHeaderCell.propTypes = {
  style: PropTypes.shape(),
};

TableStubHeaderCell.defaultProps = {
  style: null,
};
