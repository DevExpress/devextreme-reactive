import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from 'material-ui';
import { VisibilityOff } from 'material-ui-icons';

export const ToggleButton = ({
  onToggle,
  getMessage,
  buttonRef,
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
};
