import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { buildAnimation } from '@devexpress/dx-chart-core';
import { Animation } from './animation';

jest.mock('@devexpress/dx-chart-core', () => ({
  buildAnimation: jest.fn().mockReturnValue('test-animation'),
}));

describe('Animation', () => {
  it('should provide optinos', () => {
    const tree = mount((
      <PluginHost>
        <Animation />
      </PluginHost>
    ));

    expect(getComputedState(tree)).toEqual({
      animation: 'test-animation',
    });
    expect(buildAnimation).toBeCalled();
  });
});
