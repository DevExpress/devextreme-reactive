import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  computed,
  viewCellsData,
  startViewDate,
  endViewDate,
  getHorizontalRectByDates,
  calculateMonthDateIntervals,
  monthCellsData,
} from '@devexpress/dx-scheduler-core';
import { MonthView } from './month-view';

// tslint:disable: max-line-length
jest.mock('@devexpress/dx-scheduler-core', () => ({
  computed: jest.fn(),
  viewCellsData: jest.fn(),
  startViewDate: jest.fn(),
  availableViewNames: jest.fn(),
  endViewDate: jest.fn(),
  getHorizontalRectByDates: jest.fn(),
  calculateMonthDateIntervals: jest.fn(),
  monthCellsData: jest.fn(),
}));

const defaultDeps = {
  getter: {
    currentDate: '2018-07-04',
    viewCellsData: [
      [{ startDate: new Date('2018-06-25') }, {}],
      [{}, { startDate: new Date('2018-08-05') }],
    ],
    formatDate: jest.fn(),
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
  timeScaleLayoutComponent: () => null,
  timeScaleRowComponent: () => null,
  timeScaleCellComponent: () => null,
  dayScaleLayoutComponent: () => null,
  dayScaleCellComponent: () => null,
  dayScaleRowComponent: () => null,
  timeTableLayoutComponent: () => null,
  timeTableRowComponent: () => null,
  timeTableCellComponent: () => null,
  // eslint-disable-next-line react/prop-types, react/jsx-one-expression-per-line
  appointmentLayerComponent: ({ children }) => <div>{children}</div>,
};

describe('Month View', () => {
  beforeEach(() => {
    computed.mockImplementation(
      (getters, viewName, baseComputed) => baseComputed(getters, viewName),
    );
    viewCellsData.mockImplementation(() => ([
      [{ startDate: new Date('2018-06-25') }, {}],
      [{}, { startDate: new Date('2018-08-05') }],
    ]));
    startViewDate.mockImplementation(() => new Date('2018-06-25'));
    endViewDate.mockImplementation(() => new Date('2018-08-06'));
    getHorizontalRectByDates.mockImplementation(() => [{
      x: 1, y: 2, width: 100, height: 150, dataItem: 'data',
    }]);
    calculateMonthDateIntervals.mockImplementation(() => []);
    monthCellsData.mockImplementation(() => []);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Getters', () => {
    it('should provide the "viewCellsData" getter', () => {
      const firstDayOfWeek = 2;
      const intervalCount = 2;
      const expectedMonthCellsData = 'monthCellsData';
      monthCellsData.mockImplementation(() => expectedMonthCellsData);
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
      const monthCellsDataCalls = monthCellsData.mock.calls;
      expect(monthCellsDataCalls)
        .toHaveLength(1);
      expect(monthCellsDataCalls[0][0])
        .toBe('2018-07-04');
      expect(monthCellsDataCalls[0][1])
        .toBe(firstDayOfWeek);
      expect(monthCellsDataCalls[0][2])
        .toBe(intervalCount);
      expect(getComputedState(tree).viewCellsData)
        .toEqual(expectedMonthCellsData);
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

    it('should provide "timeTableElement" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <MonthView
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).timeTableElement)
        .toEqual({ current: expect.any(Object) });
    });

    it('should provide "layoutElement" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <MonthView
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).layoutElement)
        .toEqual({ current: expect.any(Object) });
      expect(tree.find(defaultProps.layoutComponent).prop('layoutRef'))
        .toBe(getComputedState(tree).layoutElement);
    });

    it('should provide "layoutHeaderElement" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <MonthView
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).layoutHeaderElement)
        .toEqual({ current: expect.any(Object) });
      expect(tree.find(defaultProps.layoutComponent).prop('layoutHeaderRef'))
        .toBe(getComputedState(tree).layoutHeaderElement);
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

    it('should render day scale', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <MonthView
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

    it('should render time table', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <MonthView
            {...defaultProps}
            timeTableLayoutComponent={({ formatDate }) => <div className="time-table" formatDate={formatDate} />}
          />
        </PluginHost>
      ));

      expect(tree.find('.time-table').exists())
        .toBeTruthy();
      expect(tree.find('.time-table').props().formatDate)
        .toBe(defaultDeps.getter.formatDate);
    });

    it('should render appointment layer', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <MonthView
            {...defaultProps}
            // eslint-disable-next-line react/jsx-one-expression-per-line
            appointmentLayerComponent={({ children }) => <div className="layer">{children}</div>}
          />
        </PluginHost>
      ));

      expect(tree.find('.layer').exists())
        .toBeTruthy();
    });
  });
});
