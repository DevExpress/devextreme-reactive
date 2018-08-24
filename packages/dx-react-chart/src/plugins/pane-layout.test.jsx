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
  };

  it('should render Pane with correct props', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <PaneLayout />
        <TemplatePlaceholder name="canvas" />
      </PluginHost>
    ));

    expect(tree.find('Pane').props().width)
      .toEqual(expect.any(Number));
    expect(tree.find('Pane').props().height)
      .toEqual(expect.any(Number));
  });

  it('should render Sizer with correct styles', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <PaneLayout />
        <TemplatePlaceholder name="canvas" />
      </PluginHost>
    ));

    expect(tree.find('Sizer').props().style)
      .toEqual({ flex: 1, zIndex: 1 });
  });
});
