import React from 'react';
import PropTypes from 'prop-types';

export const Stepper = ({ level }) => (
  <span
    style={{
      marginLeft: `${24 * level}px`,
    }}
  />
);

Stepper.propTypes = {
  level: PropTypes.number,
};

Stepper.defaultProps = {
  level: 0,
};
