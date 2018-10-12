import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { getSeriesPoints } from '@devexpress/dx-chart-core';
import { BasicData } from './basic-data';

jest.mock('@devexpress/dx-chart-core', () => ({
  getSeriesPoints: jest.fn(),
}));

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
      getSeriesPoints,
    });
  });
});
