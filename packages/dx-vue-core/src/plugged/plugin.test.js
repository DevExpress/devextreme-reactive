import { mount } from '@vue/test-utils';
import { Plugin } from './plugin';

describe('Plugin', () => {
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
          <Plugin
            name="TestPlugin"
            dependencies={[{
              name: 'Dep1',
              optional: true,
            }]}
          >
            <div />
          </Plugin>
        );
      },
    }, { provide: { pluginHost, positionContext: () => {} } });

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
          <Plugin
            name="TestPlugin"
            dependencies={[{
              name: 'Dep1',
              optional: true,
            }]}
          >
            <div />
          </Plugin>
        );
      },
    }, { provide: { pluginHost, positionContext: () => {} } });

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
          <Plugin
            name="TestPlugin"
            dependencies={this.dependencies}
          >
            <div />
          </Plugin>
        );
      },
    }, { provide: { pluginHost, positionContext: () => {} } });

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

  // TODO: Try to fix this test
  xit('should not enforce dependencies check if the "dependencies" prop is not changed', () => {
    const dependencies = [{
      name: 'Dep1',
      optional: true,
    }];
    const wrapper = mount({
      data() {
        return {
          dependencies,
        };
      },
      render() {
        return (
          <Plugin
            name="TestPlugin"
            dependencies={dependencies}
          >
            <div />
          </Plugin>
        );
      },
    }, { provide: { pluginHost, positionContext: () => {} } });

    wrapper.setData({ dependencies });

    expect(pluginHost.ensureDependencies)
      .not.toHaveBeenCalled();
  });
});
