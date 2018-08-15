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
  onHide,
  ...restProps
}) => (
  <IconButton aria-label="Close" className={classes.text} onClick={onHide} {...restProps}>
    <CloseIcon />
  </IconButton>
);

CloseButtonBase.propTypes = {
  classes: PropTypes.object.isRequired,
  onHide: PropTypes.func,
};

CloseButtonBase.defaultProps = {
  onHide: () => undefined,
};

export const CloseButton = withStyles(styles, { name: 'CloseButton' })(CloseButtonBase);
