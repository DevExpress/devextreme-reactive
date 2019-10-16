import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import { computed, viewCellsData, verticalTimeTableRects } from '@devexpress/dx-scheduler-core';
import { WeekView } from './week-view';
import { BasicView } from './basic-view';

// tslint:disable: max-line-length
jest.mock('@devexpress/dx-scheduler-core', () => ({
  viewCellsData: jest.fn(),
  computed: jest.fn(),
  startViewDate: jest.fn(),
  endViewDate: jest.fn(),
  availableViews: jest.fn(),
  verticalTimeTableRects: jest.fn(),
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
        });
      expect(tree.find(BasicView).props().layoutProps)
        .toMatchObject({
          timeScaleComponent: expect.any(Function),
          dayScaleEmptyCellComponent: expect.any(Function),
        });

      tree.find(BasicView).props().viewCellsDataComputed(
        1, 2, 3,
      )({ firstDayOfWeek: 4, intervalCount: 5, excludedDays: 6, currentDate: 7 });
      expect(viewCellsData)
        .toHaveBeenCalledWith(7, 4, 5 * 7, 6, 2, 3, 1, 123);

      tree.find(BasicView).props().timeTableRects(1, 2, 3, 4, 5, 6, 7);
      expect(verticalTimeTableRects)
        .toHaveBeenCalledWith(1, 2, 3, 4, 5, 6, 7);
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
          cellsData: getComputedState(tree).viewCellsData,
          formatDate: defaultDeps.getter.formatDate,
        });
    });
    it('should render dayScaleEmptyCell', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <WeekView
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
