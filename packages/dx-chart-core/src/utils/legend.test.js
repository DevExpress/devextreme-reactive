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

    it('should return points for Pie series', () => {
      const SliceCollection = () => null;
      const series = { seriesComponent: SliceCollection };
      const getSeriesPoints = jest.fn().mockReturnValue([
        { id: 'item 1', color: 'c1' },
        { id: 'item 2', color: 'c2' },
      ]);
      const items = getLegendItems([series], 'test-data', getSeriesPoints);

      expect(items).toEqual([
        { text: 'item 1', color: 'c1' },
        { text: 'item 2', color: 'c2' },
      ]);
      expect(getSeriesPoints).toBeCalledWith(series, 'test-data');
    });

    it('should not mistake single series for Pie', () => {
      const items = getLegendItems([
        { uniqueName: 'item 1', color: 'c1', seriesComponent: () => null },
      ]);

      expect(items).toEqual([
        { text: 'item 1', color: 'c1' },
      ]);
    });
  });
});
