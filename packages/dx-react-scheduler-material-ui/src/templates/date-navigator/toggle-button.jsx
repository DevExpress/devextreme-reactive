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
  title, classes, onToggle, className, ...restProps
}) => (
  <Button
    onClick={onToggle}
    className={classNames({
      [classes.button]: true,
    }, className)}
    {...restProps}
  >
    {title}
  </Button>
);

ToggleButtonBase.propTypes = {
  onToggle: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
};

ToggleButtonBase.defaultProps = {
  title: '',
  className: undefined,
};

export const ToggleButton = withStyles(styles, { name: 'ToggleButton' })(ToggleButtonBase);
