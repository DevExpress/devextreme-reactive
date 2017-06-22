import React from 'react';
import PropTypes from 'prop-types';

export const TableStubCell = ({ style }) => (
  <td style={style} />
);

TableStubCell.propTypes = {
  style: PropTypes.shape(),
};

TableStubCell.defaultProps = {
  style: null,
};
