import * as React from 'react';
import { styled } from '@mui/material/styles';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import Repeat from '@mui/icons-material/Repeat';
import { POSITION_START, POSITION_END } from '@devexpress/dx-scheduler-core';
import makeStyles from '@mui/styles/makeStyles';
import { AppointmentContent } from '../appointment/appointment-content';
import { Appointment } from '../appointment/appointment';
import { SplitIndicator } from '../appointment/split-indicator';
import { getAppointmentColor, getResourceColor } from '../utils';

const PREFIX = 'DraftAppointment';

const classes = {
  appointment: `${PREFIX}-appointment`,
  shadedAppointment: `${PREFIX}-shadedAppointment`,
};

const StyledAppointment = styled(Appointment)(({ theme }) => ({
  [`& .${classes.appointment}`]: {
    boxShadow: theme.shadows[3],
    cursor: 'move',
    overflow: 'hidden',
    backgroundColor: resources => getAppointmentColor(
      600, getResourceColor(resources), theme.palette.primary,
    ),
    border: 0,
  },

  [`& .${classes.shadedAppointment}`]: {
    backgroundColor: resources => getAppointmentColor(
      400, getResourceColor(resources), theme.palette.primary,
    ),
  },
}));

const draftStyles = makeStyles(({ theme }) => ({
  [`& .${classes.appointment}`]: {
    boxShadow: theme.shadows[3],
    cursor: 'move',
    overflow: 'hidden',
    backgroundColor: resources => getAppointmentColor(
      600, getResourceColor(resources), theme.palette.primary,
    ),
    border: 0,
  },

  [`& .${classes.shadedAppointment}`]: {
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
  className, resources, isShaded, ...restProps
}) => {
  const styles = draftStyles(resources);
  return (
    <AppointmentBase
      className={classNames({
        [styles.appointment]: true,
        [styles.shadedAppointment]: isShaded,
      }, className)}
      resources={resources}
      {...restProps}
    />
  );
};

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

export const SourceAppointment = ({ className, ...restProps }) => {
  const styles = sourceStyles();
  return (
    <AppointmentBase
      className={classNames(styles.appointment, className)}
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
  toNext, durationType, isShaded, ...restProps
}) => (
  <StyledAppointment
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
  </StyledAppointment>
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
