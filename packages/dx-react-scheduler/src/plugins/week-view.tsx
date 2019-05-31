import * as React from 'react';
import {
  Template,
  Plugin,
  Getter,
  TemplateConnector,
  TemplatePlaceholder,
  PluginComponents,
  ComputedFn,
  WritableRefObject,
} from '@devexpress/dx-react-core';
import {
  computed,
  viewCellsData as viewCellsDataCore,
  calculateRectByDateIntervals,
  calculateWeekDateIntervals,
  getVerticalRectByDates,
  startViewDate as startViewDateCore,
  endViewDate as endViewDateCore,
  availableViewNames as availableViewNamesCore,
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
const cellPlaceholder = params => <TemplatePlaceholder name="cell" params={params} />;
const AppointmentPlaceholder = params => <TemplatePlaceholder name="appointment" params={params} />;
const TimeTablePlaceholder = () => <TemplatePlaceholder name="main" />;
const DayScalePlaceholder = () => <TemplatePlaceholder name="navbar" />;
const DayScaleEmptyCellPlaceholder = () => <TemplatePlaceholder name="dayScaleEmptyCell" />;
const SidebarPlaceholder = () => <TemplatePlaceholder name="sidebar" />;

class WeekViewBase extends React.PureComponent<WeekViewProps, ViewState> {
  timeTable: WritableRefObject<HTMLElement> = React.createRef();
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
    timeTableContainerComponent: 'TimeTableContainer',
    timeTableLayoutComponent: 'TimeTableLayout',
    timeTableCellComponent: 'TimeTableCell',
    timeTableRowComponent: 'TimeTableRow',
  };

  timeTableElementComputed = () => this.timeTable;
  layoutElementComputed = () => this.layout;
  layoutHeaderElementComputed = () => this.layoutHeader;

  layoutHeaderElement = viewName => (getters) => {
    return computed(
      getters, viewName, this.layoutHeaderElementComputed, getters.layoutHeaderElement,
    );
  }
  memoLayoutHeaderElement = memoize(this.layoutHeaderElement);

  layoutElement = viewName => (getters) => {
    return computed(
      getters, viewName, this.layoutElementComputed, getters.layoutElement,
    );
  }
  memoLayoutElement = memoize(this.layoutElement);

  timeTableElement = viewName => (getters) => {
    return computed(
      getters, viewName!, this.timeTableElementComputed, getters.timeTableElement,
    );
  }
  memoTimeTableElement = memoize(this.timeTableElement);

  excludedDaysComputed = (viewName, excludedDays) => (getters) => {
    return computed(
      getters, viewName!, () => excludedDays, getters.excludedDays,
    );
  }
  memoExcludedDays = memoize(this.excludedDaysComputed);

  firstDayOfWeekComputed = (viewName, firstDayOfWeek) => (getters) => {
    return computed(
      getters, viewName!, () => firstDayOfWeek, getters.firstDayOfWeek,
    );
  }
  memoFirstDayOfWeek = memoize(this.firstDayOfWeekComputed);

  intervalCountComputed = (viewName, intervalCount) => (getters) => {
    return computed(
      getters, viewName!, () => intervalCount, getters.intervalCount,
    );
  }
  memoIntervalCount = memoize(this.intervalCountComputed);

  viewCellsDataBaseComputed = (
    cellDuration, startDayHour, endDayHour,
  ) => ({ firstDayOfWeek, intervalCount, excludedDays, currentDate }) => {
    return viewCellsDataCore(
      currentDate, firstDayOfWeek,
      intervalCount! * DAYS_IN_WEEK, excludedDays!,
      startDayHour!, endDayHour!, cellDuration!,
      Date.now(),
    );
  }

  viewCellsDataComputed = (viewName, cellDuration, startDayHour, endDayHour) => (getters) => {
    return computed(
      getters,
      viewName,
      this.viewCellsDataBaseComputed(cellDuration, startDayHour, endDayHour),
      getters.viewCellsData,
    );
  }
  memoViewCellsData = memoize(this.viewCellsDataComputed);

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

  availableViewNamesComputed = viewName => ({ availableViewNames }) => {
    return availableViewNamesCore(
      availableViewNames, viewName,
    );
  }
  memoAvailableViewNames = memoize(this.availableViewNamesComputed);

  currentViewComputed = viewName => ({ currentView }) => {
    return (
    currentView && currentView.name !== viewName
      ? currentView
      : { name: viewName, type: TYPE }
    );
  }
  memoCurrentView = memoize(this.currentViewComputed);

  setTimeTableRef = (timeTableRef) => {
    this.timeTable.current = timeTableRef;
  }

  calculateRects = (
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
  }
  memoCalculateRects =  memoize(this.calculateRects);

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
      timeTableContainerComponent: TimeTableContainer,
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
    } = this.props;
    const { rects } = this.state;

    return (
      <Plugin
        name="WeekView"
      >
        <Getter name="availableViewNames" computed={this.memoAvailableViewNames(viewName)} />
        <Getter name="currentView" computed={this.memoCurrentView(viewName)} />

        <Getter name="intervalCount" computed={this.memoIntervalCount(viewName, intervalCount)} />
        <Getter
          name="firstDayOfWeek"
          computed={this.memoFirstDayOfWeek(viewName, firstDayOfWeek)}
        />
        <Getter name="excludedDays" computed={this.memoExcludedDays(viewName, excludedDays)} />
        <Getter
          name="viewCellsData"
          computed={this.memoViewCellsData(viewName, cellDuration, startDayHour, endDayHour)}
        />
        <Getter name="startViewDate" computed={this.startViewDateComputed} />
        <Getter name="endViewDate" computed={this.endViewDateComputed} />

        <Getter name="timeTableElement" computed={this.memoTimeTableElement(viewName)} />
        <Getter name="layoutElement" computed={this.memoLayoutElement(viewName)} />
        <Getter name="layoutHeaderElement" computed={this.memoLayoutHeaderElement(viewName)} />

        <Template name="body">
          <TemplateConnector>
            {({ currentView }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              return (
                <ViewLayout
                  dayScaleComponent={DayScalePlaceholder}
                  dayScaleEmptyCellComponent={DayScaleEmptyCellPlaceholder}
                  timeTableComponent={TimeTablePlaceholder}
                  timeScaleComponent={SidebarPlaceholder}
                  layoutRef={this.layout}
                  layoutHeaderRef={this.layoutHeader}
                />
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="navbar">
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

        <Template name="sidebar">
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

        <Template name="main">
          <TemplateConnector>
            {({
              formatDate,
              currentView,
              viewCellsData,
              appointments, startViewDate, endViewDate,
            }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              debugger
              const setRects = this.memoCalculateRects(
                appointments, startViewDate, endViewDate, excludedDays, viewCellsData, cellDuration,
              );

              return (
                <React.Fragment>
                  <TimeTable
                    cellsData={viewCellsData}
                    rowComponent={TimeTableRow}
                    cellComponent={cellPlaceholder}
                    formatDate={formatDate}
                    tableRef={this.setTimeTableRef}
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
