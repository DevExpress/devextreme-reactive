import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  pluginDepsToComponents, getComputedState, executeComputedAction,
} from '@devexpress/dx-testing';
import { adjustLayout } from '@devexpress/dx-chart-core';
import { ZoomAndPan } from './zoom-pan';

jest.mock('@devexpress/dx-chart-core', () => ({
  adjustLayout: jest.fn().mockReturnValue('adjusted-ranges'),
}));

describe('ZoomAndPan', () => {
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
        <ZoomAndPan
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
        <ZoomAndPan
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
});
