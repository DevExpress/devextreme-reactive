import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost, Template } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { buildEventHandler } from '@devexpress/dx-chart-core';
import { Tracker } from './tracker';

jest.mock('@devexpress/dx-chart-core', () => ({
  buildEventHandler: jest.fn(),
}));

describe('Tracker', () => {
  afterEach(jest.clearAllMocks);

  it('should pass empty params to template', () => {
    const mock = jest.fn().mockReturnValue(null);
    mount(
      <PluginHost>
        {pluginDepsToComponents({
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

    expect(mock).toBeCalledWith({});
  });

  it('should pass event handlers to template', () => {
    buildEventHandler.mockReturnValueOnce('handler-1');
    buildEventHandler.mockReturnValueOnce('handler-2');
    const testOnClick = () => 0;
    const testOnPointerMove = () => 0;
    const mock = jest.fn().mockReturnValue(null);
    mount(
      <PluginHost>
        {pluginDepsToComponents({
          template: {
            canvas: {},
          },
          getter: {
            tag: 'test',
          },
        })}

        <Template name="canvas">
          {mock}
        </Template>

        <Tracker onClick={testOnClick} onPointerMove={testOnPointerMove} />
      </PluginHost>,
    );

    expect(mock).toBeCalledWith({
      onClick: 'handler-1',
      onPointerMove: 'handler-2',
    });
    expect(buildEventHandler.mock.calls).toEqual([
      [
        { tag: 'test', clickHandlers: [testOnClick], pointerMoveHandlers: [testOnPointerMove] },
        [testOnClick],
      ],
      [
        { tag: 'test', clickHandlers: [testOnClick], pointerMoveHandlers: [testOnPointerMove] },
        [testOnPointerMove],
      ],
    ]);
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
