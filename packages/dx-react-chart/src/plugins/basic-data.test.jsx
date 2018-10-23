import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { BasicData } from './basic-data';

describe('Basis Data', () => {
  it('should provide *data* and *series*', () => {
    const data = [1, 2, 3];
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({})}
        <BasicData data={data} />
      </PluginHost>
    ));

    expect(getComputedState(tree)).toEqual({
      data,
      series: [],
      axes: [],
    });
  });
});
