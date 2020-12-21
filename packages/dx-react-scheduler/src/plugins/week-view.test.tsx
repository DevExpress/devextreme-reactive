import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  computed,
  viewCellsData,
  timeCellsData,
} from '@devexpress/dx-scheduler-core';
import { WeekView } from './week-view';
import { BasicView } from './basic-view';
import { VerticalView } from './vertical-view';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...jest.requireActual('@devexpress/dx-scheduler-core'),
  viewCellsData: jest.fn(),
  computed: jest.fn(),
  startViewDate: jest.fn(),
  endViewDate: jest.fn(),
  availableViews: jest.fn(),
  timeCellsData: jest.fn(),
}));

const defaultDeps = {
  getter: {
    currentDate: '2018-07-04',
    formatDate: jest.fn(),
    firstDayOfWeek: 2,
    appointments: [],
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
};

describe('Week View', () => {
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

  it('should render VerticalView', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <WeekView {...defaultProps} />
      </PluginHost>
    ));

    expect(tree.find(VerticalView).props())
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
        timeScaleLayoutComponent: defaultProps.timeScaleLayoutComponent,
        timeScaleLabelComponent: defaultProps.timeScaleLabelComponent,
        timeScaleTickCellComponent: defaultProps.timeScaleTickCellComponent,
        timeScaleTicksRowComponent: defaultProps.timeScaleTicksRowComponent,
        viewCellsDataComputed: expect.any(Function),
      });

    tree.find(BasicView).props().viewCellsDataComputed(
      1, 2, 3,
    )({ firstDayOfWeek: 4, intervalCount: 5, excludedDays: 6, currentDate: 7 });
    expect(viewCellsData)
      .toHaveBeenCalledWith(7, 4, 5 * 7, 6, 2, 3, 1, 123);
  });
});
