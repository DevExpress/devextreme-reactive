import * as React from 'react';
import * as PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  text: {
    color: theme.palette.background.default,
  },
});

export const DeleteButtonBase = ({
  classes,
  ...restProps
}) => (
  <IconButton aria-label="Delete" className={classes.text} {...restProps}>
    <DeleteIcon />
  </IconButton>
);

DeleteButtonBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const DeleteButton = withStyles(styles, { name: 'DeleteButton' })(DeleteButtonBase);
