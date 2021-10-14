import * as React from 'react';
import * as PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import IconButton from '@mui/material/IconButton';
import classNames from 'clsx';
import CloseIcon from '@mui/icons-material/Close';

const styles = () => ({
  button: {
    marginRight: 'auto',
  },
});

const CancelButtonBase = React.memo(({
  onExecute, className, classes, ...restProps
}) => (
  <IconButton
    className={classNames(classes.button, className)}
    onClick={onExecute}
    {...restProps}
    size="large"
  >
    <CloseIcon />
  </IconButton>
));

CancelButtonBase.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  onExecute: PropTypes.func.isRequired,
};

CancelButtonBase.defaultProps = {
  className: undefined,
};

export const CancelButton = withStyles(styles)(CancelButtonBase, { name: 'CancelButton' });
