import React from 'react';
import PropTypes from 'prop-types';

export const TableHeaderStubCell = ({ style }) => (
  <th
    style={{
      padding: 0,
      ...style,
    }}
  />
);

TableHeaderStubCell.propTypes = {
  style: PropTypes.object,
};

TableHeaderStubCell.defaultProps = {
  style: null,
};
