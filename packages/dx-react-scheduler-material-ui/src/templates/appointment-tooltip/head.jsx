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
  appointment,
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
  appointment: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

HeadBase.defaultProps = {
  className: undefined,
  children: undefined,
};

export const Head = withStyles(styles, { name: 'Head' })(HeadBase);
