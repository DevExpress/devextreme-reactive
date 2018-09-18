import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  content: {
    padding: theme.spacing.unit * 1.75,
    backgroundColor: theme.palette.background.paper,
  },
  text: {
    ...theme.typography.body1,
    display: 'inline-block',
  },
});

export const ContentBase = ({
  classes,
  className,
  children,
  appointment,
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
  appointment: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

ContentBase.defaultProps = {
  className: undefined,
  children: undefined,
};

export const Content = withStyles(styles, { name: 'Content' })(ContentBase);
