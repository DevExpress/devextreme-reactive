import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from 'material-ui';
import { VisibilityOff } from 'material-ui-icons';

export const ToggleButton = ({
  onToggle,
  getMessage,
  refHandler,
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
      ref={refHandler}
    >
      <VisibilityOff />
    </IconButton>
  </Tooltip>
);

ToggleButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  refHandler: PropTypes.func.isRequired,
};
