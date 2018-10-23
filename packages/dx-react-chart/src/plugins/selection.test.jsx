import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { changeSeriesState } from '@devexpress/dx-chart-core';
import { Selection } from './selection';

jest.mock('@devexpress/dx-chart-core', () => ({
  SELECTED: 'TEST-SELECTED',
  changeSeriesState: jest.fn().mockReturnValue('selected-series'),
}));

describe('Selection', () => {
  afterEach(jest.clearAllMocks);

  const defaultDeps = {
    getter: {
      series: 'test-series',
    },
  };

  it('should provide getters', () => {
    const mock = [{ series: '1' }, { series: '2', point: 2 }];
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <Selection selection={mock} />
      </PluginHost>
    ));

    expect(getComputedState(tree)).toEqual({
      series: 'selected-series',
    });
    expect(changeSeriesState).toBeCalledWith('test-series', mock, 'TEST-SELECTED');
  });
});
