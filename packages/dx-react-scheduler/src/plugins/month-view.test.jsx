import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  computed,
  viewCells,
  monthCells,
  endViewBoundary,
  getMonthRectByDates,
  calculateMonthDateIntervals,
} from '@devexpress/dx-scheduler-core';
import { MonthView } from './month-view';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  computed: jest.fn(),
  viewCells: jest.fn(),
  monthCells: jest.fn(),
  availableViews: jest.fn(),
  endViewBoundary: jest.fn(),
  getMonthRectByDates: jest.fn(),
  calculateMonthDateIntervals: jest.fn(),
}));

const defaultDeps = {
  getter: {
    currentDate: '2018-07-04',
    dateTableRef: {
      querySelectorAll: () => {},
    },
    dayScale: [],
    timeScale: [],
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
  timePanelRowComponent: () => null,
  timePanelCellComponent: () => null,
  dayPanelLayoutComponent: () => null,
  dayPanelCellComponent: () => null,
  dayPanelRowComponent: () => null,
  dateTableLayoutComponent: () => null,
  dateTableRowComponent: () => null,
  dateTableCellComponent: () => null,
  // eslint-disable-next-line react/prop-types, react/jsx-one-expression-per-line
  containerComponent: ({ children }) => <div>{children}</div>,
};

describe('Month View', () => {
  beforeEach(() => {
    computed.mockImplementation(
      (getters, viewName, baseComputed) => baseComputed(getters, viewName),
    );
    viewCells.mockImplementation(() => ([
      [{}, {}], [{}, {}],
    ]));
    endViewBoundary.mockImplementation(() => new Date('2018-08-06'));
    monthCells.mockImplementation(() => ([
      [{ value: new Date('2018-06-25') }, {}],
      [{}, { value: new Date('2018-08-05') }],
    ]));
    getMonthRectByDates.mockImplementation(() => [{
      x: 1, y: 2, width: 100, height: 150, dataItem: 'data',
    }]);
    calculateMonthDateIntervals.mockImplementation(() => []);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Getters', () => {
    it('should provide the "viewCellsData" getter', () => {
      const firstDayOfWeek = 2;
      const intervalCount = 2;
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <MonthView
            firstDayOfWeek={firstDayOfWeek}
            intervalCount={intervalCount}
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(viewCells)
        .toBeCalledWith('month', '2018-07-04', firstDayOfWeek, intervalCount, [], []);
      expect(getComputedState(tree).viewCellsData)
        .toEqual([[{}, {}], [{}, {}]]);
    });

    it('should provide the "firstDayOfWeek" getter', () => {
      const firstDayOfWeek = 2;
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <MonthView
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
          <MonthView
            {...defaultProps}
          />
        </PluginHost>
      ));
      expect(getComputedState(tree).startViewDate)
        .toEqual(new Date('2018-06-25'));
    });

    it('should provide the "endViewDate" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <MonthView
            {...defaultProps}
          />
        </PluginHost>
      ));
      expect(getComputedState(tree).endViewDate)
        .toEqual(new Date('2018-08-06'));
    });

    it('should provide the "firstDayOfWeek" getter', () => {
      const firstDayOfWeek = 2;
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <MonthView
            firstDayOfWeek={firstDayOfWeek}
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).firstDayOfWeek)
        .toBe(firstDayOfWeek);
    });

    it('should provide the "intervalCount" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <MonthView
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
          <MonthView
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).currentView)
        .toEqual({ name: 'Month', type: 'month' });
    });

    it('should calculate the "currentView" getter if there aren\'t any views before', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, { getter: { currentView: undefined } })}
          <MonthView
            {...defaultProps}
            name="Custom Month"
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).currentView)
        .toEqual({ name: 'Custom Month', type: 'month' });
    });

    it('should not override previous view type', () => {
      const prevView = { name: 'Week', type: 'week' };
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, { getter: { currentView: prevView } })}
          <MonthView
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
          <MonthView
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
          <MonthView
            {...defaultProps}
            dayPanelLayoutComponent={() => <div className="day-panel" />}
          />
        </PluginHost>
      ));

      expect(tree.find('.day-panel').exists())
        .toBeTruthy();
    });

    it('should render date table', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <MonthView
            {...defaultProps}
            dateTableLayoutComponent={() => <div className="date-table" />}
          />
        </PluginHost>
      ));

      expect(tree.find('.date-table').exists())
        .toBeTruthy();
    });

    it('should render appointment container', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <MonthView
            {...defaultProps}
            // eslint-disable-next-line react/jsx-one-expression-per-line
            containerComponent={({ children }) => <div className="container">{children}</div>}
          />
        </PluginHost>
      ));

      expect(tree.find('.container').exists())
        .toBeTruthy();
    });
  });
});
