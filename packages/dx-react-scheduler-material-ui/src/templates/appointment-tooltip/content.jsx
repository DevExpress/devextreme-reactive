import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  content: {
    padding: theme.spacing(3, 1),
    backgroundColor: theme.palette.background.paper,
  },
  text: {
    ...theme.typography.body2,
    display: 'inline-block',
  },
});

export const ContentBase = ({
  classes,
  className,
  children,
  appointmentData,
  ...restProps
}) => (
  <div
    className={classNames(classes.content, className)}
    {...restProps}
  >
    {children}
  </div>
);

ContentBase.propTypes = {
  classes: PropTypes.object.isRequired,
  appointmentData: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string,
};

ContentBase.defaultProps = {
  appointmentData: undefined,
  className: undefined,
  children: undefined,
};

export const Content = withStyles(styles, { name: 'Content' })(ContentBase);
