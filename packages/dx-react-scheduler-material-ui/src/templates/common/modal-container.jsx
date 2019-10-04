import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
};

export const ModalContainerBase = React.forwardRef(({
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

ModalContainerBase.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

ModalContainerBase.defaultProps = {
  children: null,
  className: undefined,
};

export const ModalContainer = withStyles(styles, { name: 'ModalContainer' })(ModalContainerBase);
