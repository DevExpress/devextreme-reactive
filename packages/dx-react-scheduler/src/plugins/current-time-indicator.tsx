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

const CurrentTimeIndicatorBase: React.SFC<CurrentTimeIndicatorProps>  & {components: {
  indicatorComponent: string,
}} = ({
  indicatorComponent, shadePreviousAppointments, shadePreviousCells, updateInterval,
}) => {
  const [currentTime, setCurrentTime] = React.useState(Date.now);
  const [indicatorUpdateTimer, setIndicatorUpdateTimer] = React.useState<any>(undefined);

  React.useEffect(() => {
    clearInterval(indicatorUpdateTimer);
    setIndicatorUpdateTimer(setInterval(() => {
      setCurrentTime(Date.now());
    }, updateInterval));
    return () => clearInterval(indicatorUpdateTimer);
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

/** A plugin that renders the Scheduler's button which sets the current date to today's date. */
export const CurrentTimeIndicator: React.ComponentType<
  CurrentTimeIndicatorProps
> = CurrentTimeIndicatorBase;
