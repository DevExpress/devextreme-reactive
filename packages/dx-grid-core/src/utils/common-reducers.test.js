import { toggle } from './common-reducers';

describe('common reducers', () => {
  describe('#toggle', () => {
    it('should add to source', () => {
      expect(toggle([0], [1, 2]))
        .toEqual([0, 1, 2]);
    });

    it('should add to source if there are some new items', () => {
      expect(toggle([1, 2, 3], [3, 4]))
        .toEqual([1, 2, 3, 4]);
    });

    it('should remove from source if all itess are selected', () => {
      expect(toggle([1, 2, 3, 4], [3, 4]))
        .toEqual([1, 2]);
    });

    it('should add to source if state is true', () => {
      expect(toggle([1, 2, 3, 4], [3, 4], true))
        .toEqual([1, 2, 3, 4]);
    });

    it('should remove from selection if state is false', () => {
      expect(toggle([1, 2, 3], [3, 4], false))
        .toEqual([1, 2]);
    });
  });
});
