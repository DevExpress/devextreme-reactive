import { getLegendItems } from './legend';

describe('Legend', () => {
  describe('getLegendItems', () => {
    it('should return texts and colors from series', () => {
      const items = getLegendItems([
        { uniqueName: 'item 1', color: 'c1' },
        { uniqueName: 'item 2', color: 'c2' },
        { uniqueName: 'item 3', color: 'c3' },
      ]);

      expect(items).toEqual([
        { text: 'item 1', color: 'c1' },
        { text: 'item 2', color: 'c2' },
        { text: 'item 3', color: 'c3' },
      ]);
    });
  });
});
