import { getTargetColumnGeometries, getCellGeometries } from './column-geometries';

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

  describe('#getCellGeometries', () => {
    it('should return dimensions', () => {
      const getBoundingClientRect = jest.fn(() => ({ left: 0, right: 100, width: 100 }));
      const node = { getBoundingClientRect, style: {} };

      expect(getCellGeometries(node)).toEqual({
        left: 0,
        right: 100,
      });
    });

    it('should return dimensions based on "left" style value', () => {
      const getBoundingClientRect = jest.fn(() => ({ left: 100, right: 200, width: 100 }));

      const firstNode = { getBoundingClientRect, style: { left: '0px' } };
      expect(getCellGeometries(firstNode)).toEqual({
        isFixed: true,
        left: 100,
        right: 200,
      });

      const secondNode = { getBoundingClientRect, style: { left: '200px' } };
      expect(getCellGeometries(secondNode)).toEqual({
        isFixed: true,
        left: 200,
        right: 300,
      });
    });

    it('should return dimensions based on "right" style value', () => {
      const getBoundingClientRect = () => ({ left: 300, right: 400, width: 100 });
      const parentNode = {
        nodeName: 'DIV',
        parentNode: {
          getBoundingClientRect: () => ({ width: 500 }),
        },
      };

      const nodeWithoutParent = {
        getBoundingClientRect,
        style: { right: '0px' },
      };
      expect(getCellGeometries(nodeWithoutParent)).toEqual({
        left: 300,
        right: 400,
      });

      const firstNode = {
        getBoundingClientRect,
        style: { right: '0px' },
        parentNode,
      };
      expect(getCellGeometries(firstNode)).toEqual({
        isFixed: true,
        left: 300,
        right: 400,
      });

      const secondNode = {
        getBoundingClientRect,
        style: { right: '200px' },
        parentNode,
      };
      expect(getCellGeometries(secondNode)).toEqual({
        isFixed: true,
        left: 200,
        right: 300,
      });
    });
  });
});
