import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import Repeat from '@material-ui/icons/Repeat';
import { POSITION_START, POSITION_END } from '@devexpress/dx-scheduler-core';
import { makeStyles } from '@material-ui/core/styles';
import { AppointmentContent } from '../appointment/appointment-content';
import { Appointment } from '../appointment/appointment';
import { SplitIndicator } from '../appointment/split-indicator';
import { getAppointmentColor, getResourceColor } from '../utils';

const draftStyles = makeStyles(theme => ({
  appointment: {
    boxShadow: theme.shadows[3],
    cursor: 'move',
    overflow: 'hidden',
    backgroundColor: resources => getAppointmentColor(
      600, getResourceColor(resources), theme.palette.primary,
    ),
    border: 0,
  },
  reducedBrightness: {
    backgroundColor: resources => getAppointmentColor(
      400, getResourceColor(resources), theme.palette.primary,
    ),
  },
}));

const sourceStyles = makeStyles({
  appointment: {
    opacity: 0.5,
  },
});

export const DraftAppointment = ({
  className, resources, isBrightnessReduced, ...restProps
}) => {
  const classes = draftStyles(resources);
  return (
    <AppointmentBase
      className={classNames({
        [classes.appointment]: true,
        [classes.reducedBrightness]: isBrightnessReduced,
      }, className)}
      resources={resources}
      {...restProps}
    />
  );
};

DraftAppointment.propTypes = {
  resources: PropTypes.array,
  className: PropTypes.string,
  isBrightnessReduced: PropTypes.bool,
};

DraftAppointment.defaultProps = {
  className: undefined,
  resources: [],
  isBrightnessReduced: PropTypes.bool,
};

export const SourceAppointment = ({ className, ...restProps }) => {
  const classes = sourceStyles();
  return (
    <AppointmentBase
      className={classNames(classes.appointment, className)}
      {...restProps}
    />
  );
};

SourceAppointment.propTypes = {
  className: PropTypes.string,
};

SourceAppointment.defaultProps = {
  className: undefined,
};

const AppointmentBase = ({
  className, data, formatDate, type, fromPrev,
  toNext, durationType, isBrightnessReduced, ...restProps
}) => (
  <Appointment
    className={className}
    type={type}
    isBrightnessReduced={isBrightnessReduced}
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
  isBrightnessReduced: PropTypes.bool,
};

AppointmentBase.defaultProps = {
  durationType: undefined,
  className: undefined,
  type: undefined,
  isBrightnessReduced: false,
};
