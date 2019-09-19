import * as React from 'react';
import {
  Template,
  Plugin,
  Getter,
  TemplateConnector,
  TemplatePlaceholder,
  PluginComponents,
} from '@devexpress/dx-react-core';
import {
  computed,
  viewCellsData as viewCellsDataCore,
  getAppointmentStyle,
  verticalTimeTableRects,
} from '@devexpress/dx-scheduler-core';
import { memoize } from '@devexpress/dx-core';
import { BasicView } from './basic-view';

import { VerticalViewProps, ViewState } from '../types';

const TYPE = 'day';
const viewCellsDataBaseComputed = (
  cellDuration, startDayHour, endDayHour,
) => ({ currentDate, intervalCount }) => {
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
    scrollingStrategy: {
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

  scrollingStrategyComputed = memoize((viewName, scrollingStrategy) => getters =>
    computed(getters, viewName!, () => scrollingStrategy, getters.scrollingStrategy));

  timeTableElementsMetaComputed = memoize((viewName, timeTableElementsMeta) => getters =>
    computed(getters, viewName!, () => timeTableElementsMeta, getters.timeTableElementsMeta));

  updateRects = memoize((
    appointments, startViewDate, endViewDate, viewCellsData, cellDuration,
  ) => (cellElementsMeta) => {
    const rects = verticalTimeTableRects(
      appointments, startViewDate, endViewDate, [],
      viewCellsData, cellDuration, cellElementsMeta,
    );

    this.setState({ rects, timeTableElementsMeta: cellElementsMeta });
  });

  setScrollingStrategy = (scrollingStrategy) => {
    this.setState({ scrollingStrategy });
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
      displayName,
      startDayHour,
      endDayHour,
    } = this.props;
    const { rects, timeTableElementsMeta, scrollingStrategy } = this.state;

    return (
      <Plugin
        name="DayView"
      >
        <BasicView
          viewCellsDataBaseComputed={viewCellsDataBaseComputed}
          type={TYPE}
          cellDuration={cellDuration}
          name={viewName}
          intervalCount={intervalCount}
          displayName={displayName}
          startDayHour={startDayHour}
          endDayHour={endDayHour}

          dayScaleLayoutComponent={DayScale}
          dayScaleCellComponent={DayScaleCell}
          dayScaleRowComponent={DayScaleRow}

          timeTableCellComponent={TimeTableCell}
          timeTableLayoutComponent={TimeTableLayout}
          timeTableRowComponent={timeTableRowComponent}

          appointmentLayerComponent={AppointmentLayer}
          rects={rects}
          updateRects={this.updateRects}
        />

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
                  dayScaleEmptyCellComponent={DayScaleEmptyCellPlaceholder}
                  timeTableComponent={TimeTablePlaceholder}
                  timeScaleComponent={TimeScalePlaceholder}
                  setScrollingStrategy={this.setScrollingStrategy}
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

        {/* <Template name="timeTable">
          <TemplateConnector>
            {({
              appointments, startViewDate, formatDate,
              endViewDate, currentView, currentDate,
              viewCellsData,
            }) => {
              if (currentView.name !== viewName) return <TemplatePlaceholder />;
              const setRects = this.updateRects(
                appointments, startViewDate, endViewDate, viewCellsData, cellDuration,
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
        </Template> */}

        {/* <Template name="cell">
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
        </Template> */}
      </Plugin >
    );
  }
}

// tslint:disable-next-line: max-line-length
/*** A plugin that renders Scheduler data for a day. This plugin arranges appointments from top to bottom.
 * If their time intervals overlap, their width is decreased and they are placed next to each other.
 * */
export const DayView: React.ComponentType<VerticalViewProps> = DayViewBase;
