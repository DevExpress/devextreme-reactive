import React from 'react';
import PropTypes from 'prop-types';

export const SortingIndicator = ({ direction, style }) => (
  <span
    className={`oi oi-arrow-thick-${direction === 'desc' ? 'bottom' : 'top'}`}
    style={{
      top: '0',
      fontSize: '11px',
      ...style,
    }}
  />
);

SortingIndicator.propTypes = {
  direction: PropTypes.oneOf(['asc', 'desc']),
  style: PropTypes.object,
};

SortingIndicator.defaultProps = {
  direction: null,
  style: null,
};
