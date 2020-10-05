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

    it('works correctly with upTo parameter', () => {
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
      expect(host.collect('something', plugin2)).toEqual([1]);
      expect(host.collect('something', plugin3)).toEqual([1, 2]);
    });

    it('works correctly with cache and upTo index cache', () => {
      const plugin1 = {
        position: () => [0],
        somethingElse: 1,
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
      expect(host.collect('something')).toEqual([2, 3]);
      expect(host.gettersCache.something).toEqual([2, 3]);
      // Second call, result must be from the cache
      expect(host.collect('something')).toBe(host.gettersCache.something);

      // Index cache must be
      expect(host.gettersCache.something_i).toEqual([{ key: 2, index: 1 }, { key: 3, index: 2 }]);

      expect(host.collect('something', plugin2)).toEqual([]);
      expect(host.gettersCache.something0).toBeUndefined();
      expect(host.gettersCache.something1).toEqual([]);
      expect(host.gettersCache.something2).toBeUndefined();
      // Second call, result must be from the cache
      expect(host.collect('something', plugin2)).toBe(host.gettersCache.something1);

      expect(host.collect('something', plugin3)).toEqual([2]);
      expect(host.gettersCache.something0).toBeUndefined();
      expect(host.gettersCache.something1).toEqual([]);
      expect(host.gettersCache.something2).toEqual([2]);
      // Second call, result must be from the cache
      expect(host.collect('something', plugin3)).toBe(host.gettersCache.something2);
    });

    it('should validate dependencies after a pluginContainer was registered', () => {
      const plugin1 = {
        position: () => [0],
        name: 'Plugin1',
        dependencies: [],
        container: true,
      };
      const plugin2 = {
        position: () => [2],
        name: 'Plugin2',
        dependencies: [
          { name: 'Plugin1' },
          { name: 'Plugin3' },
          { name: 'Plugin4', optional: true },
        ],
        container: true,
      };

      expect(() => {
        host.registerPlugin(plugin1);
        host.collect();
      }).not.toThrow();
      expect(() => {
        host.registerPlugin(plugin2);
        host.collect();
      }).toThrow(/Plugin2.*Plugin3/);
    });

    it('should validate optional dependencies after a pluginContainer was registered', () => {
      const plugin1 = {
        position: () => [1],
        name: 'Plugin1',
        dependencies: [
          { name: 'Plugin3', optional: true },
        ],
        container: true,
      };
      const plugin2 = {
        position: () => [2],
        name: 'Plugin2',
        dependencies: [
          { name: 'Plugin3', optional: true },
        ],
        container: true,
      };
      const plugin3 = {
        position: () => [3],
        name: 'Plugin3',
        dependencies: [],
        container: true,
      };

      host.registerPlugin(plugin1);
      host.registerPlugin(plugin2);

      expect(() => {
        host.registerPlugin(plugin3);
        host.collect();
      }).toThrow(/Plugin1.*Plugin3/);
    });

    it('should validate dependencies after a pluginContainer was unregistered', () => {
      const plugin1 = {
        position: () => [0],
        name: 'Plugin1',
        dependencies: [],
        container: true,
      };
      const plugin2 = {
        position: () => [1],
        name: 'Plugin2',
        dependencies: [{ name: 'Plugin1' }],
        container: true,
      };

      host.registerPlugin(plugin1);
      host.registerPlugin(plugin2);

      expect(() => {
        host.unregisterPlugin(plugin1);
        host.collect();
      }).toThrow(/Plugin2.*Plugin1/);
    });
  });

  describe('#registerSubscription', () => {
    it('works correctly', () => {
      const subscription = {
        onMessage: jest.fn(),
      };

      host.registerSubscription(subscription);
      host.broadcast('onMessage', 'update');
      expect(subscription.onMessage.mock.calls).toHaveLength(1);
      expect(subscription.onMessage.mock.calls[0]).toHaveLength(1);
      expect(subscription.onMessage.mock.calls[0][0]).toBe('update');
    });

    it('works correctly when called several times', () => {
      const subscription = {
        onMessage: jest.fn(),
      };

      host.registerSubscription(subscription);
      host.registerSubscription(subscription);
      host.broadcast('onMessage', 'update');
      expect(subscription.onMessage.mock.calls).toHaveLength(1);
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
      expect(subscription.onMessage.mock.calls).toHaveLength(0);
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
      expect(subscription1.onMessage.mock.calls).toHaveLength(1);
    });
  });

  describe('#knownKeys', () => {
    it('should return knownKeys correctly', () => {
      host.registerPlugin({
        position: () => 1,
        plugin1Postfix1: () => 1,
      });
      host.registerPlugin({
        position: () => 2,
        plugin2Postfix2: () => 2,
      });
      host.registerPlugin({
        position: () => 3,
        plugin3Postfix1: () => 3,
      });
      host.registerPlugin({
        position: () => 4,
        plugin2Postfix2: () => 4,
      });

      expect(host.knownKeys('Postfix1'))
        .toEqual(['plugin1', 'plugin3']);
      expect(host.knownKeys('Postfix2'))
        .toEqual(['plugin2']);
    });
  });
});
