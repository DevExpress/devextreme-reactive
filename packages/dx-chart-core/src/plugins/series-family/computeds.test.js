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
      'val-s1-stack': [0, 11],
      'val-s2-stack': [0, 11],
      'val-s3-stack': [11, 22],
    }, {
      arg: 2,
      val: 22,
      'val-s1-stack': [0, 22],
      'val-s2-stack': [0, 22],
      'val-s3-stack': [22, 44],
    }, {
      arg: 3,
      val: 33,
      'val-s1-stack': [0, 33],
      'val-s2-stack': [0, 33],
      'val-s3-stack': [33, 66],
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
      'val1-s2-stack': [0, 12],
      'val2-s3-stack': [12, 25],
    }, {
      arg: 2,
      val0: 21,
      val1: undefined,
      val2: 23,
      'val0-s1-stack': [0, 21],
      'val2-s3-stack': [21, 44],
    }, {
      arg: 3,
      val0: 31,
      val1: 32,
      val2: 33,
      'val0-s1-stack': [0, 31],
      'val1-s2-stack': [31, 63],
      'val2-s3-stack': [63, 96],
    }]);
  });
});
