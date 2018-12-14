import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import { OPEN_COMMAND_BUTTON, CLOSE_COMMAND_BUTTON, DELETE_COMMAND_BUTTON } from '@devexpress/dx-scheduler-core';

const styles = ({ spacing, palette }) => {
  const buttonSize = spacing.unit * 5;
  return {
    button: {
      color: palette.background.default,
    },
    floatButton: {
      position: 'absolute',
      width: buttonSize,
      height: buttonSize,
      bottom: -buttonSize / 2,
      left: spacing.unit,
    },
  };
};

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
  classes, className, id, onExecute,
  ...restProps
}) => {
  const isOpenCommandButton = id === OPEN_COMMAND_BUTTON;
  const buttonClass = classes[!isOpenCommandButton ? 'button' : 'floatButton'];
  const commonProps = {
    onClick: onExecute,
    className: classNames(buttonClass, className),
    ...restProps,
  };
  return (
    !isOpenCommandButton
      ? <IconButton {...commonProps}>{getIcon(id)}</IconButton>
      : <Fab color="primary" {...commonProps}>{getIcon(id)}</Fab>
  );
};

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
