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
  getAppointmentStyle,
  startViewDate as startViewDateCore,
  endViewDate as endViewDateCore,
  availableViewNames as availableViewNamesCore,
  verticalTimeTableRects,
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
const viewCellsDataBaseComputed = (startDayHour, endDayHour, cellDuration) => ({
  currentDate, intervalCount,
}) => {
  return viewCellsDataCore(
    currentDate, undefined,
    intervalCount, [],
    startDayHour!, endDayHour!, cellDuration!,
    Date.now(),
  );
};
const CellPlaceholder = params => <TemplatePlaceholder name="cell" params={params} />;
const AppointmentPlaceholder = params => <TemplatePlaceholder name="appointment" params={params} />;
const TimeTablePlaceholder = () => <TemplatePlaceholder name="timeTable" />;
const DayScaleEmptyCellPlaceholder = () => <TemplatePlaceholder name="dayScaleEmptyCell" />;
const DayScalePlaceholder = () => <TemplatePlaceholder name="dayScale" />;
const TimeScalePlaceholder = () => <TemplatePlaceholder name="timeScale" />;

class DayViewBase extends React.PureComponent<VerticalViewProps, ViewState> {
  state: ViewState = {
    rects: [],
    timeTableElementsMeta: {},
    scrollingAPI: {
      topBoundary: 0,
      bottomBoundary: 0,
      changeVerticalScroll: () => undefined,
    },
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
    layoutContainer: 'LayoutContainer',
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

  viewCellsData = memoize((viewName, startDayHour, endDayHour, cellDuration) => (getters) => {
    return computed(
      getters,
      viewName,
      viewCellsDataBaseComputed(startDayHour, endDayHour, cellDuration), getters.viewCellsData,
    );
  });

  cellDuration = memoize((viewName, cellDuration) => (getters) => {
    return computed(
      getters, viewName!, () => cellDuration, getters.cellDuration,
    );
  });

  intervalCount = memoize((viewName, intervalCount) => (getters) => {
    return computed(
      getters, viewName!, () => intervalCount, getters.intervalCount,
    );
  });

  currentView = memoize(viewName => ({ currentView }) => {
    return (
      currentView && currentView.name !== viewName
        ? currentView
        : { name: viewName, type: TYPE }
    );
  });

  availableViewNames = memoize(viewName => ({ availableViewNames }) => {
    return availableViewNamesCore(
      availableViewNames, viewName!,
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

  calculateRects = memoize((
    appointments, startViewDate, endViewDate, viewCellsData, cellDuration, currentDate,
  ) => (cellElementsMeta) => {
    const rects = verticalTimeTableRects(
      appointments, startViewDate, endViewDate, [],
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
      dayScaleEmptyCellComponent: DayScaleEmptyCell,
      timeScaleLayoutComponent: TimeScale,
      timeScaleRowComponent: TimeScaleRow,
      timeScaleCellComponent: TimeScaleCell,
      dayScaleLayoutComponent: DayScale,
      dayScaleCellComponent: DayScaleCell,
      dayScaleRowComponent: DayScaleRow,
      timeTableLayoutComponent: TimeTableLayout,
      timeTableRowComponent,
      timeTableCellComponent: TimeTableCell,
      appointmentLayerComponent: AppointmentLayer,
      cellDuration,
      name: viewName,
      intervalCount,
      startDayHour,
      endDayHour,
    } = this.props;
    const { rects, timeTableElementsMeta, scrollingAPI } = this.state;

    return (
      <Plugin
        name="DayView"
      >
        <Getter name="availableViewNames" computed={this.availableViewNames(viewName)} />
        <Getter name="currentView" computed={this.currentView(viewName)} />

        <Getter name="intervalCount" computed={this.intervalCount(viewName, intervalCount)} />
        <Getter name="cellDuration" computed={this.cellDuration(viewName, cellDuration)} />
        <Getter
          name="viewCellsData"
          computed={this.viewCellsData(viewName, startDayHour, endDayHour, cellDuration)}
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
              appointments, startViewDate, formatDate,
              endViewDate, currentView, currentDate,
              viewCellsData,
            }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              const setRects = this.calculateRects(
                appointments, startViewDate, endViewDate, viewCellsData, cellDuration, currentDate,
              );

              return (
                <React.Fragment>
                  <TimeTableLayout
                    cellsData={viewCellsData}
                    rowComponent={timeTableRowComponent}
                    cellComponent={CellPlaceholder}
                    formatDate={formatDate}
                    setCellElementsMeta={setRects}
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
