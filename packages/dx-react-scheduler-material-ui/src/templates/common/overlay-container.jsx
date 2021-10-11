import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import withStyles from '@mui/styles/withStyles';

const styles = {
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
};

export const OverlayContainerBase = React.forwardRef(({
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

OverlayContainerBase.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

OverlayContainerBase.defaultProps = {
  children: null,
  className: undefined,
};

export const OverlayContainer = withStyles(styles, { name: 'OverlayContainer' })(OverlayContainerBase);
