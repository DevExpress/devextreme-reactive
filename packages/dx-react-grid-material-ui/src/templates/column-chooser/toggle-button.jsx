import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from 'material-ui';
import { VisibilityOff } from 'material-ui-icons';

export const ToggleButton = ({
  onToggle,
  getMessage,
  getOverlayTarget,
  ...restProps
}) => (
  <Tooltip
    title={getMessage('hiddenColumns')}
    placement="bottom-end"
    enterDelay={300}
    {...restProps}
  >
    <IconButton
      onClick={onToggle}
      ref={getOverlayTarget}
    >
      <VisibilityOff />
    </IconButton>
  </Tooltip>
);

ToggleButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  getOverlayTarget: PropTypes.func.isRequired,
};
