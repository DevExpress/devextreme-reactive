import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { Plugin } from './plugin';

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
    mount(
      <Plugin
        name="TestPlugin"
        dependencies={[{
          name: 'Dep1',
          optional: true,
        }]}
      >
        <div />
      </Plugin>,
      {
        context: {
          pluginHost,
          positionContext: () => {},
        },
      },
    );

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
    const tree = mount(
      <Plugin
        name="TestPlugin"
        dependencies={[{
          name: 'Dep1',
          optional: true,
        }]}
      >
        <div />
      </Plugin>,
      {
        context: {
          pluginHost,
          positionContext: () => {},
        },
      },
    );

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

  it('should enforce dependencies check after optional is changed', () => {
    const pluginContainer = mount(
      <Plugin
        name="TestPlugin"
        dependencies={[{
          name: 'Dep1',
          optional: true,
        }]}
      >
        <div />
      </Plugin>,
      {
        context: {
          pluginHost,
          positionContext: () => {},
        },
      },
    );
    pluginContainer.setProps({
      dependencies: [{
        name: 'Dep1',
        optional: false,
      }],
    });

    expect(pluginHost.ensureDependencies)
      .toHaveBeenCalledTimes(1);
  });

  it('should not enforce dependencies check if the "dependencies" prop is not changed', () => {
    const dependencies = [{
      name: 'Dep1',
      optional: true,
    }];
    const pluginContainer = mount(
      <Plugin
        name="TestPlugin"
        dependencies={dependencies}
      >
        <div />
      </Plugin>,
      {
        context: {
          pluginHost,
          positionContext: () => {},
        },
      },
    );
    pluginContainer.setProps({ dependencies });

    expect(pluginHost.ensureDependencies)
      .not.toHaveBeenCalled();
  });
});
