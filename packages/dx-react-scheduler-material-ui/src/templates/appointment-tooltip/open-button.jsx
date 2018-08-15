import * as React from 'react';
import * as PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  text: {
    color: theme.palette.background.default,
  },
});

export const OpenButtonBase = ({
  classes,
  ...restProps
}) => (
  <IconButton variant="fab" aria-label="Edit" className={classes.text} {...restProps}>
    <EditIcon />
  </IconButton>
);

OpenButtonBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const OpenButton = withStyles(styles, { name: 'OpenButton' })(OpenButtonBase);
