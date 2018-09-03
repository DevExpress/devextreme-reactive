import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    color: theme.palette.background.default,
  },
});

const getIcon = (id) => {
  if (id === 'open') {
    return <EditIcon />;
  } if (id === 'close') {
    return <CloseIcon />;
  } if (id === 'delete') {
    return <DeleteIcon />;
  } return null;
};

export const CommandButtonBase = ({
  classes,
  className,
  id,
  handler,
  onClick,
  ...restProps
}) => (
  <IconButton
    className={classNames(classes.button, className)}
    onClick={() => { handler(); onClick(); }}
    {...restProps}
  >
    {getIcon(id)}
  </IconButton>
);

CommandButtonBase.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
  handler: PropTypes.func,
  onClick: PropTypes.func,
};

CommandButtonBase.defaultProps = {
  className: undefined,
  id: '',
  handler: () => undefined,
  onClick: () => undefined,
};

export const CommandButton = withStyles(styles, { name: 'CommandButton' })(CommandButtonBase);
