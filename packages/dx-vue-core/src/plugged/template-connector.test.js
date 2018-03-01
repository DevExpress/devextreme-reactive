import { mount } from '@vue/test-utils';
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
    mount({
      render() {
        return (
          <TemplateConnector>
            {() => null}
          </TemplateConnector>
        );
      },
    }, { provide: { pluginHost } });

    expect(pluginHost.registerSubscription)
      .toHaveBeenCalledTimes(1);
  });

  it('should unregister itself in the plugin host', () => {
    const wrapper = mount({
      render() {
        return (
          <TemplateConnector>
            {() => null}
          </TemplateConnector>
        );
      },
    }, { provide: { pluginHost } });

    wrapper.destroy();

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
      const connected = jest.fn().mockImplementation(() => null);

      mount({
        render() {
          return (
            <TemplateConnector>
              {connected}
            </TemplateConnector>
          );
        },
      }, { provide: { pluginHost } });

      expect(connected)
        .toBeCalledWith(expect.objectContaining({
          getters: expect.objectContaining({ a: 1, b: 2 }),
          actions: expect.objectContaining({
            a: expect.any(Function),
            b: expect.any(Function),
          }),
        }));
    });

    it('should render content when dependent getter value changed', () => {
      const connected = jest.fn().mockImplementation(({ a }) =>
        ({ render() { return <div>{a}</div>; } }));

      const wrapper = mount({
        render() {
          return (
            <TemplateConnector>
              {connected}
            </TemplateConnector>
          );
        },
      }, { provide: { pluginHost } });

      knownGetters.a = 3;
      pluginHost.registerSubscription.mock.calls[0][0][UPDATE_CONNECTION]();
      wrapper.update();

      expect(connected.mock.calls.length)
        .toBeGreaterThan(1);
    });

    it('should not render content when not tracking getter value changed', () => {
      const connected = jest.fn().mockImplementation(({ a }) =>
        ({ render() { return <div>{a}</div>; } }));

      mount({
        render() {
          return (
            <TemplateConnector>
              {connected}
            </TemplateConnector>
          );
        },
      }, { provide: { pluginHost } });

      knownGetters.b = 4;
      pluginHost.registerSubscription.mock.calls[0][0][UPDATE_CONNECTION]();

      expect(connected)
        .toHaveBeenCalledTimes(1);
    });
  });
});
