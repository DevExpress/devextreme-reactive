import * as React from 'react';
import { mount } from 'enzyme';

import { PluginHost } from './plugin-host';
import { Action, ActionBase } from './action';
import { Getter } from './getter';
import { Template } from './template';
import { TemplateConnector } from './template-connector';

import { PLUGIN_HOST_CONTEXT, POSITION_CONTEXT } from './constants';

describe('Action', () => {
  it('should execute action', () => {
    const action = jest.fn();
    let computedAction;

    mount((
      <PluginHost>
        <Action name="action" action={action} />

        <Template name="root">
          <TemplateConnector>
            {(getters, actions) => {
              computedAction = actions.action;
              return null;
            }}
          </TemplateConnector>
        </Template>
      </PluginHost>
    ));

    const payload = {};
    computedAction(payload);
    expect(action)
      .toHaveBeenCalledTimes(1);
    expect(action.mock.calls[0][0])
      .toBe(payload);
  });

  it('should be possible to evaluate several actions in a row', () => {
    const action1 = jest.fn();
    const action2 = jest.fn();
    let computedAction;

    mount((
      <PluginHost>
        <Action name="action" action={action1} />
        <Action name="action" action={action2} />

        <Template name="root">
          <TemplateConnector>
            {(getters, actions) => {
              computedAction = actions.action;
              return null;
            }}
          </TemplateConnector>
        </Template>
      </PluginHost>
    ));

    computedAction();
    expect(action1)
      .toHaveBeenCalledTimes(1);
    expect(action2)
      .toHaveBeenCalledTimes(1);
  });

  it('should be possible to evaluate several actions in correct order', () => {
    const action1 = jest.fn();
    const action2 = jest.fn(() => expect(action1).not.toBeCalled());
    let computedAction;

    mount((
      <PluginHost>
        <Action name="action" action={action1} />
        <Action name="action" action={action2} />

        <Template name="root">
          <TemplateConnector>
            {(getters, actions) => {
              computedAction = actions.action;
              return null;
            }}
          </TemplateConnector>
        </Template>
      </PluginHost>
    ));

    computedAction();

    jest.clearAllMocks();
    computedAction();
  });

  it('should be possible to execute another action within action', () => {
    const action1 = jest.fn();
    const action2 = jest.fn((payload, getters, actions) => actions.action1());
    let computedAction2;

    mount((
      <PluginHost>
        <Action name="action1" action={action1} />
        <Action name="action2" action={action2} />

        <Template name="root">
          <TemplateConnector>
            {(getters, actions) => {
              computedAction2 = actions.action2;
              return null;
            }}
          </TemplateConnector>
        </Template>
      </PluginHost>
    ));

    computedAction2();
    expect(action1)
      .toBeCalled();
  });

  it('should be possible to extend action params for action within a row', () => {
    const payload1 = {};
    const action1 = jest.fn();
    const action2 = jest.fn((payload, getters, actions) => actions.action(payload1));
    let computedAction;

    mount((
      <PluginHost>
        <Action name="action" action={action1} />
        <Action name="action" action={action2} />

        <Template name="root">
          <TemplateConnector>
            {(getters, actions) => {
              computedAction = actions.action;
              return null;
            }}
          </TemplateConnector>
        </Template>
      </PluginHost>
    ));

    computedAction({});
    expect(action1.mock.calls[0][0])
      .toBe(payload1);
  });

  it('should receive getter values defined before', () => {
    const action = jest.fn();
    let computedAction;

    mount((
      <PluginHost>
        <Getter name="value" value={1} />
        <Action name="action" action={action} />
        <Getter name="value" value={2} />

        <Template name="root">
          <TemplateConnector>
            {(getters, actions) => {
              computedAction = actions.action;
              return null;
            }}
          </TemplateConnector>
        </Template>
      </PluginHost>
    ));

    computedAction();
    expect(action.mock.calls[0][1].value)
      .toBe(1);
  });

  it('should correct Action unmount', () => {
    const action = jest.fn();

    const wrapper = mount((
      <PluginHost>
        <Action name="action" action={action} />
      </PluginHost>
    ));

    expect(() => { wrapper.unmount(); })
      .not.toThrow();
  });

  it('should remount correctly in Strict Mode', () => {
    const pluginHost = {
      registerPlugin: jest.fn(),
      unregisterPlugin: jest.fn(),
    } as any;

    const action = jest.fn();

    const tree = mount((
      <ActionBase
        name="action"
        action={action}
        {...{ [PLUGIN_HOST_CONTEXT]: pluginHost, [POSITION_CONTEXT]: () => [] }}
      />
    ));

    expect(pluginHost.registerPlugin)
      .toHaveBeenCalledTimes(1);

    tree.unmount();

    expect(pluginHost.registerPlugin)
      .toHaveBeenCalledTimes(1);
    expect(pluginHost.unregisterPlugin)
      .toHaveBeenCalledTimes(1);

    tree.mount();

    expect(pluginHost.registerPlugin)
      .toHaveBeenCalledTimes(2);
    expect(pluginHost.unregisterPlugin)
      .toHaveBeenCalledTimes(1);
  });
});
