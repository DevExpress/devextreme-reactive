import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Chip from 'material-ui/Chip';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  container: {
    position: 'fixed',
    zIndex: 1000,
    left: 0,
    top: 0,
    display: 'inline-block',
  },
  column: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    float: 'right',
    cursor: 'move',
  },
});

const ContainerBase = ({
  clientOffset, classes, style, className, children,
  ...restProps
}) => (
  <div
    className={classNames(classes.container, className)}
    style={{
      transform: `translate(calc(${clientOffset.x}px - 50%), calc(${clientOffset.y}px - 50%))`,
      ...style,
    }}
    {...restProps}
  >
    {children}
  </div>
);

ContainerBase.propTypes = {
  clientOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
};

ContainerBase.defaultProps = {
  style: null,
  className: undefined,
  children: undefined,
};

export const Container = withStyles(styles, { name: 'DragDrop' })(ContainerBase);

const ColumnBase = ({
  column,
  classes,
  className,
  ...restProps
}) => (
  <Chip
    className={classNames(classes.column, className)}
    label={column.title}
    {...restProps}
  />
);

ColumnBase.propTypes = {
  column: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

ColumnBase.defaultProps = {
  className: undefined,
};

export const Column = withStyles(styles, { name: 'DragDrop' })(ColumnBase);
