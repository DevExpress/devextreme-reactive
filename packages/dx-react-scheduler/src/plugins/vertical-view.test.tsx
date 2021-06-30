import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  computed,
  timeCellsData,
  calculateWeekDateIntervals,
  getTimeTableHeight,
} from '@devexpress/dx-scheduler-core';
import { VerticalView } from './vertical-view';
import { BasicView } from './basic-view';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...jest.requireActual('@devexpress/dx-scheduler-core'),
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
  viewCellsDataComputed: () => () => null,
  type: 'week',
  name: 'Week',
  cellDuration: 30,
  startDayHour: 0,
  endDayHour: 24,
  excludedDays: [],
  intervalCount: 1,
  displayName: 'Display Name',
};

describe('Vertical View', () => {
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
          <VerticalView {...defaultProps} />
        </PluginHost>
      ));

      expect(tree.find(BasicView).props())
        .toMatchObject({
          type: defaultProps.type,
          name: defaultProps.name,
          intervalCount: defaultProps.intervalCount,
          displayName: defaultProps.displayName,
          cellDuration: defaultProps.cellDuration,
          startDayHour: defaultProps.startDayHour,
          endDayHour: defaultProps.endDayHour,
          excludedDays: defaultProps.excludedDays,
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
          viewCellsDataComputed: defaultProps.viewCellsDataComputed,
        });
      expect(tree.find(BasicView).props().layoutProps)
        .toMatchObject({
          timeScaleComponent: expect.any(Function),
        });

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
          <VerticalView {...defaultProps} />
        </PluginHost>
      ));

      expect(timeCellsData)
        .toBeCalledWith(null, 0, 24, 30, expect.any(Number));

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
          <VerticalView
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
          <VerticalView
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getTimeTableHeight)
        .toBeCalledWith({});
    });
  });
});
