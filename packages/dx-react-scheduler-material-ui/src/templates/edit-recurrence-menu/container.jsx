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

export const ContainerBase = ({
  children, target, classes, className, ...restProps
}) => (
  <div
    ref={target}
    className={classNames(classes.container, className)}
    {...restProps}
  >
    {children}
  </div>
);

ContainerBase.propTypes = {
  target: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

ContainerBase.defaultProps = {
  children: null,
  className: undefined,
};

export const Container = withStyles(styles, { name: 'Container' })(ContainerBase);
