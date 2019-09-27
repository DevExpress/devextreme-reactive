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
  availableViews,
  getAppointmentStyle,
  horizontalTimeTableRects,
} from '@devexpress/dx-scheduler-core';
import { MonthView } from './month-view';

// tslint:disable: max-line-length
jest.mock('@devexpress/dx-scheduler-core', () => ({
  computed: jest.fn(),
  viewCellsData: jest.fn(),
  startViewDate: jest.fn(),
  availableViews: jest.fn(),
  endViewDate: jest.fn(),
  getHorizontalRectByDates: jest.fn(),
  calculateMonthDateIntervals: jest.fn(),
  monthCellsData: jest.fn(),
  getAppointmentStyle: jest.fn(),
  horizontalTimeTableRects: jest.fn(),
}));

const defaultDeps = {
  getter: {
    currentDate: '2018-07-04',
    viewCellsData: [
      [{ startDate: new Date('2018-06-25') }, {}],
      [{}, { startDate: new Date('2018-08-05') }],
    ],
    formatDate: jest.fn(),
    firstDayOfWeek: 2,
  },
  template: {
    body: {},
    dayScale: {},
    timeScale: {},
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
    getAppointmentStyle.mockImplementation(() => undefined);
    horizontalTimeTableRects.mockImplementation(() => [{ data: 1 }]);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Getters', () => {
    it('should provide "allDayElementsMeta" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <MonthView
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).timeTableElementsMeta)
        .toEqual({});

      const setCellElementsMeta = tree.find(defaultProps.timeTableLayoutComponent)
        .props().setCellElementsMeta;
      setCellElementsMeta('elementsMeta');

      const monthViewState = tree.find(MonthView).state();
      expect(monthViewState.rects)
        .toEqual([{ data: 1 }]);

      tree.update();

      expect(getComputedState(tree).timeTableElementsMeta)
        .toEqual('elementsMeta');
    });
    it('should provide the "viewCellsData" getter', () => {
      computed.mockImplementation(
        (getters, viewName, baseComputed) => getters.currentView.name === viewName && baseComputed(getters, viewName),
      );
      const intervalCount = 2;
      const expectedMonthCellsData = 'monthCellsData';
      monthCellsData.mockImplementation(() => expectedMonthCellsData);
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <MonthView
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
        .toBe(defaultDeps.getter.firstDayOfWeek);
      expect(monthCellsDataCalls[0][2])
        .toBe(intervalCount);
      expect(getComputedState(tree).viewCellsData)
        .toEqual(expectedMonthCellsData);
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

    it('should provide the "currentView" getter with default "displayName"', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <MonthView
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).currentView)
        .toEqual({ name: 'Month', type: 'month', displayName: 'Month' });
    });

    it('should provide the "currentView" getter with user-set "displayName"', () => {
      const userDisplayName = 'User set display name';
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <MonthView
            displayName={userDisplayName}
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).currentView)
        .toEqual({ name: 'Month', type: 'month', displayName: userDisplayName });
    });

    it('should provide "availableViews" getter', () => {
      availableViews.mockImplementation(() => 'availableViews');
      const viewName = 'Custom Month';
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <MonthView
            name={viewName}
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).availableViews)
        .toEqual('availableViews');
    });

    it('should calculate the "currentView" getter if there aren\'t any views before', () => {
      const viewName = 'Custom Month';
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, { getter: { currentView: undefined } })}
          <MonthView
            {...defaultProps}
            name={viewName}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).currentView)
        .toEqual({ name: viewName, type: 'month', displayName: viewName });
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

    it('should provide "timeTableElementsMeta" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <MonthView
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
          <MonthView
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
          <MonthView
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
