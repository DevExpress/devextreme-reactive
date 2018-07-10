import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Template, Getter, TemplatePlaceholder, TemplateConnector } from '@devexpress/dx-react-core';
import { appointmentRects as getAppointmentRects, getAppointments } from '@devexpress/dx-scheduler-core';

const appointmentsComputed = ({
  data,
  getAppointmentStartDate,
  getAppointmentEndDate,
}) => getAppointments(
  data,
  getAppointmentStartDate,
  getAppointmentEndDate,
);

const appointmentRectsComputed = ({
  appointments,
  startViewDate,
  endViewDate,
  excludedDays,
  dayScale,
  timeScale,
  cellDuration,
  dateTableRef,
}) => (dateTableRef ? getAppointmentRects(
  appointments,
  startViewDate,
  endViewDate,
  excludedDays,
  dayScale,
  timeScale,
  cellDuration,
  dateTableRef.querySelectorAll('td'),
) : []);

export class Appointments extends React.PureComponent {
  render() {
    const {
      appointmentComponent: Appointment,
      containerComponent: Container,
      getTitle,
      getStartDate,
      getEndDate,
    } = this.props;

    return (
      <Plugin name="Appointment">
        <Getter name="getAppointmentTitle" value={getTitle} />
        <Getter name="getAppointmentStartDate" value={getStartDate} />
        <Getter name="getAppointmentEndDate" value={getEndDate} />
        <Getter name="appointments" computed={appointmentsComputed} />
        <Getter name="appointmentRects" computed={appointmentRectsComputed} />

        <Template name="main">
          <TemplatePlaceholder />
          <Container>
            <TemplateConnector>
              {({
                appointmentRects,
              }) => appointmentRects.map(({
                dataItem, ...geometry
              }, index) => (
                <Appointment
                  {...geometry}
                  key={index.toString()}
                  getTitle={getTitle}
                  getEndDate={getEndDate}
                  getStartDate={getStartDate}
                  appointment={dataItem}
                />
              ))}
            </TemplateConnector>
          </Container>
        </Template>
      </Plugin>
    );
  }
}

Appointments.propTypes = {
  appointmentComponent: PropTypes.func.isRequired,
  containerComponent: PropTypes.func.isRequired,
  getTitle: PropTypes.func,
  getStartDate: PropTypes.func,
  getEndDate: PropTypes.func,
};

Appointments.defaultProps = {
  getTitle: appointment => appointment.title,
  getStartDate: appointment => appointment.startDate,
  getEndDate: appointment => appointment.endDate,
};
