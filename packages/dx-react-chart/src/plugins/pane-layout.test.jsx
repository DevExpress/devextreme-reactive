import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost, TemplatePlaceholder } from '@devexpress/dx-react-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { PaneLayout } from './pane-layout';

describe('PaneLayout', () => {
  const defaultDeps = {
    action: {
      changeBBox: () => undefined,
    },
    getter: {
      layouts: { pane: { width: 400, height: 300 } },
    },
  };

  it('should render Pane with correct props', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <PaneLayout />
        <TemplatePlaceholder name="canvas" />
      </PluginHost>
    ));

    expect(tree.find('svg').props()).toEqual({
      width: 400,
      height: 300,
      style: {
        left: 0, top: 0, overflow: 'visible', position: 'absolute',
      },
      children: expect.anything(),
    });
  });

  it('should render Sizer with correct styles', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <PaneLayout />
        <TemplatePlaceholder name="canvas" />
      </PluginHost>
    ));

    expect(tree.find('Sizer').props()).toEqual({
      containerComponent: expect.any(Function),
      onSizeChange: expect.any(Function),
      children: expect.anything(),
    });
  });
});
