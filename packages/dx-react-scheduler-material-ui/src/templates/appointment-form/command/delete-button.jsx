import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'clsx';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = ({ spacing }) => ({
  button: {
    marginRight: spacing(0.5),
  },
});

const DeleteButtonBase = React.memo(({
  onExecute, className, classes, ...restProps
}) => (
  <IconButton
    className={classNames(classes.button, className)}
    onClick={onExecute}
    {...restProps}
  >
    <DeleteIcon />
  </IconButton>
));

DeleteButtonBase.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  onExecute: PropTypes.func.isRequired,
};

DeleteButtonBase.defaultProps = {
  className: undefined,
};

export const DeleteButton = withStyles(styles)(DeleteButtonBase, { name: 'DeleteButton' });
