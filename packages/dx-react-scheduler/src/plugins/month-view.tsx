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
  startViewDate as startViewDateCore,
  monthCellsData,
  getAppointmentStyle,
  endViewDate as endViewDateCore,
  availableViewNames as availableViewNamesCore,
  horizontalTimeTableRects,
} from '@devexpress/dx-scheduler-core';
import { memoize } from '@devexpress/dx-core';

import { MonthViewProps, ViewState } from '../types';

const TYPE = 'month';
const viewCellsDataBaseComputed = (firstDayOfWeek, intervalCount) => ({ currentDate }) => {
  return monthCellsData(
    currentDate, firstDayOfWeek,
    intervalCount!, Date.now(),
  );
};
const startViewDateBaseComputed = ({ viewCellsData }) => startViewDateCore(viewCellsData);
const endViewDateBaseComputed = ({ viewCellsData }) => endViewDateCore(viewCellsData);
const DayScalePlaceholder = () => <TemplatePlaceholder name="dayScale" />;
const TimeTablePlaceholder = () => <TemplatePlaceholder name="timeTable" />;
const CellPlaceholder = params => <TemplatePlaceholder name="cell" params={params} />;
const AppointmentPlaceholder = params => <TemplatePlaceholder name="appointment" params={params} />;

const scrollingStrategy1 = memoize((viewName, scrollingStrategy) => (getters) => computed(
  getters, viewName!, () => scrollingStrategy, getters.scrollingStrategy,
));

const timeTableElementsMeta1 = memoize((viewName, timeTableElementsMeta) => (getters) => computed(
  getters, viewName!, () => timeTableElementsMeta, getters.timeTableElementsMeta,
));

const firstDayOfWeek1 = memoize((viewName, firstDayOfWeek) => (getters) => computed(
  getters, viewName!, () => firstDayOfWeek, getters.firstDayOfWeek,
));

const intervalCount1 = memoize((viewName, intervalCount) => (getters) => computed(
  getters, viewName!, () => intervalCount, getters.intervalCount,
));

const availableViewNames1 = memoize(viewName => ({ availableViewNames }) => availableViewNamesCore(
  availableViewNames, viewName!,
));

const currentView1 = memoize(viewName => ({ currentView }) => (
  currentView && currentView.name !== viewName
    ? currentView
    : { name: viewName, type: TYPE }
));

class MonthViewBase extends React.PureComponent<MonthViewProps, ViewState> {
  state: ViewState = {
    rects: [],
    timeTableElementsMeta: {},
    scrollingStrategy: {
      topBoundary: 0,
      bottomBoundary: 0,
      changeVerticalScroll: () => undefined,
    },
  };

  static defaultProps: Partial<MonthViewProps> = {
    intervalCount: 1,
    firstDayOfWeek: 0,
    name: 'Month',
  };

  static components: PluginComponents = {
    layoutComponent: 'Layout',
    appointmentLayerComponent: 'AppointmentLayer',
    dayScaleLayoutComponent: 'DayScaleLayout',
    dayScaleCellComponent: 'DayScaleCell',
    dayScaleRowComponent: 'DayScaleRow',
    timeTableContainerComponent: 'TimeTableContainer',
    timeTableLayoutComponent: 'TimeTableLayout',
    timeTableCellComponent: 'TimeTableCell',
    timeTableRowComponent: 'TimeTableRow',
  };

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

  viewCellsDataComputed: ComputedFn = (getters) => {
    const { name: viewName } = this.props;
    return computed(
      getters,
      viewName!,
      viewCellsDataBaseComputed(getters.firstDayOfWeek, getters.intervalCount),
      getters.viewCellsData,
    );
  }

  updateRects = memoize((
    appointments, startViewDate, endViewDate, viewCellsData,
  ) => (cellElementsMeta) => {
    const rects = horizontalTimeTableRects(
      appointments, startViewDate, endViewDate,
      viewCellsData, cellElementsMeta,
    );

    this.setState({ rects, timeTableElementsMeta: cellElementsMeta });
  });

  setScrollingStrategy = (scrollingStrategy) => {
    this.setState({ scrollingStrategy });
  }

  render() {
    const {
      layoutComponent: Layout,
      dayScaleLayoutComponent: DayScale,
      dayScaleCellComponent: DayScaleCell,
      dayScaleRowComponent: DayScaleRow,
      timeTableLayoutComponent: TimeTableLayout,
      timeTableRowComponent,
      timeTableCellComponent: TimeTableCell,
      appointmentLayerComponent: AppointmentLayer,
      name: viewName,
      firstDayOfWeek,
      intervalCount,
    } = this.props;
    const { rects, timeTableElementsMeta, scrollingStrategy } = this.state;

    return (
      <Plugin
        name="MonthView"
      >
        <Getter name="availableViewNames" computed={availableViewNames1(viewName)} />
        <Getter name="currentView" computed={currentView1(viewName)} />

        <Getter
          name="firstDayOfWeek"
          computed={firstDayOfWeek1(viewName, firstDayOfWeek)}
        />
        <Getter name="intervalCount" computed={intervalCount1(viewName, intervalCount)} />
        <Getter name="viewCellsData" computed={this.viewCellsDataComputed} />
        <Getter name="startViewDate" computed={this.startViewDateComputed} />
        <Getter name="endViewDate" computed={this.endViewDateComputed} />

        <Getter
          name="timeTableElementsMeta"
          computed={timeTableElementsMeta1(viewName, timeTableElementsMeta)}
        />
        <Getter
          name="scrollingStrategy"
          computed={scrollingStrategy1(viewName, scrollingStrategy)}
        />

        <Template name="body">
          <TemplateConnector>
            {({ currentView, layoutHeight }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              return (
                <Layout
                  dayScaleComponent={DayScalePlaceholder}
                  timeTableComponent={TimeTablePlaceholder}
                  setScrollingStrategy={this.setScrollingStrategy}
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
        <Template name="timeTable">
          <TemplateConnector>
            {({
              appointments, startViewDate, endViewDate, currentView, viewCellsData, formatDate,
            }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              const setRects = this.updateRects(
                appointments, startViewDate, endViewDate, viewCellsData,
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

// tslint:disable: max-line-length
/***
 * A plugin that renders Scheduler data for a month. This plugin arranges appointments from left to right.
 * An appointment's size depends on its duration in days.
 * However, it occupies the entire day cell if an appointment lasts only for several hours or minutes.
 * The time scale and all-day panel are not available in this view.
 * */
export const MonthView: React.ComponentType<MonthViewProps> = MonthViewBase;
