import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { POSITION_START, POSITION_END } from '@devexpress/dx-scheduler-core';
import { withStyles } from '@material-ui/core/styles';
import { AppointmentContent } from '../appointment/appointment-content';
import { Appointment } from '../appointment/appointment';
import { SplitIndicator } from '../appointment/split-indicator';

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
  classes, className, data,
  type, leftSlice, rightSlice, ...restProps
}) => (
  <Appointment
    className={classNames(classes.appointment, className)}
    type={type}
    {...restProps}
  >
    {leftSlice && <SplitIndicator position={POSITION_START} appointmentType={type} />}
    <AppointmentContent
      data={data}
      type={type}
    />
    {rightSlice && <SplitIndicator position={POSITION_END} appointmentType={type} />}
  </Appointment>
);

DraftAppointmentBase.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  leftSlice: PropTypes.bool.isRequired,
  rightSlice: PropTypes.bool.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
};

DraftAppointmentBase.defaultProps = {
  className: undefined,
  type: undefined,
};

export const DraftAppointment = withStyles(draftStyles, { name: 'DraftAppointment' })(DraftAppointmentBase);
export const SourceAppointment = withStyles(sourceStyles, { name: 'SourceAppointment' })(DraftAppointmentBase);
