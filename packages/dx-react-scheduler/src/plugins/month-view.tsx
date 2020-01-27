import * as React from 'react';
import { Plugin, PluginComponents } from '@devexpress/dx-react-core';
import { monthCellsData, calculateMonthDateIntervals } from '@devexpress/dx-scheduler-core';
import { BasicView } from './basic-view';
import { MonthViewProps } from '../types';

const TYPE = 'month';
const viewCellsDataBaseComputed = (
  cellDuration, startDayHour, endDayHour,
) => ({ currentDate, firstDayOfWeek, intervalCount }) => monthCellsData(
  currentDate, firstDayOfWeek, intervalCount!, Date.now(),
);
const calculateAppointmentsIntervalsBaseComputed = cellDuration => ({
  appointments, startViewDate, endViewDate, excludedDays,
}) => calculateMonthDateIntervals(
  appointments, startViewDate, endViewDate,
);

class MonthViewBase extends React.PureComponent<MonthViewProps> {
  static defaultProps: Partial<MonthViewProps> = {
    intervalCount: 1,
    name: 'Month',
  };

  static components: PluginComponents = {
    layoutComponent: 'Layout',
    appointmentLayerComponent: 'AppointmentLayer',
    dayScaleEmptyCellComponent: 'DayScaleEmptyCell',
    dayScaleLayoutComponent: 'DayScaleLayout',
    dayScaleCellComponent: 'DayScaleCell',
    dayScaleRowComponent: 'DayScaleRow',
    timeTableContainerComponent: 'TimeTableContainer',
    timeTableLayoutComponent: 'TimeTableLayout',
    timeTableCellComponent: 'TimeTableCell',
    timeTableRowComponent: 'TimeTableRow',
  };

  render() {
    const {
      layoutComponent,
      dayScaleEmptyCellComponent,
      dayScaleLayoutComponent,
      dayScaleCellComponent,
      dayScaleRowComponent,
      timeTableLayoutComponent,
      timeTableRowComponent,
      timeTableCellComponent,
      appointmentLayerComponent,
      name: viewName,
      intervalCount,
      displayName,
    } = this.props;

    return (
      <Plugin
        name="MonthView"
      >
        <BasicView
          viewCellsDataComputed={viewCellsDataBaseComputed}
          type={TYPE}
          name={viewName}
          intervalCount={intervalCount}
          displayName={displayName}
          calculateAppointmentsIntervals={calculateAppointmentsIntervalsBaseComputed}
          dayScaleEmptyCellComponent={dayScaleEmptyCellComponent}
          dayScaleLayoutComponent={dayScaleLayoutComponent}
          dayScaleCellComponent={dayScaleCellComponent}
          dayScaleRowComponent={dayScaleRowComponent}
          timeTableCellComponent={timeTableCellComponent}
          timeTableLayoutComponent={timeTableLayoutComponent}
          timeTableRowComponent={timeTableRowComponent}
          appointmentLayerComponent={appointmentLayerComponent}
          layoutComponent={layoutComponent}
        />
      </Plugin>
    );
  }
}

// tslint:disable: max-line-length
/***
 * A plugin that renders Scheduler data for a month. This plugin arranges appointments from left to right.
 * An appointment's size depends on its duration in days.
 * However, it occupies the entire day cell if an appointment lasts only for several hours or minutes.
 * The time scale and all-day panel are not available in this view.
 * */
export const MonthView: React.ComponentType<MonthViewProps> = MonthViewBase;
