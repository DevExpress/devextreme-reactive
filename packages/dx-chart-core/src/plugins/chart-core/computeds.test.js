import { argumentAxisName, calculateSeriesWithStacks, processData } from './computeds';

describe('Chart core', () => {
  describe('argumentAxisName', () => {
    it('should return horizontal axis', () => {
      const axisName = argumentAxisName([{ argumentField: 'argumentAxis' }]);
      expect(axisName).toBe('argumentAxis');
    });
  });

  describe('calculateSeriesWithStacks', () => {
    it('should return stacks, stack in series is not specify', () => {
      const series = [{ name: '1' }, { name: '2' }];
      const { allStacks } = calculateSeriesWithStacks(series);
      expect(allStacks).toEqual(['stack0', 'stack1']);
    });

    it('should return stacks, stack in series is specify', () => {
      const series = [{ name: '1', stack: 'one' }, { name: '2', stack: 'two' }];
      const { allStacks, seriesWithStacks } = calculateSeriesWithStacks(series);
      expect(allStacks).toEqual(['one', 'two']);
      expect(seriesWithStacks).toEqual(series);
    });

    it('should return series with stacks, stack in series is not specify', () => {
      const series = [{ name: '1' }, { name: '2' }];
      const { seriesWithStacks } = calculateSeriesWithStacks(series);
      expect(seriesWithStacks).toEqual([{ name: '1', stack: 'stack0' }, { name: '2', stack: 'stack1' }]);
    });
  });

  describe('processData', () => {
    it('should return new data', () => {
      const series = [
        {
          name: 's1', stack: 'one', argumentField: 'arg', valueField: 'val',
        },
        {
          name: 's2', stack: 'two', argumentField: 'arg', valueField: 'val',
        },
        {
          name: 's3', stack: 'two', argumentField: 'arg', valueField: 'val',
        },
      ];
      const data = [{ arg: 1, val: 11 }, { arg: 2, val: 22 }, { arg: 3, val: 33 }];

      expect(processData(series, data)).toEqual([{
        arg: 1,
        val: 11,
        vals1start: 0,
        vals1end: 11,
        vals2start: 0,
        vals2end: 11,
        vals3start: 11,
        vals3end: 22,
      }, {
        arg: 2,
        val: 22,
        vals1start: 0,
        vals1end: 22,
        vals2start: 0,
        vals2end: 22,
        vals3start: 22,
        vals3end: 44,
      }, {
        arg: 3,
        val: 33,
        vals1start: 0,
        vals1end: 33,
        vals2start: 0,
        vals2end: 33,
        vals3start: 33,
        vals3end: 66,
      }]);
    });
  });
});
