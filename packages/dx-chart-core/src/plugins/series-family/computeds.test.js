import {
  stack,
  stackOrderNone,
  stackOffsetNone,
} from 'd3-shape';
import { seriesWithStacks, processData, stacks } from './computeds';

jest.mock('d3-shape', () => ({
  stack: jest.fn(),
  stackOrderNone: jest.fn(),
  stackOffsetNone: jest.fn(),
}));

const mockStackOrderNone = jest.fn();
const mockStackOffsetNone = jest.fn();

const mockStack = jest.fn().mockReturnThis();
mockStack.keys = jest.fn().mockReturnThis();
mockStack.order = jest.fn().mockReturnThis();
mockStack.offset = jest.fn(() => jest.fn(() => [
  [[1, 2], [3, 4], [5, 6]],
  [[11, 12], [13, 14], [15, 16]],
  [[21, 22], [23, 24], [25, 26]],
]));

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
  beforeAll(() => {
    stack.mockImplementation(() => mockStack);
    stackOrderNone.mockImplementation(() => mockStackOrderNone);
    stackOffsetNone.mockImplementation(() => mockStackOffsetNone);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

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

    const processedData = processData(series, data);

    expect(stack).toHaveBeenCalledTimes(2);
    expect(mockStack.keys).toHaveBeenCalledWith(['val', 'val']);
    expect(mockStack.order).toHaveBeenCalledWith(stackOrderNone);
    expect(mockStack.offset).toHaveBeenCalledWith(stackOffsetNone);

    expect(processedData).toEqual([{
      arg: 1,
      val: 11,
      'val-s1-stack': [1, 2],
      'val-s2-stack': [1, 2],
      'val-s3-stack': [11, 12],
    }, {
      arg: 2,
      val: 22,
      'val-s1-stack': [3, 4],
      'val-s2-stack': [3, 4],
      'val-s3-stack': [13, 14],
    }, {
      arg: 3,
      val: 33,
      'val-s1-stack': [5, 6],
      'val-s2-stack': [5, 6],
      'val-s3-stack': [15, 16],
    }]);
  });
});
