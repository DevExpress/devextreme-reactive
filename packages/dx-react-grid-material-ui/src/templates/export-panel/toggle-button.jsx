import * as React from 'react';
import * as PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Save from '@material-ui/icons/Save';

export const ToggleButton = ({
  onToggle, getMessage, buttonRef,
  ...restProps
}) => (
  <Tooltip
    title={getMessage('showExportMenu')}
    placement="bottom"
    enterDelay={300}
  >
    <IconButton
      onClick={onToggle}
      ref={buttonRef}
      {...restProps}
    >
      <Save />
    </IconButton>
  </Tooltip>
);

ToggleButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  buttonRef: PropTypes.func.isRequired,
};
