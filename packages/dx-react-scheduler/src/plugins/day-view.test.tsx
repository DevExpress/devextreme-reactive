import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  computed,
  viewCellsData,
  startViewDate,
  endViewDate,
  calculateRectByDateIntervals,
  calculateWeekDateIntervals,
  availableViews,
  getAppointmentStyle,
  verticalTimeTableRects,
} from '@devexpress/dx-scheduler-core';
import { DayView } from './day-view';

/* tslint:disable max-line-length */
jest.mock('@devexpress/dx-scheduler-core', () => ({
  computed: jest.fn(),
  viewCellsData: jest.fn(),
  startViewDate: jest.fn(),
  endViewDate: jest.fn(),
  availableViews: jest.fn(),
  calculateRectByDateIntervals: jest.fn(),
  calculateWeekDateIntervals: jest.fn(),
  verticalTimeTableRects: jest.fn(),
  getAppointmentStyle: jest.fn(),
}));

const defaultDeps = {
  getter: {
    currentDate: '2018-07-04',
    availableViewNames: [],
    viewCellsData: [
      [{ startDate: new Date('2018-06-25') }, {}],
      [{}, { startDate: new Date('2018-08-05') }],
    ],
    formatDate: jest.fn(),
  },
  template: {
    body: {},
    dayScale: {},
    timeScale: {},
    dayScaleEmptyCell: {},
    timeTable: {},
    appointment: {},
  },
};

const defaultProps = {
  layoutComponent: () => null,
  timeScaleLayoutComponent: () => null,
  timeScaleRowComponent: () => null,
  timeScaleCellComponent: () => null,
  dayScaleLayoutComponent: () => null,
  dayScaleCellComponent: () => null,
  dayScaleRowComponent: () => null,
  timeTableLayoutComponent: () => null,
  timeTableRowComponent: () => null,
  timeTableCellComponent: () => null,
  dayScaleEmptyCellComponent: () => null,
  appointmentLayerComponent: () => null,
};

describe('Day View', () => {
  beforeEach(() => {
    computed.mockImplementation(
      (getters, viewName, baseComputed) => baseComputed(getters, viewName),
    );
    viewCellsData.mockImplementation(() => [
      [{}, {}],
      [{}, {}],
    ]);
    startViewDate.mockImplementation(() => '2018-07-04');
    endViewDate.mockImplementation(() => '2018-07-11');
    calculateRectByDateIntervals.mockImplementation(() => [{
      x: 1, y: 2, width: 100, height: 150, dataItem: 'data',
    }]);
    calculateWeekDateIntervals.mockImplementation(() => []);
    getAppointmentStyle.mockImplementation(() => undefined);
    verticalTimeTableRects.mockImplementation(() => [{ data: 1 }]);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Getters', () => {
    it('should provide "allDayElementsMeta" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DayView
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).timeTableElementsMeta)
        .toEqual({});

      const setCellElementsMeta = tree.find(defaultProps.timeTableLayoutComponent)
        .props().setCellElementsMeta;
      setCellElementsMeta('elementsMeta');

      const dayViewState = tree.find(DayView).state();
      expect(dayViewState.rects)
        .toEqual([{ data: 1 }]);

      tree.update();

      expect(getComputedState(tree).timeTableElementsMeta)
        .toEqual('elementsMeta');
    });
    it('should provide the "viewCellsData" getter', () => {
      computed.mockImplementation(
        (getters, viewName, baseComputed) => getters.currentView.name === viewName && baseComputed(getters, viewName),
      );
      const DATE_TO_USE = new Date('2018-10-9');
      global.Date.now = jest.fn(() => new Date(DATE_TO_USE));
      const props = {
        firstDayOfWeek: 2,
        intervalCount: 2,
        startDayHour: 1,
        endDayHour: 9,
        cellDuration: 30,
        excludedDays: [1],
      };
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DayView
            {...defaultProps}
            {...props}
          />
        </PluginHost>
      ));

      expect(viewCellsData)
        .toBeCalledWith(
          '2018-07-04', undefined,
          props.intervalCount, [],
          props.startDayHour, props.endDayHour, props.cellDuration,
          DATE_TO_USE,
        );
      expect(getComputedState(tree).viewCellsData)
        .toEqual([[{}, {}], [{}, {}]]);
    });

    it('should provide the "startViewDate" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DayView
            {...defaultProps}
            startDayHour={2}
          />
        </PluginHost>
      ));
      expect(startViewDate)
        .toBeCalledWith([
          [{}, {}], [{}, {}],
        ]);
      expect(getComputedState(tree).startViewDate)
        .toBe('2018-07-04');
    });

    it('should provide the "endViewDate" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DayView
            {...defaultProps}
          />
        </PluginHost>
      ));
      expect(endViewDate)
        .toBeCalledWith([
          [{}, {}],
          [{}, {}],
        ]);
      expect(getComputedState(tree).endViewDate)
        .toBe('2018-07-11');
    });

    it('should provide the "cellDuration" getter', () => {
      const cellDuration = 60;
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DayView
            cellDuration={cellDuration}
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).cellDuration)
        .toBe(cellDuration);
    });

    it('should provide the "intervalCount" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DayView
            intervalCount={2}
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).intervalCount)
        .toBe(2);
    });

    it('should provide the "currentView" getter with default "displayName"', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DayView
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).currentView)
        .toEqual({ name: 'Day', type: 'day', displayName: 'Day' });
    });

    it('should provide the "currentView" getter with user-set "displayName"', () => {
      const userDisplayName = 'User-set display name';
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DayView
            displayName={userDisplayName}
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).currentView)
        .toEqual({ name: 'Day', type: 'day', displayName: userDisplayName });
    });

    it('should provide "availableViews" getter', () => {
      availableViews.mockImplementation(() => 'availableViews');
      const viewName = 'Custom Month';
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DayView
            name={viewName}
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).availableViews)
        .toEqual('availableViews');
    });

    it('should provide "timeTableElementsMeta" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DayView
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).timeTableElementsMeta)
        .toEqual({});
    });

    it('should provide "scrollingStrategy" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DayView
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).scrollingStrategy)
        .toEqual({
          topBoundary: 0,
          bottomBoundary: 0,
          changeVerticalScroll: expect.any(Function),
        });
    });
  });

  describe('Templates', () => {
    it('should render view layout', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DayView
            {...defaultProps}
            layoutComponent={({ setScrollingStrategy }) => <div className="view-layout" setScrollingStrategy={setScrollingStrategy} />}
          />
        </PluginHost>
      ));

      expect(tree.find('.view-layout').exists())
        .toBeTruthy();
      expect(tree.find('.view-layout').props().setScrollingStrategy)
        .toEqual(expect.any(Function));
    });

    it('should render time scale', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DayView
            {...defaultProps}
            timeScaleLayoutComponent={({ formatDate }) => <div formatDate={formatDate} className="time-panel" />}
          />
        </PluginHost>
      ));

      expect(tree.find('.time-panel').exists())
        .toBeTruthy();
      expect(tree.find('.time-panel').props().formatDate)
        .toBe(defaultDeps.getter.formatDate);
    });

    it('should render day scale', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DayView
            {...defaultProps}
            // tslint:disable-next-line: max-line-length
            dayScaleLayoutComponent={({ formatDate }) => <div formatDate={formatDate} className="day-scale" />}
          />
        </PluginHost>
      ));

      expect(tree.find('.day-scale').exists())
        .toBeTruthy();
      expect(tree.find('.day-scale').props().formatDate)
        .toBe(defaultDeps.getter.formatDate);
    });

    it('should render time table', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DayView
            {...defaultProps}
            timeTableLayoutComponent={({
              formatDate, setCellElementsMeta,
            }) => <div setCellElementsMeta={setCellElementsMeta} formatDate={formatDate} className="time-table" />}
          />
        </PluginHost>
      ));

      expect(tree.find('.time-table').exists())
        .toBeTruthy();
      expect(tree.find('.time-table').props().formatDate)
        .toBe(defaultDeps.getter.formatDate);
      expect(tree.find('.time-table').props().setCellElementsMeta)
        .toEqual(expect.any(Function));
    });

    it('should render day scale empty cell', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DayView
            {...defaultProps}
            dayScaleEmptyCellComponent={() => <div className="empty-cell" />}
          />
        </PluginHost>
      ));

      expect(tree.find('.empty-cell').exists())
        .toBeTruthy();
    });
  });
});
