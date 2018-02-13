import * as React from 'react';
import * as PropTypes from 'prop-types';

export const SortingIndicator = ({ direction, style }) => (
  <span
    className={`sorting-indicator oi oi-arrow-thick-${direction === 'desc' ? 'bottom' : 'top'}`}
    style={style}
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
