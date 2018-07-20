import * as React from 'react';
import * as PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DateRange from '@material-ui/icons/DateRange';

export const ToggleButton = ({
  onToggle,
  buttonRef, active,
  ...restProps
}) => (
  <IconButton
    onClick={onToggle}
    buttonRef={buttonRef}
    {...restProps}
  >
    <DateRange />
  </IconButton>
);

ToggleButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
  buttonRef: PropTypes.func.isRequired,
  active: PropTypes.bool,
};

ToggleButton.defaultProps = {
  active: false,
};
