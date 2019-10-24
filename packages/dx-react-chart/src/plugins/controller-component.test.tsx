import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { ControllerComponent } from './controller-component';
import { getReadiness } from '@devexpress/dx-chart-core';

jest.mock('@devexpress/dx-chart-core', () => ({
  getReadiness: jest.fn().mockReturnValue('ready_test'),
}));

describe('ControllerComponent', () => {
  const defaultDeps = {
    getter: {
      layouts: 'test-layouts',
      centerDivRef: 'test-centerDivRef',
    },
  };

  it('should provide getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ControllerComponent />
      </PluginHost>
    ));

    expect(getComputedState(tree)).toEqual({
      ...defaultDeps.getter,
      readyToRenderSeries: 'ready_test',
    });
    expect(getReadiness).toBeCalledWith('test-layouts', 'test-centerDivRef');
  });
});
