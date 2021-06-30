import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  computed,
  viewCellsData,
  timeCellsData,
} from '@devexpress/dx-scheduler-core';
import { DayView } from './day-view';
import { VerticalView } from './vertical-view';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...jest.requireActual('@devexpress/dx-scheduler-core'),
  computed: jest.fn(),
  viewCellsData: jest.fn(),
  startViewDate: jest.fn(),
  endViewDate: jest.fn(),
  availableViews: jest.fn(),
  timeCellsData: jest.fn(),
}));

const defaultDeps = {
  getter: {
    currentDate: '2018-07-04',
    formatDate: jest.fn(),
    appointments: [],
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

  it('should render VerticalView', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <DayView {...defaultProps} />
      </PluginHost>
    ));

    expect(tree.find(VerticalView).props())
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
        timeScaleLayoutComponent: defaultProps.timeScaleLayoutComponent,
        timeScaleLabelComponent: defaultProps.timeScaleLabelComponent,
        timeScaleTickCellComponent: defaultProps.timeScaleTickCellComponent,
        timeScaleTicksRowComponent: defaultProps.timeScaleTicksRowComponent,
      });

    tree.find(VerticalView).props().viewCellsDataComputed(
      1, 2, 3,
    )({ firstDayOfWeek: 4, intervalCount: 5, excludedDays: 6, currentDate: 7 });
    expect(viewCellsData)
      .toHaveBeenCalledWith(7, undefined, 5, [], 2, 3, 1, 123);
  });
});
