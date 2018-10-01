import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { computeDomains } from '@devexpress/dx-chart-core';
import { ChartCore } from './chart-core';

jest.mock('@devexpress/dx-chart-core', () => ({
  ARGUMENT_DOMAIN: 'test_argument_domain',
  computeDomains: jest.fn(),
}));

const domains = {
  test_argument_domain: {},
};
const paletteComputing = jest.fn(() => 'paletteComputing');

const defaultDeps = {
  getter: {
    paletteComputing,
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
      domains,
      colorDomain: 'paletteComputing',
      paletteComputing,
    });
  });
});
