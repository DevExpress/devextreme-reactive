import React from 'react';
import PropTypes from 'prop-types';

export const TableStubHeaderCell = ({ style }) => (
  <th
    style={{
      padding: 0,
      ...style,
    }}
  />
);

TableStubHeaderCell.propTypes = {
  style: PropTypes.object,
};

TableStubHeaderCell.defaultProps = {
  style: null,
};
