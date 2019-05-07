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

import { MonthViewProps, ViewState } from '../types';

const TYPE = 'month';
const startViewDateBaseComputed = ({ viewCellsData }) => startViewDateCore(viewCellsData);
const endViewDateBaseComputed = ({ viewCellsData }) => endViewDateCore(viewCellsData);

class MonthViewBase extends React.PureComponent<MonthViewProps, ViewState> {
  static defaultProps = {
    intervalCount: 1,
    firstDayOfWeek: 0,
    name: 'Month',
  };

  static components = {
    layoutComponent: 'Layout',
    appointmentLayerComponent: 'AppointmentLayer',
    dayScaleLayoutComponent: 'DayScaleLayout',
    dayScaleCellComponent: 'DayScaleCell',
    dayScaleRowComponent: 'DayScaleRow',
    timeTableLayoutComponent: 'TimeTableLayout',
    timeTableCellComponent: 'TimeTableCell',
    timeTableRowComponent: 'TimeTableRow',
  };

  timeTable: any;
  layout: any;
  layoutHeader: any;
  dayScalePlaceholder: any;
  timeTablePlaceholder: any;
  appointmentPlaceholder: any;
  cellPlaceholder: any;
  currentViewComputed: (getters: Getters) => any;
  availableViewNamesComputed: (getters: Getters) => any;
  intervalCountComputed: (getters: Getters) => any;
  firstDayOfWeekComputed: (getters: Getters) => any;
  startViewDateComputed: (getters: Getters) => any;
  endViewDateComputed: (getters: Getters) => any;
  viewCellsDataComputed: (getters: Getters) => any;
  timeTableElement: any;
  layoutElement: any;
  layoutHeaderElement: any;

  constructor(props) {
    super(props);

    this.state = {
      timeTableRef: null,
    };

    const {
      name: viewName, firstDayOfWeek, intervalCount,
    } = props;

    this.timeTable = { current: null };
    this.layout = React.createRef();
    this.layoutHeader = React.createRef();
    this.setTimeTableRef = this.setTimeTableRef.bind(this);

    this.dayScalePlaceholder = () => <TemplatePlaceholder name="navbar" />;
    this.timeTablePlaceholder = () => <TemplatePlaceholder name="main" />;
    this.appointmentPlaceholder = params => <TemplatePlaceholder name="appointment" params={params} />;
    this.cellPlaceholder = params => <TemplatePlaceholder name="cell" params={params} />;

    const viewCellsDataBaseComputed = ({
      currentDate,
    }) => monthCellsData(
      currentDate, firstDayOfWeek,
      intervalCount, Date.now(),
    );

    const timeTableElementComputed = () => this.timeTable;
    const layoutElementComputed = () => this.layout;
    const layoutHeaderElementComputed = () => this.layoutHeader;

    this.currentViewComputed = ({ currentView }) => (
      currentView && currentView.name !== viewName
        ? currentView
        : { name: viewName, type: TYPE }
    );
    this.availableViewNamesComputed = ({ availableViewNames }) => availableViewNamesCore(
      availableViewNames, viewName,
    );
    this.intervalCountComputed = (getters: Getters) => computed(
      getters, viewName, () => intervalCount, getters.intervalCount,
    );
    this.firstDayOfWeekComputed = (getters: Getters) => computed(
      getters, viewName, () => firstDayOfWeek, getters.firstDayOfWeek,
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
      dayScaleLayoutComponent: DayScale,
      dayScaleCellComponent: DayScaleCell,
      dayScaleRowComponent: DayScaleRow,
      timeTableLayoutComponent: TimeTable,
      timeTableRowComponent: TimeTableRow,
      timeTableCellComponent: TimeTableCell,
      appointmentLayerComponent: AppointmentLayer,
      name: viewName,
    } = this.props;
    const { timeTableRef: stateTimeTableRef } = this.state;

    return (
      <Plugin
        name="MonthView"
      >
        <Getter name="availableViewNames" computed={this.availableViewNamesComputed} />
        <Getter name="currentView" computed={this.currentViewComputed} />
        <Getter name="firstDayOfWeek" computed={this.firstDayOfWeekComputed} />
        <Getter name="intervalCount" computed={this.intervalCountComputed} />
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
                  timeTableComponent={this.timeTablePlaceholder}
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
              const intervals = calculateMonthDateIntervals(
                appointments, startViewDate, endViewDate,
              );
              const rects = stateTimeTableRef ? calculateRectByDateIntervals(
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

/** A plugin that renders Scheduler data for a month. This plugin arranges appointments from left to right. An appointment's size depends on its duration in days. However, it occupies the entire day cell if an appointment lasts only for several hours or minutes. The time scale and all-day panel are not available in this view. */
export const MonthView: React.ComponentType<MonthViewProps> = MonthViewBase;
