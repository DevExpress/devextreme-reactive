import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Template, Getter, TemplatePlaceholder, TemplateConnector } from '@devexpress/dx-react-core';
import {
  getRectByDates,
  filteredAppointments,
  formattedAppointments,
  sliceAppointments,
} from '@devexpress/dx-scheduler-core';

const filterAppointmentsComputed = ({
  data,
  startViewDate,
  endViewDate,
  getAppointmentEndDate,
  getAppointmentStartDate,
}) => filteredAppointments(
  startViewDate,
  endViewDate,
  data,
  getAppointmentStartDate,
  getAppointmentEndDate,
);

const formattedAppointmentsComputed = ({
  data,
  getAppointmentStartDate,
  getAppointmentEndDate,
}) => formattedAppointments(
  data,
  getAppointmentStartDate,
  getAppointmentEndDate,
);

const sliceAppointmentsComputed = ({
  appointments,
  startViewDate,
  endViewDate,
}) => sliceAppointments(appointments, startViewDate, endViewDate);

export class Appointments extends React.PureComponent {
  render() {
    const {
      appointmentComponent: Appointment,
      getTitle,
      getStartDate,
      getEndDate,
    } = this.props;

    const getRectComputed = ({
      timeScale,
      dayScale,
      cellDuration,
      dateTableRef,
    }) => (startDate, endDate) =>
      getRectByDates(
        startDate,
        endDate,
        dayScale,
        timeScale,
        cellDuration,
        dateTableRef.querySelectorAll('td'),
      );

    return (
      <Plugin name="Appointment">
        <Getter name="getAppointmentTitle" value={getTitle} />
        <Getter name="getAppointmentStartDate" value={getStartDate} />
        <Getter name="getAppointmentEndDate" value={getEndDate} />
        <Getter name="data" computed={filterAppointmentsComputed} />
        <Getter name="appointments" computed={formattedAppointmentsComputed} />
        <Getter name="appointments" computed={sliceAppointmentsComputed} />

        <Getter name="getRect" computed={getRectComputed} />

        <Template name="main">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
              getRect,
              dateTableRef,
              appointments,
            }) => (dateTableRef ? appointments.map((appointment, index) => {
                const {
                  top, left, width, height,
                } = getRect(appointment.start, appointment.end);
                return (
                  <Appointment
                    key={index.toString()}
                    top={top}
                    left={left}
                    width={width}
                    height={height}
                    getTitle={getTitle}
                    getEndDate={getEndDate}
                    getStartDate={getStartDate}
                    appointment={appointment.dataItem}
                  />
                );
              }) : null)}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

Appointments.propTypes = {
  appointmentComponent: PropTypes.func.isRequired,
  getTitle: PropTypes.func,
  getStartDate: PropTypes.func,
  getEndDate: PropTypes.func,
};

Appointments.defaultProps = {
  getTitle: appointment => appointment.title,
  getStartDate: appointment => appointment.startDate,
  getEndDate: appointment => appointment.endDate,
};
