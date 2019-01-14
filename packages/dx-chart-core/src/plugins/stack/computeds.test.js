import { stack } from 'd3-shape';
import { scaleBand } from 'd3-scale';
import { getStackedSeries } from './computeds';

jest.mock('d3-shape', () => ({
  stack: jest.fn(),
}));

jest.mock('d3-scale', () => ({
  scaleBand: jest.fn(),
}));

describe('Stack', () => {
  describe('getStackedSeries', () => {
    const mockStack = jest.fn();
    mockStack.keys = jest.fn().mockReturnValue(mockStack);
    mockStack.offset = jest.fn().mockReturnValue(mockStack);
    mockStack.order = jest.fn().mockReturnValue(mockStack);
    stack.mockReturnValue(mockStack);

    const mockScale = jest.fn();
    mockScale.domain = jest.fn().mockReturnValue(mockScale);
    mockScale.range = jest.fn().mockReturnValue(mockScale);
    scaleBand.mockReturnValue(mockScale);

    const makeSeries = (name, extra) => ({
      name,
      points: [],
      getPointTransformer: () => null,
      ...extra,
    });

    const makeStacks = (...args) => [{ series: args }];

    afterAll(jest.resetAllMocks);

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
      const series1 = makeSeries('1', {
        valueField: 'val1',
        points: [{ tag: '1-1', index: 0 }, { tag: '1-2', index: 1 }],
      });
      const series2 = makeSeries('2', {
        valueField: 'val2',
        points: [{ tag: '2-1', index: 1 }, { tag: '2-2', index: 2 }, { tag: '2-3', index: 3 }],
      });
      const series3 = makeSeries('3', {
        valueField: 'val3',
        points: [{ tag: '3-1', index: 0 }, { tag: '3-2', index: 2 }],
      });

      const result = getStackedSeries([series1, series2, series3], 'test-data', {
        stacks: makeStacks('1', '2', '3'),
        offset: 'test-offset',
        order: 'test-order',
      });

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

    it('should return series as-is if there are no stacks', () => {
      const list = [
        makeSeries('1'),
        makeSeries('2'),
        makeSeries('3'),
      ];

      const result = getStackedSeries(list, 'test-data', {
        stacks: [],
        offset: 'test-offset',
        order: 'test-order',
      });

      expect(result).toBe(list);
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
        makeSeries('1', { valueField: 'val1', points: [{ index: 0 }] }),
        makeSeries('2', { valueField: 'val2', points: [{ index: 0 }] }),
        makeSeries('3', { valueField: 'val3', points: [{ index: 0 }] }),
        makeSeries('4', { valueField: 'val4', points: [{ index: 0 }] }),
      ], 'test-data', {
        stacks: [
          ...makeStacks('1', '3'),
          ...makeStacks('2', '4'),
        ],
        offset: 'test-offset',
        order: 'test-order',
      });

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

    it('should ignore series without *stack* prop', () => {
      mockStack.mockReturnValue([]);
      const series1 = makeSeries('1');
      const series2 = makeSeries('2');
      const series3 = makeSeries('3');
      const series4 = makeSeries('4');

      const result = getStackedSeries([series1, series2, series3, series4], 'test-data', {
        stacks: makeStacks('2', '4'),
        offset: 'test-offset',
        order: 'test-order',
      });

      expect(result[0]).toBe(series1);
      expect(result[1]).not.toBe(series2);
      expect(result[2]).toBe(series3);
      expect(result[3]).not.toBe(series4);
    });

    it('should not make stacks of single series', () => {
      mockStack.mockReturnValue([]);
      const series1 = makeSeries('1');
      const series2 = makeSeries('2');
      const series3 = makeSeries('3');
      const series4 = makeSeries('4');

      const result = getStackedSeries([series1, series2, series3, series4], 'test-data', {
        stacks: [
          ...makeStacks('1', '4'),
          ...makeStacks('2'),
          ...makeStacks('3'),
        ],
        offset: 'test-offset',
        order: 'test-order',
      });

      expect(result[0]).not.toBe(series1);
      expect(result[1]).toBe(series2);
      expect(result[2]).toBe(series3);
      expect(result[3]).not.toBe(series4);
      expect(stack.mock.calls.length).toEqual(1);
    });

    it('should wrap *getPointTransformer* for starting from zero series', () => {
      mockStack.mockReturnValue([]);
      const getPointTransformer = () => null;
      const getPointTransformerWithZero = () => null;
      getPointTransformerWithZero.isStartedFromZero = true;
      getPointTransformerWithZero.a = 'A';
      getPointTransformerWithZero.b = 'B';

      const result = getStackedSeries([
        makeSeries('1', { getPointTransformer }),
        makeSeries('2', { getPointTransformer }),
        makeSeries('3', { getPointTransformer: getPointTransformerWithZero }),
        makeSeries('4', { getPointTransformer: getPointTransformerWithZero }),
        makeSeries('5', { getPointTransformer: getPointTransformerWithZero }),
      ], 'test-data', {
        stacks: makeStacks('1', '2', '3', '4', '5'),
        offset: 'test-offset',
        order: 'test-order',
      });

      expect(result[0].getPointTransformer).toBe(getPointTransformer);
      expect(result[1].getPointTransformer).toBe(getPointTransformer);
      expect(result[2].getPointTransformer).not.toBe(getPointTransformerWithZero);
      expect(result[3].getPointTransformer).not.toBe(getPointTransformerWithZero);
      expect(result[4].getPointTransformer).not.toBe(getPointTransformerWithZero);

      expect(result[2].getPointTransformer.isStartedFromZero).toEqual(true);
      expect(result[2].getPointTransformer.a).toEqual('A');
      expect(result[2].getPointTransformer.b).toEqual('B');
      expect(result[3].getPointTransformer.isStartedFromZero).toEqual(true);
      expect(result[3].getPointTransformer.a).toEqual('A');
      expect(result[3].getPointTransformer.b).toEqual('B');
      expect(result[4].getPointTransformer.isStartedFromZero).toEqual(true);
      expect(result[4].getPointTransformer.a).toEqual('A');
      expect(result[4].getPointTransformer.b).toEqual('B');

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
      mock.isStartedFromZero = true;
      const valueScale = value => `${value}#`;

      const result = getStackedSeries([
        makeSeries('1', { getPointTransformer: mock }),
        makeSeries('2', { getPointTransformer: mock }),
      ], 'test-data', {
        stacks: makeStacks('1', '2'),
        offset: 'test-offset',
        order: 'test-order',
      });

      const transform = result[0].getPointTransformer({ valueScale });

      expect(mock).toBeCalledWith({ valueScale });
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
      const getPointTransformer = () => null;
      getPointTransformer.isStartedFromZero = true;

      const result = getStackedSeries([
        makeSeries('1', { getPointTransformer }),
        makeSeries('2', { getPointTransformer }),
      ], 'test-data', {
        stacks: makeStacks('1', '2'),
        offset: 'test-offset',
        order: 'test-order',
      });

      expect(result[0].getValueDomain([
        { value: 2, value0: 1 },
        { value: 4, value0: 3 },
        { value: 8, value0: 7 },
      ])).toEqual([2, 1, 4, 3, 8, 7]);
    });

    it('should arrange groups', () => {
      const getPointTransformer = () => null;
      getPointTransformer.isBroad = true;
      getPointTransformer.a = 'A';
      getPointTransformer.b = 'B';
      const series1 = makeSeries('1');
      const series2 = makeSeries('2', { getPointTransformer });
      const series3 = makeSeries('3', { getPointTransformer });

      const result = getStackedSeries([series1, series2, series3], 'test-data', { stacks: [] });

      expect(result[0]).toBe(series1);
      expect(result[1]).not.toBe(series2);
      expect(result[2]).not.toBe(series3);

      expect(mockScale.domain).toBeCalledWith(['group-1', 'group-2']);
      expect(mockScale.range).toBeCalledWith([0, 2]);
      expect(mockScale.mock.calls).toEqual([
        ['group-1'],
        ['group-2'],
      ]);

      expect(result[1].getPointTransformer).not.toBe(getPointTransformer);
      expect(result[2].getPointTransformer).not.toBe(getPointTransformer);

      expect(result[1].getPointTransformer.a).toEqual('A');
      expect(result[1].getPointTransformer.b).toEqual('B');
      expect(result[2].getPointTransformer.a).toEqual('A');
      expect(result[2].getPointTransformer.b).toEqual('B');
    });

    it('should return series as-is if there no groups', () => {
      const list = [
        makeSeries('1'),
        makeSeries('2'),
        makeSeries('3'),
      ];

      const result = getStackedSeries(list, 'test-data', { stacks: [] });

      expect(result).toBe(list);
    });

    it('should update *x* and *width* in wrapped *getPointTransformer*', () => {
      const getPointTransformer = jest.fn();
      getPointTransformer.isBroad = true;
      getPointTransformer.mockReturnValueOnce(point => ({ ...point, tag: '1' }));
      getPointTransformer.mockReturnValueOnce(point => ({ ...point, tag: '2' }));
      getPointTransformer.mockReturnValueOnce(point => ({ ...point, tag: '3' }));

      mockScale.mockReturnValueOnce(0.2);
      mockScale.mockReturnValueOnce(0.6);
      mockScale.mockReturnValueOnce(0.8);

      const series1 = makeSeries('1', { getPointTransformer });
      const series2 = makeSeries('2', { getPointTransformer });
      const series3 = makeSeries('3', { getPointTransformer });

      const result = getStackedSeries([series1, series2, series3], 'test-data', { stacks: [] });

      const transform1 = result[0].getPointTransformer({ barWidth: 0.5 });
      expect(transform1({
        index: 1, x: 150, maxBarWidth: 60,
      })).toEqual({
        index: 1,
        tag: '1',
        x: 134,
        maxBarWidth: 20,
      });

      const transform2 = result[1].getPointTransformer({ barWidth: 0.8 });
      expect(transform2({
        index: 2, x: 150, maxBarWidth: 60,
      })).toEqual({
        index: 2,
        tag: '2',
        x: 142,
        maxBarWidth: 20,
      });

      const transform3 = result[2].getPointTransformer({ barWidth: 0.4 });
      expect(transform3({
        index: 3, x: 150, maxBarWidth: 60,
      })).toEqual({
        index: 3,
        tag: '3',
        x: 146,
        maxBarWidth: 20,
      });
    });

    it('should process stack as single group', () => {
      mockStack.mockReturnValue([]);
      const getPointTransformer = () => null;
      getPointTransformer.isBroad = true;

      getStackedSeries([
        makeSeries('1', { getPointTransformer }),
        makeSeries('2', { getPointTransformer }),
        makeSeries('3'),
        makeSeries('4'),
        makeSeries('5', { getPointTransformer }),
        makeSeries('6', { getPointTransformer }),
      ], 'test-data', {
        stacks: makeStacks('2', '4', '5'),
        offset: 'test-offset',
        order: 'test-order',
      });

      expect(mockScale.domain).toBeCalledWith(['group-0', '0', 'group-5']);
      expect(mockScale.mock.calls).toEqual([
        ['group-0'],
        ['0'],
        ['0'],
        ['group-5'],
      ]);
    });
  });
});
