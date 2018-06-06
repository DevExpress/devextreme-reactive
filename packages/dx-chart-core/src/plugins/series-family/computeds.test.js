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
      'val-s1-start': 0,
      'val-s1-end': 11,
      'val-s2-start': 0,
      'val-s2-end': 11,
      'val-s3-start': 11,
      'val-s3-end': 22,
    }, {
      arg: 2,
      val: 22,
      'val-s1-start': 0,
      'val-s1-end': 22,
      'val-s2-start': 0,
      'val-s2-end': 22,
      'val-s3-start': 22,
      'val-s3-end': 44,
    }, {
      arg: 3,
      val: 33,
      'val-s1-start': 0,
      'val-s1-end': 33,
      'val-s2-start': 0,
      'val-s2-end': 33,
      'val-s3-start': 33,
      'val-s3-end': 66,
    }]);
  });

  it('should return new data, undefined values', () => {
    const series = [
      {
        name: 's1', stack: 'one', argumentField: 'arg', valueField: 'val0',
      },
      {
        name: 's2', stack: 'one', argumentField: 'arg', valueField: 'val1',
      },
      {
        name: 's3', stack: 'one', argumentField: 'arg', valueField: 'val2',
      },
    ];
    const data = [{
      arg: 1, val0: undefined, val1: 12, val2: 13,
    }, {
      arg: 2, val0: 21, val1: undefined, val2: 23,
    }, {
      arg: 3, val0: 31, val1: 32, val2: 33,
    }];

    expect(processData(series, data)).toEqual([{
      arg: 1,
      val0: undefined,
      val1: 12,
      val2: 13,
      'val1-s2-end': 12,
      'val1-s2-start': 0,
      'val2-s3-end': 25,
      'val2-s3-start': 12,
    }, {
      arg: 2,
      val0: 21,
      val1: undefined,
      val2: 23,
      'val0-s1-end': 21,
      'val0-s1-start': 0,
      'val2-s3-end': 44,
      'val2-s3-start': 21,
    }, {
      arg: 3,
      val0: 31,
      val1: 32,
      val2: 33,
      'val0-s1-start': 0,
      'val0-s1-end': 31,
      'val1-s2-start': 31,
      'val1-s2-end': 63,
      'val2-s3-start': 63,
      'val2-s3-end': 96,
    }]);
  });
});
