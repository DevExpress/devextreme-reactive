import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const containerStyles = () => ({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    cursor: 'move',
  },
});

const ContainerBase = ({
  classes, className, children,
  ...restProps
}) => (
  <div
    className={classNames(classes.container, className)}
    {...restProps}
  >
    {children}
  </div>
);

ContainerBase.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

ContainerBase.defaultProps = {
  className: undefined,
  children: undefined,
};

export const Container = withStyles(containerStyles, { name: 'Container' })(ContainerBase);
