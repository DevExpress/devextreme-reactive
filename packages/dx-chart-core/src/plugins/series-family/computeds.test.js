import { seriesWithStacks, processData, stacks } from './computeds';

describe('stacks', () => {
  it('should return stacks', () => {
    const series = [{ name: '1', stack: 'one' }, { name: '2', stack: 'two' }];
    expect(stacks(series)).toEqual(['one', 'two']);
  });
});

describe('series with stacks', () => {
  it('should return series, stack in series is not specify', () => {
    const series = [{ name: '1' }, { name: '2' }];
    expect(seriesWithStacks(series)).toEqual([{ name: '1', stack: 'stack0' }, { name: '2', stack: 'stack1' }]);
  });


  it('should return series with stacks, stack in series is specify', () => {
    const series = [{ name: '1', stack: 'one' }, { name: '2', stack: 'two' }];
    expect(seriesWithStacks(series)).toEqual([{ name: '1', stack: 'one' }, { name: '2', stack: 'two' }]);
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
