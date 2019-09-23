import * as React from 'react';
import {
  Template,
  Plugin,
  TemplateConnector,
  TemplatePlaceholder,
  PluginComponents,
} from '@devexpress/dx-react-core';
import {
  viewCellsData as viewCellsDataCore,
  verticalTimeTableRects,
} from '@devexpress/dx-scheduler-core';
import { BasicView } from './basic-view';

import { WeekViewProps, ViewState } from '../types';

const DAYS_IN_WEEK = 7;
const TYPE = 'week';
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
const DayScaleEmptyCellPlaceholder = () => <TemplatePlaceholder name="dayScaleEmptyCell" />;
const TimeScalePlaceholder = () => <TemplatePlaceholder name="timeScale" />;

class WeekViewBase extends React.PureComponent<WeekViewProps, ViewState> {
  static defaultProps: Partial<WeekViewProps> = {
    startDayHour: 0,
    endDayHour: 24,
    cellDuration: 30,
    intervalCount: 1,
    firstDayOfWeek: 0,
    excludedDays: [],
    name: 'Week',
  };

  static components: PluginComponents = {
    layoutComponent: 'Layout',
    layoutContainerComponent: 'LayoutContainer',
    appointmentLayerComponent: 'AppointmentLayer',
    dayScaleEmptyCellComponent: 'DayScaleEmptyCell',
    timeScaleLayoutComponent: 'TimeScaleLayout',
    timeScaleCellComponent: 'TimeScaleCell',
    timeScaleRowComponent: 'TimeScaleRow',
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
      dayScaleEmptyCellComponent: DayScaleEmptyCell,
      timeScaleLayoutComponent: TimeScale,
      timeScaleRowComponent: TimeScaleRow,
      timeScaleCellComponent: TimeScaleCell,
      dayScaleLayoutComponent: DayScale,
      dayScaleCellComponent: DayScaleCell,
      dayScaleRowComponent: DayScaleRow,
      timeTableLayoutComponent: TimeTableLayout,
      timeTableRowComponent,
      timeTableCellComponent: TimeTableCell,
      cellDuration,
      excludedDays,
      name: viewName,
      appointmentLayerComponent: AppointmentLayer,
      intervalCount,
      displayName,
      startDayHour,
      endDayHour,
      firstDayOfWeek,
    } = this.props;

    return (
      <Plugin
        name="WeekView"
      >
        <BasicView
          viewCellsDataBaseComputed={viewCellsDataBaseComputed}
          type={TYPE}
          cellDuration={cellDuration}
          name={viewName}
          firstDayOfWeek={firstDayOfWeek}
          intervalCount={intervalCount}
          displayName={displayName}
          startDayHour={startDayHour}
          endDayHour={endDayHour}
          excludedDays={excludedDays}

          dayScaleLayoutComponent={DayScale}
          dayScaleCellComponent={DayScaleCell}
          dayScaleRowComponent={DayScaleRow}

          timeTableCellComponent={TimeTableCell}
          timeTableLayoutComponent={TimeTableLayout}
          timeTableRowComponent={timeTableRowComponent}

          appointmentLayerComponent={AppointmentLayer}

          timeTableRects={verticalTimeTableRects}

          layoutComponent={Layout}
          layoutProps={{
            timeScaleComponent: TimeScalePlaceholder,
            dayScaleEmptyCellComponent: DayScaleEmptyCellPlaceholder,
          }}
        />

        <Template name="dayScaleEmptyCell">
          <TemplateConnector>
            {({ currentView }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              return (
                <DayScaleEmptyCell />
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="timeScale">
          <TemplateConnector>
            {({ currentView, viewCellsData, formatDate }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              return (
                <TimeScale
                  rowComponent={TimeScaleRow}
                  cellComponent={TimeScaleCell}
                  cellsData={viewCellsData}
                  formatDate={formatDate}
                />
              );
            }}
          </TemplateConnector>
        </Template>
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
