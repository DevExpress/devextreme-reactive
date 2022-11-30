import * as React from 'react';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import {
  isMonthCell, isShadedAppointment,
  isCellShaded, getCurrentTimeIndicatorTop,
} from '@devexpress/dx-scheduler-core';
import { CurrentTimeIndicatorProps, Appointments } from '../types';

const pluginDependencies = [
  { name: 'DayView', optional: true },
  { name: 'WeekView', optional: true },
  { name: 'MonthView', optional: true },
  { name: 'DragDropProvider', optional: true },
  { name: 'Appointments', optional: true },
];

const CurrentTimeIndicatorBase: React.FunctionComponent<CurrentTimeIndicatorProps>  & {components: {
  indicatorComponent: string,
}} = ({
  indicatorComponent, shadePreviousAppointments, shadePreviousCells, updateInterval,
}) => {
  const [currentTime, setCurrentTime] = React.useState(Date.now);

  React.useEffect(() => {
    const tick = () => setCurrentTime(Date.now());
    const intervalId = (updateInterval
      ? window.setInterval(tick, updateInterval)
      : undefined
    );
    return () => window.clearInterval(intervalId);
  }, [updateInterval]);

  return (
    <Plugin
      name="CurrentTimeIndicator"
      dependencies={pluginDependencies}
    >
      <Template
        name="cell"
        predicate={({ otherMonth }: any) => !isMonthCell(otherMonth)}
      >
        {(params: any) => (
          <TemplatePlaceholder
            params={{
              ...params,
              currentTimeIndicatorPosition: getCurrentTimeIndicatorTop(params, currentTime),
              currentTimeIndicatorComponent: indicatorComponent,
            }}
          />
        )}
      </Template>
      <Template
        name="cell"
      >
        {(params: any) => (
          <TemplatePlaceholder
            params={{
              ...params,
              isShaded: isCellShaded(params, currentTime, shadePreviousCells),
            }}
          />
        )}
      </Template>
      <Template
        name="appointmentContent"
      >
        {(params: Appointments.AppointmentProps) => (
          <TemplatePlaceholder
            params={{
              ...params,
              isShaded: isShadedAppointment(
                params, currentTime, shadePreviousAppointments,
              ),
            }}
          />
        )}
      </Template>
      <Template
        name="draftAppointment"
      >
        {(params: Appointments.AppointmentProps) => (
          <TemplatePlaceholder
            params={{
              ...params,
              isShaded: isShadedAppointment(
                params, currentTime, shadePreviousAppointments,
              ),
            }}
          />
        )}
      </Template>
    </Plugin>
  );
};

CurrentTimeIndicatorBase.defaultProps = {
  updateInterval: 60000,
  shadePreviousCells: false,
  shadePreviousAppointments: false,
};

CurrentTimeIndicatorBase.components = {
  indicatorComponent: 'Indicator',
};

// tslint:disable-next-line: max-line-length
/** A plugin that renders the current time indicator and the shading that covers appointments and timetable cells up to the current time. */
export const CurrentTimeIndicator: React.ComponentType<
  CurrentTimeIndicatorProps
> = CurrentTimeIndicatorBase;
