import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  computed,
  viewCellsData,
  timeCellsData,
  calculateWeekDateIntervals,
  getTimeTableHeight,
} from '@devexpress/dx-scheduler-core';
import { WeekView } from './week-view';
import { BasicView } from './basic-view';

// tslint:disable: max-line-length
jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...jest.requireActual('@devexpress/dx-scheduler-core'),
  viewCellsData: jest.fn(),
  computed: jest.fn(),
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
    firstDayOfWeek: 2,
  },
  template: {
    body: {},
    dayScale: {},
    timeScale: {},
    dayScaleEmptyCell: {},
    timeTable: {},
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
  appointmentLayerComponent: ({ children }) => <div>{children}</div>,
};

describe('Week View', () => {
  beforeEach(() => {
    computed.mockImplementation((getters, viewName, baseComputed) => baseComputed(getters, viewName));
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
          <WeekView {...defaultProps} />
        </PluginHost>
      ));

      expect(tree.find(BasicView).props())
        .toMatchObject({
          type: 'week',
          name: 'Week',
          intervalCount: 1,
          displayName: undefined,
          cellDuration: 30,
          startDayHour: 0,
          endDayHour: 24,
          excludedDays: [],
          layoutComponent: defaultProps.layoutComponent,
          dayScaleLayoutComponent: defaultProps.dayScaleLayoutComponent,
          dayScaleCellComponent: defaultProps.dayScaleCellComponent,
          dayScaleRowComponent: defaultProps.dayScaleRowComponent,
          timeTableLayoutComponent: defaultProps.timeTableLayoutComponent,
          timeTableRowComponent: defaultProps.timeTableRowComponent,
          timeTableCellComponent: defaultProps.timeTableCellComponent,
          appointmentLayerComponent: defaultProps.appointmentLayerComponent,
          dayScaleEmptyCellComponent: defaultProps.dayScaleEmptyCellComponent,
          calculateAppointmentsIntervals: expect.any(Function),
          viewCellsDataComputed: expect.any(Function),
        });
      expect(tree.find(BasicView).props().layoutProps)
        .toMatchObject({
          timeScaleComponent: expect.any(Function),
        });

      tree.find(BasicView).props().viewCellsDataComputed(
        1, 2, 3,
      )({ firstDayOfWeek: 4, intervalCount: 5, excludedDays: 6, currentDate: 7 });
      expect(viewCellsData)
        .toHaveBeenCalledWith(7, 4, 5 * 7, 6, 2, 3, 1, 123);

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
          <WeekView {...defaultProps} />
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
          <WeekView
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
          <WeekView
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getTimeTableHeight)
        .toBeCalledWith({});
    });
  });
});
