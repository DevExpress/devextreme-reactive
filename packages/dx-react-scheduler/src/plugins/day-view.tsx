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
  getVerticalRectByDates,
  calculateRectByDateIntervals,
  calculateWeekDateIntervals,
  getAppointmentStyle,
  startViewDate as startViewDateCore,
  endViewDate as endViewDateCore,
  availableViewNames as availableViewNamesCore,
  VERTICAL_TYPE,
} from '@devexpress/dx-scheduler-core';

import { VerticalViewProps, ViewState } from '../types';

const TYPE = 'day';
const startViewDateBaseComputed = ({
  viewCellsData,
}) => startViewDateCore(viewCellsData);
const endViewDateBaseComputed = ({
  viewCellsData,
}) => endViewDateCore(viewCellsData);

class DayViewBase extends React.PureComponent<VerticalViewProps, ViewState> {
  static defaultProps = {
    name: 'Day',
    startDayHour: 0,
    endDayHour: 24,
    cellDuration: 30,
    intervalCount: 1,
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

  startViewDateComputed: (getters: Getters) => any;
  endViewDateComputed: (getters: Getters) => any;
  availableViewNamesComputed: (getters: Getters) => any;
  currentViewComputed: (getters: Getters) => any;
  intervalCountComputed: (getters: Getters) => any;
  cellDurationComputed: (getters: Getters) => any;
  viewCellsDataComputed: (getters: Getters) => any;
  timeTable: any;
  layout: any;
  layoutHeader: any;
  sidebarPlaceholder: any;
  dayScalePlaceholder: any;
  dayScaleEmptyCellPlaceholder: any;
  timeTablePlaceholder: any;
  appointmentPlaceholder: any;
  cellPlaceholder: any;
  timeTableElement: any;
  layoutElement: any;
  layoutHeaderElement: any;

  constructor(props) {
    super(props);

    this.state = {
      timeTableRef: null,
    };

    const {
      name: viewName,
      startDayHour,
      endDayHour,
      cellDuration,
      intervalCount,
    } = props;

    const viewCellsDataBaseComputed = ({
      currentDate,
    }) => viewCellsDataCore(
      currentDate, undefined,
      intervalCount, [],
      startDayHour!, endDayHour!, cellDuration!,
      Date.now(),
    );
    const timeTableElementComputed = () => this.timeTable;
    const layoutElementComputed = () => this.layout;
    const layoutHeaderElementComputed = () => this.layoutHeader;

    this.timeTable = { current: null };
    this.layout = React.createRef();
    this.layoutHeader = React.createRef();
    this.setTimeTableRef = this.setTimeTableRef.bind(this);
    this.sidebarPlaceholder = () => <TemplatePlaceholder name="sidebar" />;
    this.dayScalePlaceholder = () => <TemplatePlaceholder name="navbar" />;
    this.dayScaleEmptyCellPlaceholder = () => <TemplatePlaceholder name="dayScaleEmptyCell" />;
    this.timeTablePlaceholder = () => <TemplatePlaceholder name="main" />;
    this.appointmentPlaceholder = params =>
      <TemplatePlaceholder name="appointment" params={params} />;
    this.cellPlaceholder = params => <TemplatePlaceholder name="cell" params={params} />;

    this.startViewDateComputed = (getters: Getters) => computed(
      getters, viewName!, startViewDateBaseComputed, getters.startViewDate,
    );
    this.endViewDateComputed = (getters: Getters) => computed(
      getters, viewName!, endViewDateBaseComputed, getters.endViewDate,
    );
    this.availableViewNamesComputed = ({ availableViewNames }) => availableViewNamesCore(
      availableViewNames, viewName!,
    );
    this.currentViewComputed = ({ currentView }: Getters) => (
      currentView && currentView.name !== viewName
        ? currentView
        : { name: viewName, type: TYPE }
    );
    this.intervalCountComputed = (getters: Getters) => computed(
      getters, viewName!, () => intervalCount, getters.intervalCount,
    );
    this.cellDurationComputed = (getters: Getters) => computed(
      getters, viewName!, () => cellDuration, getters.cellDuration,
    );
    this.viewCellsDataComputed = (getters: Getters) => computed(
      getters, viewName!, viewCellsDataBaseComputed, getters.viewCellsData,
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
      appointmentLayerComponent: AppointmentLayer,
      cellDuration,
      name: viewName,
    } = this.props;
    const { timeTableRef: stateTimeTableRef } = this.state;

    return (
      <Plugin
        name="DayView"
      >
        <Getter name="availableViewNames" computed={this.availableViewNamesComputed} />
        <Getter name="currentView" computed={this.currentViewComputed} />
        <Getter name="intervalCount" computed={this.intervalCountComputed} />
        <Getter name="cellDuration" computed={this.cellDurationComputed} />
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
              endViewDate, currentView, currentDate,
              viewCellsData,
            }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              const intervals = calculateWeekDateIntervals(
                appointments, startViewDate, endViewDate, [],
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
                  cellDuration,
                  currentDate,
                  viewCellsData,
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

// tslint:disable-next-line: max-line-length
/*** A plugin that renders Scheduler data for a day. This plugin arranges appointments from top to bottom.
 * If their time intervals overlap, their width is decreased and they are placed next to each other.
 * */
export const DayView: React.ComponentType<VerticalViewProps> = DayViewBase;
