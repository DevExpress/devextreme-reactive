import * as React from 'react';
import * as PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export const CancelButton = ({
  onExecute, ...restProps
}) => (
  <IconButton
    onClick={onExecute}
    {...restProps}
  >
    <CloseIcon />
  </IconButton>
);

CancelButton.propTypes = {
  onExecute: PropTypes.func.isRequired,
};
