import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { Animation } from './animation';

jest.mock('@devexpress/dx-chart-core', () => ({
  buildAnimatedStyleGetter: jest.fn().mockReturnValue('getAnimation'),
}));

describe('Animation', () => {
  it('should provide optinos', () => {
    const tree = mount((
      <PluginHost>
        <Animation />
        {pluginDepsToComponents({})}
      </PluginHost>
    ));

    expect(getComputedState(tree)).toEqual({
      getAnimatedStyle: 'getAnimation',
    });
  });
});
