import { sortPlugins } from './utils';

describe('utils', () => {
  describe('sortPlugins', () => {
    it('should work', () => {
      const plugins = [{
        position: () => [1, 0],
      }, {
        position: () => [10],
      }, {
        position: () => [3],
      }, {
        position: () => [1, 1],
      }, {
        position: () => [2, 0, 12],
      }, {
        position: () => [2, 0, 0],
      }, {
        position: () => [0],
      }];

      expect(sortPlugins(plugins).map(plugin => plugin.position().join()))
        .toEqual(['0', '1,0', '1,1', '2,0,0', '2,0,12', '3', '10']);
    });
  });
});
