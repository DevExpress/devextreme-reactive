import * as React from 'react';
import {
  Template,
  Plugin,
  TemplateConnector,
  TemplatePlaceholder,
  Getter,
} from '@devexpress/dx-react-core';
import {
  calculateWeekDateIntervals,
  getTimeTableHeight,
  timeCellsData as timeCellsDataCore,
  computed,
} from '@devexpress/dx-scheduler-core';
import { BasicView } from './basic-view';
import { CommonVerticalViewProps } from '../types';
import { memoize } from '@devexpress/dx-core';

const calculateAppointmentsIntervalsBaseComputed = cellDuration => ({
  appointments, startViewDate, endViewDate, excludedDays,
}) => calculateWeekDateIntervals(
  appointments, startViewDate, endViewDate, excludedDays, cellDuration,
);
const timeCellsDataComputed = (startDayHour, endDayHour) => ({
  viewCellsData, cellDuration,
}) => timeCellsDataCore(viewCellsData, startDayHour, endDayHour, cellDuration, Date.now());

const TimeScalePlaceholder = () => <TemplatePlaceholder name="timeScale" />;

class VericalViewBase extends React.PureComponent<CommonVerticalViewProps> {
  timeCellsDataComputed = memoize((viewName, startDayHour, endDayHour) => getters => computed(
    getters,
    viewName,
    timeCellsDataComputed(startDayHour, endDayHour),
    getters.timeCellsData,
  ));

  render() {
    const {
      layoutComponent,
      dayScaleEmptyCellComponent,
      timeScaleLayoutComponent: TimeScale,
      timeScaleLabelComponent: TimeScaleLabel,
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
      viewCellsDataComputed,
      type,
    } = this.props;

    return (
      <Plugin
        name="WeekView"
      >
        <BasicView
          viewCellsDataComputed={viewCellsDataComputed}
          type={type}
          cellDuration={cellDuration}
          name={viewName}
          intervalCount={intervalCount}
          displayName={displayName}
          startDayHour={startDayHour}
          endDayHour={endDayHour}
          excludedDays={excludedDays}
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
          layoutProps={{
            timeScaleComponent: TimeScalePlaceholder,
          }}
        />

        <Getter
          name="timeCellsData"
          computed={this.timeCellsDataComputed(viewName, startDayHour, endDayHour)}
        />

        <Template name="timeScale">
          {(params: any) => (
            <TemplateConnector>
              {({
                currentView, timeCellsData, groups, formatDate,
                groupOrientation: getGroupOrientation,
                timeTableElementsMeta,
              }) => {
                if (currentView.name !== viewName) return <TemplatePlaceholder />;
                const groupOrientation = getGroupOrientation?.(viewName);

                return (
                  <TimeScale
                    labelComponent={TimeScaleLabel}
                    tickCellComponent={timeScaleTickCellComponent}
                    rowComponent={timeScaleTicksRowComponent}
                    cellsData={timeCellsData}
                    formatDate={formatDate}
                    groups={groups}
                    groupOrientation={groupOrientation}
                    height={getTimeTableHeight(timeTableElementsMeta)}
                    {...params}
                  />
                );
              }}
            </TemplateConnector>
          )}
        </Template>
      </Plugin>
    );
  }
}

export const VerticalView: React.ComponentType<CommonVerticalViewProps> = VericalViewBase;
