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

  it('should return new data, negative values', () => {
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
    const data = [{ arg: 1, val: 11 }, { arg: 2, val: -22 }, { arg: 3, val: -33 }];

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
      val: -22,
      'val-s1-start': -22,
      'val-s1-end': 0,
      'val-s2-start': -22,
      'val-s2-end': 0,
      'val-s3-start': -44,
      'val-s3-end': -22,
    }, {
      arg: 3,
      val: -33,
      'val-s1-start': -33,
      'val-s1-end': 0,
      'val-s2-start': -33,
      'val-s2-end': 0,
      'val-s3-start': -66,
      'val-s3-end': -33,
    }]);
  });
});
