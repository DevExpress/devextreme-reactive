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
  reducedBrightness: {
    backgroundColor: setColor(300, theme.palette.primary),
  },
});

const sourceStyles = {
  appointment: {
    opacity: 0.5,
  },
};

const DraftAppointmentBase = ({
  classes, className, data, formatDate,
  type, fromPrev, toNext, durationType,
  isBrightnessReduced, ...restProps
}) => (
  <Appointment
    className={classNames({
      [classes.appointment]: true,
      [classes.reducedBrightness]: isBrightnessReduced,
    }, className)}
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

DraftAppointmentBase.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  fromPrev: PropTypes.bool.isRequired,
  toNext: PropTypes.bool.isRequired,
  formatDate: PropTypes.func.isRequired,
  durationType: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  isBrightnessReduced: PropTypes.bool,
};

DraftAppointmentBase.defaultProps = {
  durationType: undefined,
  className: undefined,
  type: undefined,
  isBrightnessReduced: false,
};

export const DraftAppointment = withStyles(draftStyles, { name: 'DraftAppointment' })(DraftAppointmentBase);
export const SourceAppointment = withStyles(sourceStyles, { name: 'SourceAppointment' })(DraftAppointmentBase);
