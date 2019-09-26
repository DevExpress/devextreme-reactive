import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost, TemplatePlaceholder } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { PaneLayout } from './pane-layout';
import { ClipPath } from '../templates/clip-path';

jest.mock('../templates/clip-path', () => ({
  ClipPath: () => null,
}));

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
    expect(tree.find(ClipPath).props()).toEqual({
      height: 300,
      width: 400,
      id: 'clip_path_1',
    });

    expect(getComputedState(tree)).toEqual({
      ...defaultDeps.getter,
      rootRef: expect.anything(),
      clipPathId: 'clip_path_1',
    });
  });

  it('should render patched Sizer with correct styles', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <PaneLayout />
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
