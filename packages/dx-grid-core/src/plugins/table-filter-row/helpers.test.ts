import { TABLE_FILTER_TYPE, DEFAULT_FILTER_OPERATIONS } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import {
  isFilterTableCell,
  isFilterTableRow,
  getColumnFilterOperations,
  isFilterValueEmpty,
  getSelectedFilterOperation,
} from './helpers';

describe('TableFilterRow Plugin helpers', () => {
  describe('#isFilterTableCell', () => {
    it('should work', () => {
      expect(isFilterTableCell({ type: TABLE_FILTER_TYPE }, { type: TABLE_DATA_TYPE }))
        .toBeTruthy();
      expect(isFilterTableCell({ type: TABLE_FILTER_TYPE }, { type: 'undefined' }))
        .toBeFalsy();
      expect(isFilterTableCell({ type: 'undefined' }, { type: 'undefined' }))
        .toBeFalsy();
    });
  });

  describe('#isFilterTableRow', () => {
    it('should work', () => {
      expect(isFilterTableRow({ type: TABLE_FILTER_TYPE })).toBeTruthy();
      expect(isFilterTableRow({ type: 'undefined' })).toBeFalsy();
    });
  });

  describe('#getColumnFilterOperations', () => {
    it('should call the "getAvailableFilterOperations" function with correct parameters', () => {
      const getAvailableFilterOperations = jest.fn();
      getColumnFilterOperations(getAvailableFilterOperations, 'column');
      expect(getAvailableFilterOperations)
        .toHaveBeenCalledWith('column');
    });

    it('can return the default set of filter operations', () => {
      const getAvailableFilterOperations = jest.fn().mockReturnValue(undefined);
      expect(getColumnFilterOperations(getAvailableFilterOperations, 'column'))
        .toEqual(DEFAULT_FILTER_OPERATIONS);
    });
  });

  describe('#isFilterValueEmpty', () => {
    it('should determine empty values correctly', () => {
      expect(isFilterValueEmpty(undefined))
        .toBeTruthy();
      expect(isFilterValueEmpty(''))
        .toBeTruthy();
      expect(isFilterValueEmpty(0))
        .toBeFalsy();
      expect(isFilterValueEmpty('0'))
        .toBeFalsy();
    });
  });

  describe('#getSelectedFilterOperation', () => {
    it('should get filter operation by column name', () => {
      const filterOperation = getSelectedFilterOperation({ a: 'contains', b: 'startsWith' }, 'b');

      expect(filterOperation)
        .toBe('startsWith');
    });

    it('should use column filter operation if exists', () => {
      const filterOperation = getSelectedFilterOperation({}, 'a', { operation: 'contains' });

      expect(filterOperation)
        .toBe('contains');
    });

    it('should use the first column filter operation', () => {
      const filterOperation = getSelectedFilterOperation({}, 'a', null, ['endsWith', 'contains']);

      expect(filterOperation)
        .toBe('endsWith');
    });

    it('should prefer column filter if exists', () => {
      const filterOperation = getSelectedFilterOperation(
        { a: 'contains' }, 'a', { operation: 'endsWith' }, ['endsWith', 'contains'],
      );

      expect(filterOperation)
        .toBe('endsWith');
    });
  });
});
