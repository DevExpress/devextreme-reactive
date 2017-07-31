import { insertWithSorting } from './utils';

describe('utils', () => {
  describe('#insertWithSorting', () => {
    const mapPlugins = plugins => plugins.map(p => p.position().join());

    it('should work correctly', () => {
      const plugins = [
        { position: () => [1] },
        { position: () => [5, 3] },
      ];

      expect(mapPlugins(insertWithSorting({ position: () => [0] }, plugins)))
        .toEqual(['0', '1', '5,3']);
      expect(mapPlugins(insertWithSorting({ position: () => [3, 2, 0] }, plugins)))
        .toEqual(['1', '3,2,0', '5,3']);
      expect(mapPlugins(insertWithSorting({ position: () => [5, 2] }, plugins)))
        .toEqual(['1', '5,2', '5,3']);
      expect(mapPlugins(insertWithSorting({ position: () => [5, 3, 1] }, plugins)))
        .toEqual(['1', '5,3', '5,3,1']);
      expect(mapPlugins(insertWithSorting({ position: () => [7] }, plugins)))
        .toEqual(['1', '5,3', '7']);
    });
  });
});
