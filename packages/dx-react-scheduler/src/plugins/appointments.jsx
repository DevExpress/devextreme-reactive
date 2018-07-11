import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Template, Getter, TemplatePlaceholder, TemplateConnector } from '@devexpress/dx-react-core';
import { appointmentRects as getAppointmentRects } from '@devexpress/dx-scheduler-core';

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
    } = this.props;

    return (
      <Plugin name="Appointment">
        <Getter name="appointmentRects" computed={appointmentRectsComputed} />
        <Template name="main">
          <TemplatePlaceholder />
          <Container>
            <TemplateConnector>
              {({
                appointmentRects,
                getAppointmentTitle,
                getAppointmentStartDate,
                getAppointmentEndDate,
              }) =>
                appointmentRects.map(({
                dataItem, ...geometry
              }, index) => (
                <Appointment
                  {...geometry}
                  key={index.toString()}
                  getTitle={getAppointmentTitle}
                  getEndDate={getAppointmentEndDate}
                  getStartDate={getAppointmentStartDate}
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
};
