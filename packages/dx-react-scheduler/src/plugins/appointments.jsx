import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin, Template, TemplatePlaceholder, TemplateConnector,
} from '@devexpress/dx-react-core';
import { createClickHandlers } from '@devexpress/dx-core';
import { POSITION_START, POSITION_END } from '@devexpress/dx-scheduler-core';

const pluginDependencies = [
  { name: 'DayView', optional: true },
  { name: 'WeekView', optional: true },
  { name: 'MonthView', optional: true },
];

export class Appointments extends React.PureComponent {
  render() {
    const {
      splitIndicatorComponent: SplitIndicator,
      appointmentComponent: Appointment,
      appointmentContentComponent: AppointmentContent,
      containerComponent: Container,
      recurringIconComponent,
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
              <TemplatePlaceholder name="appointmentTop" params={{ data: params.data, type: params.type, slice: params.fromPrev }} />
              <TemplatePlaceholder name="appointmentContent" params={params} />
              <TemplatePlaceholder name="appointmentBottom" params={{ data: params.data, type: params.type, slice: params.toNext }} />
            </Container>
          )}
        </Template>

        <Template name="appointmentContent">
          {({
            onClick, onDoubleClick,
            data, type, style, fromPrev, toNext,
            ...restParams
          }) => (
            <TemplateConnector>
              {({ dateFormat }) => (
                <Appointment
                  data={data}
                  {...createClickHandlers(onClick, onDoubleClick)}
                  {...restParams}
                >
                  {fromPrev && <SplitIndicator position={POSITION_START} appointmentType={type} />}
                  <AppointmentContent
                    data={data}
                    type={type}
                    recurringIconComponent={recurringIconComponent}
                    dateFormat={dateFormat}
                  />
                  {toNext && <SplitIndicator position={POSITION_END} appointmentType={type} />}
                </Appointment>
              )}
            </TemplateConnector>
          )}
        </Template>
      </Plugin>
    );
  }
}

Appointments.propTypes = {
  splitIndicatorComponent: PropTypes.func.isRequired,
  containerComponent: PropTypes.func.isRequired,
  appointmentComponent: PropTypes.func.isRequired,
  appointmentContentComponent: PropTypes.func.isRequired,
  recurringIconComponent: PropTypes.func.isRequired,
};

Appointments.components = {
  splitIndicatorComponent: 'SplitIndicator',
  containerComponent: 'Container',
  appointmentComponent: 'Appointment',
  appointmentContentComponent: 'AppointmentContent',
  recurringIconComponent: 'RecurringIcon',
};
