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
  startViewDate as startViewDateCore,
  endViewDate as endViewDateCore,
  availableViewNames as availableViewNamesCore,
  getAppointmentStyle,
  verticalTimeTableRects,
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
  state: ViewState = {
    rects: [],
    scrollingAPI: {},
    timeTableElementsMeta: {},
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

  scrollingAPI = memoize((viewName, scrollingAPI) => (getters) => {
    return computed(
      getters, viewName!, () => scrollingAPI, getters.scrollingAPI,
    );
  });

  timeTableElementsMeta = memoize((viewName, timeTableElementsMeta) => (getters) => {
    return computed(
      getters, viewName!, () => timeTableElementsMeta, getters.timeTableElementsMeta,
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

  availableViewNames = memoize(viewName => ({ availableViewNames }) => {
    return availableViewNamesCore(
      availableViewNames, viewName,
    );
  });

  currentView = memoize(viewName => ({ currentView }) => {
    return (
    currentView && currentView.name !== viewName
      ? currentView
      : { name: viewName, type: TYPE }
    );
  });

  calculateRects = memoize((
    appointments, startViewDate, endViewDate, excludedDays, viewCellsData, cellDuration,
  ) => (cellElementsMeta) => {
    const rects = verticalTimeTableRects(
      appointments, startViewDate, endViewDate, excludedDays,
      viewCellsData, cellDuration, cellElementsMeta,
    );

    this.setState({ rects, timeTableElementsMeta: cellElementsMeta });
  });

  setScrollingAPI = (scrollingAPI) => {
    this.setState({ scrollingAPI });
  }

  render() {
    const {
      layoutComponent: Layout,
      // layoutContainerComponent: LayoutContainer,
      dayScaleEmptyCellComponent: DayScaleEmptyCell,
      timeScaleLayoutComponent: TimeScale,
      timeScaleRowComponent: TimeScaleRow,
      timeScaleCellComponent: TimeScaleCell,
      dayScaleLayoutComponent: DayScale,
      dayScaleCellComponent: DayScaleCell,
      dayScaleRowComponent: DayScaleRow,
      timeTableContainerComponent: TimeTableContainer,
      timeTableLayoutComponent,
      timeTableRowComponent,
      timeTableCellComponent: TimeTableCell,
      cellDuration,
      excludedDays,
      name: viewName,
      intervalCount,
      firstDayOfWeek,
      startDayHour,
      endDayHour,
      appointmentLayerComponent: AppointmentLayer,
    } = this.props;
    const { rects, timeTableElementsMeta, scrollingAPI } = this.state;

    return (
      <Plugin
        name="WeekView"
      >
        <Getter name="availableViewNames" computed={this.availableViewNames(viewName)} />
        <Getter name="currentView" computed={this.currentView(viewName)} />

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

        <Getter
          name="timeTableElementsMeta"
          computed={this.timeTableElementsMeta(viewName, timeTableElementsMeta)}
        />
        <Getter
          name="scrollingAPI"
          computed={this.scrollingAPI(viewName, scrollingAPI)}
        />

        <Template name="body">
          <TemplateConnector>
            {({ currentView, layoutHeight }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              return (
                <Layout
                  dayScaleComponent={DayScalePlaceholder}
                  dayScaleEmptyCellComponent={DayScaleEmptyCellPlaceholder}
                  timeTableComponent={TimeTablePlaceholder}
                  timeScaleComponent={TimeScalePlaceholder}
                  setScrollingAPI={this.setScrollingAPI}
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
                  <TimeTableContainer
                    layoutComponent={timeTableLayoutComponent}
                    cellsData={viewCellsData}
                    rowComponent={timeTableRowComponent}
                    cellComponent={CellPlaceholder}
                    formatDate={formatDate}
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
