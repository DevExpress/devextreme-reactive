import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = {
  root: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
};

const ContainerBase = ({
  className,
  classes,
  container,
  ...restProps
}) => (
  <div className={classNames(classes.root, className)} {...restProps}>
    <div
      className={classes.container}
      ref={container}
    />
  </div>
);

ContainerBase.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  container: PropTypes.object.isRequired,
};

ContainerBase.defaultProps = {
  className: undefined,
};

export const Container = withStyles(styles)(ContainerBase, { name: 'Container' });
