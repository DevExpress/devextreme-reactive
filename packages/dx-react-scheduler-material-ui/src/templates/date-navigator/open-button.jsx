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

const OpenButtonBase = ({
  text, classes, onVisibilityToggle, className, ...restProps
}) => (
  <Button
    onClick={onVisibilityToggle}
    className={classNames({
      [classes.button]: true,
    }, className)}
    {...restProps}
  >
    {text}
  </Button>
);

OpenButtonBase.propTypes = {
  onVisibilityToggle: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  text: PropTypes.string,
  className: PropTypes.string,
};

OpenButtonBase.defaultProps = {
  text: '',
  className: undefined,
};

export const OpenButton = withStyles(styles, { name: 'OpenButton' })(OpenButtonBase);
