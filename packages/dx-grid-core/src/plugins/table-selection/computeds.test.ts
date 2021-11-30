import { TABLE_SELECT_TYPE } from './constants';
import { tableColumnsWithSelection } from './computeds';

describe('TableSelection Plugin computeds', () => {
  describe('#tableColumnsWithSelection', () => {
    it('should work with showSelectionColumn', () => {
      expect(tableColumnsWithSelection([{}], 123, true))
        .toEqual([
          { key: TABLE_SELECT_TYPE.toString(), type: TABLE_SELECT_TYPE, width: 123 },
          {},
        ]);
    });
    it('should work without showSelectionColumn', () => {
      expect(tableColumnsWithSelection([{ key: '' }], 123, false))
        .toEqual([{
          key: '',
        }]);
    });
  });
});
