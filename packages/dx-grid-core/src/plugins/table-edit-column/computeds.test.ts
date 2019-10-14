import { TABLE_EDIT_COMMAND_TYPE } from './constants';
import { tableColumnsWithEditing } from './computeds';

describe('TableEditColumn Plugin computeds', () => {
  describe('#tableColumnsWithEditing', () => {
    const columns = [{ original: { id: 1 } }, { original: { id: 2 } }];

    it('should work', () => {
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

    it('should convert string to numb if possible', () => {
      expect(tableColumnsWithEditing(columns, '100'))
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

    it('should provide non-convertable string', () => {
      expect(tableColumnsWithEditing(columns, '200px'))
        .toEqual([
          {
            key: TABLE_EDIT_COMMAND_TYPE.toString(),
            type: TABLE_EDIT_COMMAND_TYPE,
            width: '200px',
          },
          { original: { id: 1 } },
          { original: { id: 2 } },
        ]);
    });
  });
});
