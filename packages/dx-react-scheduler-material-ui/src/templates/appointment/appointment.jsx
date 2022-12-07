import * as React from 'react';
import { styled } from '@mui/material';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { getAppointmentColor, getResourceColor } from '../utils';

const PREFIX = 'Appointment';

export const classes = {
  appointment: `${PREFIX}-appointment`,
  clickableAppointment: `${PREFIX}-clickableAppointment`,
  shadedAppointment: `${PREFIX}-shadedAppointment`,
};

const StyledDiv = styled('div')(({
  theme: { palette, typography, spacing }, resources,
}) => ({
  [`&.${classes.appointment}`]: {
    userSelect: 'none',
    position: 'absolute',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    boxSizing: 'border-box',
    border: `1px solid ${palette.background.paper}`,
    backgroundClip: 'padding-box',
    borderRadius: spacing(0.5),
    backgroundColor: getAppointmentColor(
      300, getResourceColor(resources), palette.primary,
    ),
    ...typography.caption,
    '&:hover': {
      backgroundColor: getAppointmentColor(
        400, getResourceColor(resources), palette.primary,
      ),
    },
    '&:focus': {
      backgroundColor: getAppointmentColor(
        100, getResourceColor(resources), palette.primary,
      ),
      outline: 0,
    },
  },
  [`&.${classes.clickableAppointment}`]: {
    cursor: 'pointer',
  },
  [`&.${classes.shadedAppointment}`]: {
    backgroundColor: getAppointmentColor(
      200, getResourceColor(resources), palette.primary,
    ),
    '&:hover': {
      backgroundColor: getAppointmentColor(
        300, getResourceColor(resources), palette.primary,
      ),
    },
  },
}));

export const Appointment = ({
  className,
  children,
  data,
  onClick: handleClick,
  draggable,
  isShaded,
  resources,
  forwardedRef,
  ...restProps
}) => {
  const onClick = handleClick
    ? {
      onClick: ({ target }) => {
        handleClick({ target, data });
      },
    }
    : null;

  const clickable = onClick || restProps.onDoubleClick || draggable;
  return (
    <StyledDiv
      resources={resources}
      ref={forwardedRef}
      className={classNames({
        [classes.appointment]: true,
        [classes.clickableAppointment]: clickable,
        [classes.shadedAppointment]: isShaded,
      }, className)}
      {...onClick}
      {...restProps}
    >
      {children}
    </StyledDiv>
  );
};

Appointment.propTypes = {
  children: PropTypes.node.isRequired,
  resources: PropTypes.array,
  className: PropTypes.string,
  data: PropTypes.object,
  onClick: PropTypes.func,
  draggable: PropTypes.bool,
  isShaded: PropTypes.bool,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

Appointment.defaultProps = {
  resources: [],
  onClick: undefined,
  className: undefined,
  data: {},
  draggable: false,
  isShaded: false,
  forwardedRef: undefined,
};
