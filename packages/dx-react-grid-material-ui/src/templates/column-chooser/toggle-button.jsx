import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from 'material-ui';
import { VisibilityOff } from 'material-ui-icons';

export const ToggleButton = ({ onToggle, getRef, ...restProps }) => (
  <Tooltip
    title="Hidden columns" //TODO add custom messages
    placement="bottom-end"
    enterDelay={300}
    {...restProps}
  >
    <IconButton
      onClick={onToggle}
      ref={getRef}
    >
      <VisibilityOff />
    </IconButton>
  </Tooltip>
);

ToggleButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
  getRef: PropTypes.func.isRequired,
};
