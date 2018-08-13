import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin, Template, TemplatePlaceholder, TemplateConnector,
} from '@devexpress/dx-react-core';

const getAppointmentStyle = ({
  top,
  left,
  width,
  height,
}) => ({
  height,
  width: `${width}%`,
  transform: `translateY(${top}px)`,
  left: `${left}%`,
  position: 'absolute',
});

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
                dataItem, type, ...geometry
              }, index) => (
                <Appointment
                  type={type}
                  key={index.toString()}
                  appointment={dataItem}
                  getTitle={getAppointmentTitle}
                  getEndDate={getAppointmentEndDate}
                  getStartDate={getAppointmentStartDate}
                  style={getAppointmentStyle(geometry)}
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
