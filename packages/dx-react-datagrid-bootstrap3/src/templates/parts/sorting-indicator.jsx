import React from 'react';
import PropTypes from 'prop-types';

export const SortingIndicator = ({ direction, style }) => (
  <i
    className={`glyphicon glyphicon-arrow-${direction === 'desc' ? 'down' : 'up'}`}
    style={{
      top: '0',
      fontSize: '9px',
      ...style,
    }}
  />
);

SortingIndicator.propTypes = {
  direction: PropTypes.oneOf(['asc', 'desc']),
  style: PropTypes.shape(),
};

SortingIndicator.defaultProps = {
  direction: null,
  style: null,
};
