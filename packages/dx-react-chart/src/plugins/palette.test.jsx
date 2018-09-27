import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { palette } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { Palette } from './palette';

jest.mock('@devexpress/dx-chart-core', () => ({
  palette: jest.fn(),
}));

describe('Palette', () => {
  beforeEach(() => {
    palette.mockImplementation(() => 'palette');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide options', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({})}
        <Palette scheme={[]} />
      </PluginHost>
    ));

    expect(getComputedState(tree).paletteComputing).toEqual(expect.any(Function));
  });
});
