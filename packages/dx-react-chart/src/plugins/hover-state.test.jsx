import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { changeSeriesState, processPointerMove, getHoverTargets } from '@devexpress/dx-chart-core';
import { HoverState } from './hover-state';

jest.mock('@devexpress/dx-chart-core', () => ({
  HOVERED: 'TEST-HOVERED',
  changeSeriesState: jest.fn().mockReturnValue('hovered-series'),
  processPointerMove: jest.fn().mockReturnValue('test-target'),
  getHoverTargets: jest.fn().mockReturnValue('test-hover-target'),
}));

describe('HoverState', () => {
  afterEach(jest.clearAllMocks);

  const defaultDeps = {
    getter: {
      pointerMoveHandlers: ['test-handler'],
      series: 'test-series',
    },
  };

  it('should provide getters', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <HoverState />
      </PluginHost>
    ));

    expect(getComputedState(tree)).toEqual({
      pointerMoveHandlers: ['test-handler', expect.any(Function)],
      series: 'hovered-series',
    });
    expect(changeSeriesState).toBeCalledWith('test-series', 'test-hover-target', 'TEST-HOVERED');
    expect(getHoverTargets).toBeCalledWith(undefined);
  });

  it('should handle "hover" prop', () => {
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <HoverState defaultHover={{ series: '2', point: 3 }} hover={{ series: '1' }} />
      </PluginHost>
    ));

    expect(getHoverTargets).toBeCalledWith({ series: '1' });
  });

  it('should handle "defaultHover" prop', () => {
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <HoverState defaultHover={{ series: '1' }} />
      </PluginHost>
    ));

    expect(getHoverTargets).toBeCalledWith({ series: '1' });
  });

  it('should handle hover change', () => {
    const mock = jest.fn();
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <HoverState hover={{ series: '1' }} onHoverChange={mock} />
      </PluginHost>
    ));

    getComputedState(tree).pointerMoveHandlers[1]({ targets: 'test-targets' });

    expect(processPointerMove).toBeCalledWith('test-targets', { series: '1' }, mock);
  });
});
