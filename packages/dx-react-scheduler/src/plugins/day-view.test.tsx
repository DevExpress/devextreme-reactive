import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  computed,
  calculateRectByDateIntervals,
  calculateWeekDateIntervals,
  getAppointmentStyle,
  verticalTimeTableRects,
} from '@devexpress/dx-scheduler-core';
import { DayView } from './day-view';
import { BasicView } from './basic-view';

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
    it('should render BasicView', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DayView {...defaultProps} />
        </PluginHost>
      ));

      expect(tree.find(BasicView).props())
        .toEqual({
          // viewCellsDataBaseComputed: expect.any(Function),
          type: 'day',
          name: 'Day',
          intervalCount: 1,
          displayName: undefined,
          cellDuration: 30,
          startDayHour: 0,
          endDayHour: 24,
        });
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
