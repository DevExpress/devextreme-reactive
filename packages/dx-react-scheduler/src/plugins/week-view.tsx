import * as React from 'react';
import {
  Template,
  Plugin,
  Getter,
  TemplateConnector,
  TemplatePlaceholder,
  PluginComponents,
  ComputedFn,
} from '@devexpress/dx-react-core';
import {
  computed,
  viewCellsData as viewCellsDataCore,
  calculateRectByDateIntervals,
  calculateWeekDateIntervals,
  getVerticalRectByDates,
  startViewDate as startViewDateCore,
  endViewDate as endViewDateCore,
  availableViews as availableViewsCore,
  VERTICAL_TYPE,
  getAppointmentStyle,
} from '@devexpress/dx-scheduler-core';
import { memoize } from '@devexpress/dx-core';

import { WeekViewProps, ViewState } from '../types';

const DAYS_IN_WEEK = 7;
const TYPE = 'week';
const endViewDateBaseComputed: ComputedFn = ({
  viewCellsData,
}) => endViewDateCore(viewCellsData);
const startViewDateBaseComputed: ComputedFn = ({
  viewCellsData,
}) => startViewDateCore(viewCellsData);
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
const CellPlaceholder = params => <TemplatePlaceholder name="cell" params={params} />;
const AppointmentPlaceholder = params => <TemplatePlaceholder name="appointment" params={params} />;
const TimeTablePlaceholder = () => <TemplatePlaceholder name="timeTable" />;
const DayScalePlaceholder = () => <TemplatePlaceholder name="dayScale" />;
const DayScaleEmptyCellPlaceholder = () => <TemplatePlaceholder name="dayScaleEmptyCell" />;
const TimeScalePlaceholder = () => <TemplatePlaceholder name="timeScale" />;

class WeekViewBase extends React.PureComponent<WeekViewProps, ViewState> {
  timeTable = React.createRef<HTMLElement>();
  layout = React.createRef<HTMLElement>();
  layoutHeader = React.createRef<HTMLElement>();

  state: ViewState = {
    rects: [],
  };

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
    appointmentLayerComponent: 'AppointmentLayer',
    dayScaleEmptyCellComponent: 'DayScaleEmptyCell',
    timeScaleLayoutComponent: 'TimeScaleLayout',
    timeScaleCellComponent: 'TimeScaleCell',
    timeScaleRowComponent: 'TimeScaleRow',
    dayScaleLayoutComponent: 'DayScaleLayout',
    dayScaleCellComponent: 'DayScaleCell',
    dayScaleRowComponent: 'DayScaleRow',
    timeTableLayoutComponent: 'TimeTableLayout',
    timeTableCellComponent: 'TimeTableCell',
    timeTableRowComponent: 'TimeTableRow',
  };

  timeTableElementComputed = () => this.timeTable;
  layoutElementComputed = () => this.layout;
  layoutHeaderElementComputed = () => this.layoutHeader;

  layoutHeaderElement = memoize(viewName => (getters) => {
    return computed(
      getters, viewName, this.layoutHeaderElementComputed, getters.layoutHeaderElement,
    );
  });

  layoutElement = memoize(viewName => (getters) => {
    return computed(
      getters, viewName, this.layoutElementComputed, getters.layoutElement,
    );
  });

  timeTableElement = memoize(viewName => (getters) => {
    return computed(
      getters, viewName!, this.timeTableElementComputed, getters.timeTableElement,
    );
  });

  excludedDays = memoize((viewName, excludedDays) => (getters) => {
    return computed(
      getters, viewName!, () => excludedDays, getters.excludedDays,
    );
  });

  firstDayOfWeek = memoize((viewName, firstDayOfWeek) => (getters) => {
    return computed(
      getters, viewName!, () => firstDayOfWeek, getters.firstDayOfWeek,
    );
  });

  intervalCount = memoize((viewName, intervalCount) => (getters) => {
    return computed(
      getters, viewName!, () => intervalCount, getters.intervalCount,
    );
  });

  viewCellsData = memoize((viewName, cellDuration, startDayHour, endDayHour) => (getters) => {
    return computed(
      getters,
      viewName,
      viewCellsDataBaseComputed(cellDuration, startDayHour, endDayHour),
      getters.viewCellsData,
    );
  });

  endViewDateComputed: ComputedFn = (getters) => {
    const { name: viewName } = this.props;
    return computed(
      getters, viewName!, endViewDateBaseComputed, getters.endViewDate,
    );
  }

  startViewDateComputed: ComputedFn = (getters) => {
    const { name: viewName } = this.props;
    return computed(
      getters, viewName!, startViewDateBaseComputed, getters.startViewDate,
    );
  }

  availableViews = memoize((viewName, viewDisplayName) => ({ availableViews }) => {
    return availableViewsCore(
      availableViews, viewName, viewDisplayName,
    );
  });

  currentView = memoize((viewName, viewDisplayName) => ({ currentView }) => {
    return (
      currentView && currentView.name !== viewName
        ? currentView
        : { name: viewName, type: TYPE, displayName: viewDisplayName }
    );
  });

  calculateRects = memoize((
    appointments, startViewDate, endViewDate, excludedDays, viewCellsData, cellDuration,
  ) => (cellElements) => {
    const intervals = calculateWeekDateIntervals(
      appointments, startViewDate, endViewDate, excludedDays!,
    );

    const rects = calculateRectByDateIntervals(
      {
        growDirection: VERTICAL_TYPE,
        multiline: false,
      },
      intervals,
      getVerticalRectByDates,
      {
        startViewDate,
        endViewDate,
        viewCellsData,
        cellDuration,
        cellElements,
      },
    );

    this.setState({ rects });
  });

  render() {
    const {
      layoutComponent: ViewLayout,
      dayScaleEmptyCellComponent: DayScaleEmptyCell,
      timeScaleLayoutComponent: TimeScale,
      timeScaleRowComponent: TimeScaleRow,
      timeScaleCellComponent: TimeScaleCell,
      dayScaleLayoutComponent: DayScale,
      dayScaleCellComponent: DayScaleCell,
      dayScaleRowComponent: DayScaleRow,
      timeTableLayoutComponent: TimeTable,
      timeTableRowComponent: TimeTableRow,
      timeTableCellComponent: TimeTableCell,
      cellDuration,
      excludedDays,
      name: viewName,
      intervalCount,
      firstDayOfWeek,
      startDayHour,
      endDayHour,
      appointmentLayerComponent: AppointmentLayer,
      displayName,
    } = this.props;
    const { rects } = this.state;
    const viewDisplayName = displayName || viewName;

    return (
      <Plugin
        name="WeekView"
      >
        <Getter name="availableViews" computed={this.availableViews(viewName, viewDisplayName)} />
        <Getter name="currentView" computed={this.currentView(viewName, viewDisplayName)} />

        <Getter name="intervalCount" computed={this.intervalCount(viewName, intervalCount)} />
        <Getter
          name="firstDayOfWeek"
          computed={this.firstDayOfWeek(viewName, firstDayOfWeek)}
        />
        <Getter name="excludedDays" computed={this.excludedDays(viewName, excludedDays)} />
        <Getter
          name="viewCellsData"
          computed={this.viewCellsData(viewName, cellDuration, startDayHour, endDayHour)}
        />
        <Getter name="startViewDate" computed={this.startViewDateComputed} />
        <Getter name="endViewDate" computed={this.endViewDateComputed} />

        <Getter name="timeTableElement" computed={this.timeTableElement(viewName)} />
        <Getter name="layoutElement" computed={this.layoutElement(viewName)} />
        <Getter name="layoutHeaderElement" computed={this.layoutHeaderElement(viewName)} />

        <Template name="body">
          <TemplateConnector>
            {({ currentView, layoutHeight }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              return (
                <ViewLayout
                  dayScaleComponent={DayScalePlaceholder}
                  dayScaleEmptyCellComponent={DayScaleEmptyCellPlaceholder}
                  timeTableComponent={TimeTablePlaceholder}
                  timeScaleComponent={TimeScalePlaceholder}
                  layoutRef={this.layout}
                  layoutHeaderRef={this.layoutHeader}
                  height={layoutHeight}
                />
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="dayScale">
          <TemplateConnector>
            {({ currentView, viewCellsData, formatDate }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              return (
                <DayScale
                  cellComponent={DayScaleCell}
                  rowComponent={DayScaleRow}
                  cellsData={viewCellsData}
                  formatDate={formatDate}
                />
              );
            }}
          </TemplateConnector>
        </Template>

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

        <Template name="timeTable">
          <TemplateConnector>
            {({
              formatDate,
              currentView,
              viewCellsData,
              appointments, startViewDate, endViewDate,
            }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              const setRects = this.calculateRects(
                appointments, startViewDate, endViewDate, excludedDays, viewCellsData, cellDuration,
              );

              return (
                <React.Fragment>
                  <TimeTable
                    cellsData={viewCellsData}
                    rowComponent={TimeTableRow}
                    cellComponent={CellPlaceholder}
                    formatDate={formatDate}
                    tableRef={this.timeTable}
                    setCellElements={setRects}
                  />
                  <AppointmentLayer>
                    {rects.map(({
                      dataItem, type, fromPrev, toNext, ...geometry
                    }, index) => (
                      <AppointmentPlaceholder
                        key={index.toString()}
                        type={type}
                        data={dataItem}
                        fromPrev={fromPrev}
                        toNext={toNext}
                        style={getAppointmentStyle(geometry)}
                      />
                    ))}
                  </AppointmentLayer>
                </React.Fragment>
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="cell">
          {params => (
            <TemplateConnector>
              {({ currentView }) => {
                if (currentView.name !== viewName) return <TemplatePlaceholder params={params} />;
                return (
                  <TimeTableCell {...params} />
                );
              }}
            </TemplateConnector>
          )}
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
