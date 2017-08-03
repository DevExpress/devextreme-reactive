import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';

import { PluginHost } from './host';
import { PluginContainer } from './container';

describe('PluginContainer', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole();
  });
  afterAll(() => {
    resetConsole();
  });

  it('should register itself in the plugin host', () => {
    let pluginHostInstance;
    const Stub = (_, { pluginHost }) => {
      pluginHostInstance = pluginHost;
      pluginHostInstance.registerPlugin = jest.fn();
      return null;
    };
    Stub.contextTypes = {
      pluginHost: PropTypes.object.isRequired,
    };

    mount(
      <PluginHost>
        <Stub />
        <PluginContainer
          pluginName="TestPlugin"
          dependencies={[{
            pluginName: 'Dep1',
            optional: true,
          }]}
        >
          <div />
        </PluginContainer>
      </PluginHost>,
    );

    expect(pluginHostInstance.registerPlugin)
      .toHaveBeenCalledTimes(1);
    expect(pluginHostInstance.registerPlugin.mock.calls[0][0])
      .toMatchObject({
        position: expect.any(Function),
        pluginName: 'TestPlugin',
        dependencies: [{ pluginName: 'Dep1', optional: true }],
        container: true,
      });
  });

  it('should unregister itself from the plugin host', () => {
    let pluginHostInstance;
    const Stub = (_, { pluginHost }) => {
      pluginHostInstance = pluginHost;
      pluginHostInstance.unregisterPlugin = jest.fn();
      return null;
    };
    Stub.contextTypes = {
      pluginHost: PropTypes.object.isRequired,
    };

    const tree = mount(
      <PluginHost>
        <Stub />
        <PluginContainer
          pluginName="TestPlugin"
          dependencies={[{
            pluginName: 'Dep1',
            optional: true,
          }]}
        >
          <div />
        </PluginContainer>
      </PluginHost>,
    );

    tree.unmount();

    expect(pluginHostInstance.unregisterPlugin.mock.calls[1][0])
      .toMatchObject({
        position: expect.any(Function),
        pluginName: 'TestPlugin',
        dependencies: [{ pluginName: 'Dep1', optional: true }],
        container: true,
      });
  });
});
