import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { buildAnimation } from '@devexpress/dx-chart-core';
import { Animation } from './animation';

jest.mock('@devexpress/dx-chart-core', () => ({
  buildAnimation: jest.fn().mockReturnValue('test-animation'),
  linear: jest.fn(),
}));

describe('Animation', () => {
  afterEach(jest.clearAllMocks);

  it('should provide default optinos', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({})}
        <Animation />
      </PluginHost>
    ));

    expect(getComputedState(tree)).toEqual({
      animation: 'test-animation',
    });
    expect(buildAnimation).toBeCalledWith(expect.any(Function), 1000);
  });

  it('should provide custom options', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({})}
        <Animation easing={jest.fn()} duration={20} />
      </PluginHost>
    ));

    expect(getComputedState(tree)).toEqual({
      animation: 'test-animation',
    });
    expect(buildAnimation).toBeCalledWith(expect.any(Function), 20);
  });
});
