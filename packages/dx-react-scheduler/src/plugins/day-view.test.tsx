import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  computed, viewCellsData, timeCellsData,
  calculateWeekDateIntervals, getTimeTableHeight,
} from '@devexpress/dx-scheduler-core';
import { DayView } from './day-view';
import { BasicView } from './basic-view';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...jest.requireActual('@devexpress/dx-scheduler-core'),
  computed: jest.fn(),
  viewCellsData: jest.fn(),
  startViewDate: jest.fn(),
  endViewDate: jest.fn(),
  availableViews: jest.fn(),
  calculateWeekDateIntervals: jest.fn(),
  getTimeTableHeight: jest.fn(),
  timeCellsData: jest.fn(),
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
  timeScaleLabelComponent: () => null,
  timeScaleTickCellComponent: () => null,
  timeScaleTicksRowComponent: () => null,
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
    global.Date.now = () => 123;
    timeCellsData.mockImplementation(() => 'timeCellsData');
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
        .toMatchObject({
          type: 'day',
          name: 'Day',
          intervalCount: 1,
          displayName: undefined,
          cellDuration: 30,
          startDayHour: 0,
          endDayHour: 24,
          layoutComponent: defaultProps.layoutComponent,
          dayScaleLayoutComponent: defaultProps.dayScaleLayoutComponent,
          dayScaleCellComponent: defaultProps.dayScaleCellComponent,
          dayScaleRowComponent: defaultProps.dayScaleRowComponent,
          timeTableLayoutComponent: defaultProps.timeTableLayoutComponent,
          timeTableRowComponent: defaultProps.timeTableRowComponent,
          timeTableCellComponent: defaultProps.timeTableCellComponent,
          appointmentLayerComponent: defaultProps.appointmentLayerComponent,
          dayScaleEmptyCellComponent: defaultProps.dayScaleEmptyCellComponent,
        });
      expect(tree.find(BasicView).props().layoutProps)
        .toMatchObject({
          timeScaleComponent: expect.any(Function),
        });

      tree.find(BasicView).props().viewCellsDataComputed(
        1, 2, 3,
      )({ firstDayOfWeek: 4, intervalCount: 5, excludedDays: 6, currentDate: 7 });
      expect(viewCellsData)
        .toHaveBeenCalledWith(7, undefined, 5, [], 2, 3, 1, 123);

      tree.find(BasicView).props().calculateAppointmentsIntervals(1)({
        appointments: 2, startViewDate: 3, endViewDate: 4, excludedDays: 5,
      });
      expect(calculateWeekDateIntervals)
        .toHaveBeenCalledWith(2, 3, 4, 5, 1);
    });

    it('should export timeCellsData getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DayView {...defaultProps} />
        </PluginHost>
      ));

      expect(timeCellsData)
        .toBeCalledWith(undefined, 0, 24, 30, expect.any(Number));

      expect(getComputedState(tree).timeCellsData)
        .toBe('timeCellsData');
    });
  });

  describe('Templates', () => {
    it('should render time scale', () => {
      const timeScaleLayout = () => null;
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DayView
            {...defaultProps}
            timeScaleLayoutComponent={timeScaleLayout}
          />
        </PluginHost>
      ));

      expect(tree.find(timeScaleLayout).props())
        .toMatchObject({
          rowComponent: expect.any(Function),
          tickCellComponent: expect.any(Function),
          labelComponent: expect.any(Function),
          cellsData: getComputedState(tree).timeCellsData,
          formatDate: defaultDeps.getter.formatDate,
        });
    });
  });
  it('should call "getTimeTableHeight" with proper parameters', () => {
    mount((
      <PluginHost>
        {pluginDepsToComponents({
          ...defaultDeps,
          getter: {
            ...defaultDeps.getter,
            allDayElementsMeta: 'allDayElementsMeta',
            allDayPanelExists: 'allDayPanelExists',
            groupOrientation: () => 'groupOrientation',
          },
        })}
        <DayView
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(getTimeTableHeight)
      .toBeCalledWith({});
  });
});
