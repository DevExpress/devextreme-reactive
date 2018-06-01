import { TABLE_FILTER_TYPE, DEFAULT_FILTER_OPERATIONS } from './constants';
import { TABLE_DATA_TYPE } from '../table/constants';
import {
  isFilterTableCell,
  isFilterTableRow,
  getColumnFilterOperations,
  isFilterValueEmpty,
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
});
