import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { computeExtension } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { Scale } from './scale';

jest.mock('@devexpress/dx-chart-core', () => ({
  computeExtension: jest.fn(),
}));

computeExtension.mockImplementation(() => 'computedExtension');

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
        scaleExtension: 'computedExtension',
      });
  });
});
