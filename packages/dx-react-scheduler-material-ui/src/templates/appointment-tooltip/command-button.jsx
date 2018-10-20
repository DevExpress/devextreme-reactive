import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import { OPEN_COMMAND_BUTTON, CLOSE_COMMAND_BUTTON, DELETE_COMMAND_BUTTON } from '@devexpress/dx-scheduler-core';

const styles = theme => ({
  button: {
    color: theme.palette.background.default,
  },
});

const getIcon = (id) => {
  if (id === OPEN_COMMAND_BUTTON) {
    return <EditIcon />;
  } if (id === CLOSE_COMMAND_BUTTON) {
    return <CloseIcon />;
  } if (id === DELETE_COMMAND_BUTTON) {
    return <DeleteIcon />;
  } return null;
};

export const CommandButtonBase = ({
  classes,
  className,
  id,
  onExecute,
  ...restProps
}) => (
  <IconButton
    className={classNames(classes.button, className)}
    onClick={onExecute}
    {...restProps}
  >
    {getIcon(id)}
  </IconButton>
);

CommandButtonBase.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
  onExecute: PropTypes.func,
};

CommandButtonBase.defaultProps = {
  className: undefined,
  onExecute: () => undefined,
  id: '',
};

export const CommandButton = withStyles(styles, { name: 'CommandButton' })(CommandButtonBase);
