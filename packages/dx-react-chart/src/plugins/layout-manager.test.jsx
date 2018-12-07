import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { LayoutManager } from './layout-manager';

describe('LayoutManager', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  const defaultDeps = {
    getter: {
    },
    template: {
    },
  };

  const defaultProps = {
    width: 200,
    height: 100,
    rootComponent: () => null,
  };

  it('should provide default layouts getter', () => {
    const tree = mount((
      <PluginHost>
        <LayoutManager
          {...defaultProps}
        />
        {pluginDepsToComponents(defaultDeps)}
      </PluginHost>
    ));

    expect(getComputedState(tree).layouts.pane).toEqual({ width: 200, height: 100 });
  });
});
