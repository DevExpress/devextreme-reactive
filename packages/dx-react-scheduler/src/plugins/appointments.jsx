import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin, Template, TemplatePlaceholder, TemplateConnector,
} from '@devexpress/dx-react-core';
import { HORIZONTAL_APPOINTMENT_TYPE } from '@devexpress/dx-scheduler-core';

export class Appointments extends React.PureComponent {
  render() {
    const {
      horizontalAppointmentComponent: HorizontalAppointment,
      verticalAppointmentComponent: VerticalAppointment,
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
              }, index) => {
                const appointmentProps = {
                  ...geometry,
                  key: index.toString(),
                  getTitle: getAppointmentTitle,
                  getEndDate: getAppointmentEndDate,
                  getStartDate: getAppointmentStartDate,
                  appointment: dataItem,
                };
                return (
                  type === HORIZONTAL_APPOINTMENT_TYPE
                    ? <HorizontalAppointment {...appointmentProps} />
                    : <VerticalAppointment {...appointmentProps} />
                );
              })}
            </TemplateConnector>
          </Container>
        </Template>
      </Plugin>
    );
  }
}

Appointments.propTypes = {
  horizontalAppointmentComponent: PropTypes.func.isRequired,
  verticalAppointmentComponent: PropTypes.func.isRequired,
  containerComponent: PropTypes.func.isRequired,
};
