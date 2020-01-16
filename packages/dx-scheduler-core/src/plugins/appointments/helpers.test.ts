import { isTimeTableElementsMetaActual, isAllDayElementsMetaActual } from './helpers';

describe('Appointments helpers', () => {
  describe('#isTimeTableElementsMetaActual', () => {
    it('should return true if getCellRects exists', () => {
      expect(isTimeTableElementsMetaActual({ getCellRects: 'test' }))
        .toBeTruthy();
      expect(isTimeTableElementsMetaActual({}))
        .toBeFalsy();
    });
  });

  describe('#isAllDayElementsMetaActual', () => {
    const viewCellsData = [[
      'test1',
      'test2',
      'test3',
    ]];
    it('should return true if getCellRects exists and its length is equal to the first row', () => {
      const allDayElementsMeta = {
        getCellRects: [
          'test1',
          'test2',
          'test3',
        ],
      };
      expect(isAllDayElementsMetaActual(viewCellsData, allDayElementsMeta))
        .toBeTruthy();
    });

    it('should return false if getCellRects does not exist', () => {
      expect(isAllDayElementsMetaActual(viewCellsData, {}))
        .toBeFalsy();
    });

    it('should return false if getCellRects length is not equal to the first row', () => {
      const allDayElementsMeta = {
        getCellRects: [
          'test1',
          'test2',
        ],
      };
      expect(isAllDayElementsMetaActual(viewCellsData, allDayElementsMeta))
        .toBeFalsy();
    });
  });
});
