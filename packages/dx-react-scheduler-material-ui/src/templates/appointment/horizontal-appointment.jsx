import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Appointment } from './appointment';

const styles = {
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
};

const HorizontalAppointmentBase = ({
  classes,
  getAppointmentTitle,
  getAppointmentStartDate,
  getAppointmentEndDate,
  data,
  children,
  ...restProps
}) => (
  <Appointment
    data={data}
    {...restProps}
  >
    {children || (
      <div className={classes.title}>
        {getAppointmentTitle(data)}
      </div>
    )}
  </Appointment>
);

HorizontalAppointmentBase.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  children: PropTypes.node,
  getAppointmentTitle: PropTypes.func,
  getAppointmentStartDate: PropTypes.func,
  getAppointmentEndDate: PropTypes.func,
};

HorizontalAppointmentBase.defaultProps = {
  children: undefined,
  getAppointmentStartDate: () => {},
  getAppointmentEndDate: () => {},
  getAppointmentTitle: () => {},
};

export const HorizontalAppointment = withStyles(styles, { name: 'HorizontalAppointment' })(HorizontalAppointmentBase);
