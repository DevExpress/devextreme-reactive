import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = ({ palette, typography }) => ({
  appointmentWrapper: {
    position: 'absolute',
    display: 'block',
    overflow: 'hidden',
    backgroundColor: palette.primary[300],
    boxSizing: 'border-box',
    borderRight: `1px solid ${palette.background.paper}`,
    borderBottom: `1px solid ${palette.background.paper}`,
    ...typography.caption,
    '&:hover': {
      backgroundColor: palette.primary[400],
    },
    '&:focus': {
      backgroundColor: palette.primary[100],
      outline: 0,
    },
  },
});

const AppointmentWrapperBase = ({
  classes, className,
  getTitle,
  getStartDate, getEndDate,
  appointment, top,
  left, width,
  height,
  appointmentComponent: Appointment,
  ...restProps
}) => (
  <div
    className={classNames(classes.appointmentWrapper, className)}
    style={{
      height,
      width: `${width}%`,
      transform: `translateY(${top}px)`,
      left: `${left}%`,
    }}
    {...restProps}
  >
    <Appointment
      getTitle={getTitle}
      getStartDate={getStartDate}
      getEndDate={getEndDate}
      appointment={appointment}
    />
  </div>
);

AppointmentWrapperBase.propTypes = {
  appointmentComponent: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  getTitle: PropTypes.func.isRequired,
  getStartDate: PropTypes.func.isRequired,
  getEndDate: PropTypes.func.isRequired,
  appointment: PropTypes.object.isRequired,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  className: PropTypes.string,
};

AppointmentWrapperBase.defaultProps = {
  className: undefined,
};

export const AppointmentWrapper = withStyles(styles, { name: 'AppointmentWrapper' })(AppointmentWrapperBase);
