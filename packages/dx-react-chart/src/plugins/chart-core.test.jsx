import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { computeDomains, buildScales, scaleSeriesPoints } from '@devexpress/dx-chart-core';
import { ChartCore } from './chart-core';

jest.mock('@devexpress/dx-chart-core', () => ({
  ARGUMENT_DOMAIN: 'test_argument_domain',
  computeDomains: jest.fn(),
  buildScales: jest.fn().mockReturnValue('test-scales'),
  scaleSeriesPoints: jest.fn().mockReturnValue('scaled-series'),
}));

const domains = {
  test_argument_domain: {},
};

const defaultDeps = {
  getter: {
    axes: 'test-axes',
    series: 'test-series',
    data: 'test-data',
    layouts: { pane: 'test-pane' },
    stacks: 'test-stacks',
    scaleExtension: 'test-scale-extension',
  },
};

describe('Chart Core', () => {
  beforeEach(() => {
    computeDomains.mockReturnValue(domains);
  });

  afterEach(jest.clearAllMocks);

  it('should provide options', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ChartCore />
      </PluginHost>
    ));

    expect(getComputedState(tree)).toEqual({
      ...defaultDeps.getter,
      domains,
      scales: 'test-scales',
      series: 'scaled-series',
    });
    expect(computeDomains).toBeCalledWith('test-axes', 'test-series');
    expect(buildScales).toBeCalledWith(domains, 'test-scale-extension', 'test-pane');
    expect(scaleSeriesPoints)
      .toBeCalledWith('test-series', 'test-scales', 'test-stacks', 'test-scale-extension');
  });
});
