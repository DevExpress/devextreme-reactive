import * as React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@mui/material';
import Save from '@mui/icons-material/Save';

export const ToggleButton = ({
  onToggle, getMessage, buttonRef,
  ...restProps
}) => (
  <Tooltip
    title={getMessage('showExportMenu')}
    placement="bottom"
    enterDelay={300}
  >
    <IconButton onClick={onToggle} ref={buttonRef} {...restProps} size="large">
      <Save />
    </IconButton>
  </Tooltip>
);

ToggleButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  buttonRef: PropTypes.func.isRequired,
};
