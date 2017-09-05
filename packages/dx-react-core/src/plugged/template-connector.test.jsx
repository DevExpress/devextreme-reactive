import React from 'react';
import { shallow } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { UPDATE_CONNECTION } from './getter';
import { TemplateConnector } from './template-connector';

describe('TemplateConnector', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole();
  });
  afterAll(() => {
    resetConsole();
  });

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
    shallow((
      <TemplateConnector>
        {() => <div />}
      </TemplateConnector>
    ), {
      context: {
        pluginHost,
      },
    });

    expect(pluginHost.registerSubscription)
      .toHaveBeenCalledTimes(1);
  });

  it('should unregister itself in the plugin host', () => {
    const tree = shallow((
      <TemplateConnector>
        {() => <div />}
      </TemplateConnector>
    ), {
      context: {
        pluginHost,
      },
    });

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

      shallow((
        <TemplateConnector>
          {connected}
        </TemplateConnector>
      ), {
        context: {
          pluginHost,
        },
      });

      expect(connected)
        .toBeCalledWith(
          expect.objectContaining({ a: 1, b: 2 }),
          expect.objectContaining({ a: expect.any(Function), b: expect.any(Function) }));
    });

    it('should render content when dependent getter value changed', () => {
      const connected = jest.fn().mockImplementation(({ a }) => <div>{a}</div>);

      shallow((
        <TemplateConnector>
          {connected}
        </TemplateConnector>
      ), {
        context: {
          pluginHost,
        },
      });

      knownGetters.a = 3;
      pluginHost.registerSubscription.mock.calls[0][0][UPDATE_CONNECTION]();

      expect(connected)
        .toHaveBeenCalledTimes(2);
    });

    it('should not render content when not tracking getter value changed', () => {
      const connected = jest.fn().mockImplementation(({ a }) => <div>{a}</div>);

      shallow((
        <TemplateConnector>
          {connected}
        </TemplateConnector>
      ), {
        context: {
          pluginHost,
        },
      });

      knownGetters.b = 4;
      pluginHost.registerSubscription.mock.calls[0][0][UPDATE_CONNECTION]();

      expect(connected)
        .toHaveBeenCalledTimes(1);
    });
  });
});
