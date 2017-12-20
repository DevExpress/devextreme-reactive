import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from 'material-ui';
import { VisibilityOff } from 'material-ui-icons';

export const ToggleButton = ({
  onClick, getRef,
  getMessage, ...restProps
}) => (
  <Tooltip
    title={getMessage('hiddenColumns')}
    placement="bottom-end"
    enterDelay={300}
    {...restProps}
  >
    <IconButton
      onClick={onClick}
      ref={getRef}
    >
      <VisibilityOff />
    </IconButton>
  </Tooltip>
);

ToggleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  getRef: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
};
