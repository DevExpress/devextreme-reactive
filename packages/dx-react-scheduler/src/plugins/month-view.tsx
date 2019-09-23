import * as React from 'react';
import {
  Plugin,
  TemplatePlaceholder,
  PluginComponents,
} from '@devexpress/dx-react-core';
import {
  monthCellsData,
  horizontalTimeTableRects,
} from '@devexpress/dx-scheduler-core';
import { BasicView } from './basic-view';

import { MonthViewProps, ViewState } from '../types';

const timeTableRects = (
  appointments, startViewDate, endViewDate, excludedDays,
  viewCellsData, cellDuration, cellElementsMeta,
) => horizontalTimeTableRects(
  appointments, startViewDate, endViewDate,
  viewCellsData, cellElementsMeta,
);

const TYPE = 'month';
const viewCellsDataBaseComputed = (
  cellDuration, startDayHour, endDayHour,
) => ({ currentDate, firstDayOfWeek, intervalCount }) => {
  return monthCellsData(
    currentDate, firstDayOfWeek,
    intervalCount!, Date.now(),
  );
};

class MonthViewBase extends React.PureComponent<MonthViewProps, ViewState> {
  static defaultProps: Partial<MonthViewProps> = {
    intervalCount: 1,
    firstDayOfWeek: 0,
    name: 'Month',
  };

  static components: PluginComponents = {
    layoutComponent: 'Layout',
    appointmentLayerComponent: 'AppointmentLayer',
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
      layoutComponent: Layout,
      dayScaleLayoutComponent: DayScale,
      dayScaleCellComponent: DayScaleCell,
      dayScaleRowComponent: DayScaleRow,
      timeTableLayoutComponent: TimeTableLayout,
      timeTableRowComponent,
      timeTableCellComponent: TimeTableCell,
      appointmentLayerComponent: AppointmentLayer,
      name: viewName,
      intervalCount,
      displayName,
      firstDayOfWeek,
    } = this.props;

    return (
      <Plugin
        name="MonthView"
      >
        <BasicView
          viewCellsDataBaseComputed={viewCellsDataBaseComputed}
          type={TYPE}
          name={viewName}
          intervalCount={intervalCount}
          displayName={displayName}
          firstDayOfWeek={firstDayOfWeek}

          dayScaleLayoutComponent={DayScale}
          dayScaleCellComponent={DayScaleCell}
          dayScaleRowComponent={DayScaleRow}

          timeTableCellComponent={TimeTableCell}
          timeTableLayoutComponent={TimeTableLayout}
          timeTableRowComponent={timeTableRowComponent}

          appointmentLayerComponent={AppointmentLayer}

          timeTableRects={timeTableRects}

          layoutComponent={Layout}
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
