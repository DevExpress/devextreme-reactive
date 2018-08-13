import { FIXED_COLUMN_BEFORE_SIDE, FIXED_COLUMN_AFTER_SIDE } from './constants';
import { tableColumnsWithFixed } from './computeds';

describe('TableFixedColumns computeds', () => {
  describe('#tableColumnsWithFixed', () => {
    it('should mark fixed table column', () => {
      const tableColumns = [
        { column: { name: 'a' } },
        { type: 'type1' },
        { column: { name: 'b' } },
        { column: { name: 'c' } },
        { type: 'type2' },
        { type: 'type3' },
        { column: { name: 'd' } },
      ];
      expect(tableColumnsWithFixed(tableColumns, ['a'], ['type1'], ['d'], ['type3']))
        .toEqual([
          { column: { name: 'a' }, fixed: FIXED_COLUMN_BEFORE_SIDE },
          { type: 'type1', fixed: FIXED_COLUMN_BEFORE_SIDE },
          { column: { name: 'b' } },
          { column: { name: 'c' } },
          { type: 'type2' },
          { type: 'type3', fixed: FIXED_COLUMN_AFTER_SIDE },
          { column: { name: 'd' }, fixed: FIXED_COLUMN_AFTER_SIDE },
        ]);
    });
  });
});
