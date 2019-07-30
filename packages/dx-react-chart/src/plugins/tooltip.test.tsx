import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { getParameters, createReference, processHandleTooltip } from '@devexpress/dx-chart-core';
import { Tooltip } from './tooltip';

jest.mock('@devexpress/dx-chart-core', () => ({
  getParameters: jest.fn().mockReturnValue({ element: 'test-element', text: 'tooltip-text' }),
  processHandleTooltip: jest.fn().mockReturnValue('test-target'),
  createReference: jest.fn().mockReturnValue({ tag: 'test-reference' }),
}));

const TargetComponent = () => null;
const OverlayComponent = ({ children }) => (
  <div>
    {children}
  </div>
);
const ContentComponent = () => null;
const ArrowComponent = () => null;
const SheetComponent = ({ children }) => (
  <div>
    {children}
  </div>
);

const defaultDeps = {
  getter: {
    pointerMoveHandlers: ['test-handler'],
    series: 'test-series',
    rootRef: 'test-root-ref',
    rotated: true,
  },
  template: {
    series: {},
  },
};

const defaultProps = {
  targetComponent: TargetComponent,
  overlayComponent: OverlayComponent,
  contentComponent: ContentComponent,
  arrowComponent: ArrowComponent,
  sheetComponent: SheetComponent,
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
      ...defaultDeps.getter,
      pointerMoveHandlers: ['test-handler', expect.any(Function)],
    });
  });

  it('should render content', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <Tooltip {...defaultProps} targetItem={{ series: '1', point: 4 }} />
      </PluginHost>));

    expect(tree.find(OverlayComponent).props()).toEqual({
      target: { tag: 'test-reference' },
      children: expect.anything(),
      rotated: true,
      arrowComponent: ArrowComponent,
    });
    expect(tree.find(SheetComponent).props()).toEqual({
      children: expect.anything(),
    });
    expect(tree.find(ContentComponent).props()).toEqual({
      text: 'tooltip-text',
      targetItem: { series: '1', point: 4 },
    });
    expect(getParameters).toBeCalledWith('test-series', { series: '1', point: 4 });
    expect(createReference).toBeCalledWith('test-element', 'test-root-ref');
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
