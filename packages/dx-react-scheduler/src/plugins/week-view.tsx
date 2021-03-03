import * as React from 'react';
import {
  Plugin,
  PluginComponents,
} from '@devexpress/dx-react-core';
import {
  viewCellsData as viewCellsDataCore,
  VIEW_TYPES,
} from '@devexpress/dx-scheduler-core';
import { WeekViewProps } from '../types';
import { VerticalView } from './vertical-view';

const DAYS_IN_WEEK = 7;
const viewCellsDataBaseComputed = (
  cellDuration, startDayHour, endDayHour,
) => ({ firstDayOfWeek, intervalCount, excludedDays, currentDate }) => {
  return viewCellsDataCore(
    currentDate, firstDayOfWeek,
    intervalCount! * DAYS_IN_WEEK, excludedDays!,
    startDayHour!, endDayHour!, cellDuration!,
    Date.now(),
  );
};

class WeekViewBase extends React.PureComponent<WeekViewProps> {
  static defaultProps: Partial<WeekViewProps> = {
    startDayHour: 0,
    endDayHour: 24,
    cellDuration: 30,
    intervalCount: 1,
    excludedDays: [],
    name: 'Week',
  };

  static components: PluginComponents = {
    layoutComponent: 'Layout',
    layoutContainerComponent: 'LayoutContainer',
    appointmentLayerComponent: 'AppointmentLayer',
    dayScaleEmptyCellComponent: 'DayScaleEmptyCell',
    timeScaleLayoutComponent: 'TimeScaleLayout',
    timeScaleLabelComponent: 'TimeScaleLabel',
    timeScaleTickCellComponent: 'TimeScaleTickCell',
    timeScaleTicksRowComponent: 'TimeScaleTicksRow',
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
      timeScaleLayoutComponent,
      timeScaleLabelComponent,
      timeScaleTickCellComponent,
      timeScaleTicksRowComponent,
      dayScaleLayoutComponent,
      dayScaleCellComponent,
      dayScaleRowComponent,
      timeTableLayoutComponent,
      timeTableRowComponent,
      timeTableCellComponent,
      cellDuration,
      excludedDays,
      name: viewName,
      appointmentLayerComponent,
      intervalCount,
      displayName,
      startDayHour,
      endDayHour,
    } = this.props;

    return (
      <Plugin
        name="WeekView"
      >
        <VerticalView
          viewCellsDataComputed={viewCellsDataBaseComputed}
          type={VIEW_TYPES.WEEK}
          cellDuration={cellDuration}
          name={viewName}
          intervalCount={intervalCount}
          displayName={displayName}
          startDayHour={startDayHour}
          endDayHour={endDayHour}
          excludedDays={excludedDays}
          dayScaleEmptyCellComponent={dayScaleEmptyCellComponent}
          dayScaleLayoutComponent={dayScaleLayoutComponent}
          dayScaleCellComponent={dayScaleCellComponent}
          dayScaleRowComponent={dayScaleRowComponent}
          timeTableCellComponent={timeTableCellComponent}
          timeTableLayoutComponent={timeTableLayoutComponent}
          timeTableRowComponent={timeTableRowComponent}
          appointmentLayerComponent={appointmentLayerComponent}
          layoutComponent={layoutComponent}
          timeScaleLayoutComponent={timeScaleLayoutComponent}
          timeScaleLabelComponent={timeScaleLabelComponent}
          timeScaleTickCellComponent={timeScaleTickCellComponent}
          timeScaleTicksRowComponent={timeScaleTicksRowComponent}
        />
      </Plugin>
    );
  }
}

// tslint:disable: max-line-length
/***
 * A plugin that renders the Scheduler's week view. This plugin arranges appointments from top to bottom.
 * If their time intervals overlap, their width is decreased and they are placed next to each other.
 * */
export const WeekView: React.ComponentType<WeekViewProps> = WeekViewBase;
