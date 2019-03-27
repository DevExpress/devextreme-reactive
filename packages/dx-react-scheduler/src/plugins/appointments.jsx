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
      sliceComponent: Slice,
      appointmentComponent: Appointment,
      appointmentContentComponent: AppointmentContent,
      containerComponent: Container,
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
            <Container style={params.style}>
              <TemplatePlaceholder name="appointmentTop" params={{ data: params.data, type: params.type, slice: params.leftSlice }} />
              <TemplatePlaceholder name="appointmentContent" params={params} />
              <TemplatePlaceholder name="appointmentBottom" params={{ data: params.data, type: params.type, slice: params.rightSlice }} />
            </Container>
          )}
        </Template>

        <Template name="appointmentContent">
          {({
            onClick, onDoubleClick,
            data, type, style, leftSlice, rightSlice,
            ...restParams
          }) => (
            <Appointment
              data={data}
              leftSlice={leftSlice}
              rightSlice={rightSlice}
              {...createClickHandlers(onClick, onDoubleClick)}
              {...restParams}
            >
              {leftSlice && <Slice position="top" appointmentType={type} />}
              <AppointmentContent
                data={data}
                type={type}
              />
              {rightSlice && <Slice position="bottom" appointmentType={type} />}
            </Appointment>
          )}
        </Template>
      </Plugin>
    );
  }
}

Appointments.propTypes = {
  sliceComponent: PropTypes.func.isRequired,
  containerComponent: PropTypes.func.isRequired,
  appointmentComponent: PropTypes.func.isRequired,
  appointmentContentComponent: PropTypes.func.isRequired,
};

Appointments.components = {
  sliceComponent: 'Slice',
  containerComponent: 'Container',
  appointmentComponent: 'Appointment',
  appointmentContentComponent: 'AppointmentContent',
};
