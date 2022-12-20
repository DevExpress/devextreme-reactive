import * as React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const ToggleButton = ({
  onToggle, getMessage,
  buttonRef, active,
  ...restProps
}) => (
  <Tooltip
    title={getMessage('showColumnChooser')}
    placement="bottom"
    enterDelay={300}
  >
    <IconButton
      onClick={onToggle}
      ref={buttonRef}
      {...restProps}
      size="large"
    >
      <VisibilityOff />
    </IconButton>
  </Tooltip>
);

ToggleButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  buttonRef: PropTypes.func.isRequired,
  active: PropTypes.bool,
};

ToggleButton.defaultProps = {
  active: false,
};
