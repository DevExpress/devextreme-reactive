import { TABLE_BAND_TYPE } from './constants';
import { tableRowsWithBands, getLinearBandColumns, nestedValue } from './computeds';

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

  describe('#getLinearBandColumns', () => {
    it('should processing linear data', () => {
      const treeBandColumns = [
        { name: 'a', title: 'A' },
        { name: 'b', title: 'B' },
      ];

      const linearBandColumns = getLinearBandColumns(treeBandColumns);

      expect(linearBandColumns).toEqual(expect.arrayContaining([
        { name: 'a', title: 'A', level: 0, children: 1 },
        { name: 'b', title: 'B', level: 0, children: 1 },
      ]));
    });

    it('should processing linear data without title', () => {
      const treeBandColumns = [
        { name: 'a' },
      ];

      const linearBandColumns = getLinearBandColumns(treeBandColumns);

      expect(linearBandColumns).toEqual(expect.arrayContaining([
        { name: 'a', title: 'a', level: 0, children: 1 },
      ]));
    });

    it('should processing simple tree data', () => {
      const treeBandColumns = [
        {
          name: 'a',
          title: 'A',
          columns: [
            { name: 'a1', title: 'A1' },
          ],
        },
        { name: 'b', title: 'B' },
      ];

      const linearBandColumns = getLinearBandColumns(treeBandColumns);

      expect(linearBandColumns).toEqual(expect.arrayContaining([
        { name: 'a', title: 'A', level: 0, children: 1 },
        { name: 'a1', title: 'A1', level: 1, children: 1 },
        { name: 'b', title: 'B', level: 0, children: 1 },
      ]));
    });

    it('should processing tree data with many nested columns', () => {
      const treeBandColumns = [
        { name: 'c', title: 'C' },
        {
          name: 'a',
          title: 'A',
          columns: [
            { name: 'a1', title: 'A1' },
            { name: 'a2', title: 'A2' },
            {
              name: 'a3',
              title: 'A3',
              columns: [{ name: 'a31', title: 'A31' }],
            },
          ],
        },
        { name: 'b', title: 'B' },
        {
          name: 'd',
          title: 'D',
          columns: [{
            name: 'd1',
            title: 'D1',
            columns: [{
              name: 'd2',
              title: 'D2',
              columns: [{ name: 'd21', title: 'D21' }],
            }],
          }],
        },
      ];

      const linearBandColumns = getLinearBandColumns(treeBandColumns);

      expect(linearBandColumns).toEqual(expect.arrayContaining([
        { name: 'a', title: 'A', level: 0, children: 3 },
        { name: 'a1', title: 'A1', level: 1, children: 1 },
        { name: 'a2', title: 'A2', level: 1, children: 1 },
        { name: 'a3', title: 'A3', level: 1, children: 1 },
        { name: 'a31', title: 'A31', level: 2, children: 1 },
        { name: 'c', title: 'C', level: 0, children: 1 },
        { name: 'b', title: 'B', level: 0, children: 1 },
        { name: 'd', title: 'D', level: 0, children: 1 },
        { name: 'd1', title: 'D1', level: 1, children: 1 },
        { name: 'd2', title: 'D2', level: 2, children: 1 },
        { name: 'd21', title: 'D21', level: 3, children: 1 },
      ]));
    });

    it('nested values', () => {
      const tree = [
        {
          name: 'a',
          title: 'A',
          columns: [
            { name: 'a1', title: 'A1' },
            { name: 'a2', title: 'A2' },
          ],
        },
        { name: 'b', title: 'B' },
        {
          name: 'c',
          title: 'C',
          columns: [
            {
              name: 'd',
              title: 'D',
              columns: [
                { name: 'F', title: 'F' },
              ],
            },
          ],
        },
      ];

      const nested = nestedValue(tree, 0);

      expect(nested).toEqual(4);
    });

    it('nested values', () => {
      const tree = [
        {
          name: 'a',
          title: 'A',
          columns: [
            { name: 'a1', title: 'A1' },
            { name: 'a2', title: 'A2' },
          ],
        },
        { name: 'b', title: 'B' },
      ];

      const nested = nestedValue(tree, 0);

      expect(nested).toEqual(3);
    });

    it('nested values', () => {
      const tree = [
        {
          name: 'a',
          title: 'A',
        },
      ];

      const nested = nestedValue(tree, 0);

      expect(nested).toEqual(1);
    });
  });
});
