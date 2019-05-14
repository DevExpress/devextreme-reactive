import * as React from 'react';
import {
  Template,
  Plugin,
  Getter,
  TemplateConnector,
  TemplatePlaceholder,
  Getters,
} from '@devexpress/dx-react-core';
import {
  computed,
  viewCellsData as viewCellsDataCore,
  calculateRectByDateIntervals,
  calculateWeekDateIntervals,
  getAppointmentStyle,
  getVerticalRectByDates,
  startViewDate as startViewDateCore,
  endViewDate as endViewDateCore,
  availableViewNames as availableViewNamesCore,
  VERTICAL_TYPE,
} from '@devexpress/dx-scheduler-core';

import { WeekViewProps, ViewState } from '../types';

const DAYS_IN_WEEK = 7;
const TYPE = 'week';
const endViewDateBaseComputed = ({
  viewCellsData,
}) => endViewDateCore(viewCellsData);
const startViewDateBaseComputed = ({
  viewCellsData,
}) => startViewDateCore(viewCellsData);

class WeekViewBase extends React.PureComponent<WeekViewProps, ViewState> {
  timeTable: { current: HTMLElement | null };
  layout: React.RefObject<HTMLElement>;
  layoutHeader: React.RefObject<HTMLElement>;

  static defaultProps = {
    startDayHour: 0,
    endDayHour: 24,
    cellDuration: 30,
    intervalCount: 1,
    firstDayOfWeek: 0,
    excludedDays: [],
    name: 'Week',
  };

  static components = {
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

  constructor(props) {
    super(props);

    this.state = {
      timeTableRef: null,
    };

    this.timeTable = { current: null };
    this.layout = React.createRef();
    this.layoutHeader = React.createRef();
  }

  layoutHeaderElement = (getters: Getters) => {
    const { name: viewName } = this.props;
    return computed(
      getters, viewName!, this.layoutHeaderElementComputed, getters.layoutHeaderElement,
    );
  }

  layoutElement = (getters: Getters) => {
    const { name: viewName } = this.props;
    return computed(
      getters, viewName!, this.layoutElementComputed, getters.layoutElement,
    );
  }

  timeTableElement = (getters: Getters) => {
    const { name: viewName } = this.props;
    return computed(
      getters, viewName!, this.timeTableElementComputed, getters.timeTableElement,
    );
  }

  viewCellsDataBaseComputed = ({
    currentDate,
  }) => {
    const {
      firstDayOfWeek, intervalCount, excludedDays, startDayHour, endDayHour, cellDuration,
    } = this.props;
    return viewCellsDataCore(
      currentDate, firstDayOfWeek,
      intervalCount! * DAYS_IN_WEEK, excludedDays!,
      startDayHour!, endDayHour!, cellDuration!,
      Date.now(),
    );
  }

  viewCellsDataComputed = (getters: Getters) => {
    const { name: viewName } = this.props;
    return computed(
      getters, viewName!, this.viewCellsDataBaseComputed, getters.viewCellsData,
    );
  }

  endViewDateComputed = (getters: Getters) => {
    const { name: viewName } = this.props;
    return computed(
      getters, viewName!, endViewDateBaseComputed, getters.endViewDate,
    );
  }

  startViewDateComputed = (getters: Getters) => {
    const { name: viewName } = this.props;
    return computed(
      getters, viewName!, startViewDateBaseComputed, getters.startViewDate,
    );
  }

  excludedDaysComputed = (getters: Getters) => {
    const { name: viewName, excludedDays } = this.props;
    return computed(
      getters, viewName!, () => excludedDays, getters.excludedDays,
    );
  }

  firstDayOfWeekComputed = (getters: Getters) => {
    const { name: viewName, firstDayOfWeek } = this.props;
    return computed(
      getters, viewName!, () => firstDayOfWeek, getters.firstDayOfWeek,
    );
  }

  intervalCountComputed = (getters: Getters) => {
    const { name: viewName, intervalCount } = this.props;
    return computed(
      getters, viewName!, () => intervalCount, getters.intervalCount,
    );
  }

  availableViewNamesComputed = ({ availableViewNames }: Getters) => {
    const { name: viewName } = this.props;
    return availableViewNamesCore(
      availableViewNames, viewName!,
    );
  }

  timeTableElementComputed = () => {
    return this.timeTable;
  }

  layoutElementComputed = () => {
    return this.layout;
  }

  layoutHeaderElementComputed = () => {
    return this.layoutHeader;
  }

  currentViewComputed = ({ currentView }: Getters) => {
    const { name: viewName } = this.props;
    return (
    currentView && currentView.name !== viewName
      ? currentView
      : { name: viewName, type: TYPE }
    );
  }

  sidebarPlaceholder() {
    return <TemplatePlaceholder name="sidebar" />;
  }

  dayScalePlaceholder() {
    return <TemplatePlaceholder name="navbar" />;
  }

  timeTablePlaceholder() {
    return <TemplatePlaceholder name="main" />;
  }

  dayScaleEmptyCellPlaceholder() {
    return <TemplatePlaceholder name="dayScaleEmptyCell" />;
  }

  appointmentPlaceholder(params) {
    return <TemplatePlaceholder name="appointment" params={params} />;
  }

  cellPlaceholder(params) {
    return <TemplatePlaceholder name="cell" params={params} />;
  }

  setTimeTableRef = (timeTableRef) => {
    this.timeTable.current = timeTableRef;
    this.setState({ timeTableRef });
  }

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
      appointmentLayerComponent: AppointmentLayer,
    } = this.props;
    const { timeTableRef: stateTimeTableRef } = this.state;

    return (
      <Plugin
        name="WeekView"
      >
        <Getter name="availableViewNames" computed={this.availableViewNamesComputed} />
        <Getter name="currentView" computed={this.currentViewComputed} />
        <Getter name="intervalCount" computed={this.intervalCountComputed} />
        <Getter name="firstDayOfWeek" computed={this.firstDayOfWeekComputed} />
        <Getter name="excludedDays" computed={this.excludedDaysComputed} />
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
                  dayScaleComponent={this.dayScalePlaceholder}
                  dayScaleEmptyCellComponent={this.dayScaleEmptyCellPlaceholder}
                  timeTableComponent={this.timeTablePlaceholder}
                  timeScaleComponent={this.sidebarPlaceholder}
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
              appointments, startViewDate, formatDate,
              endViewDate, currentView, viewCellsData,
            }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              const intervals = calculateWeekDateIntervals(
                appointments, startViewDate, endViewDate, excludedDays!,
              );
              const rects = stateTimeTableRef ? calculateRectByDateIntervals(
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
                  cellElements: stateTimeTableRef.querySelectorAll('td'),
                },
              ) : [];
              const { appointmentPlaceholder: AppointmentPlaceholder } = this;

              return (
                <React.Fragment>
                  <TimeTable
                    rowComponent={TimeTableRow}
                    cellComponent={this.cellPlaceholder}
                    tableRef={this.setTimeTableRef}
                    cellsData={viewCellsData}
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
