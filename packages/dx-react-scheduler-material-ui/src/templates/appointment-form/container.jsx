import * as React from 'react';
import * as PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: theme.spacing(50),
    padding: `${theme.spacing(1)}px ${theme.spacing(1)}px`,
    margin: '0 auto',
    transform: 'translateY(20%)',
    msTransform: 'translateY(20%)',
  },
});

const ContainerBase = ({
  children, classes, className, ...restProps
}) => (
  <Paper
    className={classNames(classes.root, className)}
    {...restProps}
  >
    {children}
  </Paper>
);

ContainerBase.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

ContainerBase.defaultProps = {
  className: undefined,
};

export const Container = withStyles(styles)(ContainerBase, { name: 'Container' });
