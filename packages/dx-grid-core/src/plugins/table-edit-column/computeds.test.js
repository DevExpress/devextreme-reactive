import { TABLE_EDIT_COMMAND_TYPE } from './constants';
import { tableColumnsWithEditing } from './computeds';

describe('TableEditColumn Plugin computeds', () => {
  describe('#tableColumnsWithEditing', () => {
    it('should work', () => {
      const columns = [{ original: { id: 1 } }, { original: { id: 2 } }];

      expect(tableColumnsWithEditing(columns, 100))
        .toEqual([
          {
            key: TABLE_EDIT_COMMAND_TYPE.toString(),
            type: TABLE_EDIT_COMMAND_TYPE,
            width: 100,
          },
          { original: { id: 1 } },
          { original: { id: 2 } },
        ]);
    });
  });
});
