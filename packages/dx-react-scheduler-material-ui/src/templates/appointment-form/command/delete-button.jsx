import * as React from 'react';
import * as PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export const DeleteButton = ({
  onExecute, ...restProps
}) => (
  <IconButton
    onClick={onExecute}
    {...restProps}
  >
    <DeleteIcon />
  </IconButton>
);

DeleteButton.propTypes = {
  onExecute: PropTypes.func.isRequired,
};
