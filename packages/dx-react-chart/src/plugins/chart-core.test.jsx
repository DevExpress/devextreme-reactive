import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { ChartCore } from './chart-core';

jest.mock('@devexpress/dx-chart-core', () => ({
  prepareData: jest.fn(() => 'data'),
}));

const computedDomain = jest.fn(() => 'computedDomain');

const defaultDeps = {
  getter: {
    computedDomain,
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
      domains: 'computedDomain',
      computedDomain,
    });
  });
});
