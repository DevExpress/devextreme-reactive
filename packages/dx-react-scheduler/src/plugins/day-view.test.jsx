import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  timeScale,
  startViewDate,
  endViewDate,
  dayAppointmentRects,
} from '@devexpress/dx-scheduler-core';
import { DayView } from './day-view';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  timeScale: jest.fn(),
  dayScale: jest.fn(),
  startViewDate: jest.fn(),
  endViewDate: jest.fn(),
  dayAppointmentRects: jest.fn(),
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
    emptySpace: {},
    main: {},
  },
};

const defaultProps = {
  layoutComponent: () => null,
  timePanelLayoutComponent: () => null,
  timePanelRowComponent: () => null,
  timePanelCellComponent: () => null,
  dayPanelLayoutComponent: () => null,
  dayPanelCellComponent: () => null,
  dateTableLayoutComponent: () => null,
  dateTableRowComponent: () => null,
  dateTableCellComponent: () => null,
  emptySpaceComponent: () => null,
};

describe('Day View', () => {
  beforeEach(() => {
    timeScale.mockImplementation(() => [8, 9, 10]);
    startViewDate.mockImplementation(() => '2018-07-04');
    endViewDate.mockImplementation(() => '2018-07-11');
    dayAppointmentRects.mockImplementation(() => [{
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
          <DayView
            startDayHour={8}
            endDayHour={18}
            cellDuration={60}
            firstDayOfWeek={1}
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(timeScale)
        .toBeCalledWith('2018-07-04', 0, 8, 18, 60, []);
      expect(getComputedState(tree).timeScale)
        .toEqual([8, 9, 10]);
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
        .toBeCalledWith([defaultDeps.getter.currentDate], [8, 9, 10]);
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
        .toBeCalledWith([defaultDeps.getter.currentDate], [8, 9, 10]);
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

    it('should provide the "appointmentRects" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DayView
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).appointmentRects)
        .toEqual([{
          x: 1, y: 2, width: 100, height: 150, dataItem: 'data',
        }]);
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
        .toBe('day');
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

    it('should render time panel', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DayView
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
          <DayView
            {...defaultProps}
            dateTableLayoutComponent={() => <div className="date-table" />}
          />
        </PluginHost>
      ));

      expect(tree.find('.date-table').exists())
        .toBeTruthy();
    });

    it('should render empty space', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DayView
            {...defaultProps}
            emptySpaceComponent={() => <div className="empty-space" />}
          />
        </PluginHost>
      ));

      expect(tree.find('.empty-space').exists())
        .toBeTruthy();
    });
  });
});
