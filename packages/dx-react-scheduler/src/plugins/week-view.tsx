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
  viewCellsDataComputed: (getters: Getters) => any;
  currentViewComputed: (getters: Getters) => any;
  availableViewNamesComputed: (getters: Getters) => any;
  intervalCountComputed: (getters: Getters) => any;
  firstDayOfWeekComputed: (getters: Getters) => any;
  excludedDaysComputed: (getters: Getters) => any;
  startViewDateComputed: (getters: Getters) => any;
  endViewDateComputed: (getters: Getters) => any;
  timeTable: any;
  layout: any;
  layoutHeader: any;
  timeTableElement: any;
  layoutElement: any;
  layoutHeaderElement: any;
  sidebarPlaceholder: any;
  dayScalePlaceholder: any;
  timeTablePlaceholder: any;
  dayScaleEmptyCellPlaceholder: any;
  appointmentPlaceholder: any;
  cellPlaceholder: any;

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
    this.setTimeTableRef = this.setTimeTableRef.bind(this);

    const {
      name: viewName,
      firstDayOfWeek,
      startDayHour,
      endDayHour,
      cellDuration,
      excludedDays,
      intervalCount,
    } = props;

    const viewCellsDataBaseComputed = ({
      currentDate,
    }) => viewCellsDataCore(
      currentDate, firstDayOfWeek,
      intervalCount! * DAYS_IN_WEEK, excludedDays!,
      startDayHour!, endDayHour!, cellDuration!,
      Date.now(),
    );

    const timeTableElementComputed = () => this.timeTable;
    const layoutElementComputed = () => this.layout;
    const layoutHeaderElementComputed = () => this.layoutHeader;

    this.sidebarPlaceholder = () => <TemplatePlaceholder name="sidebar" />;
    this.dayScalePlaceholder = () => <TemplatePlaceholder name="navbar" />;
    this.timeTablePlaceholder = () => <TemplatePlaceholder name="main" />;
    this.dayScaleEmptyCellPlaceholder = () => <TemplatePlaceholder name="dayScaleEmptyCell" />;
    this.appointmentPlaceholder = params =>
      <TemplatePlaceholder name="appointment" params={params} />;
    this.cellPlaceholder = params => <TemplatePlaceholder name="cell" params={params} />;

    this.currentViewComputed = ({ currentView }: Getters) => (
      currentView && currentView.name !== viewName
        ? currentView
        : { name: viewName, type: TYPE }
    );
    this.availableViewNamesComputed = ({ availableViewNames }: Getters) => availableViewNamesCore(
      availableViewNames, viewName!,
    );
    this.intervalCountComputed = (getters: Getters) => computed(
      getters, viewName!, () => intervalCount, getters.intervalCount,
    );
    this.firstDayOfWeekComputed = (getters: Getters) => computed(
      getters, viewName!, () => firstDayOfWeek, getters.firstDayOfWeek,
    );
    this.excludedDaysComputed = (getters: Getters) => computed(
      getters, viewName!, () => excludedDays, getters.excludedDays,
    );
    this.startViewDateComputed = (getters: Getters) => computed(
      getters, viewName, startViewDateBaseComputed, getters.startViewDate,
    );
    this.endViewDateComputed = (getters: Getters) => computed(
      getters, viewName, endViewDateBaseComputed, getters.endViewDate,
    );
    this.viewCellsDataComputed = (getters: Getters) => computed(
      getters, viewName, viewCellsDataBaseComputed, getters.viewCellsData,
    );

    this.timeTableElement = (getters: Getters) => computed(
      getters, viewName, timeTableElementComputed, getters.timeTableElement,
    );
    this.layoutElement = (getters: Getters) => computed(
      getters, viewName, layoutElementComputed, getters.layoutElement,
    );
    this.layoutHeaderElement = (getters: Getters) => computed(
      getters, viewName, layoutHeaderElementComputed, getters.layoutHeaderElement,
    );
  }

  setTimeTableRef(timeTableRef) {
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
