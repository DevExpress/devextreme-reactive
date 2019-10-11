import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import Repeat from '@material-ui/icons/Repeat';
import { POSITION_START, POSITION_END } from '@devexpress/dx-scheduler-core';
import { withStyles } from '@material-ui/core/styles';
import { AppointmentContent } from '../appointment/appointment-content';
import { Appointment } from '../appointment/appointment';
import { SplitIndicator } from '../appointment/split-indicator';
import { setColor } from '../utils';

const draftStyles = theme => ({
  appointment: {
    boxShadow: theme.shadows[3],
    cursor: 'move',
    overflow: 'hidden',
    backgroundColor: setColor(600, theme.palette.primary),
    border: 0,
  },
});

const sourceStyles = {
  appointment: {
    opacity: 0.5,
  },
};

const DraftAppointmentBase = ({
  classes, className, data, formatDate,
  type, fromPrev, toNext, ...restProps
}) => (
  <Appointment
    className={classNames(classes.appointment, className)}
    type={type}
    {...restProps}
  >
    {fromPrev && <SplitIndicator position={POSITION_START} appointmentType={type} />}
    <AppointmentContent
      data={data}
      type={type}
      recurringIconComponent={Repeat}
      formatDate={formatDate}
    />
    {toNext && <SplitIndicator position={POSITION_END} appointmentType={type} />}
  </Appointment>
);

DraftAppointmentBase.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  fromPrev: PropTypes.bool.isRequired,
  toNext: PropTypes.bool.isRequired,
  formatDate: PropTypes.func.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
};

DraftAppointmentBase.defaultProps = {
  className: undefined,
  type: undefined,
};

export const DraftAppointment = withStyles(draftStyles, { name: 'DraftAppointment' })(DraftAppointmentBase);
export const SourceAppointment = withStyles(sourceStyles, { name: 'SourceAppointment' })(DraftAppointmentBase);
