import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { AppointmentContent } from './appointment/appointment-content';
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
  draft: {
    boxShadow: theme.shadows[3],
    cursor: 'move',
    overflow: 'hidden',
    backgroundColor: theme.palette.primary[600],
  },
  source: {
    opacity: 0.5,
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

export const Container = withStyles(styles, { name: 'Container' })(ContainerBase);

const DraftAppointmentBase = ({
  classes, className, style,
  data, type, ...restProps
}) => (
  <Appointment
    className={classNames(classes.draft, className)}
    style={style}
    {...restProps}
  >
    <AppointmentContent
      data={data}
      type={type}
    />
  </Appointment>
);

DraftAppointmentBase.propTypes = {
  classes: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
};

DraftAppointmentBase.defaultProps = {
  className: undefined,
  type: undefined,
};

export const DraftAppointment = withStyles(styles, { name: 'DraftAppointment' })(DraftAppointmentBase);

const SourceAppointmentBase = ({
  classes, className, style,
  data, type, ...restProps
}) => (
  <Appointment
    className={classNames(classes.source, className)}
    style={style}
    {...restProps}
  >
    <AppointmentContent
      data={data}
      type={type}
    />
  </Appointment>
);

SourceAppointmentBase.propTypes = {
  style: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
};

SourceAppointmentBase.defaultProps = {
  className: undefined,
  type: undefined,
};

export const SourceAppointment = withStyles(styles, { name: 'SourceAppointment' })(SourceAppointmentBase);
