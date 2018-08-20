import { insertPlugin } from './utils';

describe('utils', () => {
  describe('#insertPlugin', () => {
    const mapPlugins = plugins => plugins.map(p => p.position().join());

    it('should work correctly', () => {
      const plugins = [
        { position: () => [1] },
        { position: () => [5, 3] },
      ];

      expect(mapPlugins(insertPlugin(plugins, { position: () => [0] })))
        .toEqual(['0', '1', '5,3']);
      expect(mapPlugins(insertPlugin(plugins, { position: () => [3, 2, 0] })))
        .toEqual(['1', '3,2,0', '5,3']);
      expect(mapPlugins(insertPlugin(plugins, { position: () => [5, 2] })))
        .toEqual(['1', '5,2', '5,3']);
      expect(mapPlugins(insertPlugin(plugins, { position: () => [5, 3, 1] })))
        .toEqual(['1', '5,3', '5,3,1']);
      expect(mapPlugins(insertPlugin(plugins, { position: () => [7] })))
        .toEqual(['1', '5,3', '7']);
      expect(mapPlugins(insertPlugin(plugins, { position: () => [1] })))
        .toEqual(['1', '5,3']);
    });
  });
});
