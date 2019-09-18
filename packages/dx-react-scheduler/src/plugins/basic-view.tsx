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
  availableViews as availableViewsCore,
  horizontalTimeTableRects,
} from '@devexpress/dx-scheduler-core';
import { memoize } from '@devexpress/dx-core';

const startViewDateBaseComputed = ({ viewCellsData }) => startViewDateCore(viewCellsData);
const endViewDateBaseComputed = ({ viewCellsData }) => endViewDateCore(viewCellsData);

class BasicViewBase extends React.PureComponent {
  state = {
    rects: [],
    timeTableElementsMeta: {},
    scrollingStrategy: {
      topBoundary: 0,
      bottomBoundary: 0,
      changeVerticalScroll: () => undefined,
    },
  };

  scrollingStrategyComputed = memoize((viewName, scrollingStrategy) => getters =>
    computed(getters, viewName!, () => scrollingStrategy, getters.scrollingStrategy));

  timeTableElementsMetaComputed = memoize((viewName, timeTableElementsMeta) => getters =>
    computed(getters, viewName!, () => timeTableElementsMeta, getters.timeTableElementsMeta));

  firstDayOfWeekComputed = memoize((viewName, firstDayOfWeek) => getters =>
    computed(getters, viewName!, () => firstDayOfWeek, getters.firstDayOfWeek));

  intervalCountComputed = memoize((viewName, intervalCount) => getters =>
    computed(getters, viewName!, () => intervalCount, getters.intervalCount));

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

  viewCellsDataComputed: ComputedFn = (getters) => {
    const { name: viewName, viewCellsDataBaseComputed } = this.props;
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
      displayName,
      type,
    } = this.props;
    const viewDisplayName = displayName || viewName;

    console.log('basic view');
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
          name="firstDayOfWeek"
          computed={this.firstDayOfWeekComputed(viewName, firstDayOfWeek)}
        />
        <Getter
          name="intervalCount"
          computed={this.intervalCountComputed(viewName, intervalCount)}
        />
        <Getter name="viewCellsData" computed={this.viewCellsDataComputed} />
        <Getter name="startViewDate" computed={this.startViewDateComputed} />
        <Getter name="endViewDate" computed={this.endViewDateComputed} />
      </Plugin>
    );
  }
}
export const BasicView: React.ComponentType = BasicViewBase;
