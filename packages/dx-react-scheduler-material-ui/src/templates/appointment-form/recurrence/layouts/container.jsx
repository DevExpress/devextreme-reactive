import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';

const styles = ({ spacing }) => ({
  grid: {
    marginTop: spacing(1.75),
  },
});

const ContainerBase = ({
  classes,
  className,
  children,
  ...restProps
}) => (
  <Grid
    container
    direction="row"
    justify="flex-start"
    alignItems="center"
    className={classNames(classes.grid, className)}
    {...restProps}
  >
    {children}
  </Grid>
);

ContainerBase.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

ContainerBase.defaultProps = {
  className: undefined,
};

export const Container = withStyles(styles)(ContainerBase, { name: 'Container' });
