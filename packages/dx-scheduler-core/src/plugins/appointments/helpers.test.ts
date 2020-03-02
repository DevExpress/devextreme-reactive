import { isTimeTableElementsMetaActual, isAllDayElementsMetaActual } from './helpers';
import { VERTICAL_GROUP_ORIENTATION, HORIZONTAL_GROUP_ORIENTATION } from '../../constants';

describe('Appointments helpers', () => {
  describe('#isTimeTableElementsMetaActual', () => {
    const viewCellsData = [[
      {}, {}, {},
    ], [
      {}, {}, {},
    ]];
    it('should return false if getCellRects doesn\'t exist', () => {
      expect(isTimeTableElementsMetaActual(viewCellsData, {}))
        .toBeFalsy();
    });

    it('should return false viewCellsData\'s and getCellRects are different', () => {
      const timeTableElementsMeta = {
        getCellRects: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
      };
      expect(isTimeTableElementsMetaActual(viewCellsData, timeTableElementsMeta))
        .toBeFalsy();
    });

    it('should return true viewCellsData\' and getCellRects\' sizes are equal', () => {
      const timeTableElementsMeta = {
        getCellRects: [{}, {}, {}, {}, {}, {}],
      };
      expect(isTimeTableElementsMetaActual(viewCellsData, timeTableElementsMeta))
        .toBeTruthy();
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

      let groupCount = 2;
      expect(isAllDayElementsMetaActual(
        viewCellsData, allDayElementsMeta, VERTICAL_GROUP_ORIENTATION, groupCount,
      ))
        .toBeTruthy();

      groupCount = 3;
      expect(isAllDayElementsMetaActual(
        viewCellsData, allDayElementsMeta, VERTICAL_GROUP_ORIENTATION, groupCount,
      ))
        .toBeFalsy();
    });
  });
});
