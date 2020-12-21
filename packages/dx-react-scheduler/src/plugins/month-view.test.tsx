import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  computed,
  monthCellsData,
  calculateMonthDateIntervals,
} from '@devexpress/dx-scheduler-core';
import { MonthView } from './month-view';
import { BasicView } from './basic-view';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...jest.requireActual('@devexpress/dx-scheduler-core'),
  computed: jest.fn(),
  viewCellsData: jest.fn(),
  startViewDate: jest.fn(),
  availableViews: jest.fn(),
  endViewDate: jest.fn(),
  monthCellsData: jest.fn(),
  calculateMonthDateIntervals: jest.fn(),
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
    timeTable: {},
  },
};

const defaultProps = {
  layoutComponent: () => null,
  dayScaleLayoutComponent: () => null,
  dayScaleCellComponent: () => null,
  dayScaleRowComponent: () => null,
  dayScaleEmptyCellComponent: () => null,
  timeTableLayoutComponent: () => null,
  timeTableRowComponent: () => null,
  timeTableCellComponent: () => null,
  appointmentLayerComponent: ({ children }) => <div>{children}</div>,
};

describe('Month View', () => {
  beforeEach(() => {
    computed.mockImplementation(
      (getters, viewName, baseComputed) => baseComputed(getters, viewName),
    );
    monthCellsData.mockImplementation(() => []);
    global.Date.now = () => 123;
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
        .toMatchObject({
          type: 'month',
          name: 'Month',
          intervalCount: 1,
          displayName: undefined,
          layoutComponent: defaultProps.layoutComponent,
          dayScaleLayoutComponent: defaultProps.dayScaleLayoutComponent,
          dayScaleCellComponent: defaultProps.dayScaleCellComponent,
          dayScaleRowComponent: defaultProps.dayScaleRowComponent,
          timeTableLayoutComponent: defaultProps.timeTableLayoutComponent,
          timeTableRowComponent: defaultProps.timeTableRowComponent,
          timeTableCellComponent: defaultProps.timeTableCellComponent,
          dayScaleEmptyCellComponent: defaultProps.dayScaleEmptyCellComponent,
          appointmentLayerComponent: defaultProps.appointmentLayerComponent,
        });

      tree.find(BasicView).props().viewCellsDataComputed(
        1, 2, 3,
      )({ firstDayOfWeek: 4, intervalCount: 5, excludedDays: 6, currentDate: 7 });
      expect(monthCellsData)
        .toHaveBeenCalledWith(7, 4, 5, 123);

      tree.find(BasicView).props().calculateAppointmentsIntervals(1)({
        appointments: 2, startViewDate: 3, endViewDate: 4, excludedDays: 5,
      });
      expect(calculateMonthDateIntervals)
        .toHaveBeenCalledWith(2, 3, 4);
    });
  });
});
