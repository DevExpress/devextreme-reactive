import * as React from 'react';
import * as PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  text: {
    color: theme.palette.background.default,
  },
});

export const CloseButtonBase = ({
  classes,
  ...restProps
}) => (
  <IconButton aria-label="Close" className={classes.text} {...restProps}>
    <CloseIcon />
  </IconButton>
);

CloseButtonBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const CloseButton = withStyles(styles, { name: 'CloseButton' })(CloseButtonBase);
