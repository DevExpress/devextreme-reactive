import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  timeScale,
  dayScale,
  startViewDate,
  endViewDate,
} from '@devexpress/dx-scheduler-core';
import { WeekView } from './week-view';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  timeScale: jest.fn(),
  dayScale: jest.fn(),
  startViewDate: jest.fn(),
  endViewDate: jest.fn(),
}));

const defaultDeps = {
  getter: {
    currentDate: '2018-07-04',
  },
};

const defaultProps = {
  layoutComponent: () => null,
  timePanelLayoutComponent: () => null,
  timePanelTableComponent: () => null,
  timePanelRowComponent: () => null,
  timePanelCellComponent: () => null,
  dayPanelLayoutComponent: () => null,
  dayPanelTableComponent: () => null,
  dayPanelCellComponent: () => null,
  dateTableLayoutComponent: () => null,
  dateTableTableComponent: () => null,
  dateTableRowComponent: () => null,
  dateTableCellComponent: () => null,
};

describe('Week View', () => {
  beforeEach(() => {
    timeScale.mockImplementation(() => [8, 9, 10]);
    dayScale.mockImplementation(() => [1, 2, 3]);
    startViewDate.mockImplementation(() => '2018-07-04');
    endViewDate.mockImplementation(() => '2018-07-11');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide the "timeScale" getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <WeekView
          startDayHour={8}
          endDayHour={18}
          cellDuration={60}
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(timeScale)
      .toBeCalledWith(8, 18, 60);
    expect(getComputedState(tree).timeScale)
      .toEqual([8, 9, 10]);
  });

  it('should provide the "dayScale" getter', () => {
    const firstDayOfWeek = 2;
    const intervalCount = 2;
    const excludedDays = [1, 2];
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <WeekView
          firstDayOfWeek={firstDayOfWeek}
          intervalCount={intervalCount}
          excludedDays={excludedDays}
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(dayScale)
      .toBeCalledWith('2018-07-04', firstDayOfWeek, intervalCount * 7, excludedDays);
    expect(getComputedState(tree).dayScale)
      .toEqual([1, 2, 3]);
  });

  it('should provide the "firstDayOfWeek" getter', () => {
    const firstDayOfWeek = 2;
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <WeekView
          firstDayOfWeek={firstDayOfWeek}
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).firstDayOfWeek)
      .toBe(firstDayOfWeek);
  });

  it('should provide the "startViewDate" getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <WeekView
          {...defaultProps}
        />
      </PluginHost>
    ));
    expect(startViewDate)
      .toBeCalledWith([1, 2, 3], [8, 9, 10]);
    expect(getComputedState(tree).startViewDate)
      .toBe('2018-07-04');
  });

  it('should provide the "endViewDate" getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <WeekView
          {...defaultProps}
        />
      </PluginHost>
    ));
    expect(endViewDate)
      .toBeCalledWith([1, 2, 3], [8, 9, 10]);
    expect(getComputedState(tree).endViewDate)
      .toBe('2018-07-11');
  });

  it('should provide the "cellDuration" getter', () => {
    const cellDuration = 60;
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <WeekView
          cellDuration={cellDuration}
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).cellDuration)
      .toBe(cellDuration);
  });

  it('should provide the "excludedDays" getter', () => {
    const excludedDays = [1, 2];
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <WeekView
          excludedDays={excludedDays}
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).excludedDays)
      .toBe(excludedDays);
  });
});
