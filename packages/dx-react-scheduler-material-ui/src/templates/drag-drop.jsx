import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { VerticalAppointment } from './appointment/vertical-appointment';
import { Appointment } from './appointment/appointment';

const styles = theme => ({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    cursor: 'move',
  },
  column: {
    boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
    cursor: 'move',
    overflow: 'hidden',
    backgroundColor: theme.palette.primary[600],
  },
  draggingAppointment: {
    opacity: 0.5,
  },
});

const ContainerBase = ({
  classes, className, children,
  ...restProps
}) => (
  <div
    className={classNames(classes.container, 'CONTAINER')}
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

export const Container = withStyles(styles, { name: 'Container' })(ContainerBase);

const DraftAppointmentBase = ({
  classes,
  className,
  style,
  data,
  ...restProps
}) => (
  <Appointment
    className={classes.column}
    style={style}
  >
    <VerticalAppointment
      data={data}
      {...restProps}
    />
  </Appointment>
);

DraftAppointmentBase.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  data: PropTypes.object,
};

DraftAppointmentBase.defaultProps = {
  style: {},
  className: undefined,
  children: undefined,
  data: {},
};

export const DraftAppointment = withStyles(styles, { name: 'DraftAppointment' })(DraftAppointmentBase);

const DraggingAppointmentBase = ({
  classes,
  className,
  style,
  data,
  ...restProps
}) => (
  <Appointment
    className={classes.draggingAppointment}
    style={style}
  >
    <VerticalAppointment
      data={data}
      {...restProps}
    />
  </Appointment>
);

DraggingAppointmentBase.propTypes = {
  style: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
};

DraggingAppointmentBase.defaultProps = {
  className: undefined,
};

export const DraggingAppointment = withStyles(styles, { name: 'DraggingAppointment' })(DraggingAppointmentBase);
