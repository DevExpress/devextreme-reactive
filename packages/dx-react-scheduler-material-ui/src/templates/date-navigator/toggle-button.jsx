import * as React from 'react';
import * as PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = {
  button: {
    textTransform: 'none',
  },
};

const ToggleButtonBase = ({
  text, classes, onToggle, className, ...restProps
}) => (
  <Button
    onClick={onToggle}
    className={classNames({
      [classes.button]: true,
    }, className)}
    {...restProps}
  >
    {text}
  </Button>
);

ToggleButtonBase.propTypes = {
  onToggle: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  text: PropTypes.string,
  className: PropTypes.string,
};

ToggleButtonBase.defaultProps = {
  text: '',
  className: undefined,
};

export const ToggleButton = withStyles(styles, { name: 'ToggleButton' })(ToggleButtonBase);
