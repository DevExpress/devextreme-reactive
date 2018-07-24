import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  timeScale,
  dayScale,
  startViewDate,
  endViewDate,
  appointmentRects,
} from '@devexpress/dx-scheduler-core';
import { WeekView } from './week-view';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  timeScale: jest.fn(),
  dayScale: jest.fn(),
  startViewDate: jest.fn(),
  endViewDate: jest.fn(),
  appointmentRects: jest.fn(),
}));

const defaultDeps = {
  getter: {
    currentDate: '2018-07-04',
    dateTableRef: {
      querySelectorAll: () => {},
    },
  },
  template: {
    body: {},
    navbar: {},
    sidebar: {},
    main: {},
  },
};

const defaultProps = {
  layoutComponent: () => null,
  timePanelLayoutComponent: () => null,
  timePanelTableComponent: () => null,
  timePanelRowComponent: () => null,
  timePanelCellComponent: () => null,
  dayPanelLayoutComponent: () => null,
  dayPanelTableComponent: () => null,
  dayPanelCellComponent: () => null,
  dateTableLayoutComponent: () => null,
  dateTableTableComponent: () => null,
  dateTableRowComponent: () => null,
  dateTableCellComponent: () => null,
};

describe('Week View', () => {
  beforeEach(() => {
    timeScale.mockImplementation(() => [8, 9, 10]);
    dayScale.mockImplementation(() => [1, 2, 3]);
    startViewDate.mockImplementation(() => '2018-07-04');
    endViewDate.mockImplementation(() => '2018-07-11');
    appointmentRects.mockImplementation(() => [{
      x: 1, y: 2, width: 100, height: 150, dataItem: 'data',
    }]);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Getters', () => {
    it('should provide the "timeScale" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <WeekView
            startDayHour={8}
            endDayHour={18}
            cellDuration={60}
            firstDayOfWeek={1}
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(timeScale)
        .toBeCalledWith('2018-07-04', 1, 8, 18, 60, []);
      expect(getComputedState(tree).timeScale)
        .toEqual([8, 9, 10]);
    });

    it('should provide the "dayScale" getter', () => {
      const firstDayOfWeek = 2;
      const intervalCount = 2;
      const excludedDays = [1, 2];
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <WeekView
            firstDayOfWeek={firstDayOfWeek}
            intervalCount={intervalCount}
            excludedDays={excludedDays}
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(dayScale)
        .toBeCalledWith('2018-07-04', firstDayOfWeek, intervalCount * 7, excludedDays);
      expect(getComputedState(tree).dayScale)
        .toEqual([1, 2, 3]);
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
        .toBeCalledWith([1, 2, 3], [8, 9, 10], 2);
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
        .toBeCalledWith([1, 2, 3], [8, 9, 10]);
      expect(getComputedState(tree).endViewDate)
        .toBe('2018-07-11');
    });

    it('should provide the "cellDuration" getter', () => {
      const cellDuration = 60;
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <WeekView
            cellDuration={cellDuration}
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).cellDuration)
        .toBe(cellDuration);
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

    it('should provide the "appointmentRects" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <WeekView
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).appointmentRects)
        .toEqual([{
          x: 1, y: 2, width: 100, height: 150, dataItem: 'data',
        }]);
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

    it('should render day panel', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <WeekView
            {...defaultProps}
            dayPanelLayoutComponent={() => <div className="day-panel" />}
          />
        </PluginHost>
      ));

      expect(tree.find('.day-panel').exists())
        .toBeTruthy();
    });

    it('should render time panel', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <WeekView
            {...defaultProps}
            timePanelLayoutComponent={() => <div className="time-panel" />}
          />
        </PluginHost>
      ));

      expect(tree.find('.time-panel').exists())
        .toBeTruthy();
    });

    it('should render date table', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <WeekView
            {...defaultProps}
            dateTableLayoutComponent={() => <div className="date-table" />}
          />
        </PluginHost>
      ));

      expect(tree.find('.date-table').exists())
        .toBeTruthy();
    });
  });
});
