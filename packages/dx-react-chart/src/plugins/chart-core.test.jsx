import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { computeDomains, buildScales } from '@devexpress/dx-chart-core';
import { ChartCore } from './chart-core';

jest.mock('@devexpress/dx-chart-core', () => ({
  ARGUMENT_DOMAIN: 'test_argument_domain',
  computeDomains: jest.fn(),
  buildScales: jest.fn(),
}));

const domains = {
  test_argument_domain: {},
};
const paletteComputing = jest.fn(() => 'paletteComputing');

const defaultDeps = {
  getter: {
    axes: 'test-axes',
    series: 'test-series',
    data: 'test-data',
    layouts: { pane: 'test-pane' },
    scaleExtension: 'test-scale-extension',
    paletteComputing,
  },
};

describe('Chart Core', () => {
  beforeEach(() => {
    computeDomains.mockReturnValue(domains);
    buildScales.mockReturnValue('test-scales');
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
      colorDomain: 'paletteComputing',
    });
    expect(computeDomains).toBeCalledWith('test-axes', 'test-series', 'test-data');
    expect(buildScales).toBeCalledWith(domains, 'test-scale-extension', 'test-pane');
  });
});
