import { TABLE_SELECT_TYPE } from './constants';
import { tableColumnsWithSelection } from './computeds';

describe('TableSelection Plugin computeds', () => {
  describe('#tableColumnsWithSelection', () => {
    it('should work', () => {
      expect(tableColumnsWithSelection([{}], 123))
        .toEqual([
          { key: TABLE_SELECT_TYPE.toString(), type: TABLE_SELECT_TYPE, width: 123 },
          {},
        ]);
    });
  });
});
