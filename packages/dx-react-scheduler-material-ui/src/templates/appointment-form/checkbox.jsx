import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import CheckboxMUI from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    width: '100%',
    display: 'flex',
  },
  text: {
    paddingTop: theme.spacing.unit * 1.5,
  },
});

export const CheckboxBase = ({
  text,
  checked,
  readOnly,
  classes,
  className,
  ...restProps
}) => (
  <div className={classNames(classes.container, className)} {...restProps}>
    <CheckboxMUI
      color="primary"
      disabled={readOnly}
      checked={checked}
    />
    <Typography
      className={classes.text}
      variant="subheading"
    >
      {text}
    </Typography>
  </div>
);

CheckboxBase.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string,
  readOnly: PropTypes.bool,
  className: PropTypes.string,
  checked: PropTypes.bool,
};

CheckboxBase.defaultProps = {
  text: undefined,
  className: undefined,
  readOnly: false,
  checked: false,
};

export const Checkbox = withStyles(styles)(CheckboxBase);
