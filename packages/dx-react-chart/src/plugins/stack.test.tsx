import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { stackOrderNone, stackOffsetDiverging } from 'd3-shape';
import { getStackedSeries, getStackedDomains } from '@devexpress/dx-chart-core';
import { Stack } from './stack';

jest.mock('d3-shape', () => ({
  stackOrderNone: jest.fn(),
  stackOffsetDiverging: jest.fn(),
}));

jest.mock('@devexpress/dx-chart-core', () => ({
  getStackedSeries: jest.fn().mockReturnValue('stacked-series'),
  getStackedDomains: jest.fn().mockReturnValue('stacked-domains'),
}));

describe('Stack', () => {
  afterEach(jest.clearAllMocks);

  const deps = {
    getter: {
      domains: 'test-domains',
      series: 'test-series',
      data: 'test-data',
    },
  };

  it('should provide options', () => {
    const testStacks = [{ series: ['a'] }, { series: ['b'] }];
    const testOffset = () => null;
    const testOrder = () => null;
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(deps)}
        <Stack
          stacks={testStacks}
          offset={testOffset}
          order={testOrder}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree)).toEqual({
      ...deps.getter,
      series: 'stacked-series',
      domains: 'stacked-domains',
    });
    expect(getStackedSeries).toBeCalledWith('test-series', 'test-data', {
      stacks: testStacks,
      offset: testOffset,
      order: testOrder,
    });
    expect(getStackedDomains).toBeCalledWith('test-domains', 'stacked-series');
  });

  it('should provide default options', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(deps)}
        <Stack />
      </PluginHost>
    ));

    expect(getComputedState(tree)).toEqual({
      ...deps.getter,
      series: 'stacked-series',
      domains: 'stacked-domains',
    });
    expect(getStackedSeries).toBeCalledWith('test-series', 'test-data', {
      stacks: [],
      offset: stackOffsetDiverging,
      order: stackOrderNone,
    });
    expect(getStackedDomains).toBeCalledWith('test-domains', 'stacked-series');
  });
});
