import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { Tooltip } from './tooltip';

jest.mock('@devexpress/dx-chart-core', () => ({
  getParameters: jest.fn().mockReturnValue({ element: { x: 10, y: 20 }, text: 'tooltip-text' }),
}));

const TargetComponent = () => null;
const OverlayComponent = () => null;

const defaultDeps = {
  getter: {
    pointerMoveHandlers: ['test-handler'],
    series: 'test-series',
  },
  template: {
    series: {},
  },
};

const defaultProps = {
  targetComponent: TargetComponent,
  overlayComponent: OverlayComponent,
};

describe('Tooltip', () => {
  it('should provide getters', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <Tooltip {...defaultProps} />
      </PluginHost>));

    expect(getComputedState(tree)).toEqual({
      pointerMoveHandlers: ['test-handler', expect.any(Function)],
      series: 'test-series',
    });
  });

  it('should render targetComponent', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <Tooltip {...defaultProps} />
      </PluginHost>));

    expect(tree.find(TargetComponent).props()).toEqual({
      x: 10,
      y: 20,
      componentRef: expect.any(Function),
    });
  });

  it('should render overlay component', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <Tooltip {...defaultProps} />
      </PluginHost>));

    expect(tree.find(OverlayComponent).props()).toEqual({ children: 'tooltip-text', target: undefined, visible: false });
  });
});
