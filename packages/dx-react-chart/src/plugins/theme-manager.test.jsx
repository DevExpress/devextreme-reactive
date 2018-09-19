import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { palette } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { ThemeManager } from './theme-manager';

const callbackItems = jest.fn();

jest.mock('@devexpress/dx-chart-core', () => ({
  palette: jest.fn(),
}));

describe('Theme Manager', () => {
  beforeEach(() => {
    palette.mockImplementation(() => 'palette');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide options', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents({
          getter: {
            series: [{}],
            domains: { argument: { domain: 'domain' } },
            argumentAxisName: 'argument',
            items: callbackItems,
          },
        })}
        <ThemeManager />
      </PluginHost>
    ));

    expect(getComputedState(tree).colorDomain).toBe('palette');
    expect(callbackItems).toBeCalledWith([{}], 'domain');
  });
});
