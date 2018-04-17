import { filterOperations } from './computeds';

describe('DataTypeProvider computeds', () => {
  describe('#filterOperations', () => {
    it('should pass newly defined operations for the specified columns', () => {
      const operations = ['a', 'b'];
      expect(filterOperations(undefined, operations, ['col1', 'col2']))
        .toEqual({ col1: operations, col2: operations });
    });

    it('should add newly defined operation to existing ones', () => {
      const definedOperations = { col1: ['a', 'b'] };
      const additionalOperations = ['a', 'c', 'd'];
      expect(filterOperations(definedOperations, additionalOperations, ['col2']))
        .toEqual({
          ...definedOperations,
          col2: additionalOperations,
        });
    });
  });
});
