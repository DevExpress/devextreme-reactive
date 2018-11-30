import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withComponents } from '@devexpress/dx-react-core';
import { Appointments as AppointmentsBase } from '@devexpress/dx-react-scheduler';
import { HORIZONTAL_TYPE, VERTICAL_TYPE } from '@devexpress/dx-scheduler-core';
import { HorizontalAppointment } from '../templates/appointment/horizontal-appointment';
import { VerticalAppointment } from '../templates/appointment/vertical-appointment';

import { Appointment } from '../templates/appointment/appointment';

const AppointmentContent = ({ type, ...restProps }) => (
  type === HORIZONTAL_TYPE
    ? <HorizontalAppointment {...restProps} />
    : <VerticalAppointment {...restProps} />
);

AppointmentContent.propTypes = {
  type: PropTypes.oneOf([
    HORIZONTAL_TYPE,
    VERTICAL_TYPE,
  ]).isRequired,
};

export const Appointments = withComponents({
  Appointment,
  AppointmentContent,
})(AppointmentsBase);
