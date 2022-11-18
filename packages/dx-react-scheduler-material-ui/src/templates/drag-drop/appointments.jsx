import * as React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import Repeat from '@mui/icons-material/Repeat';
import { POSITION_START, POSITION_END } from '@devexpress/dx-scheduler-core';
import { AppointmentContent } from '../appointment/appointment-content';
import { Appointment } from '../appointment/appointment';
import { SplitIndicator } from '../appointment/split-indicator';
import { getAppointmentColor, getResourceColor } from '../utils';

const PREFIX = 'DraftAppointment';

export const classes = {
  appointment: `${PREFIX}-appointment`,
  shadedAppointment: `${PREFIX}-shadedAppointment`,
};

export const AppointmentBase = ({
  className, data, formatDate, type, fromPrev,
  toNext, durationType, isShaded, ...restProps
}) => (
  <Appointment
    className={className}
    type={type}
    isShaded={isShaded}
    {...restProps}
  >
    {fromPrev && <SplitIndicator position={POSITION_START} appointmentType={type} />}
    <AppointmentContent
      data={data}
      type={type}
      recurringIconComponent={Repeat}
      formatDate={formatDate}
      durationType={durationType}
    />
    {toNext && <SplitIndicator position={POSITION_END} appointmentType={type} />}
  </Appointment>
);

AppointmentBase.propTypes = {
  data: PropTypes.object.isRequired,
  fromPrev: PropTypes.bool.isRequired,
  toNext: PropTypes.bool.isRequired,
  formatDate: PropTypes.func.isRequired,
  durationType: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  isShaded: PropTypes.bool,
};

AppointmentBase.defaultProps = {
  durationType: undefined,
  className: undefined,
  type: undefined,
  isShaded: false,
};

const StyledDraftAppointmentBase = styled(AppointmentBase)(({ theme, resources }) => ({
  [`&.${classes.appointment}`]: {
    boxShadow: theme.shadows[3],
    cursor: 'move',
    overflow: 'hidden',
    backgroundColor: getAppointmentColor(
      600, getResourceColor(resources), theme.palette.primary,
    ),
    border: 0,
  },
  [`&.${classes.shadedAppointment}`]: {
    backgroundColor: getAppointmentColor(
      400, getResourceColor(resources), theme.palette.primary,
    ),
  },
}));

export const DraftAppointment = ({
  className, resources, isShaded, ...restProps
}) => (
  <StyledDraftAppointmentBase
    className={classNames({
      [classes.appointment]: true,
      [classes.shadedAppointment]: isShaded,
    }, className)}
    resources={resources}
    {...restProps}
  />
);

DraftAppointment.propTypes = {
  resources: PropTypes.array,
  className: PropTypes.string,
  isShaded: PropTypes.bool,
};

DraftAppointment.defaultProps = {
  className: undefined,
  resources: [],
  isShaded: false,
};

const StyledSourceAppointmentBase = styled(AppointmentBase)(() => ({
  [`&.${classes.appointment}`]: {
    opacity: 0.5,
  },
}));

export const SourceAppointment = ({ className, ...restProps }) => (
  <StyledSourceAppointmentBase
    className={classNames(classes.appointment, className)}
    {...restProps}
  />
);

SourceAppointment.propTypes = {
  className: PropTypes.string,
};

SourceAppointment.defaultProps = {
  className: undefined,
};
