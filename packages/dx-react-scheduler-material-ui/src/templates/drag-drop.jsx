import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { VerticalAppointment } from './appointment/vertical-appointment';
import { Appointment } from './appointment/appointment';

const styles = theme => ({
  container: {
    position: 'fixed',
    zIndex: 1000,
    left: 0,
    top: 0,
    display: 'inline-block',
    height: '100%',
    width: '100%',
    cursor: 'move',
    transition: 'transform 0.05s',
  },
  column: {
    boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
    cursor: 'move',
  },
});

const ContainerBase = ({
  clientOffset, classes, style, className, children, left, top,
  ...restProps
}) => (
  <div
    className={classNames(classes.container, className)}
    style={{
      transform: `translate(calc(${left}px), calc(${top}px))`,
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
  left: PropTypes.number,
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
};

ContainerBase.defaultProps = {
  style: null,
  left: undefined,
  className: undefined,
  children: undefined,
};

export const Container = withStyles(styles, { name: 'DragDrop' })(ContainerBase);

// console.log(appointmentRef);
const ColumnBase = ({
  appointmentData,
  classes,
  className,
  rect,
  appointmentRef,
  ...restProps
}) => (
  <Appointment
    className={classes.column}
    style={rect}
  >
    <VerticalAppointment
          // className={classNames(classes.column, className)}
      data={appointmentData}
      {...restProps}
    />
  </Appointment>
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
