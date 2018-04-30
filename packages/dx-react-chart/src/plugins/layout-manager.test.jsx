import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { LayoutManager } from './layout-manager';

describe('LayoutManager', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  const defaultDeps = {
    getter: {
    },
    template: {
      canvas: {},
    },
  };

  const defaultProps = {
    width: 200,
    height: 100,
  };

  it('should provide width & height ', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <LayoutManager
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).width).toEqual(200);
    expect(getComputedState(tree).height).toEqual(100);
  });

  it('should provide default layout', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <LayoutManager
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).layouts).toEqual({
      bottom: {
        height: 0, width: 200, x: 0, y: 100,
      },
      'bottom-axis': {
        height: 0, width: 200, x: 0, y: 100,
      },
      'bottom-axis-container': {
        height: 0, width: 200, x: 0, y: 100,
      },
      'bottom-container': {
        height: 0, width: 200, x: 0, y: 100,
      },
      'bottom-left': {
        height: 0, width: 0, x: 0, y: 100,
      },
      'bottom-left-axis': {
        height: 0, width: 0, x: 0, y: 100,
      },
      'bottom-right': {
        height: 0, width: 0, x: 200, y: 100,
      },
      'bottom-right-axis': {
        height: 0, width: 0, x: 200, y: 100,
      },
      'center-axis-container': {
        height: 100, width: 200, x: 0, y: 0,
      },
      'center-center': {
        height: 100, width: 200, x: 0, y: 0,
      },
      'center-container': {
        height: 100, width: 200, x: 0, y: 0,
      },
      left: {
        height: 100, width: 0, x: 0, y: 0,
      },
      'left-axis': {
        height: 100, width: 0, x: 0, y: 0,
      },
      pane: {
        height: 100, width: 200, x: 0, y: 0,
      },
      right: {
        height: 100, width: 0, x: 200, y: 0,
      },
      'right-axis': {
        height: 100, width: 0, x: 200, y: 0,
      },
      root: {
        height: 100, width: 200, x: 0, y: 0,
      },
      top: {
        height: 0, width: 200, x: 0, y: 0,
      },
      'top-axis': {
        height: 0, width: 200, x: 0, y: 0,
      },
      'top-axis-container': {
        height: 0, width: 200, x: 0, y: 0,
      },
      'top-container': {
        height: 0, width: 200, x: 0, y: 0,
      },
      'top-left': {
        height: 0, width: 0, x: 0, y: 0,
      },
      'top-left-axis': {
        height: 0, width: 0, x: 0, y: 0,
      },
      'top-right': {
        height: 0, width: 0, x: 200, y: 0,
      },
      'top-right-axis': {
        height: 0, width: 0, x: 200, y: 0,
      },
    });
  });

  it('should provide setBBox', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <LayoutManager
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).setBBox).toEqual(expect.any(Function));
  });

  it('should provide addNodes', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <LayoutManager
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).addNodes).toEqual(expect.any(Function));
  });
});
