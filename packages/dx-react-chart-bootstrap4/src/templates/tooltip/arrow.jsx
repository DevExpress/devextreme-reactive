import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Arrow = ({ arrowProps }) => (
  <div className="arrow" {...arrowProps} />
);

Arrow.propTypes = {
  arrowProps: PropTypes.any.isRequired,
};
