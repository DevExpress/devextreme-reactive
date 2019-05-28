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
    timeTableRef: null,
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

  layoutHeaderElement: ComputedFn = (getters) => {
    const { name: viewName } = this.props;
    return computed(
      getters, viewName!, this.layoutHeaderElementComputed, getters.layoutHeaderElement,
    );
  }

  layoutElement: ComputedFn = (getters) => {
    const { name: viewName } = this.props;
    return computed(
      getters, viewName!, this.layoutElementComputed, getters.layoutElement,
    );
  }

  timeTableElement: ComputedFn = (getters) => {
    const { name: viewName } = this.props;
    return computed(
      getters, viewName!, this.timeTableElementComputed, getters.timeTableElement,
    );
  }

  viewCellsDataBaseComputed = (getters) => {
    const { name } = this.props;
    const firstDayOfWeek = getters[`firstDayOfWeek${name}`];
    const intervalCount = getters[`intervalCount${name}`];
    const excludedDays = getters[`excludedDays${name}`];
    const startDayHour = getters[`startDayHour${name}`];
    const endDayHour = getters[`endDayHour${name}`];
    const cellDuration = getters[`cellDuration${name}`];

    return viewCellsDataCore(
      getters.currentDate, firstDayOfWeek,
      intervalCount! * DAYS_IN_WEEK, excludedDays!,
      startDayHour!, endDayHour!, cellDuration!,
      Date.now(),
    );
  }

  viewCellsDataComputed: ComputedFn = (getters) => {
    const { name: viewName } = this.props;
    return computed(
      getters, viewName!, this.viewCellsDataBaseComputed, getters.viewCellsData,
    );
  }

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

  availableViewNamesComputed: ComputedFn = ({ availableViewNames }) => {
    const { name: viewName } = this.props;
    return availableViewNamesCore(
      availableViewNames, viewName!,
    );
  }

  currentViewComputed: ComputedFn = ({ currentView }) => {
    const { name: viewName } = this.props;
    return (
    currentView && currentView.name !== viewName
      ? currentView
      : { name: viewName, type: TYPE }
    );
  }

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
  };

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
        <Getter name="availableViewNames" computed={this.availableViewNamesComputed} />
        <Getter name="currentView" computed={this.currentViewComputed} />

        <Getter name={`cellDuration${viewName}`} value={cellDuration} />
        <Getter name={`startDayHour${viewName}`} value={startDayHour} />
        <Getter name={`endDayHour${viewName}`} value={endDayHour} />
        <Getter name={`intervalCount${viewName}`} value={intervalCount} />
        <Getter name={`firstDayOfWeek${viewName}`} value={firstDayOfWeek} />
        <Getter name={`excludedDays${viewName}`} value={excludedDays} />

        <Getter name="viewCellsData" computed={this.viewCellsDataComputed} />
        <Getter name="startViewDate" computed={this.startViewDateComputed} />
        <Getter name="endViewDate" computed={this.endViewDateComputed} />

        <Getter name="timeTableElement" computed={this.timeTableElement} />
        <Getter name="layoutElement" computed={this.layoutElement} />
        <Getter name="layoutHeaderElement" computed={this.layoutHeaderElement} />

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
