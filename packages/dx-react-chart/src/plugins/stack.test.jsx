import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { stackOrderNone, stackOffsetDiverging } from 'd3-shape';
import {
  buildStackedSeries, buildStackedDataProcessor, clearStackedSeries, getStacks,
} from '@devexpress/dx-chart-core';
import { Stack } from './stack';

jest.mock('d3-shape', () => ({
  stackOrderNone: jest.fn(),
  stackOffsetDiverging: jest.fn(),
}));

jest.mock('@devexpress/dx-chart-core', () => ({
  buildStackedSeries: jest.fn().mockReturnValue('stacked-series'),
  buildStackedDataProcessor: jest.fn().mockReturnValue(jest.fn().mockReturnValue('stacked-data')),
  clearStackedSeries: jest.fn().mockReturnValue('cleared-series'),
  getStacks: jest.fn().mockReturnValue('stacks'),
}));

describe('Stack', () => {
  afterEach(jest.clearAllMocks);

  it('should provide options', () => {
    const deps = {
      getter: {
        series: 'test-series',
        data: 'test-data',
      },
    };
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(deps)}
        <Stack />
      </PluginHost>
    ));

    expect(getComputedState(tree)).toEqual({
      data: 'stacked-data',
      series: 'cleared-series',
      stacks: 'stacks',
    });
    expect(buildStackedSeries).toHaveBeenLastCalledWith('test-series');
    expect(clearStackedSeries).toHaveBeenLastCalledWith('stacked-series');
    expect(getStacks).toHaveBeenLastCalledWith('cleared-series');
    expect(buildStackedDataProcessor)
      .toHaveBeenLastCalledWith(stackOffsetDiverging, stackOrderNone);
    expect(buildStackedDataProcessor.mock.results[0].value)
      .toHaveBeenLastCalledWith('test-data', 'stacked-series');
  });
});
