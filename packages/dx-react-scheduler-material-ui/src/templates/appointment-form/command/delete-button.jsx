import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = () => ({
  button: {
    marginRight: 'auto',
  },
});

const DeleteButtonBase = ({
  classes, className, onExecute, ...restProps
}) => (
  <IconButton
    className={classNames(classes.button, className)}
    onClick={onExecute}
    {...restProps}
  >
    <DeleteIcon />
  </IconButton>
);

DeleteButtonBase.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  onExecute: PropTypes.func.isRequired,
};

DeleteButtonBase.defaultProps = {
  className: undefined,
};

export const DeleteButton = withStyles(styles)(DeleteButtonBase, { name: 'DeleteButton' });