import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { stackOrderNone, stackOffsetDiverging } from 'd3-shape';
import { getStackedSeries } from '@devexpress/dx-chart-core';
import { Stack } from './stack';

jest.mock('d3-shape', () => ({
  stackOrderNone: jest.fn(),
  stackOffsetDiverging: jest.fn(),
}));

jest.mock('@devexpress/dx-chart-core', () => ({
  getStackedSeries: jest.fn().mockReturnValue('stacked-series'),
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
      data: 'test-data',
      series: 'stacked-series',
    });
    expect(getStackedSeries)
      .toBeCalledWith('test-series', 'test-data', stackOffsetDiverging, stackOrderNone);
  });
});
