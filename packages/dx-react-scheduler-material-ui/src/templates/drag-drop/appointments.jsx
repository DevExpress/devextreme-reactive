import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { AppointmentContent } from '../appointment/appointment-content';
import { Appointment } from '../appointment/appointment';
import { Slice } from '../appointment/slice';

const draftStyles = theme => ({
  appointment: {
    boxShadow: theme.shadows[3],
    cursor: 'move',
    overflow: 'hidden',
    backgroundColor: theme.palette.primary[600],
  },
});

const sourceStyles = {
  appointment: {
    opacity: 0.5,
  },
};

const DraftAppointmentBase = ({
  classes, className, style,
  data, type, leftSlice, rightSlice, ...restProps
}) => (
  <Appointment
    className={classNames(classes.appointment, className)}
    style={style}
    type={type}
    {...restProps}
  >
    {leftSlice && <Slice position="top" appointmentType={type} />}
    <AppointmentContent
      data={data}
      type={type}
    />
    {rightSlice && <Slice position="bottom" appointmentType={type} />}
  </Appointment>
);

DraftAppointmentBase.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  leftSlice: PropTypes.bool.isRequired,
  rightSlice: PropTypes.bool.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  type: PropTypes.string,
};

DraftAppointmentBase.defaultProps = {
  style: undefined,
  className: undefined,
  type: undefined,
};

export const DraftAppointment = withStyles(draftStyles, { name: 'DraftAppointment' })(DraftAppointmentBase);
export const SourceAppointment = withStyles(sourceStyles, { name: 'SourceAppointment' })(DraftAppointmentBase);
