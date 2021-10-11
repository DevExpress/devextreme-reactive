import * as React from 'react';
import * as PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import IconButton from '@mui/material/IconButton';
import classNames from 'clsx';
import DeleteIcon from '@mui/icons-material/Delete';

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
    size="large">
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
