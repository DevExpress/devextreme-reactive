import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { getStickyCellStyle } from '../utils';

const styles = theme => ({
  wrapper: {
    ...getStickyCellStyle(theme),
    display: 'inline-block',
  },
});

const ContainerBase = ({ children, style, classes, className, ...restProps }) => (
  <div
    className={classNames(classes.wrapper, className)}
    style={style}
    {...restProps}
  >
    {children}
  </div>
);

ContainerBase.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

ContainerBase.defaultProps = {
  children: undefined,
  style: null,
};

export const Container = withStyles(styles)(ContainerBase);
