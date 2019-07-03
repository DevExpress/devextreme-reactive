import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { getRanges } from '@devexpress/dx-chart-core';
import { LayoutManager } from './layout-manager';

jest.mock('@devexpress/dx-chart-core', () => ({
  getRanges: jest.fn().mockReturnValue('test-ranges'),
}));

describe('LayoutManager', () => {
  afterEach(jest.clearAllMocks);

  // TODO: Add "rotated" getter.
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

    expect(getComputedState(tree)).toEqual({
      layouts: {
        pane: { width: 200, height: 100 },
      },
      ranges: 'test-ranges',
    });
    expect(getRanges).toBeCalledWith({ width: 200, height: 100 }, undefined);
  });
});
