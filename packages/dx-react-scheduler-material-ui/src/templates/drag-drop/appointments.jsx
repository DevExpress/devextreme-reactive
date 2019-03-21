import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { AppointmentContent } from '../appointment/appointment-content';
import { Appointment } from '../appointment/appointment';

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
  data, type, ...restProps
}) => (
  <Appointment
    className={classNames(classes.appointment, className)}
    style={style}
    resizable
    {...restProps}
  >
    {console.log(restProps.leftSlice)}
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

export const DraftAppointment = withStyles(draftStyles, { name: 'DraftAppointment' })(DraftAppointmentBase);
export const SourceAppointment = withStyles(sourceStyles, { name: 'SourceAppointment' })(DraftAppointmentBase);
