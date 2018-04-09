import * as React from 'react';
import * as PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export const ToggleButton = ({
  onToggle, getMessage,
  buttonRef, active,
  ...restProps
}) => (
  <Tooltip
    title={getMessage('showColumnChooser')}
    placement="bottom"
    enterDelay={300}
    {...restProps}
  >
    <IconButton
      onClick={onToggle}
      buttonRef={buttonRef}
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
