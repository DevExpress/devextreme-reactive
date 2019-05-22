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
  getOffset: jest.fn().mockReturnValue('offset'),
}));

const DragBoxComponent = () => null;

describe('ZoomAndPan', () => {
  const defaultDeps = {
    getter: {
      domains: 'test-domains',
      ranges: 'test-ranges',
      rootRef: {
        current: {
          getBoundingClientRect: jest.fn().mockReturnValue('rect'),
        },
      },
    },
  };
  const defaultProps = {
    dragBoxComponent: DragBoxComponent,
    viewport: {
      argumentStart: 'test-arg-start-bound',
      argumentEnd: 'test-arg-end-bound',
      valueStart: 'test-val-start-bound',
      valueEnd: 'test-val-end-bound',
      scaleName: 'scale-1',
    },
  };

  afterEach(jest.clearAllMocks);

  it('should provide getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ZoomAndPan  {...defaultProps} />
      </PluginHost>
    ));

    expect(getComputedState(tree)).toEqual({
      ...defaultDeps.getter,
      ranges: 'adjusted-ranges',
    });
    expect(adjustLayout).toBeCalledWith('test-domains', 'test-ranges', defaultProps.viewport);
  });

  it('should handle *defaultViewport* property', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <ZoomAndPan  {...defaultProps} />
      </PluginHost>
    ));

    expect(getComputedState(tree)).toEqual({
      ...defaultDeps.getter,
      ranges: 'adjusted-ranges',
    });
  });
});
