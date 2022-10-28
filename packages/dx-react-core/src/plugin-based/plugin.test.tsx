import 'jsdom-global/register';
import * as React from 'react';
import { mount } from 'enzyme';
import { PluginBase } from './plugin';
import { PLUGIN_HOST_CONTEXT, POSITION_CONTEXT } from './constants';

describe('Plugin', () => {
  let pluginHost: any;
  beforeEach(() => {
    pluginHost = {
      registerPlugin: jest.fn(),
      unregisterPlugin: jest.fn(),
      ensureDependencies: jest.fn(),
    };
  });

  it('should register itself in the plugin host', () => {
    mount((
      <PluginBase
        name="TestPlugin"
        dependencies={[{
          name: 'Dep1',
          optional: true,
        }]}
        {...{ [PLUGIN_HOST_CONTEXT]: pluginHost, [POSITION_CONTEXT]: () => [] }}
      >
        <div />
      </PluginBase>
    ));

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
    const tree = mount((
      <PluginBase
        name="TestPlugin"
        dependencies={[{
          name: 'Dep1',
          optional: true,
        }]}
        {...{ [PLUGIN_HOST_CONTEXT]: pluginHost, [POSITION_CONTEXT]: () => [] }}
      >
        <div />
      </PluginBase>
    ));

    tree.unmount();

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

  it('should enforce dependencies on mount', () => {
    mount((
      <PluginBase
        name="TestPlugin"
        dependencies={[]}
        {...{ [PLUGIN_HOST_CONTEXT]: pluginHost, [POSITION_CONTEXT]: () => [] }}
      >
        <div />
      </PluginBase>
    ));

    expect(pluginHost.ensureDependencies)
      .toHaveBeenCalledTimes(1);
  });

  it('should enforce dependencies check after optional is changed', () => {
    const pluginContainer = mount((
      <PluginBase
        name="TestPlugin"
        dependencies={[{
          name: 'Dep1',
          optional: true,
        }]}
        {...{ [PLUGIN_HOST_CONTEXT]: pluginHost, [POSITION_CONTEXT]: () => [] }}
      >
        <div />
      </PluginBase>
    ));

    expect(pluginHost.ensureDependencies)
      .toHaveBeenCalledTimes(1);

    pluginContainer.setProps({
      dependencies: [{
        name: 'Dep1',
        optional: false,
      }],
    });

    expect(pluginHost.ensureDependencies)
      .toHaveBeenCalledTimes(2);
  });

  it('should not enforce dependencies check if the "dependencies" prop is not changed', () => {
    const dependencies = [{
      name: 'Dep1',
      optional: true,
    }];
    const pluginContainer = mount((
      <PluginBase
        name="TestPlugin"
        dependencies={dependencies}
        {...{ [PLUGIN_HOST_CONTEXT]: pluginHost, [POSITION_CONTEXT]: () => [] }}
      >
        <div />
      </PluginBase>
    ));

    expect(pluginHost.ensureDependencies)
      .toHaveBeenCalledTimes(1);

    pluginContainer.setProps({ dependencies });

    expect(pluginHost.ensureDependencies)
      .toHaveBeenCalledTimes(1);
  });
});
