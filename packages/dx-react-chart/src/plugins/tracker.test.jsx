import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost, Template } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { buildEventHandlers } from '@devexpress/dx-chart-core';
import { Tracker } from './tracker';

jest.mock('@devexpress/dx-chart-core', () => ({
  buildEventHandlers: jest.fn(),
}));

describe('Tracker', () => {
  afterEach(jest.clearAllMocks);

  it('should pass params to template', () => {
    buildEventHandlers.mockReturnValue({
      click: 'test-click',
      pointermove: 'test-pointer-move',
      pointerleave: 'test-pointer-leave',
    });
    const mock = jest.fn().mockReturnValue(null);
    mount(
      <PluginHost>
        {pluginDepsToComponents({
          getter: {
            series: 'test-series',
          },
          template: {
            canvas: {},
          },
        })}

        <Template name="canvas">
          {mock}
        </Template>

        <Tracker />
      </PluginHost>,
    );

    expect(mock).toBeCalledWith({
      onClick: 'test-click',
      onPointerMove: 'test-pointer-move',
      onPointerLeave: 'test-pointer-leave',
    });
    expect(buildEventHandlers).toBeCalledWith(
      'test-series', { clickHandlers: [], pointerMoveHandlers: [] },
    );
  });

  it('should declare getters', () => {
    const tree = mount(
      <PluginHost>
        {pluginDepsToComponents({})}

        <Tracker />
      </PluginHost>,
    );

    expect(getComputedState(tree)).toEqual({
      clickHandlers: [],
      pointerMoveHandlers: [],
    });
  });

  it('should declare getters filled with props', () => {
    const testOnClick = () => 0;
    const testOnPointerMove = () => 0;
    const tree = mount(
      <PluginHost>
        {pluginDepsToComponents({})}

        <Tracker onClick={testOnClick} onPointerMove={testOnPointerMove} />
      </PluginHost>,
    );

    expect(getComputedState(tree)).toEqual({
      clickHandlers: [testOnClick],
      pointerMoveHandlers: [testOnPointerMove],
    });
  });
});
