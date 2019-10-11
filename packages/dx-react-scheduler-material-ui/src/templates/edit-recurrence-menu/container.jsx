import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
};

export const ContainerBase = React.forwardRef(({
  children, classes, className, ...restProps
}, ref) => (
  <div
    ref={ref}
    className={classNames(classes.container, className)}
    {...restProps}
  >
    {children}
  </div>
));

ContainerBase.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

ContainerBase.defaultProps = {
  children: null,
  className: undefined,
};

export const Container = withStyles(styles, { name: 'Container' })(ContainerBase);
