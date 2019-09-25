import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  computed,
  monthCellsData,
  horizontalTimeTableRects,
} from '@devexpress/dx-scheduler-core';
import { MonthView } from './month-view';
import { BasicView } from './basic-view';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  computed: jest.fn(),
  viewCellsData: jest.fn(),
  startViewDate: jest.fn(),
  availableViews: jest.fn(),
  endViewDate: jest.fn(),
  monthCellsData: jest.fn(),
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
          firstDayOfWeek: 0,
          layoutComponent: defaultProps.layoutComponent,
          dayScaleLayoutComponent: defaultProps.dayScaleLayoutComponent,
          dayScaleCellComponent: defaultProps.dayScaleCellComponent,
          dayScaleRowComponent: defaultProps.dayScaleRowComponent,
          timeTableLayoutComponent: defaultProps.timeTableLayoutComponent,
          timeTableRowComponent: defaultProps.timeTableRowComponent,
          timeTableCellComponent: defaultProps.timeTableCellComponent,
        });

      tree.find(BasicView).props().viewCellsDataComputed(
        1, 2, 3,
      )({ firstDayOfWeek: 4, intervalCount: 5, excludedDays: 6, currentDate: 7 });
      expect(monthCellsData)
        .toHaveBeenCalledWith(7, 4, 5, 123);

      tree.find(BasicView).props().timeTableRects(1, 2, 3, 4, 5, 6, 7);
      expect(horizontalTimeTableRects)
        .toHaveBeenCalledWith(1, 2, 3, 5, 7);
    });
  });
});
