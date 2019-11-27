import * as React from 'react';
import * as PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import { OPEN_COMMAND_BUTTON, CLOSE_COMMAND_BUTTON, DELETE_COMMAND_BUTTON } from '@devexpress/dx-scheduler-core';

const getIcon = (id) => {
  if (id === OPEN_COMMAND_BUTTON) {
    return <EditIcon />;
  } if (id === CLOSE_COMMAND_BUTTON) {
    return <CloseIcon />;
  } if (id === DELETE_COMMAND_BUTTON) {
    return <DeleteIcon />;
  } return null;
};

export const CommandButton = ({
  id, onExecute, ...restProps
}) => (
  <IconButton
    onClick={onExecute}
    {...restProps}
  >
    {getIcon(id)}
  </IconButton>
);

CommandButton.propTypes = {
  id: PropTypes.string,
  onExecute: PropTypes.func,
};

CommandButton.defaultProps = {
  onExecute: () => undefined,
  id: '',
};
