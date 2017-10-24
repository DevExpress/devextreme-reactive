import React from 'react';
import PropTypes from 'prop-types';

export const TableStubCell = ({ style }) => (
  <td
    style={{
      padding: 0,
      ...style,
    }}
  />
);

TableStubCell.propTypes = {
  style: PropTypes.object,
};

TableStubCell.defaultProps = {
  style: null,
};
