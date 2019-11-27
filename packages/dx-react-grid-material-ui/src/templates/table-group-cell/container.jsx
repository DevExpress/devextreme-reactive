import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { getStickyCellStyle } from '../utils';

const styles = theme => ({
  wrapper: {
    ...getStickyCellStyle(theme),
    display: 'inline-block',
  },
});

const ContainerBase = ({
  children, style, classes, className, side, position, ...restProps
}) => (
  <div
    className={classNames(classes.wrapper, className)}
    style={{ ...style, [side]: position }}
    {...restProps}
  >
    {children}
  </div>
);

ContainerBase.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  side: PropTypes.string,
  position: PropTypes.string,
};

ContainerBase.defaultProps = {
  children: undefined,
  className: undefined,
  style: null,
  side: 'left',
  position: '',
};

export const Container = withStyles(styles)(ContainerBase);
