import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
});

const HeaderBase = ({
  appointmentData,
  classes,
  className,
  children,
  ...restProps
}) => (
  <div
    className={classNames(classes.head, className)}
    {...restProps}
  >
    {children}
  </div>
);

HeaderBase.propTypes = {
  classes: PropTypes.object.isRequired,
  appointmentData: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string,
};

HeaderBase.defaultProps = {
  appointmentData: undefined,
  className: undefined,
  children: undefined,
};

export const Header = withStyles(styles, { name: 'Header' })(HeaderBase);
