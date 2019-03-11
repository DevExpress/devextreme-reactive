import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  container: {
    position: 'relative',
  },
});

const ContainerBase = ({
  children, classes, className, ...restProps
}) => (
  <div className={classNames(classes.container, className)} {...restProps}>
    {children}
  </div>
);

ContainerBase.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ContainerBase.defaultProps = {
  className: undefined,
};

export const Container = withStyles(styles, { name: 'TitleCell' })(ContainerBase);
