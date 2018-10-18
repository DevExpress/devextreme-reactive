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
import { DayView } from './day-view';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  computed: jest.fn(),
  viewCellsData: jest.fn(),
  startViewDate: jest.fn(),
  endViewDate: jest.fn(),
  availableViews: jest.fn(),
  calculateRectByDateIntervals: jest.fn(),
  calculateWeekDateIntervals: jest.fn(),
}));

const defaultDeps = {
  getter: {
    currentDate: '2018-07-04',
    timeTableRef: {
      querySelectorAll: () => {},
    },
    availableViews: [],
    viewCellsData: [
      [{ startDate: new Date('2018-06-25') }, {}],
      [{}, { startDate: new Date('2018-08-05') }],
    ],
  },
  template: {
    body: {},
    navbar: {},
    sidebar: {},
    dayScaleEmptyCell: {},
    main: {},
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
          <DayView
            {...defaultProps}
            {...props}
          />
        </PluginHost>
      ));

      expect(viewCellsData)
        .toBeCalledWith(
          'day', '2018-07-04', undefined,
          props.intervalCount, props.intervalCount, [],
          props.startDayHour, props.endDayHour, props.cellDuration,
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

    it('should provide the "currentView" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DayView
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).currentView)
        .toEqual({ name: 'Day', type: 'day' });
    });
  });

  describe('Templates', () => {
    it('should render view layout', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DayView
            {...defaultProps}
            layoutComponent={() => <div className="view-layout" />}
          />
        </PluginHost>
      ));

      expect(tree.find('.view-layout').exists())
        .toBeTruthy();
    });

    it('should render time scale', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DayView
            {...defaultProps}
            timeScaleLayoutComponent={() => <div className="time-panel" />}
          />
        </PluginHost>
      ));

      expect(tree.find('.time-panel').exists())
        .toBeTruthy();
    });

    it('should render time table', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DayView
            {...defaultProps}
            timeTableLayoutComponent={() => <div className="time-table" />}
          />
        </PluginHost>
      ));

      expect(tree.find('.time-table').exists())
        .toBeTruthy();
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
