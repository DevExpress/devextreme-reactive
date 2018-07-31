import { mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';

import { DxPluginHost } from './plugin-host';
import { DxAction } from './action';
import { DxGetter } from './getter';
import { DxTemplate } from './template';
import { DxTemplateConnector } from './template-connector';

describe('Action', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole();
  });
  afterAll(() => {
    resetConsole();
  });

  it('should execute action', () => {
    const action = jest.fn();
    let computedAction;

    mount({
      render() {
        return (
          <DxPluginHost>
            <DxAction name="action" action={action} />

            <DxTemplate name="root">
              <DxTemplateConnector>
                {({ actions }) => {
                  computedAction = actions.action;
                  return null;
                }}
              </DxTemplateConnector>
            </DxTemplate>
          </DxPluginHost>
        );
      },
    });

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

    mount({
      render() {
        return (
          <DxPluginHost>
            <DxAction name="action" action={action1} />
            <DxAction name="action" action={action2} />

            <DxTemplate name="root">
              <DxTemplateConnector>
                {({ actions }) => {
                  computedAction = actions.action;
                  return null;
                }}
              </DxTemplateConnector>
            </DxTemplate>
          </DxPluginHost>
        );
      },
    });

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

    mount({
      render() {
        return (
          <DxPluginHost>
            <DxAction name="action" action={action1} />
            <DxAction name="action" action={action2} />

            <DxTemplate name="root">
              <DxTemplateConnector>
                {({ actions }) => {
                  computedAction = actions.action;
                  return null;
                }}
              </DxTemplateConnector>
            </DxTemplate>
          </DxPluginHost>
        );
      },
    });

    computedAction();

    jest.clearAllMocks();
    computedAction();
  });

  it('should be possible to execute another action within action', () => {
    const action1 = jest.fn();
    const action2 = jest.fn((payload, getters, actions) => actions.action1());
    let computedAction2;

    mount({
      render() {
        return (
          <DxPluginHost>
            <DxAction name="action1" action={action1} />
            <DxAction name="action2" action={action2} />

            <DxTemplate name="root">
              <DxTemplateConnector>
                {({ actions }) => {
                  computedAction2 = actions.action2;
                  return null;
                }}
              </DxTemplateConnector>
            </DxTemplate>
          </DxPluginHost>
        );
      },
    });

    computedAction2();
    expect(action1)
      .toBeCalled();
  });

  it('should be possible to extend action params for action within a row', () => {
    const payload1 = {};
    const action1 = jest.fn();
    const action2 = jest.fn((payload, getters, actions) => actions.action(payload1));
    let computedAction;

    mount({
      render() {
        return (
          <DxPluginHost>
            <DxAction name="action" action={action1} />
            <DxAction name="action" action={action2} />

            <DxTemplate name="root">
              <DxTemplateConnector>
                {({ actions }) => {
                  computedAction = actions.action;
                  return null;
                }}
              </DxTemplateConnector>
            </DxTemplate>
          </DxPluginHost>
        );
      },
    });

    computedAction({});
    expect(action1.mock.calls[0][0])
      .toBe(payload1);
  });

  it('should receive getter values defined before', () => {
    const action = jest.fn();
    let computedAction;

    mount({
      render() {
        return (
          <DxPluginHost>
            <DxGetter name="value" value={1} />
            <DxAction name="action" action={action} />
            <DxGetter name="value" value={2} />

            <DxTemplate name="root">
              <DxTemplateConnector>
                {({ actions }) => {
                  computedAction = actions.action;
                  return null;
                }}
              </DxTemplateConnector>
            </DxTemplate>
          </DxPluginHost>
        );
      },
    });

    computedAction();
    expect(action.mock.calls[0][1].value)
      .toBe(1);
  });
});
