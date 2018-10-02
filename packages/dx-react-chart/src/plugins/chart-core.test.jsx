import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { ChartCore } from './chart-core';

jest.mock('@devexpress/dx-chart-core', () => ({
  prepareData: jest.fn(() => 'data'),
  ARGUMENT_DOMAIN: 'test_argument_domain',
}));


const domains = {
  test_argument_domain: {},
};
const computeDomains = jest.fn(() => domains);
const paletteComputing = jest.fn(() => 'paletteComputing');

const defaultDeps = {
  getter: {
    computeDomains,
    paletteComputing,
  },
};

describe('Chart Core', () => {
  it('should provide options', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ChartCore />
      </PluginHost>
    ));
    expect(getComputedState(tree)).toEqual({
      data: 'data',
      domains,
      computeDomains,
      colorDomain: 'paletteComputing',
      paletteComputing,
    });
  });
});
