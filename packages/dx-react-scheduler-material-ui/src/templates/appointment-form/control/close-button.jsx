import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';
import CloseIcon from '@material-ui/icons/Close';

const styles = ({ spacing }) => ({
  button: {
    height: spacing(3.5),
    padding: spacing(0.5),
  },
});

const CloseButtonBase = ({
  classes, className, onExecute, ...restProps
}) => (
  <IconButton
    className={classNames(classes.button, className)}
    onClick={onExecute}
    {...restProps}
  >
    <CloseIcon />
  </IconButton>
);

CloseButtonBase.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  onExecute: PropTypes.func.isRequired,
};

CloseButtonBase.defaultProps = {
  className: undefined,
};

export const CloseButton = withStyles(styles)(CloseButtonBase, { name: 'CloseButton' });
