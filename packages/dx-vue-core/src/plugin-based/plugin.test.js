import { mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';

import { DxPlugin } from './plugin';
import { PLUGIN_HOST_CONTEXT, POSITION_CONTEXT } from './constants';

describe('Plugin', () => {
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
      registerPlugin: jest.fn(),
      unregisterPlugin: jest.fn(),
      ensureDependencies: jest.fn(),
    };
  });

  it('should register itself in the plugin host', () => {
    mount({
      render() {
        return (
          <DxPlugin
            name="TestPlugin"
            dependencies={[{
              name: 'Dep1',
              optional: true,
            }]}
          >
            <div />
          </DxPlugin>
        );
      },
    }, { provide: { [PLUGIN_HOST_CONTEXT]: pluginHost, [POSITION_CONTEXT]: () => {} } });

    expect(pluginHost.registerPlugin)
      .toHaveBeenCalledTimes(1);
    expect(pluginHost.registerPlugin.mock.calls[0][0])
      .toMatchObject({
        position: expect.any(Function),
        name: 'TestPlugin',
        dependencies: [{ name: 'Dep1', optional: true }],
        container: true,
      });
  });

  it('should unregister itself from the plugin host', () => {
    const wrapper = mount({
      render() {
        return (
          <DxPlugin
            name="TestPlugin"
            dependencies={[{
              name: 'Dep1',
              optional: true,
            }]}
          >
            <div />
          </DxPlugin>
        );
      },
    }, { provide: { [PLUGIN_HOST_CONTEXT]: pluginHost, [POSITION_CONTEXT]: () => {} } });

    wrapper.destroy();

    expect(pluginHost.registerPlugin)
      .toHaveBeenCalledTimes(1);
    expect(pluginHost.unregisterPlugin.mock.calls[0][0])
      .toMatchObject({
        position: expect.any(Function),
        name: 'TestPlugin',
        dependencies: [{ name: 'Dep1', optional: true }],
        container: true,
      });
  });

  it('should enforce dependencies check after optional is changed', () => {
    const wrapper = mount({
      data() {
        return {
          dependencies: [{ name: 'Dep1', optional: true }],
        };
      },
      render() {
        return (
          <DxPlugin
            name="TestPlugin"
            dependencies={this.dependencies}
          >
            <div />
          </DxPlugin>
        );
      },
    }, { provide: { [PLUGIN_HOST_CONTEXT]: pluginHost, [POSITION_CONTEXT]: () => {} } });

    wrapper.setData({
      dependencies: [{
        name: 'Dep1',
        optional: false,
      }],
    });

    expect(pluginHost.ensureDependencies)
      .toHaveBeenCalled();
    // TODO: .toHaveBeenCalledTimes(1);
  });
});
