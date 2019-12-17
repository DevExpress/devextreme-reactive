import * as React from 'react';
import {
  Plugin, Template, TemplatePlaceholder, TemplateConnector, PluginComponents,
} from '@devexpress/dx-react-core';
import { createClickHandlers } from '@devexpress/dx-core';
import {
  POSITION_START, POSITION_END, VERTICAL_TYPE,
  getVerticalRectByDates, calculateRectByDateIntervals,
  getAppointmentStyle, HORIZONTAL_TYPE, getHorizontalRectByDates,
} from '@devexpress/dx-scheduler-core';

import { AppointmentsProps } from '../types';

const AppointmentPlaceholder = params => <TemplatePlaceholder name="appointment" params={params} />;

const pluginDependencies = [
  { name: 'DayView', optional: true },
  { name: 'WeekView', optional: true },
  { name: 'MonthView', optional: true },
];

class AppointmentsBase extends React.PureComponent<AppointmentsProps> {
  static components: PluginComponents = {
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
          name="timeTableAppointmentLayer"
        >
          <TemplateConnector>
            {({
              timeTableAppointments, viewCellsData, timeTableElementsMeta, currentView,
              startViewDate, endViewDate, cellDuration,
            }) => {
              if (!timeTableElementsMeta.getCellRects) return null;
              if (currentView.type !== 'month') {
                const rects = calculateRectByDateIntervals(
                  {
                    growDirection: VERTICAL_TYPE,
                    multiline: false,
                  },
                  timeTableAppointments,
                  getVerticalRectByDates,
                  {
                    startViewDate,
                    endViewDate,
                    viewCellsData,
                    cellDuration,
                    cellElementsMeta: timeTableElementsMeta,
                  },
                );
                return rects.map(({
                  dataItem, type: rectType, fromPrev, toNext,
                  durationType, resources, ...geometry
                }, index) => (
                  <AppointmentPlaceholder
                    key={index.toString()}
                    type={rectType}
                    data={dataItem}
                    fromPrev={fromPrev}
                    toNext={toNext}
                    durationType={durationType}
                    resources={resources}
                    style={getAppointmentStyle(geometry)}
                  />
                ));
              }
              const rects = calculateRectByDateIntervals(
                {
                  growDirection: HORIZONTAL_TYPE,
                  multiline: true,
                },
                timeTableAppointments,
                getHorizontalRectByDates,
                {
                  startViewDate,
                  endViewDate,
                  viewCellsData,
                  cellElementsMeta: timeTableElementsMeta,
                },
              );
              return rects.map(({
                dataItem, type: rectType, fromPrev, toNext,
                durationType, resources, ...geometry
              }, index) => (
                <AppointmentPlaceholder
                  key={index.toString()}
                  type={rectType}
                  data={dataItem}
                  fromPrev={fromPrev}
                  toNext={toNext}
                  durationType={durationType}
                  resources={resources}
                  style={getAppointmentStyle(geometry)}
                />
              ));
            }}
          </TemplateConnector>
        </Template>
        <Template
          name="allDayAppointmentLayer"
        >
          <TemplateConnector>
            {({
              allDayAppointments, viewCellsData, timeTableElementsMeta,
              startViewDate, endViewDate,
            }) => {
              if (!timeTableElementsMeta.getCellRects || !allDayAppointments) return null;
              const rects = calculateRectByDateIntervals(
                {
                  growDirection: HORIZONTAL_TYPE,
                  multiline: false,
                },
                allDayAppointments,
                getHorizontalRectByDates,
                {
                  startViewDate,
                  endViewDate,
                  viewCellsData,
                  cellElementsMeta: timeTableElementsMeta,
                },
              );
              return rects.map(({
                dataItem, type: rectType, fromPrev, toNext,
                durationType, resources, ...geometry
              }, index) => (
                <AppointmentPlaceholder
                  key={index.toString()}
                  type={rectType}
                  data={dataItem}
                  fromPrev={fromPrev}
                  toNext={toNext}
                  durationType={durationType}
                  resources={resources}
                  style={getAppointmentStyle(geometry)}
                />
              ));
            }}
          </TemplateConnector>
        </Template>
        <Template
          name="appointment"
        >
          {({ style, ...params }: any) => (
            <TemplateConnector>
              {({ formatDate }) => (
                <Container style={style}>
                  <TemplatePlaceholder
                    name="appointmentTop"
                    params={{ data: params.data, type: params.type, slice: params.fromPrev }}
                  />
                  <TemplatePlaceholder
                    name="appointmentContent"
                    params={{ ...params, formatDate }}
                  />
                  <TemplatePlaceholder
                    name="appointmentBottom"
                    params={{ data: params.data, type: params.type, slice: params.toNext }}
                  />
                </Container>
              )}
            </TemplateConnector>
          )}
        </Template>

        <Template name="appointmentContent">
          {({
            onClick, onDoubleClick, formatDate,
            data, type, fromPrev, toNext,
            durationType, resources,
            ...restParams
          }: any) => (
            <Appointment
              data={data}
              resources={resources}
              {...createClickHandlers(onClick, onDoubleClick)}
              {...restParams}
            >
              {fromPrev && <SplitIndicator position={POSITION_START} appointmentType={type} />}
              <AppointmentContent
                data={data}
                type={type}
                durationType={durationType}
                recurringIconComponent={recurringIconComponent}
                formatDate={formatDate}
                resources={resources}
              />
              {toNext && <SplitIndicator position={POSITION_END} appointmentType={type} />}
            </Appointment>
          )}
        </Template>
      </Plugin>
    );
  }
}

/** A plugin that renders appointments. */
export const Appointments: React.ComponentType<AppointmentsProps> = AppointmentsBase;
