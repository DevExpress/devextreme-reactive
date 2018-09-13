import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { palette } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { Theme } from './theme';

jest.mock('@devexpress/dx-chart-core', () => ({
  palette: jest.fn(),
}));

describe('Theme', () => {
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
        <Theme />
      </PluginHost>
    ));

    expect(getComputedState(tree).themeComputing).toEqual(expect.any(Function));
  });
});
