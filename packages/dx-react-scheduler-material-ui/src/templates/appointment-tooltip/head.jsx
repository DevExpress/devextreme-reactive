import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
  },
});

const HeadBase = ({
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

HeadBase.propTypes = {
  classes: PropTypes.object.isRequired,
  appointmentData: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string,
};

HeadBase.defaultProps = {
  appointmentData: undefined,
  className: undefined,
  children: undefined,
};

export const Head = withStyles(styles, { name: 'Head' })(HeadBase);
