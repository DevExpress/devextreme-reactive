import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost, Template } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { buildEventHandlers } from '@devexpress/dx-chart-core';
import { EventTracker } from './event-tracker';

jest.mock('@devexpress/dx-chart-core', () => ({
  buildEventHandlers: jest.fn(),
}));

describe('EventTracker', () => {
  afterEach(jest.clearAllMocks);

  it('should pass params to template', () => {
    (buildEventHandlers as jest.Mock).mockReturnValue({
      click: 'test-click',
      mousemove: 'test-pointer-move',
      mouseleave: 'test-pointer-leave',
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

        <EventTracker />
      </PluginHost>,
    );

    expect(mock).toBeCalledWith({
      onClick: 'test-click',
      onMouseMove: 'test-pointer-move',
      onMouseLeave: 'test-pointer-leave',
    });
    expect(buildEventHandlers).toBeCalledWith(
      'test-series', { clickHandlers: [], pointerMoveHandlers: [] },
    );
  });

  it('should declare getters', () => {
    const tree = mount(
      <PluginHost>
        {pluginDepsToComponents({})}

        <EventTracker />
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

        <EventTracker onClick={testOnClick} onPointerMove={testOnPointerMove} />
      </PluginHost>,
    );

    expect(getComputedState(tree)).toEqual({
      clickHandlers: [testOnClick],
      pointerMoveHandlers: [testOnPointerMove],
    });
  });
});
