import * as React from 'react';
import * as PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
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
    <IconButton onClick={onToggle} buttonRef={buttonRef} {...restProps} size="large">
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
