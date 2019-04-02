import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { BasicData } from './basic-data';

jest.mock('@devexpress/dx-chart-core', () => ({
  defaultDomains: 'test-domains',
}));

describe('Basis Data', () => {
  it('should provide *data* and *series*', () => {
    const data = [1, 2, 3];
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({})}
        <BasicData data={data as any} />
      </PluginHost>
    ));

    expect(getComputedState(tree)).toEqual({
      data,
      domains: 'test-domains',
      series: [],
      axes: [],
      getAnimatedStyle: expect.any(Function),
    });
  });
});
