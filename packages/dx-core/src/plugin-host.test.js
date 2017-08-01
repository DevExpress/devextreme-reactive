import { PluginHost } from './plugin-host';

describe('PluginHost', () => {
  let host;

  beforeEach(() => {
    host = new PluginHost();
  });

  describe('#get', () => {
    it('works correctly', () => {
      const plugin = {
        position: () => [0],
        something: () => 123,
      };

      host.registerPlugin(plugin);
      expect(host.get('something')).toBe(123);
    });

    it('works correctly with extender', () => {
      const plugin1 = {
        position: () => [0],
        something: () => '1',
      };
      const plugin2 = {
        position: () => [1],
        something: original => `${original}2`,
      };
      const plugin3 = {
        position: () => [2],
        something: original => `${original}3`,
      };

      host.registerPlugin(plugin1);
      host.registerPlugin(plugin2);
      host.registerPlugin(plugin3);
      expect(host.get('something')).toBe('123');
    });

    it('should clean cache', () => {
      const plugin1 = {
        position: () => [0],
        something: () => '1',
      };
      const plugin2 = {
        position: () => [1],
        something: original => `${original}2`,
      };

      host.registerPlugin(plugin1);
      host.registerPlugin(plugin2);
      host.get('something');

      host.unregisterPlugin(plugin2);
      expect(host.get('something')).toBe('1');

      host.registerPlugin(plugin2);
      expect(host.get('something')).toBe('12');
    });
  });

  describe('#collect', () => {
    it('works correctly', () => {
      const plugin1 = {
        position: () => [0],
        something: 1,
      };
      const plugin2 = {
        position: () => [1],
        something: 2,
      };
      const plugin3 = {
        position: () => [2],
        something: 3,
      };

      host.registerPlugin(plugin1);
      host.registerPlugin(plugin2);
      host.registerPlugin(plugin3);
      expect(host.collect('something')).toEqual([1, 2, 3]);
    });
  });

  describe('#registerSubscription', () => {
    it('works correctly', () => {
      const subscription = {
        onMessage: jest.fn(),
      };

      host.registerSubscription(subscription);
      host.broadcast('onMessage', 'update');
      expect(subscription.onMessage.mock.calls.length).toBe(1);
      expect(subscription.onMessage.mock.calls[0].length).toBe(1);
      expect(subscription.onMessage.mock.calls[0][0]).toBe('update');
    });

    it('works correctly when called several times', () => {
      const subscription = {
        onMessage: jest.fn(),
      };

      host.registerSubscription(subscription);
      host.registerSubscription(subscription);
      host.broadcast('onMessage', 'update');
      expect(subscription.onMessage.mock.calls.length).toBe(1);
    });
  });

  describe('#unregisterSubscription', () => {
    it('works correctly', () => {
      const subscription = {
        onMessage: jest.fn(),
      };

      host.registerSubscription(subscription);
      host.unregisterSubscription(subscription);
      host.broadcast('onMessage', 'update');
      expect(subscription.onMessage.mock.calls.length).toBe(0);
    });

    it('does not fail if called without previous registration', () => {
      const subscription1 = {
        onMessage: jest.fn(),
      };
      const subscription2 = {
        onMessage: jest.fn(),
      };

      host.registerSubscription(subscription1);
      host.unregisterSubscription(subscription2);
      host.broadcast('onMessage', 'update');
      expect(subscription1.onMessage.mock.calls.length).toBe(1);
    });
  });

  describe('#registerPlugin', () => {
    it('should throw an exception if dependencies of the pluginContainer registering are not met', () => {
      const plugin1 = {
        position: () => [0],
        pluginName: 'Plugin1',
        dependencies: [],
        isContainer: true,
      };
      const plugin2 = {
        position: () => [2],
        pluginName: 'Plugin2',
        dependencies: [
          { pluginName: 'Plugin1' },
          { pluginName: 'Plugin3' },
          { pluginName: 'Plugin4', optional: true },
        ],
        isContainer: true,
      };

      expect(() => {
        host.registerPlugin(plugin1);
      }).not.toThrow();
      expect(() => {
        host.registerPlugin(plugin2);
      }).toThrow(/Plugin2.*Plugin3/);
    });

    it('should throw an exception if optional dependencies of the pluginContainer registering are not met', () => {
      const plugin1 = {
        position: () => [1],
        pluginName: 'Plugin1',
        dependencies: [
          { pluginName: 'Plugin2', optional: true },
        ],
        isContainer: true,
      };
      const plugin2 = {
        position: () => [2],
        pluginName: 'Plugin2',
        dependencies: [],
        isContainer: true,
      };

      expect(() => {
        host.registerPlugin(plugin1);
      }).not.toThrow();
      expect(() => {
        host.registerPlugin(plugin2);
      }).toThrow(/Plugin1.*Plugin2/);
    });
  });

  describe('#unregisterPlugin', () => {
    it('should throw an exception if dependencies are broken after a plugin is unregistered', () => {
      const plugin1 = {
        position: () => [0],
        pluginName: 'Plugin1',
        dependencies: [],
        isContainer: true,
      };
      const plugin2 = {
        position: () => [1],
        pluginName: 'Plugin2',
        dependencies: [{ pluginName: 'Plugin1' }],
        isContainer: true,
      };

      host.registerPlugin(plugin1);
      host.registerPlugin(plugin2);

      expect(() => {
        host.unregisterPlugin(plugin1);
      }).toThrow(/Plugin2.*Plugin1/);
    });
  });
});
