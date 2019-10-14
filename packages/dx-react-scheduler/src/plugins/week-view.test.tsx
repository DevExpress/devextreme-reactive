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
import { WeekView } from './week-view';

// tslint:disable: max-line-length
jest.mock('@devexpress/dx-scheduler-core', () => ({
  computed: jest.fn(),
  viewCellsData: jest.fn(),
  startViewDate: jest.fn(),
  endViewDate: jest.fn(),
  availableViews: jest.fn(),
  calculateRectByDateIntervals: jest.fn(),
  calculateWeekDateIntervals: jest.fn(),
  getAppointmentStyle: jest.fn(),
  verticalTimeTableRects: jest.fn(),
}));

const DAYS_IN_WEEK = 7;

const defaultDeps = {
  getter: {
    currentDate: '2018-07-04',
    availableViews: [],
    currentView: { name: 'Week' },
    formatDate: jest.fn(),
    firstDayOfWeek: 2,
  },
  template: {
    body: {},
    dayScale: {},
    timeScale: {},
    dayScaleEmptyCell: {},
    timeTable: {},
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
  // eslint-disable-next-line react/prop-types, react/jsx-one-expression-per-line
  appointmentLayerComponent: ({ children }) => <div>{children}</div>,
};

describe('Week View', () => {
  beforeEach(() => {
    computed.mockImplementation(
      (getters, viewName, baseComputed) => baseComputed(getters, viewName),
    );
    viewCellsData.mockImplementation(() => ([
      [{}, {}], [{}, {}],
    ]));
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
          <WeekView
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).timeTableElementsMeta)
        .toEqual({});

      const setCellElementsMeta = tree.find(defaultProps.timeTableLayoutComponent)
        .props().setCellElementsMeta;
      setCellElementsMeta('elementsMeta');

      const weekViewState = tree.find(WeekView).state();
      expect(weekViewState.rects)
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
        intervalCount: 2,
        startDayHour: 1,
        endDayHour: 9,
        cellDuration: 30,
        excludedDays: [1],
      };
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <WeekView
            {...defaultProps}
            {...props}
          />
        </PluginHost>
      ));

      expect(viewCellsData)
        .toBeCalledWith(
          '2018-07-04', defaultDeps.getter.firstDayOfWeek,
          props.intervalCount * DAYS_IN_WEEK, props.excludedDays,
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
          <WeekView
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
          <WeekView
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

    it('should provide the "excludedDays" getter', () => {
      const excludedDays = [1, 2];
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <WeekView
            excludedDays={excludedDays}
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).excludedDays)
        .toBe(excludedDays);
    });

    it('should provide the "intervalCount" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <WeekView
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
          <WeekView
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).currentView)
        .toEqual({ name: 'Week', type: 'week', displayName: 'Week' });
    });

    it('should provide the "currentView" getter with user-set "displayName"', () => {
      const userDisplayName = 'User-set display name';
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <WeekView
            displayName={userDisplayName}
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).currentView)
        .toEqual({ name: 'Week', type: 'week', displayName: userDisplayName });
    });

    it('should provide "availableViews" getter', () => {
      availableViews.mockImplementation(() => 'availableViews');
      const viewName = 'Custom Month';
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <WeekView
            name={viewName}
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).availableViews)
        .toEqual('availableViews');
    });

    it('should calculate the "currentView" getter if there aren\'t any views before', () => {
      const viewName = 'Week View';
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, { getter: { currentView: undefined } })}
          <WeekView
            {...defaultProps}
            name={viewName}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).currentView)
        .toEqual({ name: viewName, type: 'week', displayName: viewName });
    });

    it('should not override previous view type', () => {
      const prevView = { name: 'Month', type: 'month' };
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, { getter: { currentView: prevView } })}
          <WeekView
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).currentView)
        .toEqual(prevView);
    });

    it('should provide "timeTableElementsMeta" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <WeekView
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
          <WeekView
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
          <WeekView
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

    it('should render day scale', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <WeekView
            {...defaultProps}
            dayScaleLayoutComponent={({ formatDate }) => <div formatDate={formatDate} className="day-scale" />}
          />
        </PluginHost>
      ));

      expect(tree.find('.day-scale').exists())
        .toBeTruthy();
      expect(tree.find('.day-scale').props().formatDate)
        .toBe(defaultDeps.getter.formatDate);
    });

    it('should render time scale', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <WeekView
            {...defaultProps}
            timeScaleLayoutComponent={({ formatDate }) => <div formatDate={formatDate} className="time-scale" />}
          />
        </PluginHost>
      ));

      expect(tree.find('.time-scale').exists())
        .toBeTruthy();
      expect(tree.find('.time-scale').props().formatDate)
        .toBe(defaultDeps.getter.formatDate);
    });

    it('should render time table', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <WeekView
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

    it('should render appointment layer', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <WeekView
            {...defaultProps}
            appointmentLayerComponent={({ children }) =>
              <div className="appointment-layer">{children}</div>}
          />
        </PluginHost>
      ));

      expect(tree.find('.appointment-layer').exists())
        .toBeTruthy();
    });

    it('should render dayScaleEmptyCell', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <WeekView
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
