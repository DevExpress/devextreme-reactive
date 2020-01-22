import * as React from 'react';
import {
  Template,
  Plugin,
  Getter,
  TemplateConnector,
  TemplatePlaceholder,
  ComputedFn,
} from '@devexpress/dx-react-core';
import {
  computed,
  startViewDate as startViewDateCore,
  endViewDate as endViewDateCore,
  availableViews as availableViewsCore,
} from '@devexpress/dx-scheduler-core';
import { memoize } from '@devexpress/dx-core';
import { BasicViewProps, BasicViewState, ScrollingStrategy } from '../types';

const CellPlaceholder = params => <TemplatePlaceholder name="cell" params={params} />;
const TimeTableAppointmentLayer = () => <TemplatePlaceholder name="timeTableAppointmentLayer" />;

const startViewDateBaseComputed = ({ viewCellsData }) => startViewDateCore(viewCellsData);
const endViewDateBaseComputed = ({ viewCellsData }) => endViewDateCore(viewCellsData);

const TimeTablePlaceholder = () => <TemplatePlaceholder name="timeTable" />;
const DayScalePlaceholder = () => <TemplatePlaceholder name="dayScale" />;

const GroupingPanelPlaceholder = () => <TemplatePlaceholder name="groupingPanel" />;

class BasicViewBase extends React.PureComponent<BasicViewProps, BasicViewState> {
  state = {
    timeTableElementsMeta: {},
    scrollingStrategy: {
      topBoundary: 0,
      bottomBoundary: 0,
      leftBoundary: 0,
      rightBoundary: 0,
      changeVerticalScroll: () => undefined,
      changeHorizontalScroll: () => undefined,
    },
  };

  scrollingStrategyComputed = memoize((viewName, scrollingStrategy) => getters =>
    computed(getters, viewName!, () => scrollingStrategy, getters.scrollingStrategy));

  timeTableElementsMetaComputed = memoize((viewName, timeTableElementsMeta) => getters =>
    computed(getters, viewName!, () => timeTableElementsMeta, getters.timeTableElementsMeta));

  intervalCountComputed = memoize((viewName, intervalCount) => getters =>
    computed(getters, viewName!, () => intervalCount, getters.intervalCount));

  cellDurationComputed = memoize((viewName, cellDuration) => getters =>
    computed(getters, viewName, () => cellDuration, getters.cellDuration));

  excludedDaysComputed = memoize((viewName, excludedDays) => getters => computed(
    getters, viewName!, () => excludedDays, getters.excludedDays,
  ));

  availableViewsComputed = memoize((viewName, viewDisplayName) => ({ availableViews }) =>
    availableViewsCore(availableViews, viewName!, viewDisplayName));

  currentViewComputed = memoize((viewName, viewDisplayName, type) => ({ currentView }) => (
    currentView && currentView.name !== viewName
      ? currentView
      : { name: viewName, type, displayName: viewDisplayName }
  ));

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

  viewCellsDataComputed = memoize((
    viewName, cellDuration, startDayHour, endDayHour, viewCellsDataBaseComputed,
  ) => getters => computed(
    getters,
    viewName,
    viewCellsDataBaseComputed(cellDuration, startDayHour, endDayHour),
    getters.viewCellsData,
  ));

  timeTableAppointmentsComputed = memoize((
    viewName, cellDuration, calculateAppointmentsIntervals,
  ) => getters => computed(
      getters,
      viewName,
      calculateAppointmentsIntervals(cellDuration),
      getters.timeTableAppointments,
    ));

  updateCellElementsMeta = memoize((cellElementsMeta) => {
    this.setState({ timeTableElementsMeta: cellElementsMeta });
  });

  setScrollingStrategy = (scrollingStrategy: ScrollingStrategy) => {
    this.setState({ scrollingStrategy });
  }

  render() {
    const {
      name: viewName,
      intervalCount,
      displayName,
      type,
      excludedDays,
      cellDuration,
      startDayHour,
      endDayHour,
      viewCellsDataComputed,
      calculateAppointmentsIntervals,
      dayScaleCellComponent,
      dayScaleRowComponent,
      dayScaleLayoutComponent: DayScale,
      timeTableCellComponent: TimeTableCell,
      timeTableLayoutComponent: TimeTableLayout,
      timeTableRowComponent,
      appointmentLayerComponent: AppointmentLayer,
      layoutProps,
      layoutComponent: Layout,
    } = this.props;
    const { timeTableElementsMeta, scrollingStrategy } = this.state;
    const viewDisplayName = displayName || viewName;

    return (
      <Plugin name="basicView">
        <Getter
          name="availableViews"
          computed={this.availableViewsComputed(viewName, viewDisplayName)}
        />
        <Getter
          name="currentView"
          computed={this.currentViewComputed(viewName, viewDisplayName, type)}
        />
        <Getter
          name="intervalCount"
          computed={this.intervalCountComputed(viewName, intervalCount)}
        />
        <Getter name="excludedDays" computed={this.excludedDaysComputed(viewName, excludedDays)} />
        <Getter
          name="viewCellsData"
          computed={this.viewCellsDataComputed(
            viewName, cellDuration, startDayHour, endDayHour, viewCellsDataComputed,
          )}
        />
        <Getter name="startViewDate" computed={this.startViewDateComputed} />
        <Getter name="endViewDate" computed={this.endViewDateComputed} />
        <Getter
          name="cellDuration"
          computed={this.cellDurationComputed(viewName, cellDuration)}
        />

        <Getter
          name="timeTableElementsMeta"
          computed={this.timeTableElementsMetaComputed(viewName, timeTableElementsMeta)}
        />
        <Getter
          name="scrollingStrategy"
          computed={this.scrollingStrategyComputed(viewName, scrollingStrategy)}
        />

        <Getter
          name="timeTableAppointments"
          computed={this.timeTableAppointmentsComputed(
            viewName, cellDuration, calculateAppointmentsIntervals,
          )}
        />

        <Template name="body">
          <TemplateConnector>
            {({ currentView }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              return (
                <Layout
                  dayScaleComponent={DayScalePlaceholder}
                  timeTableComponent={TimeTablePlaceholder}
                  setScrollingStrategy={this.setScrollingStrategy}
                  {...layoutProps}
                />
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="dayScale">
          <TemplateConnector>
            {({ currentView, viewCellsData, formatDate, groupByDate }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              const groupByDateEnabled = groupByDate?.(viewName);
              return (
                <DayScale
                  cellComponent={dayScaleCellComponent}
                  rowComponent={dayScaleRowComponent}
                  groupingPanelComponent={GroupingPanelPlaceholder}
                  cellsData={viewCellsData}
                  formatDate={formatDate}
                  groupedByDate={groupByDateEnabled}
                />
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

        <Template name="timeTable">
          <TemplateConnector>
            {({ formatDate, currentView, viewCellsData }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              return (
                <>
                  <TimeTableLayout
                    cellsData={viewCellsData}
                    rowComponent={timeTableRowComponent}
                    cellComponent={CellPlaceholder}
                    formatDate={formatDate}
                    setCellElementsMeta={this.updateCellElementsMeta}
                  />
                  <AppointmentLayer>
                    <TimeTableAppointmentLayer />
                  </AppointmentLayer>
                </>
              );
            }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}
export const BasicView: React.ComponentType<BasicViewProps> = BasicViewBase;
