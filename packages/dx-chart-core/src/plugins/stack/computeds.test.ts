import { stack } from 'd3-shape';
import { scaleBand } from '../../d3-scale';
import { extendDomains, updateDomainItems } from '../scale/computeds';
import { getStackedSeries, getStackedDomains } from './computeds';

jest.mock('d3-shape', () => ({
  stack: jest.fn(),
}));

jest.mock('../../d3-scale', () => ({
  scaleBand: jest.fn(),
}));

jest.mock('../scale/computeds', () => ({
  extendDomains: jest.fn(),
  updateDomainItems: jest.fn(),
}));

describe('Stack', () => {
  describe('getStackedSeries', () => {
    const mockStack = jest.fn() as any;
    mockStack.keys = jest.fn().mockReturnValue(mockStack);
    mockStack.offset = jest.fn().mockReturnValue(mockStack);
    mockStack.order = jest.fn().mockReturnValue(mockStack);
    (stack as jest.Mock).mockReturnValue(mockStack);

    const mockScale = jest.fn() as any;
    mockScale.domain = jest.fn().mockReturnValue(mockScale);
    mockScale.range = jest.fn().mockReturnValue(mockScale);
    (scaleBand as jest.Mock).mockReturnValue(mockScale);

    const makeSeries = (name, extra?) => ({
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

      const result = getStackedSeries([series1, series2, series3], 'test-data' as any, {
        stacks: makeStacks('1', '2', '3'),
        offset: 'test-offset',
        order: 'test-order',
      } as any);

      expect(result[0]).toEqual({
        ...series1,
        points: [
          { ...series1.points[0], value0: '1a', value: '1b' },
          { ...series1.points[1], value0: '1c', value: '1d' },
        ],
        isStacked: true,
      });
      expect(result[1]).toEqual({
        ...series2,
        points: [
          { ...series2.points[0], value0: '2a', value: '2b' },
          { ...series2.points[1], value0: '2c', value: '2d' },
          { ...series2.points[2], value0: '2e', value: '2f' },
        ],
        isStacked: true,
      });
      expect(result[2]).toEqual({
        ...series3,
        points: [
          { ...series3.points[0], value0: '3a', value: '3b' },
          { ...series3.points[1], value0: '3c', value: '3d' },
        ],
        isStacked: true,
      });
      expect((stack as any).mock.calls.length).toEqual(1);
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

      const result = getStackedSeries(list, 'test-data' as any, {
        stacks: [],
        offset: 'test-offset',
        order: 'test-order',
      } as any);

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
      ], 'test-data' as any, {
        stacks: [
          ...makeStacks('1', '3'),
          ...makeStacks('2', '4'),
        ],
        offset: 'test-offset' as any,
        order: 'test-order' as any,
      });

      expect(result[0].points).toEqual([{ index: 0, value0: '1a', value: '1b' }]);
      expect(result[1].points).toEqual([{ index: 0, value0: '3a', value: '3b' }]);
      expect(result[2].points).toEqual([{ index: 0, value0: '2a', value: '2b' }]);
      expect(result[3].points).toEqual([{ index: 0, value0: '4a', value: '4b' }]);
      expect((stack as any).mock.calls.length).toEqual(2);
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

      const result = getStackedSeries([series1, series2, series3, series4], 'test-data' as any, {
        stacks: makeStacks('2', '4'),
        offset: 'test-offset',
        order: 'test-order',
      } as any);

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

      const result = getStackedSeries([series1, series2, series3, series4], 'test-data' as any, {
        stacks: [
          ...makeStacks('1', '4'),
          ...makeStacks('2'),
          ...makeStacks('3'),
        ],
        offset: 'test-offset' as any,
        order: 'test-order' as any,
      });

      expect(result[0]).not.toBe(series1);
      expect(result[1]).toBe(series2);
      expect(result[2]).toBe(series3);
      expect(result[3]).not.toBe(series4);
      expect((stack as any).mock.calls.length).toEqual(1);
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
      ], 'test-data' as any, {
        stacks: makeStacks('1', '2', '3', '4', '5'),
        offset: 'test-offset',
        order: 'test-order',
      } as any);

      expect(result[0].getPointTransformer).toBe(getPointTransformer);
      expect(result[1].getPointTransformer).toBe(getPointTransformer);
      expect(result[2].getPointTransformer).not.toBe(getPointTransformerWithZero);
      expect(result[3].getPointTransformer).not.toBe(getPointTransformerWithZero);
      expect(result[4].getPointTransformer).not.toBe(getPointTransformerWithZero);

      expect(result[2].getPointTransformer.isStartedFromZero).toEqual(true);
      expect((result[2].getPointTransformer as any).a).toEqual('A');
      expect((result[2].getPointTransformer as any).b).toEqual('B');
      expect(result[3].getPointTransformer.isStartedFromZero).toEqual(true);
      expect((result[3].getPointTransformer as any).a).toEqual('A');
      expect((result[3].getPointTransformer as any).b).toEqual('B');
      expect(result[4].getPointTransformer.isStartedFromZero).toEqual(true);
      expect((result[4].getPointTransformer as any).a).toEqual('A');
      expect((result[4].getPointTransformer as any).b).toEqual('B');
    });

    it('should update *startVal* in wrapped *getPointTransformer*', () => {
      mockStack.mockReturnValue([]);
      const mock = jest.fn().mockReturnValue(point => ({ ...point, tag: '#t' })) as any;
      mock.isStartedFromZero = true;
      const valueScale = value => `${value}#`;

      const result = getStackedSeries([
        makeSeries('1', { getPointTransformer: mock }),
        makeSeries('2', { getPointTransformer: mock }),
      ], 'test-data' as any, {
        stacks: makeStacks('1', '2'),
        offset: 'test-offset',
        order: 'test-order',
      } as any);

      const transform = result[0].getPointTransformer({ valueScale } as any);

      expect(mock).toBeCalledWith({ valueScale });
      expect(transform({ value0: 'v1' } as any)).toEqual({
        value0: 'v1',
        tag: '#t',
        startVal: 'v1#',
      });
      expect(transform({ value0: 'v2' } as any)).toEqual({
        value0: 'v2',
        tag: '#t',
        startVal: 'v2#',
      });
    });

    it('should arrange groups', () => {
      const getPointTransformer = () => null;
      getPointTransformer.isBroad = true;
      getPointTransformer.a = 'A';
      getPointTransformer.b = 'B';
      const series1 = makeSeries('1');
      const series2 = makeSeries('2', { getPointTransformer });
      const series3 = makeSeries('3', { getPointTransformer });

      const result = getStackedSeries(
        [series1, series2, series3],
        'test-data' as any,
        { stacks: [], offset: 'offset', order: 'order' } as any);

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

      expect((result[1].getPointTransformer as any).a).toEqual('A');
      expect((result[1].getPointTransformer as any).b).toEqual('B');
      expect((result[2].getPointTransformer as any).a).toEqual('A');
      expect((result[2].getPointTransformer as any).b).toEqual('B');
    });

    it('should return series as-is if there no groups', () => {
      const list = [
        makeSeries('1'),
        makeSeries('2'),
        makeSeries('3'),
      ];

      const result = getStackedSeries(
        list,
        'test-data' as any,
        { stacks: [], offset: 'offset', order: 'order' } as any);

      expect(result).toBe(list);
    });

    it('should update *arg* and *width* in wrapped *getPointTransformer*', () => {
      const getPointTransformer = jest.fn() as any;
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

      const result = getStackedSeries(
        [series1, series2, series3],
        'test-data' as any,
        { stacks: [], offset: 'offset', order: 'order' } as any);

      const transform1 = result[0].getPointTransformer({ barWidth: 0.5 } as any);
      expect(transform1({
        index: 1, arg: 150, maxBarWidth: 60,
      } as any)).toEqual({
        index: 1,
        tag: '1',
        arg: 134,
        maxBarWidth: 20,
      });

      const transform2 = result[1].getPointTransformer({ barWidth: 0.8 } as any);
      expect(transform2({
        index: 2, arg: 150, maxBarWidth: 60,
      } as any)).toEqual({
        index: 2,
        tag: '2',
        arg: 142,
        maxBarWidth: 20,
      });

      const transform3 = result[2].getPointTransformer({ barWidth: 0.4 } as any);
      expect(transform3({
        index: 3, arg: 150, maxBarWidth: 60,
      } as any)).toEqual({
        index: 3,
        tag: '3',
        arg: 146,
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
      ], 'test-data' as any, {
        stacks: makeStacks('2', '4', '5'),
        offset: 'test-offset',
        order: 'test-order',
      } as any);

      expect(mockScale.domain).toBeCalledWith(['group-0', '0', 'group-5']);
      expect(mockScale.mock.calls).toEqual([
        ['group-0'],
        ['0'],
        ['0'],
        ['group-5'],
      ]);
    });
  });

  describe('getStackedDomains', () => {
    afterEach(() => {
      (extendDomains as jest.Mock).mockReset();
      (updateDomainItems as jest.Mock).mockReset();
    });

    it('should recalculate domains', () => {
      const domains = {
        'domain-1': {
          domain: [1, 2],
        },
        'domain-2': {
          domain: ['A'],
        },
      };
      const series = [
        {
          name: 's-1', isStacked: true, scaleName: 'domain-1',
          points: [{ value0: 3 }, { value0: 4 }],
        },
        { name: 's-2' },
        {
          name: 's-3', isStacked: true, scaleName: 'domain-2',
          points: [{ value0: 'C' }, { value0: 'D' }],
        },
      ];
      (extendDomains as jest.Mock).mockReturnValueOnce('test-domains-1');
      (extendDomains as jest.Mock).mockReturnValueOnce('test-domains-2');
      (extendDomains as jest.Mock).mockReturnValueOnce({
        'domain-1': { tag: 'domain-1' },
        'domain-2': { tag: 'domain-2' },
      });
      (updateDomainItems as jest.Mock).mockReturnValueOnce({ items: 'extended-1' });
      (updateDomainItems as jest.Mock).mockReturnValueOnce({ items: 'extended-2' });

      const result = getStackedDomains(domains, series);

      expect(result).toEqual({
        'domain-1': { items: 'extended-1' },
        'domain-2': { items: 'extended-2' },
      });
      expect((extendDomains as jest.Mock).mock.calls).toEqual([
        [
          {
            'domain-1': { domain: [] },
            'domain-2': { domain: [] },
          },
          series[0], expect.anything(), expect.anything(),
        ],
        [
          'test-domains-1', series[1], expect.anything(), expect.anything(),
        ],
        [
          'test-domains-2', series[2], expect.anything(), expect.anything(),
        ],
      ]);
      expect((updateDomainItems as jest.Mock).mock.calls).toEqual([
        [
          { tag: 'domain-1' }, [3, 4],
        ],
        [
          { tag: 'domain-2' }, ['C', 'D'],
        ],
      ]);
    });

    it('should return original domains if there are no stacked series', () => {
      const domains = {
        'domain-1': {
          domain: [1, 2],
        },
        'domain-2': {
          domain: ['A'],
        },
      };
      const series = [
        { name: 's-1' },
        { name: 's-2' },
        { name: 's-3' },
      ];

      const result = getStackedDomains(domains, series);

      expect(result).toBe(domains);
    });
  });
});
