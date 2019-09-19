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
import { BasicViewProps } from '../types';

const CellPlaceholder = params => <TemplatePlaceholder name="cell" params={params} />;
const AppointmentPlaceholder = params => <TemplatePlaceholder name="appointment" params={params} />;

const startViewDateBaseComputed = ({ viewCellsData }) => startViewDateCore(viewCellsData);
const endViewDateBaseComputed = ({ viewCellsData }) => endViewDateCore(viewCellsData);

class BasicViewBase extends React.PureComponent<BasicViewProps> {
  scrollingStrategyComputed = memoize((viewName, scrollingStrategy) => getters =>
    computed(getters, viewName!, () => scrollingStrategy, getters.scrollingStrategy));

  timeTableElementsMetaComputed = memoize((viewName, timeTableElementsMeta) => getters =>
    computed(getters, viewName!, () => timeTableElementsMeta, getters.timeTableElementsMeta));

  firstDayOfWeekComputed = memoize((viewName, firstDayOfWeek) => getters =>
    computed(getters, viewName!, () => firstDayOfWeek, getters.firstDayOfWeek));

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

  render() {
    const {
      name: viewName,
      firstDayOfWeek,
      intervalCount,
      displayName,
      type,
      excludedDays,
      cellDuration,
      startDayHour,
      endDayHour,
      viewCellsDataBaseComputed,
      rects,
      updateRects,

      dayScaleCellComponent,
      dayScaleRowComponent,
      dayScaleLayoutComponent: DayScale,

      timeTableCellComponent: TimeTableCell,
      timeTableLayoutComponent: TimeTableLayout
      timeTableRowComponent,

      appointmentLayerComponent: AppointmentLayer,
    } = this.props;
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
        <Getter
          name="firstDayOfWeek"
          computed={this.firstDayOfWeekComputed(viewName, firstDayOfWeek)}
        />
        <Getter name="excludedDays" computed={this.excludedDaysComputed(viewName, excludedDays)} />
        <Getter
          name="viewCellsData"
          computed={this.viewCellsDataComputed(
            viewName, cellDuration, startDayHour, endDayHour, viewCellsDataBaseComputed,
          )}
        />
        <Getter name="startViewDate" computed={this.startViewDateComputed} />
        <Getter name="endViewDate" computed={this.endViewDateComputed} />

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
              const setRects = updateRects(
                appointments, startViewDate, endViewDate, viewCellsData, cellDuration, excludedDaysGetter,
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
