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
import { memoize } from '@devexpress/dx-core';

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
    rects: [],
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

  viewCellsDataBaseComputed = (startDayHour, endDayHour, cellDuration) => ({
    currentDate, intervalCount,
  }) => {
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
    const { name: viewName } = this.props;
    return computed(
      getters, viewName!, this.timeTableElementComputed, getters.timeTableElement,
    );
  }
  memoizedTimeTableElement = memoize(this.timeTableElement);

  viewCellsDataComputed = (viewName, startDayHour, endDayHour, cellDuration) => (getters) => {
    // const { name: viewName } = this.props;
    return computed(
      getters, viewName!, this.viewCellsDataBaseComputed(startDayHour, endDayHour, cellDuration), getters.viewCellsData,
    );
  }
  memoizedViewCellsData = memoize(this.viewCellsDataComputed);

  cellDurationComputed = (viewName, cellDuration) => (getters) => {
    // const { name: viewName, cellDuration } = this.props;
    return computed(
      getters, viewName!, () => cellDuration, getters.cellDuration,
    );
  }
  memoizedCellDuration = memoize(this.cellDurationComputed);

  intervalCountComputed = (viewName, intervalCount) => (getters) => {
    // const { name: viewName, intervalCount } = this.props;
    return computed(
      getters, viewName!, () => intervalCount, getters.intervalCount,
    );
  }
  memoizedIntervalCount = memoize(this.intervalCountComputed);

  currentViewComputed = (viewName) => ({ currentView }) => {
    // const { name: viewName } = this.props;
    return (
      currentView && currentView.name !== viewName
        ? currentView
        : { name: viewName, type: TYPE }
    );
  }
  memoizedCurrentView = memoize(this.currentViewComputed);

  availableViewNamesComputed = (viewName) => ({ availableViewNames }) => {
    // const { name: viewName } = this.props;
    return availableViewNamesCore(
      availableViewNames, viewName!,
    );
  }
  memoizedavailableViewNames = memoize(this.availableViewNamesComputed);

  endViewDateComputed = (viewName) => (getters) => {
    // const { name: viewName } = this.props;
    return computed(
      getters, viewName!, endViewDateBaseComputed, getters.endViewDate,
    );
  }
  memoizedEndViewDate = memoize(this.endViewDateComputed);

  startViewDateComputed = (viewName) => (getters) => {
    // const { name: viewName } = this.props;
    return computed(
      getters, viewName!, startViewDateBaseComputed, getters.startViewDate,
    );
  }
  memoizedStartViewDate = memoize(this.startViewDateComputed);

  setTimeTableRef = (timeTableRef) => {
    this.timeTable.current = timeTableRef;
  }

  calculateRects = (appointments, startViewDate, endViewDate, viewCellsData, cellDuration, currentDate) => cellElements => {
    const intervals = calculateWeekDateIntervals(
      appointments, startViewDate, endViewDate, [],
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
        cellDuration,
        currentDate,
        viewCellsData,
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
      appointmentLayerComponent: AppointmentLayer,
      cellDuration,
      name: viewName,
      intervalCount,
      startDayHour,
      endDayHour,
    } = this.props;
    const { rects } = this.state;

    return (
      <Plugin
        name="DayView"
      >
        <Getter name="availableViewNames" computed={this.memoizedavailableViewNames(viewName)} />
        <Getter name="currentView" computed={this.memoizedCurrentView(viewName)} />

        <Getter name="intervalCount" computed={this.memoizedIntervalCount(viewName, intervalCount)} />
        <Getter name="cellDuration" computed={this.memoizedCellDuration(viewName, cellDuration)} />
        <Getter name="viewCellsData" computed={this.memoizedViewCellsData(viewName, startDayHour, endDayHour, cellDuration)} />
        <Getter name="startViewDate" computed={this.memoizedStartViewDate(viewName)} />
        <Getter name="endViewDate" computed={this.memoizedEndViewDate(viewName)} />

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
              appointments, startViewDate, formatDate,
              endViewDate, currentView, currentDate,
              viewCellsData,
            }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              const setRects = this.memoizedCalculateRects(
                appointments, startViewDate, endViewDate, viewCellsData, cellDuration, currentDate,
              );

              return (
                <React.Fragment>
                  <TimeTable
                    rowComponent={TimeTableRow}
                    cellComponent={CellPlaceholder}
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

// tslint:disable-next-line: max-line-length
/*** A plugin that renders Scheduler data for a day. This plugin arranges appointments from top to bottom.
 * If their time intervals overlap, their width is decreased and they are placed next to each other.
 * */
export const DayView: React.ComponentType<VerticalViewProps> = DayViewBase;
