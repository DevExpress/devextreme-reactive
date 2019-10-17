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
  getAppointmentStyle,
  startViewDate as startViewDateCore,
  endViewDate as endViewDateCore,
  availableViews as availableViewsCore,
} from '@devexpress/dx-scheduler-core';
import { memoize } from '@devexpress/dx-core';
import { BasicViewProps, BasicViewState, ScrollingStrategy, ElementRect } from '../types';

const CellPlaceholder = params => <TemplatePlaceholder name="cell" params={params} />;
const AppointmentPlaceholder = params => <TemplatePlaceholder name="appointment" params={params} />;

const startViewDateBaseComputed = ({ viewCellsData }) => startViewDateCore(viewCellsData);
const endViewDateBaseComputed = ({ viewCellsData }) => endViewDateCore(viewCellsData);

const TimeTablePlaceholder = () => <TemplatePlaceholder name="timeTable" />;
const DayScalePlaceholder = () => <TemplatePlaceholder name="dayScale" />;

class BasicViewBase extends React.PureComponent<BasicViewProps, BasicViewState> {
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

  intervalCountComputed = memoize((viewName, intervalCount) => getters =>
    computed(getters, viewName!, () => intervalCount, getters.intervalCount));

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

  updateRects = memoize((
    appointments, startViewDate, endViewDate,
    viewCellsData, cellDuration, excludedDays, timeTableRects,
  ) => (cellElementsMeta) => {
    const rects = timeTableRects(
      appointments, startViewDate, endViewDate, excludedDays,
      viewCellsData, cellDuration, cellElementsMeta,
    );

    this.setState({ rects, timeTableElementsMeta: cellElementsMeta });
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
      timeTableRects,
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
    const { rects, timeTableElementsMeta, scrollingStrategy } = this.state;
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
          name="timeTableElementsMeta"
          computed={this.timeTableElementsMetaComputed(viewName, timeTableElementsMeta)}
        />
        <Getter
          name="scrollingStrategy"
          computed={this.scrollingStrategyComputed(viewName, scrollingStrategy)}
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
            {({ currentView, viewCellsData, formatDate }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              return (
                <DayScale
                  cellComponent={dayScaleCellComponent}
                  rowComponent={dayScaleRowComponent}
                  cellsData={viewCellsData}
                  formatDate={formatDate}
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
            {({
              formatDate,
              currentView,
              viewCellsData,
              appointments, startViewDate, endViewDate,
              excludedDays: excludedDaysGetter,
            }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              const setRects = this.updateRects(
                appointments, startViewDate, endViewDate,
                viewCellsData, cellDuration, excludedDaysGetter,
                timeTableRects,
              );

              return (
                <>
                  <TimeTableLayout
                    cellsData={viewCellsData}
                    rowComponent={timeTableRowComponent}
                    cellComponent={CellPlaceholder}
                    formatDate={formatDate}
                    setCellElementsMeta={setRects}
                  />
                  <AppointmentLayer>
                    {(rects as ElementRect[]).map(({
                      dataItem, type: rectType, fromPrev, toNext, durationType, ...geometry
                    }, index) => (
                      <AppointmentPlaceholder
                        key={index.toString()}
                        type={rectType}
                        data={dataItem}
                        fromPrev={fromPrev}
                        toNext={toNext}
                        durationType={durationType}
                        style={getAppointmentStyle(geometry)}
                      />
                    ))}
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
