import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  computed,
  viewCellsData,
  startViewDate,
  endViewDate,
  calculateRectByDateIntervals,
  calculateWeekDateIntervals,
} from '@devexpress/dx-scheduler-core';
import { WeekView } from './week-view';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  computed: jest.fn(),
  viewCellsData: jest.fn(),
  startViewDate: jest.fn(),
  endViewDate: jest.fn(),
  availableViews: jest.fn(),
  calculateRectByDateIntervals: jest.fn(),
  calculateWeekDateIntervals: jest.fn(),
}));

const DAYS_IN_WEEK = 7;

const defaultDeps = {
  getter: {
    currentDate: '2018-07-04',
    availableViews: [],
    currentView: { name: 'Week' },
  },
  template: {
    body: {},
    navbar: {},
    sidebar: {},
    dayScaleEmptyCell: {},
    main: {},
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
  containerComponent: ({ children }) => <div>{children}</div>,
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
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Getters', () => {
    it('should provide the "viewCellsData" getter', () => {
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
          <WeekView
            {...defaultProps}
            {...props}
          />
        </PluginHost>
      ));

      expect(viewCellsData)
        .toBeCalledWith(
          'week', '2018-07-04', props.firstDayOfWeek, props.intervalCount,
          props.intervalCount * DAYS_IN_WEEK, props.excludedDays,
          props.startDayHour, props.endDayHour, props.cellDuration,
        );
      expect(getComputedState(tree).viewCellsData)
        .toEqual([[{}, {}], [{}, {}]]);
    });

    it('should provide the "firstDayOfWeek" getter', () => {
      const firstDayOfWeek = 2;
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <WeekView
            firstDayOfWeek={firstDayOfWeek}
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).firstDayOfWeek)
        .toBe(firstDayOfWeek);
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

    it('should provide the "currentView" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <WeekView
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).currentView)
        .toEqual({ name: 'Week', type: 'week' });
    });

    it('should calculate the "currentView" getter if there aren\'t any views before', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, { getter: { currentView: undefined } })}
          <WeekView
            {...defaultProps}
            name="Week View"
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).currentView)
        .toEqual({ name: 'Week View', type: 'week' });
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
  });

  describe('Templates', () => {
    it('should render view layout', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <WeekView
            {...defaultProps}
            layoutComponent={() => <div className="view-layout" />}
          />
        </PluginHost>
      ));

      expect(tree.find('.view-layout').exists())
        .toBeTruthy();
    });

    it('should render day scale', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <WeekView
            {...defaultProps}
            dayScaleLayoutComponent={() => <div className="day-scale" />}
          />
        </PluginHost>
      ));

      expect(tree.find('.day-scale').exists())
        .toBeTruthy();
    });

    it('should render time scale', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <WeekView
            {...defaultProps}
            timeScaleLayoutComponent={() => <div className="time-scale" />}
          />
        </PluginHost>
      ));

      expect(tree.find('.time-scale').exists())
        .toBeTruthy();
    });

    it('should render time table', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <WeekView
            {...defaultProps}
            timeTableLayoutComponent={() => <div className="time-table" />}
          />
        </PluginHost>
      ));

      expect(tree.find('.time-table').exists())
        .toBeTruthy();
    });

    it('should render appointment container', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <WeekView
            {...defaultProps}
            // eslint-disable-next-line react/jsx-one-expression-per-line
            containerComponent={({ children }) => <div className="container">{children}</div>}
          />
        </PluginHost>
      ));

      expect(tree.find('.container').exists())
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
