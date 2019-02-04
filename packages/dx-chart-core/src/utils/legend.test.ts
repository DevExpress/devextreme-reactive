import { getLegendItems } from './legend';

describe('Legend', () => {
  describe('getLegendItems', () => {
    it('should return texts and colors from series', () => {
      const items = getLegendItems([
        { name: 'item 1', color: 'c1' } as any,
        { name: 'item 2', color: 'c2' },
        { name: 'item 3', color: 'c3' },
      ]);

      expect(items).toEqual([
        { text: 'item 1', color: 'c1' },
        { text: 'item 2', color: 'c2' },
        { text: 'item 3', color: 'c3' },
      ]);
    });

    it('should return points for Pie series', () => {
      const series = {
        innerRadius: 0,
        outerRadius: 1,
        points: [{ argument: 'item 1', color: 'c1' }, { argument: 'item 2', color: 'c2' }],
      };
      const items = getLegendItems([series] as any);

      expect(items).toEqual([
        { text: 'item 1', color: 'c1' },
        { text: 'item 2', color: 'c2' },
      ]);
    });

    it('should not mistake single series for Pie', () => {
      const items = getLegendItems([
        { name: 'item 1', color: 'c1' } as any,
      ]);

      expect(items).toEqual([
        { text: 'item 1', color: 'c1' },
      ]);
    });
  });
});
