import * as React from 'react';
import {
  Plugin, Template, TemplatePlaceholder, TemplateConnector, PluginComponents,
} from '@devexpress/dx-react-core';
import { createClickHandlers, memoize } from '@devexpress/dx-core';
import {
  POSITION_START, POSITION_END, VERTICAL_TYPE,
  getVerticalRectByAppointmentData, calculateRectByDateAndGroupIntervals,
  getAppointmentStyle, HORIZONTAL_TYPE, getHorizontalRectByAppointmentData,
  isAllDayElementsMetaActual, isTimeTableElementsMetaActual,
  HORIZONTAL_GROUP_ORIENTATION, VIEW_TYPES,
} from '@devexpress/dx-scheduler-core';

import { AppointmentsProps } from '../types';

const AppointmentPlaceholder = params => <TemplatePlaceholder name="appointment" params={params} />;

const renderAppointments = rects => rects.map(({
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

  updateTimeTableAppointments = memoize((
    timeTableAppointments, viewCellsData, timeTableElementsMeta, currentView,
    startViewDate, endViewDate, cellDuration, groups, groupOrientation, groupByDate,
  ) => {
    if (!isTimeTableElementsMetaActual(timeTableElementsMeta)) return null;
    let appointmentType = { growDirection: VERTICAL_TYPE, multiline: false };
    let getRects = getVerticalRectByAppointmentData as any;
    if (currentView.type === VIEW_TYPES.MONTH) {
      appointmentType = { growDirection: HORIZONTAL_TYPE, multiline: true };
      getRects = getHorizontalRectByAppointmentData;
    }
    return renderAppointments(calculateRectByDateAndGroupIntervals(
      appointmentType, timeTableAppointments, getRects,
      {
        startViewDate, endViewDate, cellDuration,
        viewCellsData, cellElementsMeta: timeTableElementsMeta,
      },
      groupOrientation ? groupOrientation(currentView?.name) : HORIZONTAL_GROUP_ORIENTATION,
      groupByDate?.(currentView?.name),
      groups ? groups[groups.length - 1].length : 1,
    ));
  });

  updateAllDayAppointments = memoize((
    allDayAppointments, viewCellsData, allDayElementsMeta, currentView,
    startViewDate, endViewDate, groups, groupOrientation, groupByDate,
  ) => {
    if (!isAllDayElementsMetaActual(viewCellsData, allDayAppointments)) return null;
    return renderAppointments(calculateRectByDateAndGroupIntervals(
      { growDirection: HORIZONTAL_TYPE,  multiline: false },
      allDayAppointments,
      getHorizontalRectByAppointmentData,
      {
        startViewDate, endViewDate,
        viewCellsData, cellElementsMeta: allDayElementsMeta,
      },
      groupOrientation ? groupOrientation(currentView?.name) : HORIZONTAL_GROUP_ORIENTATION,
      groupByDate?.(currentView?.name),
      groups ? groups[groups.length - 1].length : 1,
    ));
  });

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
              startViewDate, endViewDate, cellDuration, groupOrientation,  groups, groupByDate,
            }) => this.updateTimeTableAppointments(
              timeTableAppointments, viewCellsData, timeTableElementsMeta, currentView,
              startViewDate, endViewDate, cellDuration, groups, groupOrientation, groupByDate,
            )}
          </TemplateConnector>
        </Template>
        <Template
          name="allDayAppointmentLayer"
        >
          <TemplateConnector>
            {({
              allDayAppointments, viewCellsData, allDayElementsMeta,
              startViewDate, endViewDate, groupOrientation, currentView, groups, groupByDate,
            }) => this.updateAllDayAppointments(
              allDayAppointments, viewCellsData, allDayElementsMeta, currentView,
              startViewDate, endViewDate, groups, groupOrientation, groupByDate,
            )}
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
