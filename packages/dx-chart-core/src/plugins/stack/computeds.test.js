import { stack } from 'd3-shape';
import {
  buildStackedSeries, buildStackedDataProcessor, clearStackedSeries, getStacks,
} from './computeds';

jest.mock('d3-shape', () => ({
  stack: jest.fn(),
}));

describe('Stack', () => {
  describe('buildStackedSeries', () => {
    it('should process series', () => {
      const series = buildStackedSeries([
        { stack: 's1', valueField: 'val1' },
        { stack: 's1', valueField: 'val2' },
        { stack: 's1', valueField: 'val3' },
      ]);

      expect(series).toEqual([
        {
          stack: 's1', valueField: 'stack_s1_0', stackKey: 'val1', stackPosition: 0,
        },
        {
          stack: 's1', valueField: 'stack_s1_1', stackKey: 'val2', stackPosition: 1,
        },
        {
          stack: 's1', valueField: 'stack_s1_2', stackKey: 'val3', stackPosition: 2,
        },
      ]);
    });

    it('should handle several stacks', () => {
      const series = buildStackedSeries([
        { stack: 's1', valueField: 'val1' },
        { stack: 's2', valueField: 'val2' },
        { stack: 's1', valueField: 'val3' },
        { valueField: 'val4' },
        { stack: 's2', valueField: 'val5' },
        { valueField: 'val6' },
      ]);

      expect(series).toEqual([
        {
          stack: 's1', valueField: 'stack_s1_0', stackKey: 'val1', stackPosition: 0,
        },
        {
          stack: 's2', valueField: 'stack_s2_0', stackKey: 'val2', stackPosition: 0,
        },
        {
          stack: 's1', valueField: 'stack_s1_1', stackKey: 'val3', stackPosition: 1,
        },
        {
          stack: 'stack3', valueField: 'stack_stack3_0', stackKey: 'val4', stackPosition: 0,
        },
        {
          stack: 's2', valueField: 'stack_s2_1', stackKey: 'val5', stackPosition: 1,
        },
        {
          stack: 'stack5', valueField: 'stack_stack5_0', stackKey: 'val6', stackPosition: 0,
        },
      ]);
    });

    it('should ignore series with stack:null', () => {
      const series = buildStackedSeries([
        { stack: 's1', valueField: 'val1' },
        { stack: null, valueField: 'val2' },
        { stack: 's1', valueField: 'val3' },
        { stack: null, valueField: 'val4' },
      ]);

      expect(series).toEqual([
        {
          stack: 's1', valueField: 'stack_s1_0', stackKey: 'val1', stackPosition: 0,
        },
        {
          stack: null, valueField: 'val2',
        },
        {
          stack: 's1', valueField: 'stack_s1_1', stackKey: 'val3', stackPosition: 1,
        },
        {
          stack: null, valueField: 'val4',
        },
      ]);
    });

    it('should not wrap *getPointTransformer* by default', () => {
      const getPointTransformer = jest.fn();
      const series = buildStackedSeries([
        { stack: 's1', valueField: 'val1', getPointTransformer },
        { stack: 's1', valueField: 'val2', getPointTransformer },
        { stack: 's2', valueField: 'val3', getPointTransformer },
      ]);

      expect(series[0].getPointTransformer).toEqual(getPointTransformer);
      expect(series[1].getPointTransformer).toEqual(getPointTransformer);
      expect(series[2].getPointTransformer).toEqual(getPointTransformer);
    });

    it('should add *valueField0* for starting from zero series', () => {
      const series = buildStackedSeries([
        { stack: 's1', valueField: 'val1' },
        { stack: 's1', valueField: 'val2' },
        {
          stack: 's2', valueField: 'val3', isStartedFromZero: true,
        },
        {
          stack: 's2', valueField: 'val4', isStartedFromZero: true,
        },
        {
          stack: 's3', valueField: 'val5', isStartedFromZero: true,
        },
      ]);

      expect(series[2].valueField0).toEqual('stack_s2_0_0');
      expect(series[3].valueField0).toEqual('stack_s2_1_0');
      expect(series[4].valueField0).toEqual('stack_s3_0_0');
    });

    it('should wrap *getPointTransformer* for starting from zero series', () => {
      const getPointTransformer = jest.fn();
      const series = buildStackedSeries([
        { stack: 's1', valueField: 'val1', getPointTransformer },
        { stack: 's1', valueField: 'val2', getPointTransformer },
        {
          stack: 's2', valueField: 'val3', getPointTransformer, isStartedFromZero: true,
        },
        {
          stack: 's2', valueField: 'val4', getPointTransformer, isStartedFromZero: true,
        },
        {
          stack: 's3', valueField: 'val5', getPointTransformer, isStartedFromZero: true,
        },
      ]);

      expect(series[0].getPointTransformer).toEqual(getPointTransformer);
      expect(series[1].getPointTransformer).toEqual(getPointTransformer);
      expect(series[2].getPointTransformer).not.toEqual(getPointTransformer);
      expect(series[3].getPointTransformer).not.toEqual(getPointTransformer);
      expect(series[4].getPointTransformer).not.toEqual(getPointTransformer);

      // TODO: Temporary - see note for *getValueDomainCalculator*.
      expect(series[0].getValueDomain).toBeUndefined();
      expect(series[1].getValueDomain).toBeUndefined();
      expect(series[2].getValueDomain).toEqual(expect.any(Function));
      expect(series[3].getValueDomain).toEqual(expect.any(Function));
      expect(series[4].getValueDomain).toEqual(expect.any(Function));
    });

    it('should update *y1* in wrapped *getPointTransformer*', () => {
      const data = [
        { stack_s1_0_0: '1-val1' },
        { stack_s1_0_0: '2-val1' },
        { stack_s1_0_0: '3-val1' },
        { stack_s1_0_0: '4-val1' },
      ];
      const mock = jest.fn().mockReturnValue(point => ({
        ...point,
        status: 'transformed',
      }));
      const valueScale = value => `${value}#`;
      const series = buildStackedSeries([
        {
          stack: 's1', valueField: 'val1', getPointTransformer: mock, isStartedFromZero: true,
        },
      ]);

      const transform = series[0].getPointTransformer({ ...series[0], valueScale }, data, 'a', 'b');
      expect(mock).toBeCalledWith({ ...series[0], valueScale }, data, 'a', 'b');
      expect(transform({ index: 1 })).toEqual({
        index: 1,
        status: 'transformed',
        y1: '2-val1#',
      });
      expect(transform({ index: 3 })).toEqual({
        index: 3,
        status: 'transformed',
        y1: '4-val1#',
      });
    });

    // TODO: Temporary - see note for *getValueDomainCalculator*.
    it('should collect values in *getValueDomain*', () => {
      const data = [
        { stack_s1_0_0: 1, stack_s1_0: 2, val1: 1 },
        { stack_s1_0_0: 3, stack_s1_0: 4, val1: 1 },
        { stack_s1_0_0: 5, stack_s1_0: 6 },
        { stack_s1_0_0: 7, stack_s1_0: 8, val1: 1 },
      ];
      const series = buildStackedSeries([
        {
          stack: 's1', valueField: 'val1', isStartedFromZero: true,
        },
      ]);

      expect(series[0].getValueDomain(data)).toEqual([2, 1, 4, 3, 8, 7]);
    });
  });

  describe('buildStackedDataProcessor', () => {
    const stackFunc = jest.fn();
    stackFunc.keys = jest.fn().mockReturnValue(stackFunc);
    stackFunc.order = jest.fn().mockReturnValue(stackFunc);
    stackFunc.offset = jest.fn().mockReturnValue(stackFunc);

    beforeEach(() => {
      stack.mockReturnValue(stackFunc);
    });

    afterEach(() => {
      jest.clearAllMocks();
      stack.mockReset();
    });

    it('should add fields to original data items', () => {
      const offset = jest.fn();
      const order = jest.fn();
      stackFunc.mockReturnValueOnce([
        [[0, 1], [0, 2], [0, 3], [0, 4]],
        [[1, 5], [1, 6], [1, 7], [1, 8]],
      ]);
      stackFunc.mockReturnValueOnce([
        [[2, 11], [2, 12], [2, 13], [2, 14]],
      ]);
      const processData = buildStackedDataProcessor(offset, order);
      const data = [
        {
          arg: 1, val1: '1-1', val2: '1-2', val3: '1-3',
        },
        {
          arg: 2, val1: '2-1', val2: '2-2', val3: '2-3',
        },
        {
          arg: 3, val1: '3-1', val2: '3-2', val3: '3-3',
        },
        {
          arg: 4, val1: '4-1', val2: '4-2', val3: '4-3',
        },
      ];

      const processedData = processData(data, [
        {
          stack: 's1', stackKey: 'val1', stackPosition: 0, valueField: 's1_val0',
        },
        {
          stack: 's1', stackKey: 'val2', stackPosition: 1, valueField: 's1_val1', valueField0: 's1_val1_0',
        },
        {
          stack: 's2', stackKey: 'val3', stackPosition: 0, valueField: 's2_val0', valueField0: 's2_val0_0',
        },
        { stack: null },
      ]);

      expect(stackFunc.keys.mock.calls).toEqual([[['val1', 'val2']], [['val3']]]);
      expect(stackFunc.order.mock.calls).toEqual([[order], [order]]);
      expect(stackFunc.offset.mock.calls).toEqual([[offset], [offset]]);
      expect(stackFunc.mock.calls).toEqual([[data], [data]]);
      expect(processedData).toEqual([
        {
          ...data[0], s1_val0: 1, s1_val1_0: 1, s1_val1: 5, s2_val0_0: 2, s2_val0: 11,
        },
        {
          ...data[1], s1_val0: 2, s1_val1_0: 1, s1_val1: 6, s2_val0_0: 2, s2_val0: 12,
        },
        {
          ...data[2], s1_val0: 3, s1_val1_0: 1, s1_val1: 7, s2_val0_0: 2, s2_val0: 13,
        },
        {
          ...data[3], s1_val0: 4, s1_val1_0: 1, s1_val1: 8, s2_val0_0: 2, s2_val0: 14,
        },
      ]);
    });

    it('should ignore stacked data when there is no original value', () => {
      stackFunc.mockReturnValueOnce([
        [[0, 1], [0, 2], [0, 3], [0, 4]],
        [[0, 5], [0, 6], [0, 7], [0, 8]],
      ]);
      const processData = buildStackedDataProcessor(jest.fn(), jest.fn());
      const data = [
        {
          arg: 1, val2: '1-2',
        },
        {
          arg: 2, val1: '2-1', val2: '2-2',
        },
        {
          arg: 3, val1: '3-1',
        },
        {
          arg: 4,
        },
      ];

      const processedData = processData(data, [
        {
          stack: 's1', stackKey: 'val1', stackPosition: 0, valueField: 's1_val0',
        },
        {
          stack: 's1', stackKey: 'val2', stackPosition: 1, valueField: 's1_val1',
        },
      ]);

      expect(processedData).toEqual([
        { ...data[0], s1_val1: 5 },
        { ...data[1], s1_val0: 2, s1_val1: 6 },
        { ...data[2], s1_val0: 3 },
        { ...data[3] },
      ]);
    });
  });

  describe('clearStackedSeries', () => {
    it('should clear props', () => {
      const series = clearStackedSeries([
        {
          stack: 's1', valueField: 'val1', stackKey: 'val1', stackPosition: 0,
        },
        {
          stack: 's1', valueField: 'val2', stackKey: 'val2', stackPosition: 1, valueField0: 'val3',
        },
        {
          stack: null,
        },
      ]);

      expect(series).toEqual([
        { stack: 's1', valueField: 'val1' },
        { stack: 's1', valueField: 'val2' },
        { stack: null },
      ]);
    });
  });

  describe('getStacks', () => {
    it('should return stacks', () => {
      const series = [{ stack: 'one' }, { stack: null }, { stack: 'two' }, { stack: 'one' }];
      expect(getStacks(series)).toEqual(['one', 'two']);
    });
  });
});
