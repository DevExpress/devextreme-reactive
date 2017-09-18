import { getTargetColumnGeometries } from './column-geometries';

describe('ColumnGeometries utils', () => {
  describe('#getTargetColumnGeometries', () => {
    it('should map an array of column geometries depending on source index correctly', () => {
      const columnGeometries = [
        {
          top: 20, right: 150, bottom: 40, left: 0,
        },
        {
          top: 20, right: 250, bottom: 40, left: 150,
        },
        {
          top: 20, right: 300, bottom: 40, left: 250,
        },
      ];

      expect(getTargetColumnGeometries(columnGeometries, 0))
        .toEqual([
          {
            top: 20, right: 150, bottom: 40, left: 0,
          },
          {
            top: 20, right: 250, bottom: 40, left: 150,
          },
          {
            top: 20, right: 300, bottom: 40, left: 250,
          },
        ]);

      expect(getTargetColumnGeometries(columnGeometries, 1))
        .toEqual([
          {
            top: 20, right: 100, bottom: 40, left: 0,
          },
          {
            top: 20, right: 250, bottom: 40, left: 100,
          },
          {
            top: 20, right: 300, bottom: 40, left: 250,
          },
        ]);

      expect(getTargetColumnGeometries(columnGeometries, 2))
        .toEqual([
          {
            top: 20, right: 50, bottom: 40, left: 0,
          },
          {
            top: 20, right: 200, bottom: 40, left: 50,
          },
          {
            top: 20, right: 300, bottom: 40, left: 200,
          },
        ]);
    });
  });
});
