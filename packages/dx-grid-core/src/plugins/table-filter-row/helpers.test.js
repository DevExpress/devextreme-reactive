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
    it('can return column specific filter operations', () => {
      const availableFilterOperations = {
        column1: ['a', 'b', 'c'],
        column2: ['d', 'a'],
        column3: [],
      };
      expect(getColumnFilterOperations(availableFilterOperations, 'column2'))
        .toEqual(availableFilterOperations.column2);
      expect(getColumnFilterOperations(availableFilterOperations, 'column3'))
        .toEqual(availableFilterOperations.column3);
    });

    it('can return the default set of filter operations', () => {
      expect(getColumnFilterOperations({}, 'column1'))
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
