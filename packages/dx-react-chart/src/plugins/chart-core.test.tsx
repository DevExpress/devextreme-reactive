import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { buildScales, scaleSeriesPoints } from '@devexpress/dx-chart-core';
import { ChartCore } from './chart-core';

jest.mock('@devexpress/dx-chart-core', () => ({
  buildScales: jest.fn().mockReturnValue('built-scales'),
  scaleSeriesPoints: jest.fn().mockReturnValue('scaled-series'),
}));

describe('Chart Core', () => {
  afterEach(jest.clearAllMocks);

  const defaultDeps = {
    getter: {
      domains: 'test-domains',
      series: 'test-series',
      ranges: 'test-ranges',
      rotated: 'test-rotated',
    },
  };

  it('should provide options', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ChartCore />
      </PluginHost>
    ));

    expect(getComputedState(tree)).toEqual({
      ...defaultDeps.getter,
      scales: 'built-scales',
      series: 'scaled-series',
    });
    expect(buildScales).toBeCalledWith('test-domains', 'test-ranges');
    expect(scaleSeriesPoints).toBeCalledWith('test-series', 'built-scales', 'test-rotated');
  });
});
