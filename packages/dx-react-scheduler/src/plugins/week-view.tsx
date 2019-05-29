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
    timeTableLayoutComponent: 'TimeTableLayout',
    timeTableCellComponent: 'TimeTableCell',
    timeTableRowComponent: 'TimeTableRow',
  };

  timeTableElementComputed = () => this.timeTable;
  layoutElementComputed = () => this.layout;
  layoutHeaderElementComputed = () => this.layoutHeader;

  layoutHeaderElement = (viewName) => (getters) => {
    // const { name: viewName } = this.props;
    return computed(
      getters, viewName!, this.layoutHeaderElementComputed, getters.layoutHeaderElement,
    );
  }
  memoizedLayoutHeaderElement = memoize(this.layoutHeaderElement);

  layoutElement = (viewName) => (getters) => {
    // const { name: viewName } = this.props;
    return computed(
      getters, viewName!, this.layoutElementComputed, getters.layoutElement,
    );
  }
  memoizedLayoutElement = memoize(this.layoutElement);

  timeTableElement = (viewName) => (getters) => {
    return computed(
      getters, viewName!, this.timeTableElementComputed, getters.timeTableElement,
    );
  }
  memoizedTimeTableElement = memoize(this.timeTableElement);

  excludedDaysComputed = (viewName, excludedDays) => (getters) => {
    // const { name: viewName, excludedDays } = this.props;
    return computed(
      getters, viewName!, () => excludedDays, getters.excludedDays,
    );
  }
  memoizedExcludedDays = memoize(this.excludedDaysComputed);

  firstDayOfWeekComputed = (viewName, firstDayOfWeek) => (getters) => {
    // const { name: viewName, firstDayOfWeek } = this.props;
    return computed(
      getters, viewName!, () => firstDayOfWeek, getters.firstDayOfWeek,
    );
  }
  memoizedFirstDayOfWeek = memoize(this.firstDayOfWeekComputed);

  intervalCountComputed = (viewName, intervalCount) => (getters) => {
    // const { name: viewName, intervalCount } = this.props;
    return computed(
      getters, viewName!, () => intervalCount, getters.intervalCount,
    );
  }
  memoizedIntervalCount = memoize(this.intervalCountComputed);

  viewCellsDataBaseComputed = (cellDuration, startDayHour, endDayHour) => ({ firstDayOfWeek, intervalCount, excludedDays, currentDate }) => {
    return viewCellsDataCore(
      currentDate, firstDayOfWeek,
      intervalCount! * DAYS_IN_WEEK, excludedDays!,
      startDayHour!, endDayHour!, cellDuration!,
      Date.now(),
    );
  }

  viewCellsDataComputed = (viewName, cellDuration, startDayHour, endDayHour) => (getters) => {
    // const { name: viewName } = this.props;
    return computed(
      getters, viewName!, this.viewCellsDataBaseComputed(cellDuration, startDayHour, endDayHour), getters.viewCellsData,
    );
  }
  memoizedViewCellsData = memoize(this.viewCellsDataComputed);

  endViewDateComputed = (getters) => {
    const { name: viewName } = this.props;
    return computed(
      getters, viewName!, endViewDateBaseComputed, getters.endViewDate,
    );
  }
  // memoizedEndViewDate = memoize(this.endViewDateComputed);

  startViewDateComputed = (getters) => {
    const { name: viewName } = this.props;
    return computed(
      getters, viewName!, startViewDateBaseComputed, getters.startViewDate,
    );
  }
  // memoizedStartViewDate = memoize(this.startViewDateComputed);

  availableViewNamesComputed = ({ availableViewNames }) => {
    const { name: viewName } = this.props;
    return availableViewNamesCore(
      availableViewNames, viewName!,
    );
  }
  memoizedAvailableViewNames = memoize(this.availableViewNamesComputed);

  currentViewComputed = (viewName) => ({ currentView }) => {
    // const { name: viewName } = this.props;
    return (
    currentView && currentView.name !== viewName
      ? currentView
      : { name: viewName, type: TYPE }
    );
  }
  memoizedCurrentView = memoize(this.currentViewComputed);

  setTimeTableRef = (timeTableRef) => {
    this.timeTable.current = timeTableRef;
  }

  calculateRects = (appointments, startViewDate, endViewDate, excludedDays, viewCellsData, cellDuration) => cellElements => {
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

  memoizedCalculateRects =  memoize(this.calculateRects);

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
    } = this.props;
    const { rects } = this.state;

    return (
      <Plugin
        name="WeekView"
      >
        <Getter name="availableViewNames" computed={this.memoizedAvailableViewNames(viewName)} />
        <Getter name="currentView" computed={this.memoizedCurrentView(viewName)} />

        <Getter name="intervalCount" computed={this.memoizedIntervalCount(viewName, intervalCount)} />
        <Getter name="firstDayOfWeek" computed={this.memoizedFirstDayOfWeek(viewName, firstDayOfWeek)} />
        <Getter name="excludedDays" computed={this.memoizedExcludedDays(viewName, excludedDays)} />
        <Getter name="viewCellsData" computed={this.memoizedViewCellsData(viewName, cellDuration, startDayHour, endDayHour)} />
        <Getter name="startViewDate" computed={this.startViewDateComputed} />
        <Getter name="endViewDate" computed={this.endViewDateComputed} />

        <Getter name="timeTableElement" computed={this.memoizedTimeTableElement(viewName)} />
        <Getter name="layoutElement" computed={this.memoizedLayoutElement(viewName)} />
        <Getter name="layoutHeaderElement" computed={this.memoizedLayoutHeaderElement(viewName)} />

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

              const setRects = this.memoizedCalculateRects(
                appointments, startViewDate, endViewDate, excludedDays, viewCellsData, cellDuration,
              );

              return (
                <React.Fragment>
                  <TimeTable
                    rowComponent={TimeTableRow}
                    cellComponent={cellPlaceholder}
                    tableRef={this.setTimeTableRef}
                    cellsData={viewCellsData}
                    setCellElements={setRects}
                    formatDate={formatDate}
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
