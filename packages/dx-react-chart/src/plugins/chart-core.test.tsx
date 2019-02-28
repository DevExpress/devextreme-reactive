import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { computeDomains, buildScales, scaleSeriesPoints } from '@devexpress/dx-chart-core';
import { ChartCore } from './chart-core';

jest.mock('@devexpress/dx-chart-core', () => ({
  computeDomains: jest.fn().mockReturnValue('computed-domains'),
  buildScales: jest.fn().mockReturnValue('built-scales'),
  scaleSeriesPoints: jest.fn().mockReturnValue('scaled-series'),
}));

describe('Chart Core', () => {
  afterEach(jest.clearAllMocks);

  const defaultDeps = {
    getter: {
      domains: 'test-domains',
      series: 'test-series',
      layouts: { pane: 'test-pane' },
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
      domains: 'computed-domains',
      scales: 'built-scales',
      series: 'scaled-series',
    });
    expect(computeDomains).toBeCalledWith('test-domains', 'test-series');
    expect(buildScales).toBeCalledWith('computed-domains', 'test-pane');
    expect(scaleSeriesPoints).toBeCalledWith('test-series', 'built-scales');
  });
});
