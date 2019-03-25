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
          {params => (
            <div style={{ ...params.style }}>
              <TemplatePlaceholder name="appointmentTop" params={{ data: params.data, predicate: params.leftSlice }} />
              <TemplatePlaceholder name="appointmentContent" params={params} />
              <TemplatePlaceholder name="appointmentBottom" params={{ data: params.data, predicate: params.rightSlice }} />
            </div>
          )}
        </Template>


        <Template name="appointmentContent">
          {({
            onClick, onDoubleClick,
            data, type, style, leftSlice, rightSlice,
            ...restParams
          }) => (
            <Appointment
              style={{ height: '100%', width: '100%', position: 'absolute' }}
              data={data}
              {...createClickHandlers(onClick, onDoubleClick)}
              {...restParams}
            >
              <AppointmentContent
                data={data}
                type={type}
              />
            </Appointment>
          )}
        </Template>

        <Template
          name="appointmentTop"
          predicate={(params) => { debugger; return (params.predicate); }}
        >
          {({ predicate }) => {
            debugger;
            return (<div style={{ textAlign: 'center' }}>~~~~~</div>
            );
          }}
        </Template>

        {/* <Template name="appointmentContent">
          {props => (
            <AppointmentContent
              data={props.data}
              type={props.type}
            />
          )}
        </Template> */}

        <Template
          name="appointmentBottom"
          predicate={params => params.predicate}
        >
          {({ predicate, ...restProps }) => (
            <div
              {...restProps}
              style={{
                position: 'absolute', bottom: 0, textAlign: 'center', width: '100%',
              }}
            >
              ~~~~~
            </div>
          )}
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
