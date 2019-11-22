import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { AxesLayout } from './axes-layout';

describe('AxesLayout', () => {
  it('should provide getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({})}
        <AxesLayout />
      </PluginHost>
    ));

    expect(getComputedState(tree)).toEqual({
      centerDivRef: { current: null },
    });
  });
});
