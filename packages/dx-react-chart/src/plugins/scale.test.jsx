import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { domains, computedExtension } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { Scale } from './scale';

jest.mock('@devexpress/dx-chart-core', () => ({
  domains: jest.fn(),
  computedExtension: jest.fn(),
}));

domains.mockImplementation(() => 'domains');
computedExtension.mockImplementation(() => 'computedExtension');

describe('Scale', () => {
  it('should provide options', () => {
    const tree = mount((
      <PluginHost>
        <Scale />
        {pluginDepsToComponents({})}
      </PluginHost>
    ));

    expect(getComputedState(tree))
      .toEqual({
        computedDomain: domains,
        scaleExtension: 'computedExtension',
      });
  });
});
