import * as React from 'react';
import PropTypes from 'prop-types';
import { HORIZONTAL_TYPE, VERTICAL_TYPE } from '@devexpress/dx-scheduler-core';
import { HorizontalAppointment } from './horizontal-appointment';
import { VerticalAppointment } from './vertical-appointment';

export const AppointmentContent = ({ type, ...restProps }) => (
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
