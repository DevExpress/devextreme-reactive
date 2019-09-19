import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  computed,
  getHorizontalRectByDates,
  calculateMonthDateIntervals,
  monthCellsData,
  getAppointmentStyle,
  horizontalTimeTableRects,
} from '@devexpress/dx-scheduler-core';
import { MonthView } from './month-view';
import { BasicView } from './basic-view';

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
    formatDate: jest.fn(),
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
    it('should render BasicView', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <MonthView {...defaultProps} />
        </PluginHost>
      ));

      expect(tree.find(BasicView).props())
        .toEqual({
          // viewCellsDataBaseComputed: expect.any(Function),
          type: 'month',
          name: 'Month',
          intervalCount: 1,
          displayName: undefined,
          firstDayOfWeek: 0,
        });
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
