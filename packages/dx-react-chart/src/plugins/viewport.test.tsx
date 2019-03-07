import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  pluginDepsToComponents, getComputedState, executeComputedAction,
} from '@devexpress/dx-testing';
import { adjustLayout } from '@devexpress/dx-chart-core';
import { Viewport } from './viewport';

jest.mock('@devexpress/dx-chart-core', () => ({
  adjustLayout: jest.fn().mockReturnValue('adjusted-ranges'),
}));

describe('Viewport', () => {
  const defaultDeps = {
    getter: {
      domains: 'test-domains',
      ranges: 'test-ranges',
    },
  };

  afterEach(jest.clearAllMocks);

  it('should provide getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Viewport
          viewport={{
            argumentBounds: 'test-arg-bounds' as any,
            scaleName: 'scale-1',
            valueBounds: 'test-val-bounds' as any,
          }}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree)).toEqual({
      ...defaultDeps.getter,
      ranges: 'adjusted-ranges',
    });
    expect(adjustLayout).toBeCalledWith('test-domains', 'test-ranges', {
      argumentBounds: 'test-arg-bounds',
      scaleName: 'scale-1',
      valueBounds: 'test-val-bounds',
    });
  });

  it('should handle *defaultViewport* property', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Viewport
          defaultViewport={{
            argumentBounds: 'test-arg-bounds' as any,
            scaleName: 'scale-1',
            valueBounds: 'test-val-bounds' as any,
          }}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree)).toEqual({
      ...defaultDeps.getter,
      ranges: 'adjusted-ranges',
    });
  });

  it('should provide action', () => {
    const mock = jest.fn();
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Viewport
          viewport={{
            argumentBounds: 'test-arg-bounds' as any,
            scaleName: 'scale-1',
            valueBounds: 'test-val-bounds' as any,
          }}
          onViewportChange={mock}
        />
      </PluginHost>
    ));

    executeComputedAction(tree, actions => actions.changeViewport({
      argumentBounds: 'new-arg-bounds' as any,
      scaleName: 'scale-2',
      valueBounds: 'new-val-bounds' as any,
    }));

    expect(mock).toBeCalledWith({
      argumentBounds: 'new-arg-bounds',
      scaleName: 'scale-2',
      valueBounds: 'new-val-bounds',
    });
  });
});
