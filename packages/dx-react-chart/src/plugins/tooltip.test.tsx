import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { processHandleTooltip } from '@devexpress/dx-chart-core';
import { Tooltip } from './tooltip';

jest.mock('@devexpress/dx-chart-core', () => ({
  getParameters: jest.fn().mockReturnValue({ element: { x: 10, y: 20 }, text: 'tooltip-text' }),
  processHandleTooltip: jest.fn().mockReturnValue('test-target'),
}));

const TargetComponent = () => null;
const OverlayComponent = ({ children }) => (
  <div>
    {children}
  </div>
);
const ContentComponent = () => null;

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
  contentComponent: ContentComponent,
};

describe('Tooltip', () => {
  afterEach(jest.clearAllMocks);

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

        <Tooltip {...defaultProps} targetItem={{ series: '1', point: 4 }} />
      </PluginHost>));

    expect(tree.find(TargetComponent).props()).toEqual({
      x: 10,
      y: 20,
      componentRef: expect.any(Function),
    });
  });

  it('should render overlayComponent', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <Tooltip {...defaultProps} targetItem={{ series: '1', point: 4 }} />
      </PluginHost>));
    const { children, target } = tree.find(OverlayComponent).props() as any;

    expect(children)
      .toBeTruthy();
    expect(target).toEqual(expect.any(Function));
  });

  it('should render contentComponent', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <Tooltip {...defaultProps} targetItem={{ series: '1', point: 4 }} />
      </PluginHost>));

    expect(tree.find(ContentComponent).props())
    .toEqual({ text: 'tooltip-text', targetItem: { series: '1', point: 4 } });
  });

  it('should handle "targetItem" prop', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <Tooltip
          {...defaultProps}
          defaultTargetItem={{ series: '2', point: 3 }}
          targetItem={{ series: '1', point: 4 }}
        />
      </PluginHost>));

    expect(tree.find(ContentComponent).props())
    .toEqual({ text: 'tooltip-text', targetItem: { series: '1', point: 4 } });
  });

  it('should handle "defaultTargetItem" prop', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <Tooltip {...defaultProps} defaultTargetItem={{ series: '2', point: 3 }} />
      </PluginHost>));

    expect(tree.find(ContentComponent).props())
    .toEqual({ text: 'tooltip-text', targetItem: { series: '2', point: 3 } });
  });

  it('should handle "onTargetItemChange"', () => {
    const mock = jest.fn();
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <Tooltip
          {...defaultProps}
          targetItem={{ series: '1', point: 2 }}
          onTargetItemChange={mock}
        />
      </PluginHost>
    ));
    getComputedState(tree).pointerMoveHandlers[1]({ targets: 'test-targets' });

    expect(processHandleTooltip).toBeCalledWith('test-targets', { series: '1', point: 2 }, mock);
  });
});
