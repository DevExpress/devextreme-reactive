import * as React from 'react';
import * as PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = theme => ({
  label: {
    fontWeight: theme.typography.fontWeightBold,
    width: '100%',
  },
});

const LabelBase = ({
  classes,
  label,
  className,
  ...restProps
}) => (
  <Typography
    className={classNames(classes.label, className)}
    {...restProps}
  >
    {label}
  </Typography>
);

LabelBase.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
};

LabelBase.defaultProps = {
  label: undefined,
  className: undefined,
};

export const Label = withStyles(styles)(LabelBase, { name: 'Label' });
