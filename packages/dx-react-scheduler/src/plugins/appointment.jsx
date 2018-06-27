import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Template, TemplatePlaceholder, TemplateConnector } from '@devexpress/dx-react-core';
import { getAppointmentMeta } from '@devexpress/dx-scheduler-core';

export class Appointment extends React.PureComponent {
  render() {
    const {
      appointmentComponent: Unit,
    } = this.props;

    return (
      <Plugin name="Appointment">
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

Appointment.propTypes = {
  appointmentComponent: PropTypes.func.isRequired,
};
