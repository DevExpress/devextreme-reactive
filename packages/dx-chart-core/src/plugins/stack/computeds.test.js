import { stack } from 'd3-shape';
import { getStackedSeries, getStacks } from './computeds';

jest.mock('d3-shape', () => ({
  stack: jest.fn(),
}));

describe('Stack', () => {
  describe('getStackedSeries', () => {
    const mockStack = jest.fn();
    mockStack.keys = jest.fn().mockReturnValue(mockStack);
    mockStack.offset = jest.fn().mockReturnValue(mockStack);
    mockStack.order = jest.fn().mockReturnValue(mockStack);

    beforeAll(() => {
      stack.mockReturnValue(mockStack);
    });

    afterAll(stack.mockReset);

    afterEach(() => {
      jest.clearAllMocks();
      mockStack.mockReset();
    });

    it('should update series', () => {
      mockStack.mockReturnValue([
        [['1a', '1b'], ['1c', '1d'], null, null],
        [null, ['2a', '2b'], ['2c', '2d'], ['2e', '2f']],
        [['3a', '3b'], null, ['3c', '3d'], null],
      ]);
      const series1 = {
        symbolName: '1',
        stack: 's1',
        valueField: 'val1',
        points: [{ tag: '1-1', index: 0 }, { tag: '1-2', index: 1 }],
      };
      const series2 = {
        symbolName: '2',
        stack: 's1',
        valueField: 'val2',
        points: [{ tag: '2-1', index: 1 }, { tag: '2-2', index: 2 }, { tag: '2-3', index: 3 }],
      };
      const series3 = {
        symbolName: '3',
        stack: 's1',
        valueField: 'val3',
        points: [{ tag: '3-1', index: 0 }, { tag: '3-2', index: 2 }],
      };

      const result = getStackedSeries([series1, series2, series3],
        'test-data', 'test-offset', 'test-order');

      expect(result[0]).toEqual({
        ...series1,
        points: [
          { ...series1.points[0], value0: '1a', value: '1b' },
          { ...series1.points[1], value0: '1c', value: '1d' },
        ],
      });
      expect(result[1]).toEqual({
        ...series2,
        points: [
          { ...series2.points[0], value0: '2a', value: '2b' },
          { ...series2.points[1], value0: '2c', value: '2d' },
          { ...series2.points[2], value0: '2e', value: '2f' },
        ],
      });
      expect(result[2]).toEqual({
        ...series3,
        points: [
          { ...series3.points[0], value0: '3a', value: '3b' },
          { ...series3.points[1], value0: '3c', value: '3d' },
        ],
      });
      expect(stack.mock.calls.length).toEqual(1);
      expect(mockStack.keys).toBeCalledWith(['val1', 'val2', 'val3']);
      expect(mockStack.offset).toBeCalledWith('test-offset');
      expect(mockStack.order).toBeCalledWith('test-order');
      expect(mockStack).toBeCalledWith('test-data');
    });

    it('should handle several stacks', () => {
      mockStack.mockReturnValueOnce([
        [['1a', '1b']],
        [['2a', '2b']],
      ]);
      mockStack.mockReturnValueOnce([
        [['3a', '3b']],
        [['4a', '4b']],
      ]);

      const result = getStackedSeries([
        {
          symbolName: '1', stack: 's1', valueField: 'val1', points: [{ index: 0 }],
        },
        {
          symbolName: '2', stack: 's2', valueField: 'val2', points: [{ index: 0 }],
        },
        {
          symbolName: '3', stack: 's1', valueField: 'val3', points: [{ index: 0 }],
        },
        {
          symbolName: '4', stack: 's2', valueField: 'val4', points: [{ index: 0 }],
        },
      ], 'test-data', 'test-offset', 'test-order');

      expect(result[0].points).toEqual([{ index: 0, value0: '1a', value: '1b' }]);
      expect(result[1].points).toEqual([{ index: 0, value0: '3a', value: '3b' }]);
      expect(result[2].points).toEqual([{ index: 0, value0: '2a', value: '2b' }]);
      expect(result[3].points).toEqual([{ index: 0, value0: '4a', value: '4b' }]);
      expect(stack.mock.calls.length).toEqual(2);
      expect(mockStack.keys.mock.calls).toEqual([
        [['val1', 'val3']],
        [['val2', 'val4']],
      ]);
    });

    it('should provide default stack names', () => {
      mockStack.mockReturnValue([]);

      const result = getStackedSeries([
        { symbolName: '1', stack: 's1', points: [] },
        { symbolName: '2', points: [] },
        { symbolName: '3', stack: 's1', points: [] },
        { symbolName: '4', points: [] },
      ], 'test-data', 'test-offset', 'test-order');

      expect(result[0].stack).toEqual('s1');
      expect(result[1].stack).toEqual('stack1');
      expect(result[2].stack).toEqual('s1');
      expect(result[3].stack).toEqual('stack3');
    });

    it('should ignore series with stack:null', () => {
      mockStack.mockReturnValue([]);
      const series1 = { symbolName: '1', stack: null };
      const series2 = { symbolName: '2', points: [] };
      const series3 = { symbolName: '3', stack: null };
      const series4 = { symbolName: '4', points: [] };

      const result = getStackedSeries(
        [series1, series2, series3, series4], 'test-data', 'test-offset', 'test-order',
      );

      expect(result[0]).toEqual(series1);
      expect(result[1]).not.toEqual(series2);
      expect(result[2]).toEqual(series3);
      expect(result[3]).not.toEqual(series4);
    });

    it('should wrap *getPointTransformer* for starting from zero series', () => {
      mockStack.mockReturnValue([]);
      const getPointTransformer = () => null;

      const result = getStackedSeries([
        {
          symbolName: '1', stack: 's1', points: [], getPointTransformer,
        },
        {
          symbolName: '2', stack: 's1', points: [], getPointTransformer,
        },
        {
          symbolName: '3', stack: 's1', points: [], getPointTransformer, isStartedFromZero: true,
        },
        {
          symbolName: '4', stack: 's1', points: [], getPointTransformer, isStartedFromZero: true,
        },
        {
          symbolName: '5', stack: 's1', points: [], getPointTransformer, isStartedFromZero: true,
        },
      ]);

      expect(result[0].getPointTransformer).toEqual(getPointTransformer);
      expect(result[1].getPointTransformer).toEqual(getPointTransformer);
      expect(result[2].getPointTransformer).not.toEqual(getPointTransformer);
      expect(result[3].getPointTransformer).not.toEqual(getPointTransformer);
      expect(result[4].getPointTransformer).not.toEqual(getPointTransformer);

      // TODO: Temporary - see note for *getValueDomainCalculator*.
      expect(result[0].getValueDomain).toBeUndefined();
      expect(result[1].getValueDomain).toBeUndefined();
      expect(result[2].getValueDomain).toEqual(expect.any(Function));
      expect(result[3].getValueDomain).toEqual(expect.any(Function));
      expect(result[4].getValueDomain).toEqual(expect.any(Function));
    });

    it('should update *y1* in wrapped *getPointTransformer*', () => {
      mockStack.mockReturnValue([]);
      const mock = jest.fn().mockReturnValue(point => ({ ...point, tag: '#t' }));
      const valueScale = value => `${value}#`;

      const result = getStackedSeries([
        {
          symbolName: '1', stack: 's1', points: [], getPointTransformer: mock, isStartedFromZero: true,
        },
      ], 'test-data', 'test-offset', 'test-order');

      const transform = result[0].getPointTransformer({ valueScale }, 'a', 'b');

      expect(mock).toBeCalledWith({ valueScale }, 'a', 'b');
      expect(transform({ value0: 'v1' })).toEqual({
        value0: 'v1',
        tag: '#t',
        y1: 'v1#',
      });
      expect(transform({ value0: 'v2' })).toEqual({
        value0: 'v2',
        tag: '#t',
        y1: 'v2#',
      });
    });

    // TODO: Temporary - see note for *getValueDomainCalculator*.
    it('should collect values in *getValueDomain*', () => {
      mockStack.mockReturnValue([]);

      const result = getStackedSeries([
        {
          symbolName: '1', stack: 's1', points: [], isStartedFromZero: true,
        },
      ], 'test-data', 'test-offset', 'test-order');

      expect(result[0].getValueDomain([
        { value: 2, value0: 1 },
        { value: 4, value0: 3 },
        { value: 8, value0: 7 },
      ])).toEqual([2, 1, 4, 3, 8, 7]);
    });
  });

  describe('getStacks', () => {
    it('should return stacks', () => {
      const series = [{ stack: 'one' }, { stack: null }, { stack: 'two' }, { stack: 'one' }];
      expect(getStacks(series)).toEqual(['one', 'two']);
    });
  });
});
