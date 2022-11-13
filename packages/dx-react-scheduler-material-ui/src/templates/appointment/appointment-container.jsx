import * as React from 'react';
import PropTypes from 'prop-types';

export const AppointmentContainer = ({ style, children, ...restProps }) => (
  <div
    style={style}
    {...restProps}
  >
    {children}
  </div>
);

AppointmentContainer.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object.isRequired,
};
