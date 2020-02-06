import { isTimeTableElementsMetaActual, isAllDayElementsMetaActual } from './helpers';
import { VERTICAL_GROUP_ORIENTATION, HORIZONTAL_GROUP_ORIENTATION } from '../../constants';

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
      expect(isAllDayElementsMetaActual(
        viewCellsData, allDayElementsMeta, HORIZONTAL_GROUP_ORIENTATION, 1,
      ))
        .toBeTruthy();
    });

    it('should return false if getCellRects does not exist', () => {
      expect(isAllDayElementsMetaActual(viewCellsData, {}, HORIZONTAL_GROUP_ORIENTATION, 1))
        .toBeFalsy();
    });

    it('should return false if getCellRects length is not equal to the first row', () => {
      const allDayElementsMeta = {
        getCellRects: [
          'test1',
          'test2',
        ],
      };
      expect(isAllDayElementsMetaActual(
        viewCellsData, allDayElementsMeta, HORIZONTAL_GROUP_ORIENTATION, 1,
      ))
        .toBeFalsy();
    });

    it('should work with verticalGrouping', () => {
      const allDayElementsMeta = {
        getCellRects: [
          'test1',
          'test2',
          'test3',
          'test4',
          'test5',
          'test6',
        ],
      };

      let numberOfGroups = 2;
      expect(isAllDayElementsMetaActual(
        viewCellsData, allDayElementsMeta, VERTICAL_GROUP_ORIENTATION, numberOfGroups,
      ))
        .toBeTruthy();

      numberOfGroups = 3;
      expect(isAllDayElementsMetaActual(
        viewCellsData, allDayElementsMeta, VERTICAL_GROUP_ORIENTATION, numberOfGroups,
      ))
        .toBeFalsy();
    });
  });
});
