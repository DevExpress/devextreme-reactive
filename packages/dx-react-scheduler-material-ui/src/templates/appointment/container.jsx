import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  container: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
  },
};

export const ContainerBase = ({
  classes,
  className,
  children,
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
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

ContainerBase.defaultProps = {
  className: undefined,
  children: null,
};

export const Container = withStyles(styles, { name: 'Container' })(ContainerBase);
