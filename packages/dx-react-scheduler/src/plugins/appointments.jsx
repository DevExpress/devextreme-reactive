import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin, Template, TemplatePlaceholder, TemplateConnector,
} from '@devexpress/dx-react-core';

export class Appointments extends React.PureComponent {
  render() {
    const {
      appointmentComponent: Appointment,
      containerComponent: Container,
    } = this.props;

    return (
      <Plugin name="Appointment">
        <Template name="main">
          <TemplatePlaceholder />
          <Container>
            <TemplateConnector>
              {({
                appointmentRects,
                getAppointmentTitle,
                getAppointmentStartDate,
                getAppointmentEndDate,
              }) => appointmentRects.map(({
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
