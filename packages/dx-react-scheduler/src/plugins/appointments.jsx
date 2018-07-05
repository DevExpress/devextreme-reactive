import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Template, Getter, TemplatePlaceholder, TemplateConnector } from '@devexpress/dx-react-core';
import {
  getRectByDates,
  appointmentsWithCoordinates,
} from '@devexpress/dx-scheduler-core';

const appointmentsWithCoordinatesComputed = ({
  data,
  startViewDate,
  endViewDate,
  excludedDays,
  getAppointmentStartDate,
  getAppointmentEndDate,
}) =>
  appointmentsWithCoordinates(
    data,
    startViewDate,
    endViewDate,
    excludedDays,
    getAppointmentStartDate,
    getAppointmentEndDate,
  );

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

        <Getter name="appointments" computed={appointmentsWithCoordinatesComputed} />
        <Getter name="getRect" computed={getRectComputed} />

        <Template name="main">
          <TemplatePlaceholder />
          <Container>
            <TemplateConnector>
              {({
                getRect,
                dateTableRef,
                appointments,
              }) => (dateTableRef ? (
                appointments.map((appointment, index) => {
                const {
                  top, left, width, height,
                } = getRect(appointment.start, appointment.end);
                return (
                  <Appointment
                    key={index.toString()}
                    top={top}
                    left={left + ((width / appointment.reduceValue) * appointment.offset)}
                    width={width / appointment.reduceValue}
                    height={height}
                    getTitle={getTitle}
                    getEndDate={getEndDate}
                    getStartDate={getStartDate}
                    appointment={appointment.dataItem}
                  />
                );
              })) : null)}
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
