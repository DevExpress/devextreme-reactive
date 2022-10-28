import 'jsdom-global/register';
import * as React from 'react';
import { mount } from 'enzyme';
import { UPDATE_CONNECTION_EVENT } from './constants';
import { TemplateConnector } from './template-connector';
import { PluginHostContext } from './contexts';

describe('TemplateConnector', () => {
  let pluginHost;
  beforeEach(() => {
    pluginHost = {
      registerSubscription: jest.fn(),
      unregisterSubscription: jest.fn(),
      knownKeys: jest.fn().mockImplementation(() => []),
      get: jest.fn(),
      collect: jest.fn(),
    };
  });

  it('should register itself in the plugin host', () => {
    mount((
      <PluginHostContext.Provider value={pluginHost}>
        <TemplateConnector>
          {() => <div />}
        </TemplateConnector>
      </PluginHostContext.Provider>
    ));

    expect(pluginHost.registerSubscription)
      .toHaveBeenCalledTimes(1);
  });

  it('should unregister itself in the plugin host', () => {
    const tree = mount((
      <PluginHostContext.Provider value={pluginHost}>
        <TemplateConnector>
          {() => <div />}
        </TemplateConnector>
      </PluginHostContext.Provider>
    ));

    tree.unmount();

    expect(pluginHost.unregisterSubscription)
      .toHaveBeenCalledTimes(1);
  });

  describe('connection', () => {
    let knownGetters;
    let knownActions;
    beforeEach(() => {
      knownGetters = {
        a: 1,
        b: 2,
      };
      knownActions = {
        a: jest.fn(),
        b: jest.fn(),
      };
      pluginHost = {
        ...pluginHost,
        knownKeys: postfix => Object.keys(postfix === 'Getter' ? knownGetters : knownActions),
        get: key => knownGetters[key.replace('Getter', '')],
        collect: key => [knownActions[key.replace('Action', '')]],
      };
    });

    it('should provide all known getters and actions', () => {
      const connected = jest.fn().mockImplementation(() => <div />);

      mount((
        <PluginHostContext.Provider value={pluginHost}>
          <TemplateConnector>
            {connected}
          </TemplateConnector>
        </PluginHostContext.Provider>
      ));

      expect(connected)
        .toBeCalledWith(
          expect.objectContaining({ a: 1, b: 2 }),
          expect.objectContaining({ a: expect.any(Function), b: expect.any(Function) }),
        );
    });

    it('should render content when dependent getter value changed', () => {
      const connected = jest.fn().mockImplementation(({ a }) => (
        <div>
          {a}
        </div>
      ));

      mount((
        <PluginHostContext.Provider value={pluginHost}>
          <TemplateConnector>
            {connected}
          </TemplateConnector>
        </PluginHostContext.Provider>
      ));

      knownGetters.a = 3;
      pluginHost.registerSubscription.mock.calls[0][0][UPDATE_CONNECTION_EVENT]();

      expect(connected)
        .toHaveBeenCalledTimes(2);
    });

    it('should not render content when not tracking getter value changed', () => {
      const connected = jest.fn().mockImplementation(({ a }) => (
        <div>
          {a}
        </div>
      ));

      mount((
        <PluginHostContext.Provider value={pluginHost}>
          <TemplateConnector>
            {connected}
          </TemplateConnector>
        </PluginHostContext.Provider>
      ));

      knownGetters.b = 4;
      pluginHost.registerSubscription.mock.calls[0][0][UPDATE_CONNECTION_EVENT]();

      expect(connected)
        .toHaveBeenCalledTimes(1);
    });
  });
});
