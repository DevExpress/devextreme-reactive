import { getAvailableFilterOperationsGetter } from './computeds';

describe('DataTypeProvider computeds', () => {
  describe('#getAvailableFilterOperationsGetter', () => {
    it('should return a correct function', () => {
      const getAvailableFilterOperations = getAvailableFilterOperationsGetter(
        undefined,
        ['operation1', 'operation2'],
        ['column1'],
      );
      expect(getAvailableFilterOperations('column1'))
        .toEqual(['operation1', 'operation2']);
      expect(getAvailableFilterOperations('column2'))
        .toEqual(undefined);
    });
    it('should return a function that considers the previous getter definitions', () => {
      const previousGetter = getAvailableFilterOperationsGetter(
        undefined,
        ['operation1'],
        ['column1'],
      );
      const getAvailableFilterOperations = getAvailableFilterOperationsGetter(
        previousGetter,
        ['operation2', 'operation3'],
        ['column2'],
      );
      expect(getAvailableFilterOperations('column1'))
        .toEqual(['operation1']);
      expect(getAvailableFilterOperations('column2'))
        .toEqual(['operation2', 'operation3']);
      expect(getAvailableFilterOperations('column3'))
        .toEqual(undefined);
    });
  });
});
