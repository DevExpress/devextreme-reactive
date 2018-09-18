import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin, Template, TemplateConnector,
} from '@devexpress/dx-react-core';

export class Appointments extends React.PureComponent {
  render() {
    const {
      appointmentComponent: Appointment,
    } = this.props;

    return (
      <Plugin name="Appointments">
        <Template
          name="appointment"
        >
          {params => (
            <TemplateConnector>
              {({
                getAppointmentTitle,
                getAppointmentStartDate,
                getAppointmentEndDate,
              }, {
                toggleTooltipVisibility,
                setTooltipAppointmentMeta,
              }) => {
                const onClick = ({ target, appointment }) => {
                  toggleTooltipVisibility();
                  setTooltipAppointmentMeta({ target, appointment });
                };
                return (
                  <Appointment
                    {...params}
                    getTitle={getAppointmentTitle}
                    getEndDate={getAppointmentEndDate}
                    getStartDate={getAppointmentStartDate}
                    onClick={onClick}
                  />
                );
              }}
            </TemplateConnector>
          )}
        </Template>
      </Plugin>
    );
  }
}

Appointments.propTypes = {
  appointmentComponent: PropTypes.func.isRequired,
};
