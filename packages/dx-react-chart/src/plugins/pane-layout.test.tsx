import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost, TemplatePlaceholder } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
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
  const id = 'defaultId';

  it('should render Pane with correct props', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <PaneLayout id={id} />
        <TemplatePlaceholder name="canvas" />
      </PluginHost>
    ));

    expect(tree.find('svg').props()).toEqual({
      width: 400,
      height: 300,
      style: {
        left: 0, top: 0, overflow: 'visible', position: 'absolute', clipPath: 'url(#defaultId)',
      },
      children: expect.anything(),
    });
    expect(getComputedState(tree)).toEqual({
      ...defaultDeps.getter,
      rootRef: expect.anything(),
    });
  });

  it('should render patched Sizer with correct styles', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <PaneLayout id={id} />
        <TemplatePlaceholder name="canvas" />
      </PluginHost>
    ));

    expect(tree.find('UpdatableSizer').props()).toEqual({
      containerComponent: expect.any(Function),
      onSizeChange: expect.any(Function),
      children: expect.anything(),
    });
  });
});
