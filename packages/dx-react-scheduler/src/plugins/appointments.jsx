import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Template, Getter, TemplatePlaceholder, TemplateConnector } from '@devexpress/dx-react-core';
import { getAppointmentMeta } from '@devexpress/dx-scheduler-core';

export class Appointments extends React.PureComponent {
  render() {
    const {
      appointmentComponent: Unit,
      getTitle,
      getStartDate,
      getEndDate,
    } = this.props;

    return (
      <Plugin name="Appointment">
        <Getter name="getAppointmentTitle" value={getTitle} />
        <Getter name="getAppointmentStartDate" value={getStartDate} />
        <Getter name="getAppointmentEndDate" value={getEndDate} />
        <Template name="main">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ data, gridScale }) =>
              data.map((item) => {
                const appointmentMeta = getAppointmentMeta(item, gridScale);

                return (
                  <Unit
                    key={item}
                    top={appointmentMeta.top}
                    left={appointmentMeta.left}
                    width={appointmentMeta.width}
                    height={appointmentMeta.height}
                    title={appointmentMeta.title}
                  />
                );
              })
            }
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
