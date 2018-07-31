import { shallow, mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { PLUGIN_HOST_CONTEXT } from './constants';
import { DxTemplateConnector } from './template-connector';

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
    shallow({
      render() {
        return (
          <DxTemplateConnector>
            {() => <div />}
          </DxTemplateConnector>
        );
      },
    }, { provide: { [PLUGIN_HOST_CONTEXT]: pluginHost } });

    expect(pluginHost.registerSubscription)
      .toHaveBeenCalledTimes(1);
  });

  it('should unregister itself in the plugin host', () => {
    const tree = shallow({
      render() {
        return (
          <DxTemplateConnector>
            {() => <div />}
          </DxTemplateConnector>
        );
      },
    }, { provide: { [PLUGIN_HOST_CONTEXT]: pluginHost } });

    tree.vm.$destroy();

    expect(pluginHost.unregisterSubscription)
      .toHaveBeenCalledTimes(1);
  });

  describe('connection', () => {
    let knownGetters;
    let knownActions;
    beforeEach(() => {
      knownGetters = {
        a: { value: 1, id: 0 },
        b: { value: 2, id: 1 },
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
      const connected = jest.fn().mockImplementation(() => ({ render() { return (<div />); } }));

      mount({
        render() {
          return (
            <DxTemplateConnector>
              {connected}
            </DxTemplateConnector>
          );
        },
      }, { provide: { [PLUGIN_HOST_CONTEXT]: pluginHost } });

      expect(connected)
        .toBeCalledWith(expect.objectContaining({
          getters: { a: 1, b: 2 },
          actions: { a: expect.any(Function), b: expect.any(Function) },
        }));
    });

    it('should render content when dependent getter value changed', () => {
      let getterValue = 0;
      const connected = jest.fn().mockImplementation(({ getters: { a } }) => { getterValue = a; });

      const tree = shallow({
        render() {
          return (
            <DxTemplateConnector>
              {connected}
            </DxTemplateConnector>
          );
        },
      }, { provide: { [PLUGIN_HOST_CONTEXT]: pluginHost } });

      expect(getterValue)
        .toBe(1);

      knownGetters.a = { value: 3, id: 2 };
      tree.update();

      expect(getterValue)
        .toBe(3);
    });

    it('should not render content when not tracking getter value changed', () => {
      let getterValue = 0;
      const connected = jest.fn().mockImplementation(({ getters: { a } }) => { getterValue = a; });

      const tree = shallow({
        render() {
          return (
            <DxTemplateConnector>
              {connected}
            </DxTemplateConnector>
          );
        },
      }, { provide: { [PLUGIN_HOST_CONTEXT]: pluginHost } });

      expect(getterValue)
        .toBe(1);

      knownGetters.b = { value: 4, id: 2 };
      tree.update();

      expect(getterValue)
        .toBe(1);
    });
  });
});
