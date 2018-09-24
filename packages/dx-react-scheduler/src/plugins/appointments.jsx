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
                const onClick = (toggleTooltipVisibility && setTooltipAppointmentMeta)
                  ? {
                    onClick: ({ target, appointment }) => {
                      toggleTooltipVisibility();
                      setTooltipAppointmentMeta({ target, appointment });
                    },
                  }
                  : null;
                return (
                  <Appointment
                    {...params}
                    {...onClick}
                    getTitle={getAppointmentTitle}
                    getEndDate={getAppointmentEndDate}
                    getStartDate={getAppointmentStartDate}
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

Appointments.components = {
  appointmentComponent: 'Appointment',
};
