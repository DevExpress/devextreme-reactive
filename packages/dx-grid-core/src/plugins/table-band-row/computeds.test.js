import { TABLE_BAND_TYPE } from './constants';
import { tableRowsWithBands } from './computeds';

describe('TableBandRow Plugin computeds', () => {
  describe('#tableRowsWithBands', () => {
    it('should work', () => {
      const rows = tableRowsWithBands([{}], [[{}]]);

      expect(rows)
        .toEqual([{ key: TABLE_BAND_TYPE, type: TABLE_BAND_TYPE, level: 0 }, {}]);
    });

    it('should merge many arrays', () => {
      const rows = tableRowsWithBands([{}], [[{}], [{}]]);

      expect(rows)
        .toEqual([
          { key: TABLE_BAND_TYPE, type: TABLE_BAND_TYPE, level: 0 },
          { key: TABLE_BAND_TYPE, type: TABLE_BAND_TYPE, level: 1 },
          {},
        ]);
    });
  });
});
