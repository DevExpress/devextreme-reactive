import * as React from 'react';
import {
  Plugin, Template, TemplatePlaceholder, TemplateConnector,
} from '@devexpress/dx-react-core';
import { createClickHandlers } from '@devexpress/dx-core';
import { POSITION_START, POSITION_END } from '@devexpress/dx-scheduler-core';

import { AppointmentsProps } from '../types';

const pluginDependencies = [
  { name: 'DayView', optional: true },
  { name: 'WeekView', optional: true },
  { name: 'MonthView', optional: true },
];

class AppointmentsBase extends React.PureComponent<AppointmentsProps> {
  static components = {
    splitIndicatorComponent: 'SplitIndicator',
    containerComponent: 'Container',
    appointmentComponent: 'Appointment',
    appointmentContentComponent: 'AppointmentContent',
    recurringIconComponent: 'RecurringIcon',
  };

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
          {(params: any) => (
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
          }: any) => (
            <TemplateConnector>
              {({ formatDate }) => (
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
                    formatDate={formatDate}
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

/** A plugin that renders appointments. */
export const Appointments: React.ComponentType<AppointmentsProps> = AppointmentsBase;
