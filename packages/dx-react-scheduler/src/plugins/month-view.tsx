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
  startViewDate as startViewDateCore,
  monthCellsData,
  calculateRectByDateIntervals,
  calculateMonthDateIntervals,
  getAppointmentStyle,
  getHorizontalRectByDates,
  endViewDate as endViewDateCore,
  availableViewNames as availableViewNamesCore,
  HORIZONTAL_TYPE,
} from '@devexpress/dx-scheduler-core';
import { memoize } from '@devexpress/dx-core';

import { MonthViewProps, ViewState } from '../types';

const TYPE = 'month';
const startViewDateBaseComputed = ({ viewCellsData }) => startViewDateCore(viewCellsData);
const endViewDateBaseComputed = ({ viewCellsData }) => endViewDateCore(viewCellsData);
const DayScalePlaceholder = () => <TemplatePlaceholder name="navbar" />;
const TimeTablePlaceholder = () => <TemplatePlaceholder name="main" />;
const CellPlaceholder = params => <TemplatePlaceholder name="cell" params={params} />;
const AppointmentPlaceholder = params => <TemplatePlaceholder name="appointment" params={params} />;

class MonthViewBase extends React.PureComponent<MonthViewProps, ViewState> {
  timeTable: WritableRefObject<HTMLElement> = React.createRef();
  layout = React.createRef<HTMLElement>();
  layoutHeader = React.createRef<HTMLElement>();

  state: ViewState = {
    rects: [],
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
    timeTableLayoutComponent: 'TimeTableLayout',
    timeTableCellComponent: 'TimeTableCell',
    timeTableRowComponent: 'TimeTableRow',
  };

  timeTableElementComputed = () => this.timeTable;
  layoutElementComputed = () => this.layout;
  layoutHeaderElementComputed = () => this.layoutHeader;

  layoutHeaderElement = viewName => (getters) => {
    return computed(
      getters, viewName!, this.layoutHeaderElementComputed, getters.layoutHeaderElement,
    );
  }
  memoLayoutHeaderElement = memoize(this.layoutHeaderElement);

  layoutElement = viewName => (getters) => {
    return computed(
      getters, viewName!, this.layoutElementComputed, getters.layoutElement,
    );
  }
  memoLayoutElement = memoize(this.layoutElement);

  timeTableElement = viewName => (getters) => {
    return computed(
      getters, viewName!, this.timeTableElementComputed, getters.timeTableElement,
    );
  }
  memoTimeTableElement = memoize(this.timeTableElement);

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

  availableViewNamesComputed = viewName => ({ availableViewNames }) => {
    return availableViewNamesCore(
      availableViewNames, viewName!,
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

  viewCellsDataBaseComputed = (firstDayOfWeek, intervalCount) => ({ currentDate }) => {
    return monthCellsData(
      currentDate, firstDayOfWeek,
      intervalCount!, Date.now(),
    );
  }

  viewCellsDataComputed: ComputedFn = (getters) => {
    return computed(
      getters,
      getters.viewName!,
      this.viewCellsDataBaseComputed(getters.firstDayOfWeek, getters.intervalCount),
      getters.viewCellsData,
    );
  }

  setTimeTableRef = (timeTableRef) => {
    this.timeTable.current = timeTableRef;
  }

  calculateRects = (appointments, startViewDate, endViewDate, viewCellsData) => (cellElements) => {
    const intervals = calculateMonthDateIntervals(
      appointments, startViewDate, endViewDate,
    );

    const rects = calculateRectByDateIntervals(
      {
        growDirection: HORIZONTAL_TYPE,
        multiline: true,
      },
      intervals,
      getHorizontalRectByDates,
      {
        startViewDate,
        endViewDate,
        viewCellsData,
        cellElements,
      },
    );

    this.setState({ rects });
  }
  memoCalculateRects =  memoize(this.calculateRects);

  render() {
    const {
      layoutComponent: ViewLayout,
      dayScaleLayoutComponent: DayScale,
      dayScaleCellComponent: DayScaleCell,
      dayScaleRowComponent: DayScaleRow,
      timeTableLayoutComponent: TimeTable,
      timeTableRowComponent: TimeTableRow,
      timeTableCellComponent: TimeTableCell,
      appointmentLayerComponent: AppointmentLayer,
      name: viewName,
      firstDayOfWeek,
      intervalCount,
    } = this.props;
    const { rects } = this.state;

    return (
      <Plugin
        name="MonthView"
      >
        <Getter name="availableViewNames" computed={this.memoAvailableViewNames(viewName)} />
        <Getter name="currentView" computed={this.memoCurrentView(viewName)} />

        <Getter
          name="firstDayOfWeek"
          computed={this.memoFirstDayOfWeek(viewName, firstDayOfWeek)}
        />
        <Getter name="intervalCount" computed={this.memoIntervalCount(viewName, intervalCount)} />
        <Getter name="viewCellsData" computed={this.viewCellsDataComputed} />
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
                  timeTableComponent={TimeTablePlaceholder}
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
        <Template name="main">
          <TemplateConnector>
            {({
              appointments, startViewDate, endViewDate, currentView, viewCellsData, formatDate,
            }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              const setRects = this.memoCalculateRects(
                appointments, startViewDate, endViewDate, viewCellsData,
              );
              return (
                <React.Fragment>
                  <TimeTable
                    cellsData={viewCellsData}
                    rowComponent={TimeTableRow}
                    cellComponent={CellPlaceholder}
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
 * A plugin that renders Scheduler data for a month. This plugin arranges appointments from left to right.
 * An appointment's size depends on its duration in days.
 * However, it occupies the entire day cell if an appointment lasts only for several hours or minutes.
 * The time scale and all-day panel are not available in this view.
 * */
export const MonthView: React.ComponentType<MonthViewProps> = MonthViewBase;
