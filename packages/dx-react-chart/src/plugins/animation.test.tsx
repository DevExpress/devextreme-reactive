import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { buildAnimatedStyleGetter } from '@devexpress/dx-chart-core';
import { Animation } from './animation';

jest.mock('@devexpress/dx-chart-core', () => ({
  buildAnimatedStyleGetter: jest.fn().mockReturnValue('test-animation-style'),
}));

describe('Animation', () => {
  const defaultDeps = {
    getter: {
      rotated: 'test-rotated',
    },
  };
  it('should provide optinos', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Animation />
      </PluginHost>
    ));

    expect(getComputedState(tree)).toEqual({
      getAnimatedStyle: 'test-animation-style',
      rotated: 'test-rotated',
    });
    expect(buildAnimatedStyleGetter).toBeCalledWith('test-rotated');
  });
});
