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
const CellPlaceholder = params => <TemplatePlaceholder name="cell" params={params} />;
const AppointmentPlaceholder = params => <TemplatePlaceholder name="appointment" params={params} />;
const TimeTablePlaceholder = () => <TemplatePlaceholder name="main" />;
const DayScaleEmptyCellPlaceholder = () => <TemplatePlaceholder name="dayScaleEmptyCell" />;
const DayScalePlaceholder = () => <TemplatePlaceholder name="navbar" />;
const SidebarPlaceholder = () => <TemplatePlaceholder name="sidebar" />;

class DayViewBase extends React.PureComponent<VerticalViewProps, ViewState> {
  timeTable: WritableRefObject<HTMLElement> = React.createRef();
  layout = React.createRef<HTMLElement>();
  layoutHeader = React.createRef<HTMLElement>();

  state: ViewState = {
    timeTableRef: null,
  };

  static defaultProps: Partial<VerticalViewProps> = {
    name: 'Day',
    startDayHour: 0,
    endDayHour: 24,
    cellDuration: 30,
    intervalCount: 1,
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

  viewCellsDataBaseComputed = ({
    currentDate,
  }) => {
    const { intervalCount, startDayHour, endDayHour, cellDuration } = this.props;
    return viewCellsDataCore(
      currentDate, undefined,
      intervalCount, [],
      startDayHour!, endDayHour!, cellDuration!,
      Date.now(),
    );
  }

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

  viewCellsDataComputed: ComputedFn = (getters) => {
    const { name: viewName } = this.props;
    return computed(
      getters, viewName!, this.viewCellsDataBaseComputed, getters.viewCellsData,
    );
  }

  cellDurationComputed: ComputedFn = (getters) => {
    const { name: viewName, cellDuration } = this.props;
    return computed(
      getters, viewName!, () => cellDuration, getters.cellDuration,
    );
  }

  intervalCountComputed: ComputedFn = (getters) => {
    const { name: viewName, intervalCount } = this.props;
    return computed(
      getters, viewName!, () => intervalCount, getters.intervalCount,
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

  availableViewNamesComputed: ComputedFn = ({ availableViewNames }) => {
    const { name: viewName } = this.props;
    return availableViewNamesCore(
      availableViewNames, viewName!,
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

              return (
                <React.Fragment>
                  <TimeTable
                    rowComponent={TimeTableRow}
                    cellComponent={CellPlaceholder}
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
