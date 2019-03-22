import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin, Template, TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import { createClickHandlers } from '@devexpress/dx-core';

const pluginDependencies = [
  { name: 'DayView', optional: true },
  { name: 'WeekView', optional: true },
  { name: 'MonthView', optional: true },
];

export class Appointments extends React.PureComponent {
  render() {
    const {
      appointmentComponent: Appointment,
      appointmentContentComponent: AppointmentContent,
    } = this.props;

    return (
      <Plugin
        name="Appointments"
        dependencies={pluginDependencies}
      >
        <Template
          name="appointment"
        >
          {({
            onClick, onDoubleClick,
            data, type, style, leftSlice, rightSlice,
            ...restParams
          }) => (
            <Appointment
              style={style}
              data={data}
              {...createClickHandlers(onClick, onDoubleClick)}
              {...restParams}
            >
              <TemplatePlaceholder name="appointmentTop" params={{ ...restParams, data, predicate: leftSlice }} />
              <TemplatePlaceholder name="appointmentContent" params={{ ...restParams, data, type }} />
              <TemplatePlaceholder name="appointmentBottom" params={{ ...restParams, data, predicate: rightSlice }} />
            </Appointment>
          )}
        </Template>


        <Template
          name="appointmentTop"
          predicate={params => params.predicate}
        >
          {props => <div {...props} style={{ textAlign: 'center' }}>~~~~~</div>}
        </Template>

        <Template name="appointmentContent">
          {props => (
            <AppointmentContent
              data={props.data}
              type={props.type}
            />
          )}
        </Template>

        <Template
          name="appointmentBottom"
          predicate={params => params.predicate}
        >
          {props => <div {...props} style={{ position: 'absolute', bottom: 0, textAlign: 'center', width: '100%' }}>~~~~~</div>}
        </Template>
      </Plugin>
    );
  }
}

Appointments.propTypes = {
  appointmentComponent: PropTypes.func.isRequired,
  appointmentContentComponent: PropTypes.func.isRequired,
};

Appointments.components = {
  appointmentComponent: 'Appointment',
  appointmentContentComponent: 'AppointmentContent',
};
